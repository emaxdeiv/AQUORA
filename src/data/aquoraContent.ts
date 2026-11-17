export interface NavItem {
  label: string;
  to: string;
}

export interface PondParameter {
  id: 'temperature' | 'water-level' | 'ph' | 'turbidity';
  name: string;
  unitLabel: string;
  summary: string;
  farmImpact: string;
}

export interface TechnologyPillar {
  index: string;
  id: 'hardware' | 'software' | 'ai';
  title: string;
  statusLabel: string;
  summary: string;
  details: string[];
}

export interface ProductSpec {
  id: 'monitoring-hardware' | 'farmer-software' | 'automatic-feeder';
  category: 'Hardware & IoT' | 'Software' | 'MVP Prototype';
  status: string;
  name: string;
  headline: string;
  whatItIs: string;
  problemAddressed: string;
  howItWorks: string;
  farmerRelevance: string;
  developmentNote: string;
  imageSrc: string;
  imageAlt: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  summary: string;
  detail: string;
}

export const AQUORA_BRAND = {
  name: 'Aquora',
  tagline: 'Aquaculture meets Technology',
  websiteDisplay: 'www.aquora.ng',
  websiteUrl: 'https://www.aquora.ng',
  phoneDisplay: '+234 813 213 8765',
  phoneHref: 'tel:+2348132138765',
  email: 'otuyasky11@gmail.com',
  emailHref: 'mailto:otuyasky11@gmail.com',
  mission:
    'Give fish farmers real-time data and simple tools to make better decisions about their ponds.',
  vision: 'A future where every fish farm is connected, efficient, and sustainable.',
};

export const AQUORA_IMAGES = {
  heroPond: '/src/assets/images/hero_aquaculture_pond_1794956437953.jpg',
  iotSensor: '/src/assets/images/iot_pond_sensor_1794956438071.jpg',
  feederPrototype: '/src/assets/images/smart_feeder_prototype_1794956437931.jpg',
  farmerManagement: '/src/assets/images/aquaculture_farmer_management_1794956439748.jpg',
  aerialPonds: '/src/assets/images/fish_pond_water_surface_1794956439278.jpg',
};

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Technology', to: '/technology' },
  { label: 'Products', to: '/products' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Contact', to: '/contact' },
];

export const POND_PARAMETERS: PondParameter[] = [
  {
    id: 'temperature',
    name: 'Water Temperature',
    unitLabel: '°C',
    summary: 'Tracks thermal shifts across day-night cycles and seasonal weather changes.',
    farmImpact:
      'Fish metabolism, appetite, and dissolved oxygen demand shift with water temperature. Knowing when pond temperatures rise or drop helps farmers adjust feeding routines.',
  },
  {
    id: 'water-level',
    name: 'Water Level',
    unitLabel: 'cm / depth',
    summary: 'Monitors pond depth to flag evaporation loss, seepage, or sudden inflow changes.',
    farmImpact:
      'Unexpected drops in water volume concentrate waste and increase thermal stress, while overflow events risk stock loss during heavy rainfall.',
  },
  {
    id: 'ph',
    name: 'pH Balance',
    unitLabel: 'pH scale',
    summary: 'Observes acidity and alkalinity shifts in the pond water column.',
    farmImpact:
      'Stable pH protects gill health and influences how toxic ammonia compounds behave in stocked ponds, giving farmers early warning before stress escalates.',
  },
  {
    id: 'turbidity',
    name: 'Turbidity',
    unitLabel: 'clarity index',
    summary: 'Measures suspended solids and changes in water clarity over time.',
    farmImpact:
      'Rising turbidity can signal excess uneaten feed, runoff, or algae buildup—prompting timely water exchange or feeding adjustments.',
  },
];

export const FARMING_CHALLENGES = [
  {
    index: '01',
    title: 'Limited visibility beneath the water surface',
    description:
      'Most pond checks still rely on periodic visual inspection. Gradual shifts in water temperature, pH, turbidity, or pond level often go unnoticed until fish show signs of stress.',
  },
  {
    index: '02',
    title: 'Uncertainty in daily feeding management',
    description:
      'Feed is one of the largest operational inputs on any fish farm. Without reliable pond condition records and structured schedules, overfeeding wastes feed and degrades water quality while underfeeding slows growth.',
  },
  {
    index: '03',
    title: 'Manual, disconnected record keeping',
    description:
      'Important observations frequently live on paper notebooks or remain unrecorded between shifts, making it difficult for farm owners and managers to compare pond trends across production cycles.',
  },
];

