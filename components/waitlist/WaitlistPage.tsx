import "@/styles/waitlist.css";
import { BottomCta } from "./BottomCta";
import { ProofStrip } from "./ProofStrip";
import { WaitlistBackground } from "./WaitlistBackground";
import { WaitlistFooter } from "./WaitlistFooter";
import { WaitlistHero } from "./WaitlistHero";
import { WaitlistNav } from "./WaitlistNav";
import { WaitlistScrollReveal } from "./WaitlistScrollReveal";
import { WhoItsFor } from "./WhoItsFor";
import { WhyJobbit } from "./WhyJobbit";

export function WaitlistPage() {
  return (
    <div data-waitlist-page>
      <WaitlistBackground />
      <WaitlistNav />
      <WaitlistHero />
      <WaitlistScrollReveal>
        <ProofStrip />
      </WaitlistScrollReveal>
      <WaitlistScrollReveal delay={0.04}>
        <WhyJobbit />
      </WaitlistScrollReveal>
      <WaitlistScrollReveal delay={0.06}>
        <WhoItsFor />
      </WaitlistScrollReveal>
      <BottomCta />
      <WaitlistFooter />
    </div>
  );
}
