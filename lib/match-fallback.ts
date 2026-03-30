import type { MatchResultSet, QuizAnswers } from "@/lib/career/types";
import { getJobsForTrade } from "@/lib/job-dummy-data";

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

const tradeMap: Record<
  string,
  { primary: string; secondary: string; tertiary: string }
> = {
  build: { primary: "Carpenter", secondary: "Ironworker", tertiary: "Brick/Stonemason" },
  fix: { primary: "Electrician", secondary: "HVAC Technician", tertiary: "Industrial Maintenance Mechanic" },
  install: { primary: "Electrician", secondary: "Solar Installer", tertiary: "HVAC Technician" },
  manage: { primary: "Construction Manager", secondary: "Elevator Mechanic", tertiary: "Heavy Equipment Operator" },
};

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

export function generateFallbackResults(answers: QuizAnswers): MatchResultSet {
  const style = answers.workStyle || "fix";
  const trades = tradeMap[style] || tradeMap.fix;
  const tradesList = [trades.primary, trades.secondary, trades.tertiary];

  return {
    matches: tradesList.map((tradeName, i) => {
      const details = tradeDetails[tradeName];
      const env = answers.environment ?? "both";
      const envLabel =
        env === "both" ? "flexible work environment" : `${String(env)} environment`;
      return {
        rank: i + 1,
        trade: tradeName,
        emoji: details.emoji,
        matchScore: details.score - i * 6,
        salaryRange: details.salary,
        whyMatch: `Based on your preference for ${
          answers.workStyle === "fix"
            ? "fixing and solving problems"
            : answers.workStyle === "build"
              ? "building and creating"
              : answers.workStyle === "install"
                ? "installing and connecting systems"
                : "planning and leading"
        }, ${tradeName} is a strong fit. Your stated income goal aligns well with typical ${tradeName} career trajectories, and the ${envLabel} matches how ${tradeName}s typically work.`,
        skillGaps: skillGapsFor(tradeName),
        sampleJobs: getJobsForTrade(tradeName),
        actionPlan: [
          {
            step: 1,
            title: `Research ${tradeName} apprenticeship programs near you`,
            detail: `Visit apprenticeship.gov and your local union hall to find registered ${tradeName} apprenticeships in your area.`,
            timeEstimate: "1–2 days",
            cost: "$0",
            priority: "First",
          },
          {
            step: 2,
            title: "Complete OSHA-10 General Industry certification",
            detail:
              "OSHA-10 is required or strongly preferred for most apprenticeship applications. Online courses available through OSHA.gov.",
            timeEstimate: "1–2 days",
            cost: "$25–$75",
            priority: "First",
          },
          {
            step: 3,
            title: "Gather application documents",
            detail:
              "You'll need: high school diploma or GED, valid ID, drug test results, and often a physical exam. Start collecting these now.",
            timeEstimate: "1 week",
            cost: "$50–$150",
            priority: "Next",
          },
          {
            step: 4,
            title: "Contact your local union hall",
            detail: `Find your local ${
              tradeName.includes("Electrician") ? "IBEW" : tradeName.includes("Plumber") ? "UA" : "trade union"
            } chapter and attend an information session. Relationships matter here.`,
            timeEstimate: "1–2 weeks",
            cost: "$0",
            priority: "Next",
          },
          {
            step: 5,
            title: "Submit your apprenticeship application",
            detail:
              "Most programs have application windows. Submit when the window opens — competition is real but manageable with preparation.",
            timeEstimate: "1 day",
            cost: "$0–$25",
            priority: "Then",
          },
          {
            step: 6,
            title: "Prepare for the aptitude test",
            detail:
              "Most apprenticeship programs require a basic math and reading aptitude test. Practice algebra, fractions, and basic reading comprehension.",
            timeEstimate: "2–4 weeks",
            cost: "$0",
            priority: "Then",
          },
        ],
      };
    }),
  };
}
