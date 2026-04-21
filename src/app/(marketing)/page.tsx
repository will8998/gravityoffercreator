import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { DreamTeam } from "@/components/landing/dream-team";
import { ClientLogos } from "@/components/landing/client-logos";
import { OnePost } from "@/components/landing/one-post";
import { Stats } from "@/components/landing/stats";
import { AiEmpowered } from "@/components/landing/ai-empowered";
import { Pricing } from "@/components/landing/pricing";
import { WhyGravity } from "@/components/landing/why-gravity";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <DreamTeam />
      <ClientLogos />
      <OnePost />
      <Stats />
      <AiEmpowered />
      <Pricing />
      <WhyGravity />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
