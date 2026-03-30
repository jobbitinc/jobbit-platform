import { NavigatorShell } from "@/components/navigator/NavigatorShell";
import "@/styles/navigator.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobbit — AI Career Navigator",
  description:
    "Take the career quiz, get matched to skilled trades, and follow your personalized action plan.",
};

export default function NavigatorLayout({ children }: { children: React.ReactNode }) {
  return <NavigatorShell>{children}</NavigatorShell>;
}
