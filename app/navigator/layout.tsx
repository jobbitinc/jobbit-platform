import { NavigatorShell } from "@/components/navigator/NavigatorShell";
import "@/styles/navigator.css";
import "@/styles/navigator-dark-theme.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jobbit — AI Career Navigator",
  description:
    "Take the career quiz, get matched to New Jersey skilled trades, apprenticeships, and trade schools, and follow your personalized action plan.",
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function NavigatorLayout({ children }: { children: React.ReactNode }) {
  return <NavigatorShell>{children}</NavigatorShell>;
}
