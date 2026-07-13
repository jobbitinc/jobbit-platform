import type { MatchResultSet, QuizAnswers } from "@/lib/career/types";
import { getJobsForTrade } from "@/lib/job-dummy-data";
import { quizQuestions } from "@/lib/quiz-data";

const defaultSkillGaps = ["OSHA safety awareness", "Trade math & measurements", "Application & interview readiness"];

const skillGapsByTrade: Partial<Record<string, string[]>> = {
  Electrician: ["Electrical theory basics", "State trainee / apprentice rules", "Conduit & hand-tool fundamentals"],
  Plumber: ["Blueprint reading intro", "Pipe sizing & codes overview", "Physical fitness for service calls"],
  "HVAC Technician": ["EPA 608 prep (core)", "Refrigeration cycle basics", "Customer-site safety"],
  Welder: ["Welding processes overview", "Metal properties & symbols", "Fit-up & tolerance habits"],
  Carpenter: ["Construction math & layout", "Tool list & PPE", "Reading framing plans"],
  "Construction Manager": ["Scheduling & subcontractor flow", "Jobsite safety (OSHA 30 path)", "Budget & change-order basics"],
  "Heavy Equipment Operator": ["Equipment walkarounds", "Grade reading / stakes", "CDL study if required"],
  Pipefitter: ["Isometric drawing intro", "Steam / hydronics concepts", "Rigging awareness"],
  Ironworker: ["Connectors & rebar patterns", "Fall protection", "Load charts intro"],
  "Sheet Metal Worker": ["Duct fabrication basics", "SMACNA orientation", "Layout & trigonometry refresh"],
  "Elevator Mechanic": ["Mechanical aptitude", "Electronics intro", "NEIEP test prep"],
  Boilermaker: ["Confined space & welding certs path", "Blueprint reading", "Travel / per-diem readiness"],
  "Solar Installer": ["Roof safety & harness", "DC/AC basics", "NABCEP study path"],
  "Wind Turbine Technician": ["Climb rescue training", "Hydraulics intro", "High-voltage awareness"],
  "Industrial Maintenance Mechanic": ["Mechanical drives & alignment", "PLC awareness", "Lockout/tagout"],
  "Brick/Stonemason": ["Mortar mixes & lifts", "Layout strings & levels", "Weather & curing"],
  Cosmetologist: ["State board requirements", "Sanitation & chemistry", "Client consultation"],
};

function skillGapsFor(tradeName: string): string[] {
  return skillGapsByTrade[tradeName] ?? defaultSkillGaps;
}

const categoryMap: Record<string, { primary: string; secondary: string; tertiary: string }> = {
  "electrical-technical": {
    primary: "Electrician",
    secondary: "HVAC Technician",
    tertiary: "Elevator Mechanic",
  },
  "mechanical-structural": {
    primary: "Pipefitter",
    secondary: "Welder",
    tertiary: "Heavy Equipment Operator",
  },
  "environment-outdoors": {
    primary: "Solar Installer",
    secondary: "Wind Turbine Technician",
    tertiary: "Ironworker",
  },
  "creative-craft": {
    primary: "Cosmetologist",
    secondary: "Carpenter",
    tertiary: "Sheet Metal Worker",
  },
};

const workStyleMap: Record<string, { primary: string; secondary: string; tertiary: string }> = {
  "build-fix-hands": { primary: "Carpenter", secondary: "Welder", tertiary: "Brick/Stonemason" },
  "team-job-site": { primary: "Construction Manager", secondary: "Ironworker", tertiary: "Carpenter" },
  "solve-problems": { primary: "Electrician", secondary: "Industrial Maintenance Mechanic", tertiary: "HVAC Technician" },
  "outdoors-mobile": { primary: "Solar Installer", secondary: "Wind Turbine Technician", tertiary: "Heavy Equipment Operator" },
};

/** Fast-entry trades for users who need income immediately (<90 day certs). */
const fastEntryTrades = new Set(["Solar Installer", "Cosmetologist", "HVAC Technician", "Welder"]);

const tradeDetails: Record<string, { emoji: string; salary: string; score: number }> = {
  Electrician: { emoji: "⚡", salary: "$75K – $120K", score: 89 },
  Plumber: { emoji: "🔧", salary: "$65K – $105K", score: 82 },
  "HVAC Technician": { emoji: "❄️", salary: "$60K – $95K", score: 78 },
  Welder: { emoji: "🔥", salary: "$55K – $90K", score: 74 },
  Carpenter: { emoji: "🪚", salary: "$55K – $90K", score: 80 },
  "Construction Manager": { emoji: "👷", salary: "$80K – $130K", score: 85 },
  "Heavy Equipment Operator": { emoji: "🚜", salary: "$60K – $95K", score: 76 },
  Pipefitter: { emoji: "🔩", salary: "$70K – $110K", score: 79 },
  Ironworker: { emoji: "🏗️", salary: "$70K – $115K", score: 81 },
  "Sheet Metal Worker": { emoji: "🔨", salary: "$65K – $100K", score: 77 },
  "Elevator Mechanic": { emoji: "🛗", salary: "$85K – $130K", score: 83 },
  Boilermaker: { emoji: "⚙️", salary: "$75K – $120K", score: 78 },
  "Solar Installer": { emoji: "☀️", salary: "$50K – $80K", score: 75 },
  "Wind Turbine Technician": { emoji: "💨", salary: "$55K – $85K", score: 73 },
  "Industrial Maintenance Mechanic": { emoji: "🛠️", salary: "$65K – $100K", score: 80 },
  "Brick/Stonemason": { emoji: "🧱", salary: "$55K – $90K", score: 72 },
  Cosmetologist: { emoji: "✂️", salary: "$35K – $75K", score: 70 },
};

