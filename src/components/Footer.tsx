import { Link } from 'react-router-dom';
import { AQUORA_BRAND, PRIMARY_NAV_ITEMS } from '../data/aquoraContent';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#184435] text-[#FAF7EE] border-t border-[#FAF7EE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <Link to="/" aria-label="Aquora Home" className="inline-block mb-4">
              <BrandLogo variant="light" />
            </Link>
            <p className="font-display text-base font-medium text-[#38b6ff] mb-3">
              {AQUORA_BRAND.tagline}
            </p>
            <p className="text-sm text-[#FAF7EE]/80 leading-relaxed max-w-md">
              {AQUORA_BRAND.mission}
            </p>
          </div>

          {/* Site Navigation Mirror */}
          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[#FAF7EE] mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-[#FAF7EE]/80 hover:text-[#38b6ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold text-[#FAF7EE] mb-4">
              Contact Aquora
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-[#FAF7EE]/60 text-xs mb-0.5">Website</dt>
                <dd>
                  <a
                    href={AQUORA_BRAND.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAF7EE] hover:text-[#38b6ff] transition-colors"
                  >
                    {AQUORA_BRAND.websiteDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[#FAF7EE]/60 text-xs mb-0.5">Phone</dt>
                <dd>
                  <a
                    href={AQUORA_BRAND.phoneHref}
                    className="text-[#FAF7EE] hover:text-[#38b6ff] transition-colors tabular-nums"
                  >
                    {AQUORA_BRAND.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[#FAF7EE]/60 text-xs mb-0.5">Email</dt>
                <dd>
                  <a
                    href={AQUORA_BRAND.emailHref}
                    className="text-[#FAF7EE] hover:text-[#38b6ff] transition-colors break-all"
                  >
                    {AQUORA_BRAND.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#FAF7EE]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#FAF7EE]/70">
          <p>© {currentYear} Aquora. All rights reserved.</p>
          <p>{AQUORA_BRAND.vision}</p>
        </div>
      </div>
    </footer>
  );
}
