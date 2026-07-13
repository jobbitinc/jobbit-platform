import type { JobOpportunity, TradeMatch } from "@/lib/career/types";

/** Demo openings focused on New Jersey — not live listings; for UI / flow only. */
const byTrade: Record<string, JobOpportunity[]> = {
  Electrician: [
    {
      id: "el-1",
      title: "Inside Wireman Apprentice — Class of 2026",
      employer: "IBEW Local 164",
      type: "Union",
      location: "Paramus, NJ",
      payLabel: "$24–$38/hr (progressive scale)",
      opens: "Applications open Mar–Apr",
      matchHint: "Strong NJ union pathway for commercial & indoor work",
    },
    {
      id: "el-2",
      title: "Residential Electrician Trainee",
      employer: "Garden State Electrical Contractors",
      type: "Contractor",
      location: "Newark, NJ",
      payLabel: "$19–$26/hr to start",
      opens: "Rolling interviews",
      matchHint: "Good if you want smaller crews across North Jersey",
    },
    {
      id: "el-3",
      title: "Pre-Apprenticeship — Construction Electrician",
      employer: "NJ Building Trades / Construction Career Days",
      type: "Pre-apprenticeship",
      location: "Edison, NJ",
      payLabel: "Stipend + PPE provided",
      opens: "Next cohort: Summer",
      matchHint: "Builds hours toward a registered NJ apprenticeship",
    },
  ],
  Plumber: [
    {
      id: "pl-1",
      title: "Plumber Apprentice (UA)",
      employer: "UA Local 9",
      type: "Union",
      location: "Englewood, NJ",
      payLabel: "$22–$35/hr scale",
      opens: "Annual intake — check local",
      matchHint: "Commercial & service rotation across NJ",
    },
    {
      id: "pl-2",
      title: "Service Plumber Helper",
      employer: "Jersey Pipe Home Services",
      type: "Contractor",
      location: "Toms River, NJ",
      payLabel: "$18–$24/hr + van",
      opens: "Hiring now",
      matchHint: "Fast start for customer-facing work in South/Central Jersey",
    },
  ],
  "HVAC Technician": [
    {
      id: "hv-1",
      title: "HVAC Apprentice — Sheet Metal / Service",
      employer: "SMART Local 25",
      type: "Union",
      location: "Newark, NJ",
      payLabel: "$21–$32/hr",
      opens: "Spring application window",
      matchHint: "Mix of install & service across NJ metro",
    },
    {
      id: "hv-2",
      title: "Install Tech Trainee (Commercial)",
      employer: "Garden State Mechanical",
      type: "Contractor",
      location: "Somerset, NJ",
      payLabel: "$20–$28/hr",
      opens: "Open until filled",
      matchHint: "Great for tool-forward, team installs",
    },
  ],
  Welder: [
    {
      id: "wd-1",
      title: "Welding Apprentice — Pipe & Structural",
      employer: "UA / Boilermakers NJ joint program",
      type: "Apprenticeship",
      location: "Linden, NJ",
      payLabel: "$22–$34/hr",
      opens: "Q2 cohort",
      matchHint: "Industrial fabrication along the NJ Turnpike corridor",
    },
    {
      id: "wd-2",
      title: "MIG/TIG Trainee — Manufacturing",
      employer: "Hudson Fabrication Co.",
      type: "Contractor",
      location: "Jersey City, NJ",
      payLabel: "$19–$25/hr",
      opens: "Walk-in Wednesdays",
      matchHint: "Indoor shop + occasional field work in Hudson County",
    },
  ],
  Carpenter: [
    {
      id: "ca-1",
      title: "Carpenter Apprentice — Commercial",
      employer: "Carpenters Local 715",
      type: "Union",
      location: "Edison, NJ",
      payLabel: "$20–$30/hr",
      opens: "Bi-annual",
      matchHint: "Concrete forms & interior systems — Central Jersey",
    },
    {
      id: "ca-2",
      title: "Rough Carpenter Helper",
      employer: "Shoreline Builders NJ",
      type: "Contractor",
      location: "Brick, NJ",
      payLabel: "$18–$23/hr",
      opens: "Immediate",
      matchHint: "Residential & multifamily along the Jersey Shore",
    },
  ],
  "Construction Manager": [
    {
      id: "cm-1",
      title: "Field Engineer → PM Track (Commercial)",
      employer: "Garden State GC Partners",
      type: "Contractor",
      location: "Morristown, NJ",
      payLabel: "$65K–$78K yr (entry)",
      opens: "Rolling",
      matchHint: "Office + site across North Jersey projects",
    },
    {
      id: "cm-2",
      title: "Assistant Superintendent",
      employer: "LibertyBuild Inc.",
      type: "Contractor",
      location: "Jersey City, NJ",
      payLabel: "$70K–$85K yr",
      opens: "2 roles open",
      matchHint: "Coordination-heavy waterfront & high-rise work",
    },
  ],
  "Heavy Equipment Operator": [
    {
      id: "he-1",
      title: "Operator Apprentice — IUOE",
      employer: "IUOE Local 825",
      type: "Union",
      location: "Springfield, NJ",
      payLabel: "$24–$36/hr",
      opens: "Fall class",
      matchHint: "Earthmoving & civil sites statewide",
    },
    {
      id: "he-2",
      title: "Equipment Trainee (CDL path)",
      employer: "Garden State Hauling Co.",
      type: "Contractor",
      location: "Trenton, NJ",
      payLabel: "$22–$28/hr",
      opens: "Now",
      matchHint: "Dump & loader focus first 6 months",
    },
  ],
  Pipefitter: [
    {
      id: "pf-1",
      title: "Pipefitter Apprentice — UA",
      employer: "UA Local 274",
      type: "Union",
      location: "Newark, NJ",
      payLabel: "$26–$40/hr",
      opens: "Lottery system — watch dates",
      matchHint: "Industrial & steam systems in NJ",
    },
    {
      id: "pf-2",
      title: "Pipefitter Helper — Pharma / industrial build",
      employer: "Vertex Industrial NJ",
      type: "Contractor",
      location: "New Brunswick, NJ",
      payLabel: "$24–$32/hr",
      opens: "Project-based",
      matchHint: "Tight specs — Central Jersey pharma corridor",
    },
  ],
  Ironworker: [
    {
      id: "ir-1",
      title: "Ironworker Apprentice — Reinforcing",
      employer: "Ironworkers Local 11",
      type: "Union",
      location: "Elmwood Park, NJ",
      payLabel: "$23–$36/hr",
      opens: "Spring",
      matchHint: "Heights & structural steel across North Jersey",
    },
    {
      id: "ir-2",
      title: "Rodbuster / Ironworker Trainee",
      employer: "SteelRise Erectors NJ",
      type: "Contractor",
      location: "Camden, NJ",
      payLabel: "$20–$27/hr",
      opens: "Open",
      matchHint: "Outdoor, high-energy crews in South Jersey",
    },
  ],
  "Sheet Metal Worker": [
    {
      id: "sm-1",
      title: "Sheet Metal Apprentice",
      employer: "SMART Local 25",
      type: "Union",
      location: "Newark, NJ",
      payLabel: "$21–$33/hr",
      opens: "Annual",
      matchHint: "Duct fabrication & install — New Jersey",
    },
  ],
  "Elevator Mechanic": [
    {
      id: "em-1",
      title: "NEIEP Elevator Constructor Apprentice",
      employer: "IUEC Local 1 (NJ jurisdiction)",
      type: "Union",
      location: "Jersey City, NJ",
      payLabel: "Top-scale program",
      opens: "Once/year — aptitude test",
      matchHint: "Math-heavy; long apprenticeship serving NJ buildings",
    },
    {
      id: "em-2",
      title: "Elevator Helper — Modernization crew",
      employer: "Vertical Systems Co. NJ",
      type: "Contractor",
      location: "Hoboken, NJ",
      payLabel: "$28–$38/hr",
      opens: "Referral",
      matchHint: "Hudson County high-rise environment",
    },
  ],
  Boilermaker: [
    {
      id: "bo-1",
      title: "Boilermaker Apprentice",
      employer: "Boilermakers Local 28",
      type: "Union",
      location: "Elizabeth, NJ",
      payLabel: "$25–$38/hr + per diem",
      opens: "Travel projects",
      matchHint: "Shutdown & industrial boilers — NJ ports & plants",
    },
  ],
  "Solar Installer": [
    {
      id: "so-1",
      title: "Solar Installer / Electrician trainee",
      employer: "SunPath Renewables NJ",
      type: "Contractor",
      location: "Princeton, NJ",
      payLabel: "$20–$28/hr",
      opens: "High volume season",
      matchHint: "Roof work + electrical tie-in — Central Jersey",
    },
    {
      id: "so-2",
      title: "PV Apprenticeship (NABCEP path)",
      employer: "New Jersey Clean Energy / training partners",
      type: "Apprenticeship",
      location: "Trenton, NJ",
      payLabel: "Earn while you learn",
      opens: "Quarterly",
      matchHint: "Good with tech + outdoor work — NJ solar growth",
    },
  ],
  "Wind Turbine Technician": [
    {
      id: "wt-1",
      title: "Wind Tech Trainee — O&M / offshore path",
      employer: "Atlantic Wind Services NJ",
      type: "Contractor",
      location: "Atlantic City, NJ",
      payLabel: "$24–$32/hr",
      opens: "Climb test required",
      matchHint: "Heights + coastal NJ wind / offshore pipeline",
    },
  ],
  "Industrial Maintenance Mechanic": [
    {
      id: "im-1",
      title: "Maintenance Mechanic Apprentice",
      employer: "NJ Industrial Trades Alliance",
      type: "Union",
      location: "Linden, NJ",
      payLabel: "$25–$37/hr",
      opens: "Plant seniority rules",
      matchHint: "Rotating equipment & troubleshooting — industrial NJ",
    },
    {
      id: "im-2",
      title: "Multi-Craft Technician Trainee",
      employer: "Garden State Packaging Group",
      type: "Contractor",
      location: "Secaucus, NJ",
      payLabel: "$22–$30/hr",
      opens: "2nd shift",
      matchHint: "PLC basics + mechanical — North Jersey warehouses",
    },
  ],
  "Brick/Stonemason": [
    {
      id: "br-1",
      title: "Bricklayer Apprentice — BAC",
      employer: "BAC Local 4 (NJ)",
      type: "Union",
      location: "Trenton, NJ",
      payLabel: "$21–$31/hr",
      opens: "Spring",
      matchHint: "Outdoor, precision layout — New Jersey masonry",
    },
  ],
  Cosmetologist: [
    {
      id: "co-1",
      title: "Licensed Cosmetology Apprentice (salon)",
      employer: "Studio North Collective NJ",
      type: "Contractor",
      location: "Hoboken, NJ",
      payLabel: "$16–$22/hr + tips",
      opens: "Rolling",
      matchHint: "Client-facing; NJ Board of Cosmetology path",
    },
  ],
};