function optionLabel(questionId: string, value: string): string {
  const question = quizQuestions.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === value);
  return option?.label ?? value;
}

function pickTrades(answers: QuizAnswers): [string, string, string] {
  const category = answers.workCategory ?? "electrical-technical";
  const base = categoryMap[category] ?? categoryMap["electrical-technical"];
  let list: [string, string, string] = [base.primary, base.secondary, base.tertiary];

  if (answers.urgency === "right-now") {
    list = list.map((t) => (fastEntryTrades.has(t) ? t : "HVAC Technician")) as [string, string, string];
    if (!fastEntryTrades.has(list[0])) list[0] = "Solar Installer";
  }

  if (answers.urgency === "planning-ahead") {
    const style = workStyleMap[answers.workStyle ?? ""];
    if (style) list = [style.primary, style.secondary, style.tertiary];
    if (!list.includes("Elevator Mechanic") && category === "electrical-technical") {
      list[2] = "Elevator Mechanic";
    }
  }

  return list;
}

function actionPlanFor(tradeName: string, urgency: string) {
  const fastPath = urgency === "right-now" || urgency === "within-6-months";
  const step1 = fastPath
    ? {
        title: "Complete OSHA-10 and any NJ short cert",
        detail:
          "Prioritize certifications you can finish in under 90 days (OSHA-10, employer safety orientations, or New Jersey pre-apprenticeship cards) before committing to a multi-year NJ apprenticeship.",
      }
    : {
        title: `Research ${tradeName} apprenticeships in New Jersey`,
        detail: `Search apprenticeship.gov (filter New Jersey) and NJDOL registered programs, then contact the relevant NJ union hall or trade school for ${tradeName}.`,
      };

  return [
    {
      step: 1,
      title: step1.title,
      detail: step1.detail,
      timeEstimate: fastPath ? "1–2 weeks" : "1–2 days",
      cost: fastPath ? "$25–$150" : "$0",
      priority: "First",
    },
    {
      step: 2,
      title: fastPath
        ? `Find ${tradeName} helper or pre-apprenticeship roles in NJ`
        : "Complete OSHA-10 General Industry certification",
      detail: fastPath
        ? "Search NJ contractors, county One-Stop Career Centers, and New Jersey pre-apprenticeship programs for paid or stipend roles while you build hours."
        : "OSHA-10 is required or strongly preferred for most NJ apprenticeship applications. Online courses available through OSHA.gov.",
      timeEstimate: fastPath ? "2–4 weeks" : "1–2 days",
      cost: fastPath ? "$0" : "$25–$75",
      priority: "First",
    },
    {
      step: 3,
      title: "Gather application documents",
      detail:
        "You'll need: high school diploma or GED, valid ID, drug test results, and often a physical exam. Start collecting these for New Jersey program applications.",
      timeEstimate: "1 week",
      cost: "$50–$150",
      priority: "Next",
    },
    {
      step: 4,
      title: "Contact a New Jersey union hall or trade school",
      detail: `Find the NJ local or training center for ${tradeName} and attend an information session. Relationships matter for New Jersey pathways.`,
      timeEstimate: "1–2 weeks",
      cost: "$0",
      priority: "Next",
    },
    {
      step: 5,
      title: "Submit your NJ apprenticeship or training application",
      detail:
        "Most New Jersey programs have application windows. Submit when the window opens — competition is real but manageable with preparation.",
      timeEstimate: "1 day",
      cost: "$0–$25",
      priority: "Then",
    },
    {
      step: 6,
      title: "Prepare for the aptitude test",
      detail:
        "Most NJ apprenticeship programs require a basic math and reading aptitude test. Practice algebra, fractions, and basic reading comprehension.",
      timeEstimate: "2–4 weeks",
      cost: "$0",
      priority: "Then",
    },
  ];
}

export function generateFallbackResults(answers: QuizAnswers): MatchResultSet {
  const tradesList = pickTrades(answers);
  const workLabel = optionLabel("workStyle", answers.workStyle ?? "");
  const urgency = answers.urgency ?? "within-6-months";

  return {
    matches: tradesList.map((tradeName, i) => {
      const details = tradeDetails[tradeName];
      const envLabel = optionLabel("environment", answers.environment ?? "");
      return {
        rank: i + 1,
        trade: tradeName,
        emoji: details.emoji,
        matchScore: details.score - i * 6,
        salaryRange: details.salary,
        whyMatch: `Your ${workLabel.toLowerCase()} day preference and ${answers.workCategory ?? "trade"} focus point strongly toward ${tradeName} pathways in New Jersey. Your preference for ${envLabel.toLowerCase()} aligns with how ${tradeName}s typically work across NJ job sites, trade schools, and apprenticeships.`,
        skillGaps: skillGapsFor(tradeName),
        sampleJobs: getJobsForTrade(tradeName),
        actionPlan: actionPlanFor(tradeName, urgency),
      };
    }),
  };
}
