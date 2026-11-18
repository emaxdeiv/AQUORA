import { validateEnquiryPayload } from '../src/utils/enquiryValidation';

interface VercelRequestLike {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 10;
const ipRequestLog = new Map<string, number[]>();

function getClientIp(req: VercelRequestLike): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function parseBody(rawBody: unknown): Record<string, unknown> {
  if (!rawBody) return {};
  if (typeof rawBody === 'string') {
    try {
      return JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof rawBody === 'object') {
    return rawBody as Record<string, unknown>;
  }
  return {};
}

async function forwardEnquiryIfConfigured(record: {
  referenceId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  topic: string;
  message: string;
}): Promise<void> {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(record),
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const toEmail = process.env.ENQUIRY_TO_EMAIL || 'otuyasky11@gmail.com';
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL || 'Aquora Website <onboarding@resend.dev>';
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: record.email,
        subject: `[Aquora Enquiry ${record.referenceId}] ${record.topic} — ${record.fullName}`,
        text: [
          `Reference ID: ${record.referenceId}`,
          `Submitted At: ${record.submittedAt}`,
          `Name: ${record.fullName}`,
          `Email: ${record.email}`,
          `Phone: ${record.phone || 'Not provided'}`,
          `Farm / Organization: ${record.organization || 'Not provided'}`,
          `Topic: ${record.topic}`,
          '',
          'Message:',
          record.message,
        ].join('\n'),
      }),
    });
  }
}

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed. Use POST.' });
    return;
  }

  const clientIp = getClientIp(req);
  const now = Date.now();
  const timestamps = (ipRequestLog.get(clientIp) || []).filter(
    (ts) => now - ts < rateLimitWindowMs
  );

  if (timestamps.length >= maxRequestsPerWindow) {
    res.status(429).json({
      ok: false,
      message: 'Too many requests in a short period. Please wait a minute and try again.',
    });
    return;
  }

  timestamps.push(now);
  ipRequestLog.set(clientIp, timestamps);

  const payload = parseBody(req.body);
  const validation = validateEnquiryPayload(payload);

  if (validation.isSpam) {
    res.status(201).json({
      ok: true,
      referenceId: 'AQ-SPAM-FILTERED',
      message: 'Thank you. Your enquiry has been received.',
    });
    return;
  }

  if (!validation.isValid) {
    res.status(400).json({
      ok: false,
      message: 'Please correct the highlighted form fields.',
      errors: validation.errors,
    });
    return;
  }

  const suffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `AQ-${new Date().getFullYear()}-${suffix}`;
  const submittedAt = new Date().toISOString();
  const record = {
    referenceId,
    submittedAt,
    ...validation.sanitized,
  };

  try {
    await forwardEnquiryIfConfigured(record);
  } catch (err) {
    console.error('Failed to forward enquiry notification:', err);
  }

  console.info('Aquora enquiry logged:', {
    referenceId: record.referenceId,
    topic: record.topic,
    submittedAt: record.submittedAt,
  });

  res.status(201).json({
    ok: true,
    referenceId,
    submittedAt,
    message:
      'Thank you for contacting Aquora. Our team has logged your enquiry and will respond via email or phone.',
  });
}
