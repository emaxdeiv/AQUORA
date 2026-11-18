import test from 'node:test';
import assert from 'node:assert/strict';
import handler from './enquiries';

function createMockRes() {
  let statusCode = 200;
  let body: unknown = null;
  const headers: Record<string, string> = {};
  const res = {
    status(code: number) {
      statusCode = code;
      return res;
    },
    json(payload: unknown) {
      body = payload;
    },
    setHeader(name: string, value: string) {
      headers[name] = value;
    },
    end() {},
  };
  return {
    res,
    getStatus: () => statusCode,
    getBody: () => body as Record<string, unknown>,
  };
}

test('Vercel /api/enquiries handler accepts valid POST enquiry and returns 201 JSON', async () => {
  const mock = createMockRes();
  await handler(
    {
      method: 'POST',
      headers: { 'x-forwarded-for': '203.0.113.10' },
      body: {
        fullName: 'Tunde Bakare',
        email: 'tunde@fishfarm.ng',
        topic: 'Pond Monitoring Hardware',
        message: 'Looking for monitoring units for four earthen catfish ponds.',
      },
    },
    mock.res
  );

  assert.equal(mock.getStatus(), 201);
  assert.equal(mock.getBody().ok, true);
  assert.match(String(mock.getBody().referenceId), /^AQ-\d{4}-\d{4}$/);
});

test('Vercel /api/enquiries handler returns 400 on invalid input and 405 on GET', async () => {
  const invalidMock = createMockRes();
  await handler(
    {
      method: 'POST',
      headers: { 'x-forwarded-for': '203.0.113.11' },
      body: { fullName: 'A', email: 'bad', message: 'short' },
    },
    invalidMock.res
  );
  assert.equal(invalidMock.getStatus(), 400);
  assert.equal(invalidMock.getBody().ok, false);

  const methodMock = createMockRes();
  await handler({ method: 'GET', headers: {} }, methodMock.res);
  assert.equal(methodMock.getStatus(), 405);
});
