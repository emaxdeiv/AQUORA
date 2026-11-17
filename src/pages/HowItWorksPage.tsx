import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOW_IT_WORKS_STEPS } from '../data/aquoraContent';
import { CtaBand } from '../components/CtaBand';
import { SectionHeader } from '../components/SectionHeader';

export function HowItWorksPage() {
  const [expandedStep, setExpandedStep] = useState<string>('01');

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#184435] text-[#FAF7EE] aquora-wave-pattern py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-display text-sm font-semibold text-[#38b6ff] mb-3">
              How Aquora Works
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
              Six connected steps from pond water to confident farm decisions.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#FAF7EE]/85 leading-relaxed">
              Aquora links physical pond sensing, software visibility, alerts, and feeding workflows in a clear operational loop designed for everyday fish farm teams.
            </p>
          </div>
        </div>
      </section>

      {/* Architectural Visual Sequence Diagram */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="System Flow"
            title="End-to-end pond monitoring and management sequence."
            description="Select any stage below to inspect how information moves from pond sensors to farm actions."
          />

          {/* Compact Visual Diagram Strip */}
          <div
            aria-label="Six-step system sequence overview"
            className="mt-10 p-5 sm:p-6 rounded-lg bg-[#184435] text-[#FAF7EE] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {HOW_IT_WORKS_STEPS.map((step) => {
              const isSelected = expandedStep === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setExpandedStep(step.stepNumber)}
                  aria-pressed={isSelected}
                  className={`text-left p-4 rounded-md border transition-colors ${
                    isSelected
                      ? 'bg-[#FAF7EE] text-[#184435] border-[#FAF7EE]'
                      : 'bg-[#FAF7EE]/6 text-[#FAF7EE] border-[#FAF7EE]/15 hover:bg-[#FAF7EE]/12'
                  }`}
                >
                  <p
                    className={`font-display text-xs font-semibold tabular-nums ${
                      isSelected ? 'text-[#1b7895]' : 'text-[#38b6ff]'
                    }`}
                  >
                    Step {step.stepNumber}
                  </p>
                  <p className="mt-1.5 font-display text-sm font-semibold leading-snug">
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Accordion Detail Sequence */}
          <div className="mt-10 divide-y divide-[#184435]/15 border-y border-[#184435]/15">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const isOpen = expandedStep === step.stepNumber;
              return (
                <div key={step.stepNumber} className="py-5">
                  <h3>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedStep((prev) =>
                          prev === step.stepNumber ? '' : step.stepNumber
                        )
                      }
                      aria-expanded={isOpen}
                      aria-controls={`step-panel-${step.stepNumber}`}
                      className="w-full flex items-center justify-between gap-4 text-left py-2 group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                        <span className="font-display text-sm font-semibold text-[#1b7895] tabular-nums shrink-0">
                          {step.stepNumber}.
                        </span>
                        <span className="font-display text-lg sm:text-xl font-semibold text-[#184435] group-hover:text-[#1b7895] transition-colors">
                          {step.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#184435] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={`step-panel-${step.stepNumber}`}
                      className="mt-3 sm:pl-11 max-w-3xl space-y-2"
                    >
                      <p className="text-sm sm:text-base font-medium text-[#184435]">
                        {step.summary}
                      </p>
                      <p className="text-sm sm:text-base text-[#184435]/80 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#184435] text-[#FAF7EE] font-display text-sm font-semibold hover:bg-[#1b7895] transition-colors"
            >
              <span>Inspect Hardware & Software Scope</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#184435] hover:text-[#1b7895]"
            >
              <span>Ask a technical question</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to discuss how Aquora fits your ponds?"
        description="Speak with our team about monitoring setups, software visibility, or field-testing updates."
        primaryLabel="Contact Aquora"
        primaryTo="/contact"
        secondaryLabel="About Aquora"
        secondaryTo="/about"
      />
    </div>
  );
}
