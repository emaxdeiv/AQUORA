import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { validateEnquiryPayload } from './src/utils/enquiryValidation';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Basic in-memory rate limit store for enquiry spam protection
const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 10;
const ipRequestLog = new Map<string, number[]>();

interface StoredEnquiry {
  referenceId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  topic: string;
  message: string;
}

const submittedEnquiries: StoredEnquiry[] = [];

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

// Security headers across all responses
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Health endpoint for operational readiness
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'aquora-corporate-web' });
});

// Enquiry submission endpoint with validation, honeypot check, and rate limiting
app.post('/api/enquiries', (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
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

  const validation = validateEnquiryPayload(req.body ?? {});

  // Silently accept honeypot-triggered spam without persisting
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

  const referenceId = `AQ-${new Date().getFullYear()}-${String(submittedEnquiries.length + 101).padStart(4, '0')}`;
  const record: StoredEnquiry = {
    referenceId,
    submittedAt: new Date().toISOString(),
    ...validation.sanitized,
  };

  submittedEnquiries.push(record);

  res.status(201).json({
    ok: true,
    referenceId,
    submittedAt: record.submittedAt,
    message:
      'Thank you for contacting Aquora. Our team has logged your enquiry and will respond via email or phone.',
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(
      express.static(distDir, {
        maxAge: '7d',
        index: false,
      })
    );

    // SPA fallback for all corporate routes in production
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ ok: false, message: 'Endpoint not found' });
        return;
      }
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(500).send('Production build missing. Run npm run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aquora web server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Aquora server:', err);
  process.exit(1);
});
