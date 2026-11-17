import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCanonicalUrl, resolveRouteSeo } from './seo';

test('resolves known routes with trailing slashes normalized', () => {
  const tech = resolveRouteSeo('/technology/');
  assert.equal(tech.canonicalPath, '/technology');
  assert.ok(tech.title.includes('Our Technology'));
  assert.ok(tech.description.length >= 100 && tech.description.length <= 170);
});

test('returns clean fallback metadata for unknown routes', () => {
  const missing = resolveRouteSeo('/non-existent');
  assert.equal(missing.title, 'Page Not Found | Aquora');
  assert.equal(missing.canonicalPath, '/');
});

test('builds canonical URLs cleanly for production domain and runtime origin', () => {
  assert.equal(buildCanonicalUrl('/products'), 'https://www.aquora.ng/products');
  assert.equal(buildCanonicalUrl('/', 'https://www.aquora.ng/'), 'https://www.aquora.ng/');
});