export const TECHNOLOGY_PILLARS: TechnologyPillar[] = [
  {
    index: '01',
    id: 'hardware',
    title: 'Hardware & IoT',
    statusLabel: 'ESP32 Field System',
    summary:
      'Purpose-built ESP32 pond monitoring nodes designed to capture core water parameters directly at the pond edge.',
    details: [
      'Built around ESP32 microcontrollers for reliable embedded sensor acquisition',
      'Monitors water temperature, water level, pH, and turbidity',
      'Engineered for practical installation alongside earthen and concrete ponds',
    ],
  },
  {
    index: '02',
    id: 'software',
    title: 'Software Engineering',
    statusLabel: 'Farmer Platform',
    summary:
      'A clear operational software platform that turns pond telemetry and feeding records into straightforward decisions.',
    details: [
      'Centralized farmer dashboard for reviewing pond status',
      'Threshold-based alerts and notifications when water conditions shift',
      'Structured feeding management logs and schedule planning',
    ],
  },
  {
    index: '03',
    id: 'ai',
    title: 'Artificial Intelligence',
    statusLabel: 'Phased Roadmap',
    summary:
      'Data-driven intelligence designed to connect historical pond conditions with smarter feeding and farm risk guidance.',
    details: [
      'Current focus: structured data capture and rule-based pond alerts',
      'In development: pattern recognition across water parameters and feeding cycles',
      'Long-term direction: decision-support insights tailored to each farm',
    ],
  },
];

export const PRODUCTS_CATALOG: ProductSpec[] = [
  {
    id: 'monitoring-hardware',
    category: 'Hardware & IoT',
    status: 'Active Hardware System',
    name: 'ESP32 Pond Monitoring Node',
    headline: 'Continuous pond-side sensing for four foundational water parameters.',
    whatItIs:
      'An ESP32-based IoT hardware enclosure paired with pond probes to measure temperature, water level, pH, and turbidity.',
    problemAddressed:
      'Replaces sporadic manual spot-checks with consistent pond condition readings across day and night cycles.',
    howItWorks:
      'Submerged and pond-mounted sensors feed electrical readings into the ESP32 controller, which structures and forwards monitoring data to the Aquora software layer.',
    farmerRelevance:
      'Gives farm operators early visibility into changing pond environments before water quality issues disrupt fish appetite or survival.',
    developmentNote:
      'Designed specifically around practical pond-side deployment and core water quality parameters.',
    imageSrc: AQUORA_IMAGES.iotSensor,
    imageAlt: 'Aquora ESP32 weatherproof pond monitoring enclosure mounted beside a fish pond',
  },
  {
    id: 'farmer-software',
    category: 'Software',
    status: 'Platform Layer',
    name: 'Aquora Farmer Dashboard & Platform',
    headline: 'Pond visibility, timely alerts, and feeding management in one place.',
    whatItIs:
      'A web-accessible software interface organizing pond monitoring readings, alert notifications, and daily feeding management workflows.',
    problemAddressed:
      'Eliminates fragmented paper logs and lets farm owners inspect pond conditions without standing beside every pond.',
    howItWorks:
      'Ingests data made available by the IoT hardware, presents current and historical pond parameters, flags parameter changes, and records feeding operations.',
    farmerRelevance:
      'Helps farm managers coordinate teams, track feeding consistency, and act faster when pond thresholds require attention.',
    developmentNote:
      'Interactive views in this corporate site are clearly labeled illustrative mockups showing the dashboard workflow.',
    imageSrc: AQUORA_IMAGES.farmerManagement,
    imageAlt: 'Aquaculture farm manager reviewing pond data on a tablet beside fish ponds',
  },
  {
    id: 'automatic-feeder',
    category: 'MVP Prototype',
    status: 'MVP Prototype — Field Testing on a Real Farm',
    name: 'Automatic Feeding Mechanism',
    headline: 'Controlled mechanical feed dispensing engineered for pond trials.',
    whatItIs:
      'An automated fish-feed dispensing unit designed to release measured portions on schedule and integrate with Aquora farm management.',
    problemAddressed:
      'Reduces inconsistent manual hand-broadcasting, labor strain during repetitive feeding windows, and feed waste.',
    howItWorks:
      'A pond-side hopper and dispensing mechanism controlled by embedded electronics releases feed according to configured farm schedules.',
    farmerRelevance:
      'Aims to help farms keep feeding times predictable while reducing unnecessary manual intervention where automation is supported.',
    developmentNote:
      'Prototype at MVP stage: currently undergoing active field testing on a real farm to validate mechanical durability, portion consistency, and weather resilience prior to commercial release.',
    imageSrc: AQUORA_IMAGES.feederPrototype,
    imageAlt: 'Aquora automatic fish feeder prototype undergoing field testing at an earthen pond',
  },
];

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Sensors collect pond-related information',
    summary: 'Probes at the pond monitor temperature, water level, pH, and turbidity.',
    detail:
      'Positioned directly in the pond environment, the sensing probes capture physical and chemical water conditions throughout daily farm cycles.',
  },
  {
    stepNumber: '02',
    title: 'IoT hardware makes monitoring data available',
    summary: 'The ESP32 hardware unit processes readings and sends them to the software system.',
    detail:
      'The pond-side ESP32 controller reads sensor outputs, packages the measurements reliably, and bridges the physical pond to Aquora’s software layer.',
  },
  {
    stepNumber: '03',
    title: 'Farmers view insights on their dashboard',
    summary: 'Clear pond summaries replace guesswork and scattered notebooks.',
    detail:
      'Farm owners and technicians open the Aquora dashboard to inspect pond parameters, compare recent readings, and check pond status across the farm.',
  },
  {
    stepNumber: '04',
    title: 'Alerts and notifications highlight important changes',
    summary: 'Threshold-based alerts surface shifts that need prompt attention.',
    detail:
      'When temperature, water level, pH, or turbidity moves outside expected ranges, notifications help the farm team respond before fish experience prolonged stress.',
  },
  {
    stepNumber: '05',
    title: 'Feeding management tools support daily operations',
    summary: 'Structured feeding plans align feed routines with pond conditions.',
    detail:
      'Operators track feeding schedules and portion records alongside pond status so feeding decisions stay consistent and accountable.',
  },
  {
    stepNumber: '06',
    title: 'Automation reduces manual intervention where supported',
    summary: 'Connected hardware like our MVP feeder prototype assists repetitive tasks.',
    detail:
      'As our automatic feeding prototype progresses through real-farm field trials, supported farms can pair monitoring workflows with automated feed dispensing.',
  },
];

