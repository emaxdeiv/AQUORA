import { useState } from 'react';
import { Bell, Droplets, Gauge, Thermometer, Utensils } from 'lucide-react';

interface PondScenario {
  id: 'pond-a' | 'pond-b';
  name: string;
  pondType: string;
  readings: {
    temperature: string;
    waterLevel: string;
    ph: string;
    turbidity: string;
  };
  alertStatus: {
    severity: 'Within Range' | 'Attention Needed';
    summary: string;
  };
  feedingSchedule: {
    nextWindow: string;
    mode: string;
    note: string;
  };
}

const ILLUSTRATIVE_SCENARIOS: PondScenario[] = [
  {
    id: 'pond-a',
    name: 'Pond A · Grow-Out',
    pondType: 'Earthen Pond · Example Scenario',
    readings: {
      temperature: '27.4 °C',
      waterLevel: '118 cm',
      ph: '7.2 pH',
      turbidity: 'Moderate clarity',
    },
    alertStatus: {
      severity: 'Within Range',
      summary: 'All four monitored parameters are within configured farm thresholds.',
    },
    feedingSchedule: {
      nextWindow: '17:30 WAT',
      mode: 'Managed feeding schedule',
      note: 'Morning ration logged; afternoon ration ready for confirmation.',
    },
  },
  {
    id: 'pond-b',
    name: 'Pond B · Nursery',
    pondType: 'Concrete Tank · Example Scenario',
    readings: {
      temperature: '29.8 °C',
      waterLevel: '92 cm',
      ph: '6.6 pH',
      turbidity: 'Elevated turbidity',
    },
    alertStatus: {
      severity: 'Attention Needed',
      summary: 'Turbidity and water level shifted after afternoon runoff—inspection recommended.',
    },
    feedingSchedule: {
      nextWindow: 'Paused pending check',
      mode: 'Manual operator review',
      note: 'Hold evening feed until water clarity stabilizes.',
    },
  },
];

export function DashboardIllustrativePreview() {
  const [selectedPondId, setSelectedPondId] = useState<'pond-a' | 'pond-b'>('pond-a');
  const active =
    ILLUSTRATIVE_SCENARIOS.find((p) => p.id === selectedPondId) ?? ILLUSTRATIVE_SCENARIOS[0];

  const isAlert = active.alertStatus.severity === 'Attention Needed';

  return (
    <div className="bg-[#FAF7EE] border border-[#184435]/15 rounded-lg overflow-hidden">
      {/* Top Mockup Header */}
      <div className="bg-[#184435] text-[#FAF7EE] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#38b6ff]">
            Illustrative Interface Preview — Conceptual Farmer View
          </p>
          <h3 className="font-display text-lg font-semibold mt-0.5 text-[#FAF7EE]">
            Aquora Pond Visibility & Feeding Workspace
          </h3>
        </div>

        {/* Interactive Scenario Switcher */}
        <div
          role="tablist"
          aria-label="Illustrative pond scenario selector"
          className="inline-flex items-center p-1 rounded-md bg-[#FAF7EE]/10 gap-1 self-start sm:self-auto"
        >
          {ILLUSTRATIVE_SCENARIOS.map((scenario) => {
            const selected = scenario.id === active.id;
            return (
              <button
                key={scenario.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSelectedPondId(scenario.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selected
                    ? 'bg-[#FAF7EE] text-[#184435]'
                    : 'text-[#FAF7EE]/80 hover:text-[#FAF7EE]'
                }`}
              >
                {scenario.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Illustrative Content */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#184435]/10">
          <div className="text-sm text-[#184435]/75">
            <span className="font-semibold text-[#184435]">{active.name}</span>
            {' '}
            <span aria-hidden="true" className="mx-1.5">
              ·
            </span>
            {' '}
            <span>{active.pondType}</span>
          </div>
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded border ${
              isAlert
                ? 'bg-[#ff6f61]/15 border-[#ff6f61] text-[#184435]'
                : 'bg-[#184435]/8 border-[#184435]/20 text-[#184435]'
            }`}
          >
            <Bell className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Status: {active.alertStatus.severity}</span>
          </div>
        </div>

        {/* 4 Sensor Readings Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-md bg-[#F1ECE0] border border-[#184435]/10">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1b7895] mb-2">
              <Thermometer className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Temperature</span>
            </div>
            <p className="font-display text-xl font-semibold text-[#184435] tabular-nums">
              {active.readings.temperature}
            </p>
          </div>

          <div className="p-4 rounded-md bg-[#F1ECE0] border border-[#184435]/10">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1b7895] mb-2">
              <Gauge className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Water Level</span>
            </div>
            <p className="font-display text-xl font-semibold text-[#184435] tabular-nums">
              {active.readings.waterLevel}
            </p>
          </div>

          <div className="p-4 rounded-md bg-[#F1ECE0] border border-[#184435]/10">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1b7895] mb-2">
              <Droplets className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>pH Level</span>
            </div>
            <p className="font-display text-xl font-semibold text-[#184435] tabular-nums">
              {active.readings.ph}
            </p>
          </div>

          <div className="p-4 rounded-md bg-[#F1ECE0] border border-[#184435]/10">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1b7895] mb-2">
              <Droplets className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Turbidity</span>
            </div>
            <p className="font-display text-lg font-semibold text-[#184435]">
              {active.readings.turbidity}
            </p>
          </div>
        </div>

        {/* Alerts & Feeding Management Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border border-[#184435]/12 bg-white/70">
            <p className="font-display text-sm font-semibold text-[#184435] mb-1">
              Alerts & Notifications
            </p>
            <p className="text-sm text-[#184435]/80 leading-relaxed">
              {active.alertStatus.summary}
            </p>
          </div>

          <div className="p-4 rounded-md border border-[#184435]/12 bg-white/70">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-display text-sm font-semibold text-[#184435] inline-flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#1b7895]" aria-hidden="true" />
                <span>Feeding Management</span>
              </p>
              <span className="text-xs font-medium text-[#1b7895] tabular-nums">
                {active.feedingSchedule.nextWindow}
              </span>
            </div>
            <p className="text-sm text-[#184435]/80 leading-relaxed">
              {active.feedingSchedule.note}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#184435]/65 pt-2 border-t border-[#184435]/10">
          Note: Values shown above are illustrative example scenarios demonstrating how Aquora organizes ESP32 sensor readings, alerts, and feeding workflows—not live production pond telemetry.
        </p>
      </div>
    </div>
  );
}
