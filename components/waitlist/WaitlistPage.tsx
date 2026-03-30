import "@/styles/waitlist.css";
import { BottomCta } from "./BottomCta";
import { ProofStrip } from "./ProofStrip";
import { WaitlistBackground } from "./WaitlistBackground";
import { WaitlistFooter } from "./WaitlistFooter";
import { WaitlistHero } from "./WaitlistHero";
import { WaitlistNav } from "./WaitlistNav";
import { WhoItsFor } from "./WhoItsFor";
import { WhyJobbit } from "./WhyJobbit";

export function WaitlistPage() {
  return (
    <div data-waitlist-page>
      <WaitlistBackground />
      <WaitlistNav />
      <WaitlistHero />
      <ProofStrip />
      <WhyJobbit />
      <WhoItsFor />
      <BottomCta />
      <WaitlistFooter />
    </div>
  );
}
