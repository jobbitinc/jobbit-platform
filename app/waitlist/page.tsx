import { WaitlistPage } from "@/components/waitlist/WaitlistPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jobbit — Join the Waitlist",
  description:
    "Join the jobbit waitlist and be first to know when we launch in your state. AI career navigator for skilled trades.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function WaitlistRoutePage() {
  return <WaitlistPage />;
}
