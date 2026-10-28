/**
 * Editable content for the corporate site (app/(site)).
 * Team members, social links, contact details and form options live here so they can be
 * updated without touching page layouts.
 */

export const company = {
  name: "Jobbit Inc.",
  shortName: "Jobbit",
  tagline: "AI-powered career readiness for the next generation of talent.",
  description:
    "Jobbit is an AI-powered career readiness platform that helps high school students and emerging talent discover career pathways, understand their skills, and prepare for the workforce, while connecting schools, employers, and workforce partners to the next generation of talent.",
  email: "hello@jobbitapp.com",
  partnershipsEmail: "partners@jobbitapp.com",
  location: "New Jersey, USA",
};

export type SocialNetwork = "linkedin" | "instagram" | "x" | "tiktok" | "youtube";

export const socialLinks: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/jobbit" },
  { network: "instagram", label: "Instagram", href: "https://www.instagram.com/jobbitapp" },
  { network: "x", label: "X (Twitter)", href: "https://x.com/jobbitapp" },
  { network: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@jobbitapp" },
  { network: "youtube", label: "YouTube", href: "https://www.youtube.com/@jobbitapp" },
];

export const solutionLinks = [
  { href: "/schools", label: "For Schools", description: "Career exploration and readiness for every student" },
  { href: "/employers", label: "For Employers", description: "Build your future talent pipeline" },
  {
    href: "/partners",
    label: "For Workforce & Community",
    description: "Collaborate to expand youth opportunity",
  },
];

export const primaryNavLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
];

export const inquiryTypes = [
  { value: "school", label: "School / District" },
  { value: "employer", label: "Employer" },
  { value: "workforce", label: "Workforce Organization" },
  { value: "community", label: "Community Organization" },
  { value: "funder", label: "Funder / Sponsor" },
  { value: "other", label: "Other Partner" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export const inquiryIntents = [
  { value: "demo", label: "Request a demo" },
  { value: "partnership", label: "Explore a partnership" },
  { value: "general", label: "General question" },
] as const;

export type InquiryIntent = (typeof inquiryIntents)[number]["value"];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/jane.jpg". Initials are shown when omitted. */
  photo?: string;
  linkedin?: string;
};

export const founder: TeamMember & { story: string[]; quote: string } = {
  name: "Founder Name",
  role: "Founder & CEO",
  bio: "Short leadership bio: background, previous roles, and the experience that led to starting Jobbit.",
  story: [
    "Jobbit started with a simple observation: young people are asked to make big decisions about their future long before anyone shows them what the world of work actually looks like.",
    "Schools want to help, employers need talent, and communities are investing in youth opportunity, but these efforts rarely connect in a way students can see or act on.",
    "We built Jobbit to close that gap: an AI-powered platform that meets students where they are, helps them discover what they're good at, and connects them to real pathways, real employers, and real next steps.",
  ],
  quote: "Every student deserves a clear view of their future and a real path to get there.",
};

export const leadershipTeam: TeamMember[] = [
  {
    name: "Team Member",
    role: "Head of Product",
    bio: "Leads product strategy and the student experience across the Jobbit platform.",
  },
  {
    name: "Team Member",
    role: "Head of Partnerships",
    bio: "Builds relationships with schools, districts, employers, and workforce partners.",
  },
  {
    name: "Team Member",
    role: "Head of Engineering",
    bio: "Leads the engineering team building Jobbit's AI and platform infrastructure.",
  },
];

export const advisors: TeamMember[] = [
  { name: "Advisor Name", role: "Education Advisor", bio: "Former district leader focused on career-connected learning." },
  { name: "Advisor Name", role: "Workforce Advisor", bio: "Workforce development and apprenticeship strategy." },
  { name: "Advisor Name", role: "Technology Advisor", bio: "AI and SaaS product leadership." },
  { name: "Advisor Name", role: "Industry Advisor", bio: "Talent acquisition and early-career hiring." },
];
