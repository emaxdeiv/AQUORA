import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { PRODUCTS_CATALOG, type ProductSpec } from '../data/aquoraContent';
import { CtaBand } from '../components/CtaBand';
import { SafeImage } from '../components/SafeImage';

type FilterOption = 'All' | ProductSpec['category'];

const FILTER_OPTIONS: FilterOption[] = ['All', 'Hardware & IoT', 'Software', 'MVP Prototype'];

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('All');

  const visibleProducts =
    selectedCategory === 'All'
      ? PRODUCTS_CATALOG
      : PRODUCTS_CATALOG.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {/* Header */}
      <section className="bg-[#184435] text-[#FAF7EE] aquora-wave-pattern py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-display text-sm font-semibold text-[#38b6ff] mb-3">
              Products & Solutions
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
              Pond monitoring, farmer software, and field-tested feeding automation.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#FAF7EE]/85 leading-relaxed">
              Every Aquora product entry below states what it solves, how it operates, and its exact current development status—distinguishing clearly between active systems and MVP hardware trials.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Filter & Product Specs */}
      <section className="py-14 lg:py-20 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#184435]/12">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#184435]">
                Product Scope & Development Status
              </h2>
              <p className="text-sm text-[#184435]/70">
                Filter by system layer to inspect product details.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter products by category"
              className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-md bg-[#F1ECE0] border border-[#184435]/12 self-start sm:self-auto"
            >
              {FILTER_OPTIONS.map((option) => {
                const active = selectedCategory === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(option)}
                    className={`px-3.5 py-2 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#184435] text-[#FAF7EE]'
                        : 'text-[#184435]/80 hover:text-[#184435]'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Details List */}
          <div className="mt-10 space-y-12">
            {visibleProducts.map((product) => {
              const isPrototype = product.id === 'automatic-feeder';
              return (
                <article
                  key={product.id}
                  id={product.id}
                  className="p-6 sm:p-8 lg:p-10 rounded-lg bg-white border border-[#184435]/15"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    <div className="lg:col-span-5">
                      <div className="rounded-md overflow-hidden border border-[#184435]/10">
                        <SafeImage
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          aspectClassName="aspect-[4/3]"
                          fallbackTitle={product.name}
                        />
                      </div>

                      {isPrototype && (
                        <div className="mt-4 p-4 rounded-md bg-[#ff6f61]/12 border border-[#ff6f61] flex items-start gap-3">
                          <FlaskConical
                            className="w-5 h-5 text-[#184435] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="font-display text-sm font-semibold text-[#184435]">
                              Prototype Status Notice
                            </p>
                            <p className="mt-1 text-xs sm:text-sm text-[#184435]/85 leading-relaxed">
                              {product.developmentNote}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#1b7895]">
                          <span>{product.category}</span>
                          <span aria-hidden="true">·</span>
                          <span
                            className={
                              isPrototype ? 'text-[#b9382c] font-semibold' : 'text-[#184435]/80'
                            }
                          >
                            {product.status}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#184435]">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-base font-medium text-[#1b7895]">
                          {product.headline}
                        </p>
                      </div>

                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#184435]/12 text-sm">
                        <div>
                          <dt className="font-display font-semibold text-[#184435]">What it is</dt>
                          <dd className="mt-1 text-[#184435]/80 leading-relaxed">
                            {product.whatItIs}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-display font-semibold text-[#184435]">
                            Problem it addresses
                          </dt>
                          <dd className="mt-1 text-[#184435]/80 leading-relaxed">
                            {product.problemAddressed}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-display font-semibold text-[#184435]">
                            How it works
                          </dt>
                          <dd className="mt-1 text-[#184435]/80 leading-relaxed">
                            {product.howItWorks}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-display font-semibold text-[#184435]">
                            Relevance to fish farmers
                          </dt>
                          <dd className="mt-1 text-[#184435]/80 leading-relaxed">
                            {product.farmerRelevance}
                          </dd>
                        </div>
                      </dl>

                      {!isPrototype && (
                        <p className="text-xs text-[#184435]/70 pt-3 border-t border-[#184435]/10">
                          Development status: {product.developmentNote}
                        </p>
                      )}

                      <div className="pt-2">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#184435] hover:text-[#1b7895] transition-colors"
                        >
                          <span>Enquire about {product.name}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to discuss pond monitoring or pilot trials?"
        description="Reach out with details about your farm size, pond count, and operational priorities."
        primaryLabel="Contact Our Team"
        primaryTo="/contact"
        secondaryLabel="Read How It Works"
        secondaryTo="/how-it-works"
      />
    </div>
  );
}
