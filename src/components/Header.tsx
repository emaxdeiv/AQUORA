import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { PRIMARY_NAV_ITEMS } from '../data/aquoraContent';
import { BrandLogo } from './BrandLogo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-sm border-b border-[#184435]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Symbol */}
        <Link
          to="/"
          aria-label="Aquora Home"
          className="inline-flex items-center py-1 rounded-md focus-visible:outline-2 focus-visible:outline-[#38b6ff]"
        >
          <BrandLogo variant="dark" />
        </Link>

        {/* Zone 2: Primary Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
          {PRIMARY_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#184435] border-[#ff6f61]'
                    : 'text-[#184435]/75 border-transparent hover:text-[#184435] hover:border-[#38b6ff]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md bg-[#184435] text-[#FAF7EE] hover:bg-[#1b7895] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#184435] hover:bg-[#184435]/8 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-panel"
          aria-label="Mobile navigation"
          className="lg:hidden bg-[#FAF7EE] border-t border-[#184435]/12 px-4 sm:px-6 py-4"
        >
          <ul className="flex flex-col gap-1">
            {PRIMARY_NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block w-full px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#184435] text-[#FAF7EE]'
                        : 'text-[#184435] hover:bg-[#184435]/8'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#184435]/12">
            <Link
              to="/contact"
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold rounded-md bg-[#ff6f61] text-[#184435] hover:bg-[#ff6f61]/90 transition-colors"
            >
              Get Started with Aquora
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
