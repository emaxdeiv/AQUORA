export interface RouteSeoMeta {
  path: string;
  title: string;
  description: string;
  canonicalPath: string;
}

export const SITE_BASE_URL = 'https://www.aquora.ng';

export const ROUTE_SEO: Record<string, RouteSeoMeta> = {
  '/': {
    path: '/',
    title: 'Aquora — Aquaculture Meets Technology | Smart Fish Farming Systems',
    description:
      'Aquora builds ESP32 pond monitoring hardware, farmer dashboards, and smart aquaculture tools giving fish farmers visibility and control over their ponds.',
    canonicalPath: '/',
  },
  '/about': {
    path: '/about',
    title: 'About Aquora — Mission, Vision & Connected Aquaculture',
    description:
      'Learn why Aquora exists and how we combine aquaculture expertise, IoT hardware, software engineering, and AI to support sustainable fish farming.',
    canonicalPath: '/about',
  },
  '/technology': {
    path: '/technology',
    title: 'Our Technology — ESP32 Pond IoT, Software & AI Direction | Aquora',
    description:
      'Explore Aquora’s three technology pillars: ESP32-based water parameter sensors, the farmer management software platform, and our data-driven AI roadmap.',
    canonicalPath: '/technology',
  },
  '/products': {
    path: '/products',
    title: 'Products & Solutions — Monitoring, Software & Feeder Prototype | Aquora',
    description:
      'Discover Aquora’s ESP32 pond monitoring hardware, farmer software dashboard, and MVP automatic feeding mechanism undergoing real-farm testing.',
    canonicalPath: '/products',
  },
  '/how-it-works': {
    path: '/how-it-works',
    title: 'How Aquora Works — From Pond Sensors to Farm Decisions',
    description:
      'Step-by-step overview of how Aquora collects pond water data, surfaces dashboard insights, sends alerts, and supports feeding management.',
    canonicalPath: '/how-it-works',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Aquora — Farm Pilots, Hardware & Partnership Enquiries',
    description:
      'Get in touch with Aquora by email, phone, or enquiry form for pond monitoring deployments, software pilots, and agricultural partnerships.',
    canonicalPath: '/contact',
  },
};

export function resolveRouteSeo(pathname: string): RouteSeoMeta {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return (
    ROUTE_SEO[normalized] ?? {
      path: normalized,
      title: 'Page Not Found | Aquora',
      description:
        'The requested page could not be found. Return to Aquora — Aquaculture meets Technology.',
      canonicalPath: '/',
    }
  );
}

export function buildCanonicalUrl(canonicalPath: string, origin?: string): string {
  const base = origin && origin.startsWith('http') ? origin.replace(/\/+$/, '') : SITE_BASE_URL;
  return `${base}${canonicalPath === '/' ? '/' : canonicalPath}`;
}
