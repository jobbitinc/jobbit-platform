import { NavigatorLanding } from "@/components/navigator/NavigatorLanding";
import { NavigatorShell } from "@/components/navigator/NavigatorShell";
import "@/styles/navigator.css";
import "@/styles/navigator-dark-theme.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jobbit — AI Career Navigator",
  description:
    "Take the career quiz, get matched to New Jersey skilled trades, apprenticeships, and trade schools, and follow your personalized action plan.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function HomePage() {
  return (
    <NavigatorShell>
      <NavigatorLanding />
    </NavigatorShell>
  );
}
