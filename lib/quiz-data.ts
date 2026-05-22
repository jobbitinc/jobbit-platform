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

/** Revised MVP questions 1–7 (Q8 values question is Phase 2 — not included). */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "workStyle",
    question: "When you imagine yourself working, what does your day look like?",
    sub: "Pick the one that feels most like you.",
    options: [
      {
        value: "build-fix-hands",
        icon: "🔨",
        label: "I'm building or fixing things with my hands",
        desc: "I like seeing what I made at the end of the day",
      },
      {
        value: "team-job-site",
        icon: "🤝",
        label: "I'm working with a team on a job site or project",
        desc: "I like being around people and getting things done together",
      },
      {
        value: "solve-problems",
        icon: "🧠",
        label: "I'm figuring out problems and finding solutions",
        desc: "I like troubleshooting and making things work",
      },
      {
        value: "outdoors-mobile",
        icon: "🌱",
        label: "I'm working outside or in different places",
        desc: "I don't want to be stuck behind a desk",
      },
    ],
  },
  {
    id: "environment",
    question: "Where do you see yourself working?",
    sub: "Pick the one that appeals to you most.",
    options: [
      {
        value: "outside-sites",
        icon: "🏗️",
        label: "Outside on job sites",
        desc: "Construction, infrastructure, solar, roofing",
      },
      {
        value: "inside-buildings",
        icon: "🏢",
        label: "Inside buildings",
        desc: "Offices, hospitals, apartment complexes, schools",
      },
      {
        value: "shop-warehouse",
        icon: "🏭",
        label: "In a shop, warehouse, or industrial facility",
        desc: "Manufacturing, fabrication, maintenance",
      },
      {
        value: "on-move",
        icon: "🚗",
        label: "On the move — different locations every day",
        desc: "No two days the same",
      },
    ],
  },
  {
    id: "strength",
    question: "Which of these sounds most like you right now?",
    sub: "Be honest — there's no wrong answer.",
    options: [
      {
        value: "student-hands-on",
        icon: "📚",
        label: "I'm a student and I learn best in hands-on classes",
        desc: "Shop, tech, lab, or anything practical",
      },
      {
        value: "learn-by-doing",
        icon: "💡",
        label: "I pick things up fast by watching and doing",
        desc: "Show me once and I have got it",
      },
      {
        value: "read-manual",
        icon: "🔍",
        label: "I'm the person who reads the manual and figures it out",
        desc: "I like knowing exactly how things work",
      },
      {
        value: "hardworking-daily",
        icon: "💪",
        label: "I'm hard-working and show up every day",
        desc: "I may not know everything yet but I give 100%",
      },
    ],
  },
  {
    id: "workCategory",
    question: "What kind of work feels most natural to you?",
    sub: "Pick the one that fits best.",
    options: [
      {
        value: "electrical-technical",
        icon: "⚡",
        label: "Electrical and technical",
        desc: "Wiring, circuits, technology, precision work",
      },
      {
        value: "mechanical-structural",
        icon: "🔧",
        label: "Mechanical and structural",
        desc: "Engines, machines, pipes, building things",
      },
      {
        value: "environment-outdoors",
        icon: "🌿",
        label: "Environment and outdoors",
        desc: "Landscaping, solar, sustainability, outdoor systems",
      },
      {
        value: "creative-craft",
        icon: "✂️",
        label: "Creative and hands-on craft",
        desc: "Cosmetology, culinary, design, custom work",
      },
    ],
  },
  {
    id: "income",
    question: "Where do you want to be financially in 5 years?",
    sub: "Pick the range that feels right for where you want to go.",
    options: [
      {
        value: "$40K–$60K",
        icon: "💰",
        label: "$40,000 – $60,000 a year",
        desc: "Stable income, good benefits, room to grow",
      },
      {
        value: "$60K–$80K",
        icon: "💰",
        label: "$60,000 – $80,000 a year",
        desc: "I want to live comfortably and save money",
      },
      {
        value: "$80K–$100K",
        icon: "💰",
        label: "$80,000 – $100,000 a year",
        desc: "I want to build real wealth and security",
      },
      {
        value: "$100K+",
        icon: "💰",
        label: "$100,000+ a year",
        desc: "I want to reach six figures and build something bigger",
      },
    ],
  },
  {
    id: "urgency",
    question: "How soon do you need to start earning money?",
    sub: "Be real — this helps us find the right path for where you are right now.",
    options: [
      {
        value: "right-now",
        icon: "🏃",
        label: "Right now — I need income as soon as possible",
        desc: "I can't wait years to start earning",
      },
      {
        value: "within-6-months",
        icon: "📅",
        label: "Within the next 6 months",
        desc: "I have a little time but I need a plan that moves fast",
      },
      {
        value: "train-1-2-years",
        icon: "🎓",
        label: "I can invest 1 to 2 years in training",
        desc: "I'm willing to work toward something bigger",
      },
      {
        value: "planning-ahead",
        icon: "🔭",
        label: "I'm planning ahead — I have time to build toward my future",
        desc: "I'm still in school and thinking long term",
      },
    ],
  },
  {
    id: "physical",
    question: "How physical do you want your work to be?",
    sub: "Pick the one that fits your body and your comfort level.",
    options: [
      {
        value: "very-physical",
        icon: "💪",
        label: "Very physical — I like being active and using my body all day",
        desc: "Lifting, climbing, moving",
      },
      {
        value: "somewhat-physical",
        icon: "🦺",
        label: "Somewhat physical — a mix of active work and using my mind",
        desc: "On my feet but not extreme",
      },
      {
        value: "light-physical",
        icon: "🧰",
        label: "Light physical — mostly hands-on detail work",
        desc: "Precise, careful, not heavy labor",
      },
      {
        value: "minimal-physical",
        icon: "💻",
        label: "Minimal physical — I prefer technical or supervised environments",
        desc: "More thinking than lifting",
      },
    ],
  },
];
