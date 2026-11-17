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

1. Set `NODE_ENV=production` and `PORT=3000` (or platform-assigned port) in deployment environment variables.
2. Build with `npm run build` and launch with `npm start`.
3. Terminate HTTPS at your reverse proxy / hosting platform (Cloud Run, Nginx, Cloudflare) with HTTP-to-HTTPS redirect enabled.
4. Point `www.aquora.ng` DNS (`A`/`AAAA` or `CNAME`) to the production host and verify `/sitemap.xml` and `/robots.txt` return HTTP `200`.

## 5. Known Limitations & Asset Notes

- **Brand Guide Cream (RayYellow) Hex**: Because the original 2026 Brand Guide PDF file was not present in the workspace, `#FAF7EE` / `#F1ECE0` warm cream neutrals were chosen and should be verified against the master brand document.
- **Telegraf Webfont**: `'Telegraf'` is declared first in `--font-body` with `'DM Sans'` loaded via Google Fonts as a reliable open fallback. If licensed `PP Telegraf` `.woff2` files are provided, add `@font-face` rules in `src/index.css` pointing to `/public/fonts/`.
- **Logo SVG**: `src/components/BrandLogo.tsx` implements the protective ring + fish tail emblem from the specification; swap in the exact vector export from the 2026 Brand Guide if a master SVG file is supplied.
- **Enquiry Persistence**: `/api/enquiries` validates, spam-checks, and logs submissions in server memory; connect an email relay or database before production launch to persist enquiries externally.
