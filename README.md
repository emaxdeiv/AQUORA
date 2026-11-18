# Aquora Corporate Website

Official web platform for **Aquora** — *Aquaculture meets Technology* (`www.aquora.ng`).

## 1. Architecture & Project Structure

- `server.ts` — Express server providing security headers, Vite middleware in development, static asset serving with SPA route fallback in production, `/api/health`, and `/api/enquiries` (validation, honeypot spam filtering, IP rate limiting).
- `src/data/aquoraContent.ts` — Centralized corporate copy, mission/vision statements, verified contact channels, ESP32 sensor parameters, product scope, and workflow steps.
- `src/utils/enquiryValidation.ts` — Shared client/server validation and spam detection logic (`enquiryValidation.test.ts` unit tests).
- `src/utils/seo.ts` — Route-specific `<title>`, meta description, and canonical URL resolution (`seo.test.ts` unit tests).
- `src/components/` — Reusable UI building blocks (`Header`, `Footer`, `BrandLogo`, `Layout`, `SafeImage`, `SectionHeader`, `CtaBand`, `DashboardIllustrativePreview`, `EnquiryForm`).
- `src/pages/` — Route views (`HomePage`, `AboutPage`, `TechnologyPage`, `ProductsPage`, `HowItWorksPage`, `ContactPage`, `NotFoundPage`).
- `public/` — `robots.txt` and `sitemap.xml` for search indexing.

## 2. Installation & Local Development

```bash
npm install
npm run dev
```

The server listens on `http://localhost:3000`.

### Verification Commands

- Run unit tests: `npm test` (runs `tsx --test src/utils/*.test.ts`)
- Type-check: `npm run lint`
- Production build: `npm run build` (bundles React frontend into `dist/` and Express server into `dist/server.mjs`)
- Start production server: `npm start`

## 3. Content Updates

All factual company statements, product descriptions, MVP prototype disclosures, and contact channels live in `src/data/aquoraContent.ts`. Route titles and descriptions live in `src/utils/seo.ts`.

## 4. Deployment & Domain Guidance (`www.aquora.ng`)

### Vercel Deployment
The repository includes `vercel.json` (SPA route rewrites + security headers) and Vercel Serverless Functions under `api/enquiries.ts` and `api/health.ts`.
1. Deploy the project to Vercel with the default `npm run build` command and `dist` output directory.
2. To forward submitted enquiries directly to `otuyasky11@gmail.com` instead of only logging them in function logs, configure **either**:
   - `RESEND_API_KEY` (and optional `ENQUIRY_TO_EMAIL=otuyasky11@gmail.com`) in Vercel Project Environment Variables, **or**
   - `ENQUIRY_WEBHOOK_URL` (e.g. Formspree, Make, or Zapier webhook), **or**
   - `VITE_FORMSPREE_ENDPOINT` for direct client-side Formspree submission.

### Node / Cloud Run Deployment
1. Set `NODE_ENV=production` and `PORT=3000` (or platform-assigned port) in deployment environment variables.
2. Build with `npm run build` and launch with `npm start`.
3. Terminate HTTPS at your reverse proxy / hosting platform (Cloud Run, Nginx, Cloudflare) with HTTP-to-HTTPS redirect enabled.
4. Point `www.aquora.ng` DNS (`A`/`AAAA` or `CNAME`) to the production host and verify `/sitemap.xml` and `/robots.txt` return HTTP `200`.

## 5. Known Limitations & Asset Notes

- **Brand Guide Cream (RayYellow) Hex**: Because the original 2026 Brand Guide PDF file was not present in the workspace, `#FAF7EE` / `#F1ECE0` warm cream neutrals were chosen and should be verified against the master brand document.
- **Telegraf Webfont**: `'Telegraf'` is declared first in `--font-body` with `'DM Sans'` loaded via Google Fonts as a reliable open fallback. If licensed `PP Telegraf` `.woff2` files are provided, add `@font-face` rules in `src/index.css` pointing to `/public/fonts/`.
- **Enquiry Persistence**: Without `RESEND_API_KEY` or `ENQUIRY_WEBHOOK_URL` set, `/api/enquiries` validates and logs submissions in server/function logs; set one of those variables in production so every enquiry is delivered externally.
