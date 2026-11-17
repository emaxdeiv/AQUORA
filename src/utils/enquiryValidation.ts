export type EnquiryTopic =
  | 'Pond Monitoring Hardware'
  | 'Farmer Software Platform'
  | 'Automatic Feeding Prototype'
  | 'Farm Partnership & Pilot'
  | 'Investment & Strategic Enquiry'
  | 'General Enquiry';

export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  topic: EnquiryTopic | string;
  message: string;
  /** Honeypot field: must remain empty for legitimate human submissions */
  websiteUrl?: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  isSpam: boolean;
  errors: ValidationErrors;
  sanitized: {
    fullName: string;
    email: string;
    phone: string;
    organization: string;
    topic: string;
    message: string;
  };
}

export const ENQUIRY_TOPICS: EnquiryTopic[] = [
  'Pond Monitoring Hardware',
  'Farmer Software Platform',
  'Automatic Feeding Prototype',
  'Farm Partnership & Pilot',
  'Investment & Strategic Enquiry',
  'General Enquiry',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s()-]{6,20}$/;

export function normalizeText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizeMultilineText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\r\n/g, '\n');
}

export function validateEnquiryPayload(payload: Partial<EnquiryPayload>): ValidationResult {
  const honeypot = normalizeText(payload.websiteUrl);
  const fullName = normalizeText(payload.fullName);
  const email = normalizeText(payload.email).toLowerCase();
  const phone = normalizeText(payload.phone);
  const organization = normalizeText(payload.organization);
  const topic = normalizeText(payload.topic);
  const message = normalizeMultilineText(payload.message);

  const errors: ValidationErrors = {};

  if (honeypot.length > 0) {
    return {
      isValid: false,
      isSpam: true,
      errors: {},
      sanitized: { fullName, email, phone, organization, topic, message },
    };
  }

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  } else if (fullName.length > 100) {
    errors.fullName = 'Full name must be 100 characters or fewer.';
  }

  if (!email) {
    errors.email = 'Please provide an email address.';
  } else if (!EMAIL_REGEX.test(email) || email.length > 160) {
    errors.email = 'Please enter a valid email address.';
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    errors.phone = 'Please enter a valid phone number (e.g. +234 813 213 8765).';
  }

  if (!topic || !ENQUIRY_TOPICS.includes(topic as EnquiryTopic)) {
    errors.topic = 'Please select an enquiry topic.';
  }

  if (message.length < 15) {
    errors.message = 'Please include a short description of your farm or enquiry (at least 15 characters).';
  } else if (message.length > 2500) {
    errors.message = 'Message must be 2,500 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    isSpam: false,
    errors,
    sanitized: { fullName, email, phone, organization, topic, message },
  };
}
