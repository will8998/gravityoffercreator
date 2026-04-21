import type { Metadata } from "next";
import { BroadcastHero } from "@/components/broadcast/hero";
import { PilotFlow } from "@/components/broadcast/pilot-flow";
import { WhyItWorks } from "@/components/broadcast/why-it-works";
import { Pipeline } from "@/components/broadcast/pipeline";
import { Effort } from "@/components/broadcast/effort";
import { Multichannel } from "@/components/broadcast/multichannel";
import { Samples } from "@/components/broadcast/samples";
import { Pricing } from "@/components/broadcast/pricing";
import { CTA } from "@/components/broadcast/cta";

export const metadata: Metadata = {
  title: "Gravity Broadcast — Your voice. Every day. Without you.",
  description:
    "Done-for-you founder podcast for Web3 leaders. 5 minutes of founder time per week becomes a daily fireside on Spotify, Apple, YouTube, X and LinkedIn — cloned from your own voice. Free pilot, then $997/mo.",
};

export default function BroadcastPage() {
  return (
    <main>
      <BroadcastHero />
      <PilotFlow />
      <WhyItWorks />
      <Pipeline />
      <Effort />
      <Multichannel />
      <Samples />
      <Pricing />
      <CTA />
    </main>
  );
}
