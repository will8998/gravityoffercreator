import type { Metadata } from "next";
import { BroadcastHero } from "@/components/broadcast/hero";
import { SocialProof } from "@/components/broadcast/social-proof";
import { PilotFlow } from "@/components/broadcast/pilot-flow";
import { WhyItWorks } from "@/components/broadcast/why-it-works";
import { Pipeline } from "@/components/broadcast/pipeline";
import { Effort } from "@/components/broadcast/effort";
import { Multichannel } from "@/components/broadcast/multichannel";
import { Samples } from "@/components/broadcast/samples";
import { Pricing } from "@/components/broadcast/pricing";
import { FAQ } from "@/components/broadcast/faq";
import { CTA } from "@/components/broadcast/cta";

export const metadata: Metadata = {
  title: "Gravity Broadcast — Your voice. Every day. Without you.",
  description:
    "Free pilot episode for Web3 founders. 5 minutes of your time per week becomes a daily podcast on Spotify, Apple, YouTube, X and LinkedIn — in your cloned voice. $997/mo after the free pilot.",
};

export default function BroadcastPage() {
  return (
    <main>
      <BroadcastHero />
      <SocialProof />
      <PilotFlow />
      <WhyItWorks />
      <Effort />
      <Pipeline />
      <Multichannel />
      <Samples />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
