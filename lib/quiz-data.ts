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
    id: "urgency",
    question: "How quickly do you need reliable income?",
    sub: "This helps match paths with the right timeline.",
    options: [
      { value: "immediate", icon: "⚡", label: "Immediate", desc: "I need income as soon as possible" },
      { value: "soon", icon: "📅", label: "Soon", desc: "I can train a little before starting" },
      { value: "steady", icon: "🎯", label: "Steady path", desc: "I can invest more time for stronger long-term pay" },
      { value: "flexible", icon: "🌀", label: "Flexible", desc: "I'm open to whichever path fits best" },
    ],
  },
  {
    id: "physical",
    question: "How physically demanding should your work be?",
    sub: "Pick what feels realistic for your day-to-day comfort.",
    options: [
      { value: "high", icon: "💪", label: "High physical work", desc: "I'm comfortable with demanding hands-on work" },
      { value: "moderate", icon: "🛠️", label: "Moderate physical work", desc: "I want a balanced hands-on role" },
      { value: "lighter", icon: "🧠", label: "Lighter physical work", desc: "I prefer less strain and more planning/precision" },
      { value: "mixed", icon: "🔄", label: "Mixed", desc: "I can handle both depending on the role" },
    ],
  },
];
