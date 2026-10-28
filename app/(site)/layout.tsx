import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteMotionConfig } from "@/components/site/Reveal";
import { company } from "@/lib/marketing/content";
import "@/styles/site.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Jobbit",
    default: "Jobbit | AI-Powered Career Readiness for the Next Generation",
  },
  description: company.description,
  openGraph: {
    type: "website",
    siteName: "Jobbit",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-site className={`${spaceGrotesk.variable} flex min-h-screen flex-col bg-white text-ink`}>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-lime px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <SiteMotionConfig>
        <main id="main" className="flex-1">
          {children}
        </main>
      </SiteMotionConfig>
      <SiteFooter />
    </div>
  );
}
