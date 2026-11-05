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

export const socialLinks: { network: SocialNetwork; label: string; href?: string }[] = [
  { network: "linkedin", label: "LinkedIn" },
  { network: "instagram", label: "Instagram" },
  { network: "x", label: "X (Twitter)" },
  { network: "tiktok", label: "TikTok" },
  { network: "youtube", label: "YouTube" },
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
  name: "Fatima Scipio",
  role: "Founder & CEO",
  photo: "/fatima.jpg",
  bio: "Fatima holds a Master's degree in Urban Affairs with a concentration in Nonprofit Management and Youth Development. She brings three decades of frontline experience to Jobbit and a deep understanding of the gap between young people, opportunity, and the systems designed to connect the two.",
  story: [
    "For more than 30 years, Fatima Scipio has been connecting young people to possibility. Her work began with young people in her Bronx, New York community and continued through a career spanning education, youth development, workforce development, nonprofit leadership, community impact, and entrepreneurship. From serving as a middle school teacher to leading college and career programming, she has spent her career helping young people see opportunities they may not have known existed.",
    "The idea for Jobbit became personal when Fatima's nephew called asking for help finding a trade school or job. After spending hours searching through disconnected websites, job boards, training programs, and employment opportunities, she recognized a larger problem: young people were being asked to navigate a workforce system that was never designed around them.",
    "She had seen the same challenge firsthand while serving as Director of College and Career Services at the Boys & Girls Club of Mercer County. When students skipped career workshops, their explanation was often simple: “I don't know what I want to do.” Fatima understood that these young people weren't lacking ambition—they needed greater exposure to what was possible and a clearer roadmap for getting there.",
    "That insight became Jobbit. Designed for young people ages 16–24 (both high school and out-of-school youth), Jobbit is creating an AI-powered career-readiness and workforce ecosystem that helps youth discover their talents and gifts, understand potential pathways, build career readiness, and connect to opportunities.",
    "Fatima's vision is to scale Jobbit into the nation's leading youth workforce platform—creating infrastructure that can serve young people while connecting schools, employers, and workforce systems around the next generation of talent.",
  ],
  quote: "Every young person deserves to see what is possible.",
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
