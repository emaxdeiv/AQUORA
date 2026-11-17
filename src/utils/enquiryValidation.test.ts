import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiryPayload } from './enquiryValidation';

test('accepts a valid farmer enquiry with optional phone and organization', () => {
  const result = validateEnquiryPayload({
    fullName: 'Adewale Ogunleye',
    email: 'adewale@farm.example.ng',
    phone: '+234 813 213 8765',
    organization: 'Ogun Catfish Ponds',
    topic: 'Pond Monitoring Hardware',
    message: 'We manage six earthen grow-out ponds and want to learn about ESP32 pond monitoring.',
  });

  assert.equal(result.isValid, true);
  assert.equal(result.isSpam, false);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.email, 'adewale@farm.example.ng');
});

test('flags empty or invalid required fields with clear messages', () => {
  const result = validateEnquiryPayload({
    fullName: 'A',
    email: 'not-an-email',
    phone: 'abc',
    topic: 'Unknown Topic',
    message: 'Too short',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.isSpam, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.topic);
  assert.ok(result.errors.message);
});

test('detects automated spam when honeypot field is populated', () => {
  const result = validateEnquiryPayload({
    fullName: 'Spam Bot',
    email: 'bot@spam.example',
    topic: 'General Enquiry',
    message: 'Buy cheap backlinks now for your website.',
    websiteUrl: 'https://spam-link.example',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.isSpam, true);
});
