import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  AQUORA_BRAND,
  AQUORA_IMAGES,
  FARMING_CHALLENGES,
  HOW_IT_WORKS_STEPS,
  POND_PARAMETERS,
  PRODUCTS_CATALOG,
  TECHNOLOGY_PILLARS,
} from '../data/aquoraContent';
import { CtaBand } from '../components/CtaBand';
import { DashboardIllustrativePreview } from '../components/DashboardIllustrativePreview';
import { SafeImage } from '../components/SafeImage';
import { SectionHeader } from '../components/SectionHeader';

export function HomePage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <section className="bg-[#184435] text-[#FAF7EE] aquora-wave-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="font-display text-sm font-semibold text-[#38b6ff] mb-3">
                {AQUORA_BRAND.tagline}
              </p>
              <h1 className="font-display text-[clamp(2.15rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.12] text-balance text-[#FAF7EE]">
                Smart visibility and control for modern fish farming.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#FAF7EE]/85 leading-relaxed max-w-xl">
                Aquora brings together ESP32 pond monitoring hardware, farmer software, and practical automation so aquaculture operators can manage ponds with reliable data instead of guesswork.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#ff6f61] text-[#0F2A21] font-display text-sm font-semibold hover:bg-[#FAF7EE] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Explore Aquora</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/technology"
                  className="inline-flex items-center justify-center px-5 py-3.5 rounded-md border border-[#FAF7EE]/35 text-[#FAF7EE] font-display text-sm font-medium hover:bg-[#FAF7EE]/10 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Discover Our Technology
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-lg overflow-hidden border border-[#FAF7EE]/15">
                <SafeImage
                  src={AQUORA_IMAGES.heroPond}
                  alt="Aquaculture specialist inspecting water quality at commercial fish farming ponds"
                  aspectClassName="aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px]"
                  priority
                  fallbackTitle="Aquora Connected Aquaculture Ponds"
                />
              </div>
            </div>
          </div>

          {/* Monitored Parameters Strip */}
          <div className="mt-12 pt-8 border-t border-[#FAF7EE]/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POND_PARAMETERS.map((param) => (
              <div key={param.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-display text-base font-semibold text-[#FAF7EE]">
                    {param.name}
                  </h2>
                  <span className="text-xs font-medium text-[#38b6ff] tabular-nums">
                    {param.unitLabel}
                  </span>
                </div>
                <p className="text-sm text-[#FAF7EE]/75 leading-relaxed">{param.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Introduction & The Problem / Our Solution */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                kicker="Why Aquora Exists"
                title="Reducing daily uncertainty in fish farm operations."
                description="Aquora is an aquaculture technology company combining IoT hardware, software engineering, and artificial intelligence to help fish farmers monitor pond conditions and make informed operational decisions."
              />
              <div className="mt-8 rounded-lg overflow-hidden border border-[#184435]/12">
                <SafeImage
                  src={AQUORA_IMAGES.farmerManagement}
                  alt="Fish farm manager inspecting ponds with digital management tools"
                  aspectClassName="aspect-[4/3]"
                  fallbackTitle="Aquora Farm Operations"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-[#184435] mb-4">
                  Core challenges on commercial ponds
                </h3>
                <div className="divide-y divide-[#184435]/12 border-y border-[#184435]/12">
                  {FARMING_CHALLENGES.map((item) => (
                    <div key={item.index} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <span className="sm:col-span-2 font-display text-sm font-semibold text-[#1b7895] tabular-nums">
                        {item.index}.
                      </span>
                      <div className="sm:col-span-10">
                        <h4 className="font-display text-base font-semibold text-[#184435]">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-sm sm:text-base text-[#184435]/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-lg bg-[#F1ECE0] border border-[#184435]/12">
                <p className="font-display text-sm font-semibold text-[#1b7895]">
                  Our Connected Solution
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-[#184435]">
                  One connected workflow from pond water to farm decisions
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#184435]/85 leading-relaxed">
                  Rather than treating sensors, software, and feeding equipment as isolated tools, Aquora links pond-side ESP32 monitoring hardware with a centralized farmer dashboard, alert notifications, and structured feeding workflows—while field-testing automated feeding hardware to reduce repetitive manual labor.
                </p>
                <div className="mt-5">
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center gap-2 text-sm font-display font-semibold text-[#184435] hover:text-[#1b7895] transition-colors"
                  >
                    <span>Explore how the system connects</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Technology Pillars (Asymmetric Grid) */}
      <section className="py-16 lg:py-22 bg-[#F1ECE0] border-y border-[#184435]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker="Technology Foundation"
              title="Three engineering disciplines built for pond environments."
              description="We combine field-ready electronics, accessible farm software, and a realistic AI development roadmap."
            />
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#184435] hover:text-[#1b7895] whitespace-nowrap shrink-0"
            >
              <span>Full Technology Overview</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {TECHNOLOGY_PILLARS.map((pillar, idx) => {
              const spanClass = idx === 0 ? 'lg:col-span-5' : idx === 1 ? 'lg:col-span-4' : 'lg:col-span-3';
              return (
                <article
                  key={pillar.id}
                  className={`${spanClass} p-6 sm:p-7 rounded-lg bg-[#FAF7EE] border border-[#184435]/12 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#1b7895] font-medium mb-4">
                      <span className="tabular-nums font-display font-semibold">
                        {pillar.index}.
                      </span>
                      <span>{pillar.statusLabel}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#184435]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#184435]/80 leading-relaxed">
                      {pillar.summary}
                    </p>
                    <ul className="mt-5 space-y-2.5 border-t border-[#184435]/10 pt-4">
                      {pillar.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-sm text-[#184435]/85"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#1b7895] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How Aquora Works Sequence */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker="Operational Workflow"
              title="How pond monitoring, alerts, and feeding fit together."
            />
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#184435] hover:text-[#1b7895] whitespace-nowrap shrink-0"
            >
              <span>View Step-by-Step Flow</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-lg border border-[#184435]/12 bg-white/75"
              >
                <p className="font-display text-sm font-semibold text-[#1b7895] tabular-nums">
                  Step {step.stepNumber}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#184435]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">{step.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Product Introduction & Illustrative Software Preview */}
      <section className="py-16 lg:py-22 bg-[#F1ECE0] border-t border-[#184435]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              kicker="Products & Prototypes"
              title="Practical tools built around real pond operations."
              description="We communicate clearly what is active today and what is currently undergoing real-farm field trials."
            />
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#184435] hover:text-[#1b7895] whitespace-nowrap shrink-0"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {PRODUCTS_CATALOG.map((product) => (
              <article
                key={product.id}
                className="rounded-lg bg-[#FAF7EE] border border-[#184435]/12 overflow-hidden flex flex-col"
              >
                <SafeImage
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  aspectClassName="aspect-[4/3]"
                  fallbackTitle={product.name}
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#1b7895] font-medium mb-2">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          product.id === 'automatic-feeder'
                            ? 'text-[#b9382c] font-semibold'
                            : 'text-[#184435]/75'
                        }
                      >
                        {product.status}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[#184435]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
                      {product.whatItIs}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#184435]/10">
                    <Link
                      to={`/products#${product.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-display font-semibold text-[#184435] hover:text-[#1b7895]"
                    >
                      <span>Read product scope</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <DashboardIllustrativePreview />
        </div>
      </section>

      {/* 6. Official Mission & Vision Band */}
      <section className="py-16 lg:py-22 bg-[#184435] text-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="p-7 sm:p-9 rounded-lg border border-[#FAF7EE]/15 bg-[#FAF7EE]/5">
              <p className="font-display text-sm font-semibold text-[#38b6ff]">Our Mission</p>
              <blockquote className="mt-3 font-display text-xl sm:text-2xl font-semibold leading-snug text-[#FAF7EE]">
                “{AQUORA_BRAND.mission}”
              </blockquote>
            </div>
            <div className="p-7 sm:p-9 rounded-lg border border-[#FAF7EE]/15 bg-[#FAF7EE]/5">
              <p className="font-display text-sm font-semibold text-[#38b6ff]">Our Vision</p>
              <blockquote className="mt-3 font-display text-xl sm:text-2xl font-semibold leading-snug text-[#FAF7EE]">
                “{AQUORA_BRAND.vision}”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <CtaBand
        title="Partner with Aquora on connected aquaculture."
        description="Whether you manage commercial ponds, oversee an agribusiness operation, or explore hardware and pilot collaborations, speak directly with our team."
        primaryLabel="Contact Aquora"
        primaryTo="/contact"
        secondaryLabel="Review Our Technology"
        secondaryTo="/technology"
      />
    </div>
  );
}
