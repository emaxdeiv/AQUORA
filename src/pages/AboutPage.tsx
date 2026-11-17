import { AQUORA_BRAND, AQUORA_IMAGES } from '../data/aquoraContent';
import { CtaBand } from '../components/CtaBand';
import { SafeImage } from '../components/SafeImage';
import { SectionHeader } from '../components/SectionHeader';

const APPROACH_PRINCIPLES = [
  {
    index: '01',
    title: 'Field-grounded engineering',
    body: 'Aquaculture technology only works when it survives real farm environments. Every hardware and software decision starts with practical conditions around earthen and concrete ponds.',
  },
  {
    index: '02',
    title: 'Clarity over complexity',
    body: 'Fish farmers do not need cluttered charts or complicated telemetry consoles. They need timely, readable pond indicators, clear alerts, and structured feeding records.',
  },
  {
    index: '03',
    title: 'Honest, incremental automation',
    body: 'We distinguish clearly between deployed monitoring tools, active software workflows, and hardware prototypes currently undergoing farm testing before full release.',
  },
];

export function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#184435] text-[#FAF7EE] aquora-wave-pattern py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-display text-sm font-semibold text-[#38b6ff] mb-3">
              About Aquora
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
              Technology built to give fish farmers visibility, control, and confidence.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#FAF7EE]/85 leading-relaxed">
              Aquora is an aquaculture technology and artificial intelligence company developing connected hardware, monitoring software, and automated tools for modern fish farming.
            </p>
          </div>
        </div>
      </section>

      {/* What Aquora Is & Why It Exists */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                kicker="Who We Are"
                title="Where aquaculture meets practical engineering."
              />
              <p className="text-base text-[#184435]/85 leading-relaxed">
                Fish farming depends on maintaining healthy water conditions and disciplined feeding schedules day after day. Yet many farms still manage ponds with limited visibility into water changes between manual checks and rely on memory or paper notes to track feed routines.
              </p>
              <p className="text-base text-[#184435]/85 leading-relaxed">
                Aquora exists to reduce that operational uncertainty. By uniting IoT pond sensing, clear farmer-focused software, and intelligent automation, we help fish farmers detect changing pond conditions earlier and manage daily farm work with dependable data.
              </p>
            </div>

            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-lg overflow-hidden border border-[#184435]/12">
                <SafeImage
                  src={AQUORA_IMAGES.aerialPonds}
                  alt="Organized rows of aquaculture fish ponds surrounded by green embankments"
                  aspectClassName="aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px]"
                  fallbackTitle="Commercial Fish Farming Infrastructure"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20 bg-[#F1ECE0] border-y border-[#184435]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg bg-[#FAF7EE] border border-[#184435]/12">
              <p className="font-display text-sm font-semibold text-[#1b7895]">Official Mission</p>
              <p className="mt-3 font-display text-2xl font-semibold text-[#184435] leading-snug">
                {AQUORA_BRAND.mission}
              </p>
            </div>
            <div className="p-8 rounded-lg bg-[#FAF7EE] border border-[#184435]/12">
              <p className="font-display text-sm font-semibold text-[#1b7895]">Official Vision</p>
              <p className="mt-3 font-display text-2xl font-semibold text-[#184435] leading-snug">
                {AQUORA_BRAND.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach & Long-Term Direction */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Our Approach"
            title="Connecting hardware, software, and long-term intelligence."
            description="Every component of the Aquora platform is designed to work alongside real farmers—starting with accurate pond visibility and growing responsibly toward automated feeding and data-driven guidance."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {APPROACH_PRINCIPLES.map((item) => (
              <div key={item.index} className="pt-5 border-t border-[#184435]/15">
                <p className="font-display text-sm font-semibold text-[#1b7895] tabular-nums">
                  {item.index}.
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#184435]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#184435]/80 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Interested in collaborating with Aquora?"
        description="Connect with us to discuss pond monitoring deployments, farm trials, or agricultural partnerships."
        primaryLabel="Get in Touch"
        primaryTo="/contact"
        secondaryLabel="View Products & MVP Status"
        secondaryTo="/products"
      />
    </div>
  );
}
