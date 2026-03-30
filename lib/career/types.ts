export type QuizAnswers = Record<string, string>;

/** Demo job / program row for UI (not live data). */
export type JobOpportunity = {
  id: string;
  title: string;
  employer: string;
  type: "Apprenticeship" | "Union" | "Contractor" | "Pre-apprenticeship";
  location: string;
  payLabel: string;
  opens: string;
  matchHint: string;
};

export type ActionPlanStep = {
  step: number;
  title: string;
  detail: string;
  timeEstimate: string;
  cost: string;
  priority: string;
};

export type TradeMatch = {
  rank: number;
  trade: string;
  emoji: string;
  matchScore: number;
  salaryRange: string;
  whyMatch: string;
  skillGaps: string[];
  actionPlan: ActionPlanStep[];
  /** Sample openings / programs aligned to this trade (dummy data). */
  sampleJobs?: JobOpportunity[];
};

export type MatchResultSet = {
  matches: TradeMatch[];
};

export type StoredUser = {
  email: string;
  name: string;
  password: string;
};
