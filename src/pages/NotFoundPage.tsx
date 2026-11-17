import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="py-24 bg-[#FAF7EE] text-[#184435]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-display text-sm font-semibold text-[#1b7895]">404 · Page Not Found</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#184435]">
          We couldn’t find that page.
        </h1>
        <p className="mt-4 text-base text-[#184435]/80">
          The page may have moved or the URL may be typed incorrectly. Return to the Aquora homepage to explore our technology and solutions.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#184435] text-[#FAF7EE] font-display text-sm font-semibold hover:bg-[#1b7895] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
