import {
  AI_CAPABILITY_COMPARISON,
  AQUORA_IMAGES,
  POND_PARAMETERS,
} from '../data/aquoraContent';
import { CtaBand } from '../components/CtaBand';
import { DashboardIllustrativePreview } from '../components/DashboardIllustrativePreview';
import { SafeImage } from '../components/SafeImage';
import { SectionHeader } from '../components/SectionHeader';

export function TechnologyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#184435] text-[#FAF7EE] aquora-wave-pattern py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-display text-sm font-semibold text-[#38b6ff] mb-3">
              Our Technology
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
              Connected IoT hardware, farmer software, and an honest AI roadmap.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#FAF7EE]/85 leading-relaxed">
              Aquora integrates three technical layers—pond-side ESP32 electronics, farmer management software, and progressive data intelligence—engineered specifically for aquaculture operations.
            </p>
          </div>
        </div>
      </section>

      {/* 1. IoT & Hardware */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
            <div className="lg:col-span-6">
              <SectionHeader
                kicker="01. IoT and Hardware"
                title="ESP32-based pond monitoring hardware."
                description="Aquora’s field hardware is built around ESP32 microcontroller nodes designed to capture four vital pond water parameters continuously at the pond edge."
              />
              <p className="mt-5 text-sm sm:text-base text-[#184435]/80 leading-relaxed">
                Each parameter tells a distinct story about the pond environment. Monitoring them together helps farmers anticipate stress on fish stocks before feeding efficiency drops or water quality deteriorates.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg overflow-hidden border border-[#184435]/12">
                <SafeImage
                  src={AQUORA_IMAGES.iotSensor}
                  alt="Weatherproof ESP32 IoT pond monitoring enclosure mounted beside pond water"
                  aspectClassName="aspect-[4/3]"
                  fallbackTitle="ESP32 Pond Monitoring Node"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POND_PARAMETERS.map((param, index) => (
              <article
                key={param.id}
                className="p-6 sm:p-7 rounded-lg bg-[#F1ECE0] border border-[#184435]/12"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-display text-xs font-semibold text-[#1b7895] tabular-nums">
                    Parameter 0{index + 1}
                  </span>
                  <span className="text-xs font-medium text-[#184435]/70 tabular-nums">
                    {param.unitLabel}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#184435]">{param.name}</h3>
                <p className="mt-2 text-sm font-medium text-[#184435]">{param.summary}</p>
                <p className="mt-3 text-sm text-[#184435]/80 leading-relaxed">
                  {param.farmImpact}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Software Platform */}
      <section className="py-16 lg:py-22 bg-[#F1ECE0] border-y border-[#184435]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            kicker="02. Software Platform"
            title="Clear pond visibility, alerts, and feeding management."
            description="Hardware readings only create value when farmers can interpret them quickly. Aquora’s software layer organizes pond monitoring data, threshold alerts, and daily feeding logs into a single operational workspace."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-lg bg-[#FAF7EE] border border-[#184435]/12">
              <h3 className="font-display text-base font-semibold text-[#184435]">
                Farmer Dashboard
              </h3>
              <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
                Centralizes pond-by-pond readings so managers can check conditions across multiple ponds at a glance.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-[#FAF7EE] border border-[#184435]/12">
              <h3 className="font-display text-base font-semibold text-[#184435]">
                Monitoring Information
              </h3>
              <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
                Organizes temperature, water level, pH, and turbidity records over time rather than leaving numbers on paper.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-[#FAF7EE] border border-[#184435]/12">
              <h3 className="font-display text-base font-semibold text-[#184435]">
                Alerts & Notifications
              </h3>
              <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
                Flags meaningful shifts outside expected pond bounds so farm staff can inspect and intervene promptly.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-[#FAF7EE] border border-[#184435]/12">
              <h3 className="font-display text-base font-semibold text-[#184435]">
                Feeding Management
              </h3>
              <p className="mt-2 text-sm text-[#184435]/80 leading-relaxed">
                Coordinates daily feed schedules, ration accountability, and integration where automated feeding is supported.
              </p>
            </div>
          </div>

          <DashboardIllustrativePreview />
        </div>
      </section>

      {/* 3. Artificial Intelligence Direction */}
      <section className="py-16 lg:py-22 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="03. Artificial Intelligence"
            title="From structured pond data to intelligent farm guidance."
            description="Aquora’s long-term AI direction builds directly on reliable field measurements. We separate what is active today from predictive capabilities still under active research and validation."
          />

          <div className="mt-10 overflow-x-auto rounded-lg border border-[#184435]/15 bg-white">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#184435] text-[#FAF7EE]">
                  <th scope="col" className="py-4 px-5 font-display text-sm font-semibold">
                    Capability Area
                  </th>
                  <th scope="col" className="py-4 px-5 font-display text-sm font-semibold">
                    Current Implemented Scope
                  </th>
                  <th scope="col" className="py-4 px-5 font-display text-sm font-semibold">
                    Planned AI & Future Direction
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#184435]/12 text-sm">
                {AI_CAPABILITY_COMPARISON.map((row) => (
                  <tr key={row.area} className="align-top">
                    <th scope="row" className="py-4 px-5 font-display font-semibold text-[#184435]">
                      {row.area}
                    </th>
                    <td className="py-4 px-5 text-[#184435]/85 leading-relaxed">{row.current}</td>
                    <td className="py-4 px-5 text-[#1b7895] font-medium leading-relaxed">
                      {row.planned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        title="See how our technology translates into products."
        description="Review each component of Aquora’s current product portfolio, including our MVP automatic feeding prototype undergoing real-farm field trials."
        primaryLabel="Explore Products & Solutions"
        primaryTo="/products"
        secondaryLabel="Contact Engineering Team"
        secondaryTo="/contact"
      />
    </div>
  );
}
