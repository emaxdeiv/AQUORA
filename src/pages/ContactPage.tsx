import { useState } from 'react';
import { Globe, Mail, Phone, ChevronDown } from 'lucide-react';
import { AQUORA_BRAND, CONTACT_FAQS } from '../data/aquoraContent';
import { EnquiryForm } from '../components/EnquiryForm';
import { SectionHeader } from '../components/SectionHeader';

export function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div>
      {/* Header */}
      <section className="bg-[#184435] text-[#FAF7EE] aquora-wave-pattern py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-display text-sm font-semibold text-[#38b6ff] mb-3">
              Contact Aquora
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
              Start a conversation about your ponds or partnership goals.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#FAF7EE]/85 leading-relaxed">
              Reach out for pond monitoring deployments, software demonstrations, MVP feeder trial updates, or agricultural and technology partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Channels + Enquiry Form */}
      <section className="py-14 lg:py-20 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Verified Channels */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-lg bg-[#F1ECE0] border border-[#184435]/12 space-y-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#184435]">
                    Direct Contact Channels
                  </h2>
                  <p className="mt-1.5 text-sm text-[#184435]/75">
                    Use our official website, phone line, or email address below.
                  </p>
                </div>

                <dl className="space-y-5">
                  <div className="flex items-start gap-3.5">
                    <Globe className="w-5 h-5 text-[#1b7895] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#184435]/65">Official Website</dt>
                      <dd className="mt-0.5">
                        <a
                          href={AQUORA_BRAND.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-base font-semibold text-[#184435] hover:text-[#1b7895]"
                        >
                          {AQUORA_BRAND.websiteDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#1b7895] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#184435]/65">Phone</dt>
                      <dd className="mt-0.5">
                        <a
                          href={AQUORA_BRAND.phoneHref}
                          className="font-display text-base font-semibold text-[#184435] hover:text-[#1b7895] tabular-nums"
                        >
                          {AQUORA_BRAND.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#1b7895] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#184435]/65">Email</dt>
                      <dd className="mt-0.5">
                        <a
                          href={AQUORA_BRAND.emailHref}
                          className="font-display text-base font-semibold text-[#184435] hover:text-[#1b7895] break-all"
                        >
                          {AQUORA_BRAND.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="p-6 rounded-lg border border-[#184435]/12 bg-white/75">
                <p className="font-display text-sm font-semibold text-[#184435]">
                  Official Mission
                </p>
                <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
                  “{AQUORA_BRAND.mission}”
                </p>
              </div>
            </aside>

            {/* Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions Accordion */}
      <section className="py-14 lg:py-20 bg-[#F1ECE0] border-t border-[#184435]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Common Questions"
            title="Helpful details before reaching out."
          />

          <div className="mt-8 divide-y divide-[#184435]/15 border-y border-[#184435]/15">
            {CONTACT_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="py-4">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="w-full flex items-center justify-between gap-4 text-left py-2"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-[#184435]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#184435] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <p
                      id={`faq-panel-${index}`}
                      className="mt-2 pb-2 text-sm sm:text-base text-[#184435]/80 leading-relaxed"
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
