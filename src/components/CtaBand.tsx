import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CtaBandProps {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function CtaBand({
  title,
  description,
  primaryLabel = 'Contact Aquora',
  primaryTo = '/contact',
  secondaryLabel = 'See How It Works',
  secondaryTo = '/how-it-works',
}: CtaBandProps) {
  return (
    <section className="bg-[#1b7895] text-[#FAF7EE] aquora-wave-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance text-[#FAF7EE]">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#FAF7EE]/90 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#ff6f61] text-[#184435] font-display text-sm font-semibold hover:bg-[#FAF7EE] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>{primaryLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-md border border-[#FAF7EE]/35 text-[#FAF7EE] font-display text-sm font-medium hover:bg-[#FAF7EE]/10 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