export const AI_CAPABILITY_COMPARISON = [
  {
    area: 'Water Parameter Sensing & Logging',
    current: 'Implemented in ESP32 IoT hardware architecture for temperature, water level, pH, and turbidity.',
    planned: 'Expanded multi-pond calibration profiles and long-term baseline modeling across seasons.',
  },
  {
    area: 'Alerts & Pond Notifications',
    current: 'Threshold-driven monitoring alerts communicating notable changes in pond conditions.',
    planned: 'Context-aware anomaly detection that correlates multi-parameter shifts before thresholds breach.',
  },
  {
    area: 'Feeding Management & Automation',
    current: 'Structured feeding management tools paired with an MVP automatic feeding prototype in real-farm testing.',
    planned: 'Data-informed feeding guidance that adapts ration timing to historical temperature and water clarity patterns.',
  },
];

export const CONTACT_FAQS = [
  {
    question: 'Who is Aquora built for?',
    answer:
      'Aquora serves commercial fish farmers, aquaculture operators, agricultural businesses, technology partners, and investors seeking practical visibility and automation in fish farming.',
  },
  {
    question: 'Is the Automatic Feeding Mechanism commercially available today?',
    answer:
      'The automatic feeding mechanism is currently a prototype at the MVP stage and is actively being tested on a real farm. Farms interested in following trial progress or participating in future evaluations can reach out through the enquiry form.',
  },
  {
    question: 'What water parameters does the ESP32 monitoring hardware track?',
    answer:
      'The ESP32-based pond monitoring system is designed to monitor water temperature, water level, pH, and turbidity.',
  },
  {
    question: 'How can we discuss a pilot or partnership with Aquora?',
    answer:
      'Use the enquiry form on this page or contact us directly via email at otuyasky11@gmail.com or phone at +234 813 213 8765.',
  },
];
