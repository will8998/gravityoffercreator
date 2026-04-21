import type { Metadata } from "next";
import { BroadcastHero } from "@/components/broadcast/hero";
import { SocialProof } from "@/components/broadcast/social-proof";
import { PilotFlow } from "@/components/broadcast/pilot-flow";
import { Guarantee } from "@/components/broadcast/guarantee";
import { WhyItWorks } from "@/components/broadcast/why-it-works";
import { Pipeline } from "@/components/broadcast/pipeline";
import { Effort } from "@/components/broadcast/effort";
import { Multichannel } from "@/components/broadcast/multichannel";
import { Samples } from "@/components/broadcast/samples";
import { Compare } from "@/components/broadcast/compare";
import { Pricing } from "@/components/broadcast/pricing";
import { FAQ } from "@/components/broadcast/faq";
import { CTA } from "@/components/broadcast/cta";

export const metadata: Metadata = {
  title: "Gravity Broadcast — 5 min in. 20 assets out. Every week.",
  description:
    "Free pilot for 10 Web3 founders. Your cloned voice becomes a daily podcast + thread + Shorts + LinkedIn post across 6 channels. $997/mo — one-fifth of ContentGhost, 20x the output.",
};

export default function BroadcastPage() {
  return (
    <main>
      <BroadcastHero />
      <SocialProof />
      <PilotFlow />
      <Guarantee />
      <Effort />
      <Pipeline />
      <Multichannel />
      <WhyItWorks />
      <Samples />
      <Compare />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
