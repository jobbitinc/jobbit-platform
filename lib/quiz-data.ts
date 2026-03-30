export type QuizOption = {
  value: string;
  icon: string;
  label: string;
  desc: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  sub: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "workStyle",
    question: "How do you like to spend your workday?",
    sub: "Pick the option that sounds most like you.",
    options: [
      { value: "build", icon: "🏗️", label: "Building & creating", desc: "Making things with your hands" },
      { value: "fix", icon: "🔧", label: "Fixing & solving", desc: "Diagnosing and repairing problems" },
      { value: "install", icon: "⚡", label: "Installing & connecting", desc: "Setting up systems that work" },
      { value: "manage", icon: "📋", label: "Planning & leading", desc: "Coordinating teams and projects" },
    ],
  },
  {
    id: "environment",
    question: "Where do you want to work?",
    sub: "Think about where you'd feel most comfortable day-to-day.",
    options: [
      { value: "outdoor", icon: "☀️", label: "Outdoors", desc: "Construction sites, open air" },
      { value: "indoor", icon: "🏢", label: "Indoors", desc: "Homes, buildings, confined spaces" },
      { value: "both", icon: "🔄", label: "Both — I'm flexible", desc: "Mix of indoor and outdoor" },
      { value: "travel", icon: "🚗", label: "On the move", desc: "Different locations every day" },
    ],
  },
  {
    id: "strength",
    question: "What's your biggest strength?",
    sub: "Be honest — there's no wrong answer here.",
    options: [
      { value: "math", icon: "📐", label: "Math & precision", desc: "Measurements, calculations, detail" },
      { value: "physical", icon: "💪", label: "Physical strength", desc: "I'm not afraid of hard work" },
      { value: "problem", icon: "🧩", label: "Problem-solving", desc: "I figure things out under pressure" },
      { value: "people", icon: "🤝", label: "Working with people", desc: "Communication and teamwork" },
    ],
  },
  {
    id: "income",
    question: "What's your income goal in 5 years?",
    sub: "This helps us match you to the right level of trade career.",
    options: [
      { value: "60k", icon: "💚", label: "$60,000/year", desc: "Solid stable income, low stress" },
      { value: "80k", icon: "💛", label: "$80,000/year", desc: "Comfortable with some specialisation" },
      { value: "100k", icon: "🔶", label: "$100,000+/year", desc: "I want to earn at the top level" },
      { value: "own", icon: "🏆", label: "Own my business", desc: "Build something for myself" },
    ],
  },
  {
    id: "timeline",
    question: "How quickly do you want to start working?",
    sub: "This affects whether we recommend apprenticeships or shorter cert programs.",
    options: [
      { value: "now", icon: "⚡", label: "As soon as possible", desc: "I need income within 3–6 months" },
      { value: "1year", icon: "📅", label: "Within a year", desc: "I can do some training first" },
      { value: "2year", icon: "🎓", label: "1–2 years", desc: "I'm okay with a longer program" },
      { value: "flex", icon: "🌀", label: "I'm flexible", desc: "I'll do what gets the best outcome" },
    ],
  },
  {
    id: "techComfort",
    question: "How comfortable are you with technology?",
    sub: "Modern trades use a lot more tech than people expect.",
    options: [
      { value: "high", icon: "💻", label: "Very comfortable", desc: "I pick up tech quickly" },
      { value: "mid", icon: "📱", label: "Pretty comfortable", desc: "I can learn what I need" },
      { value: "low", icon: "🔨", label: "I prefer hands-on", desc: "Less tech, more tools" },
      { value: "grow", icon: "📈", label: "Want to learn more", desc: "Tech is part of why I'm here" },
    ],
  },
  {
    id: "teamwork",
    question: "What kind of team environment do you want?",
    sub: "This helps match you to trades with different crew dynamics.",
    options: [
      { value: "crew", icon: "👷", label: "Same crew every day", desc: "Stable team, predictable partners" },
      { value: "mixed", icon: "🔄", label: "Different crews / projects", desc: "Variety of people and sites" },
      { value: "solo", icon: "🛠️", label: "More independent work", desc: "Own tasks with occasional check-ins" },
      { value: "flex", icon: "✨", label: "I can adapt", desc: "Whatever gets the job done" },
    ],
  },
  {
    id: "pace",
    question: "What pace feels right for your workday?",
    sub: "Trades range from steady project work to high-pressure deadlines.",
    options: [
      { value: "steady", icon: "🌊", label: "Steady & predictable", desc: "Consistent rhythm, fewer surprises" },
      { value: "fast", icon: "⚡", label: "Fast-paced", desc: "I like momentum and deadlines" },
      { value: "mixed", icon: "🎯", label: "Mix of both", desc: "Busy periods with calm in between" },
      { value: "unsure", icon: "🤔", label: "Not sure yet", desc: "Show me what fits my profile" },
    ],
  },
];