const genericJobs: JobOpportunity[] = [
  {
    id: "gen-1",
    title: "Registered Apprenticeship Finder — New Jersey",
    employer: "apprenticeship.gov / NJDOL",
    type: "Apprenticeship",
    location: "Statewide, NJ",
    payLabel: "Varies by program",
    opens: "Always",
    matchHint: "Start here to verify registered programs in New Jersey",
  },
  {
    id: "gen-2",
    title: "Trade school & workforce info session",
    employer: "New Jersey Community Colleges / One-Stop Career Centers",
    type: "Pre-apprenticeship",
    location: "Nearest NJ county",
    payLabel: "Free to attend",
    opens: "Monthly",
    matchHint: "Ask about county workforce grants and training vouchers",
  },
];

export function getJobsForTrade(tradeName: string): JobOpportunity[] {
  const specific = byTrade[tradeName];
  if (specific?.length) return specific.slice(0, 3);
  return genericJobs;
}

export function enrichMatchesWithJobs(result: TradeMatch[]): TradeMatch[];
export function enrichMatchesWithJobs(result: { matches: TradeMatch[] }): { matches: TradeMatch[] };
export function enrichMatchesWithJobs(
  result: TradeMatch[] | { matches: TradeMatch[] },
): TradeMatch[] | { matches: TradeMatch[] } {
  if (Array.isArray(result)) {
    return result.map((m) => ({
      ...m,
      sampleJobs: getJobsForTrade(m.trade),
    }));
  }
  return {
    matches: result.matches.map((m) => ({
      ...m,
      sampleJobs: getJobsForTrade(m.trade),
    })),
  };
}

/** A few mixed trades for the marketing / landing strip. */
export const landingSampleJobs = [
  byTrade.Electrician[0],
  byTrade.Plumber[0],
  byTrade["HVAC Technician"][0],
];
