import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BroadcastHero } from "@/components/broadcast/hero";
import { SocialProof } from "@/components/broadcast/social-proof";
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
import { LeadPlayer } from "@/components/broadcast/player";
import { getAllLeadSlugs, getLead } from "@/lib/leads";

export function generateStaticParams() {
  return getAllLeadSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lead = getLead(slug);
  if (!lead) return { title: "Gravity Broadcast" };
  return {
    title: `For ${lead.name} — Gravity Broadcast`,
    description: `A private Gravity Broadcast proposal for ${lead.name}, ${lead.title} at ${lead.project}.`,
    robots: { index: false, follow: false },
  };
}

export default async function LeadPitchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lead = getLead(slug);
  if (!lead) notFound();

  const mailto = `mailto:hello@gravitylabs.xyz?subject=${encodeURIComponent(
    `Gravity Broadcast × ${lead.project}`
  )}&body=${encodeURIComponent(
    `Hi ${lead.firstName},\n\nI'd like to claim the free Gravity Broadcast pilot for ${lead.project}. When's a good 15 minutes?\n\n— ${lead.firstName}`
  )}`;

  return (
    <main>
      <BroadcastHero
        eyebrow={`Private proposal · ${lead.project}`}
        leadBadge={{ firstName: lead.firstName, project: lead.project }}
        pilotCta={mailto}
      />

      <PersonalSection lead={lead} />

      <SocialProof />
      <Guarantee />
      <Effort />
      <Pipeline />
      <Multichannel />
      <WhyItWorks />
      <Samples highlightSlug={lead.slug} />
      <Compare />
      <Pricing leadCta={mailto} />
      <FAQ />
      <CTA
        mailto={mailto}
        headline={`${lead.firstName}, reply. Get a podcast.`}
        sub={`One email. Seven days later your first episode is live. Free. Yours to keep either way.`}
      />
    </main>
  );
}

function PersonalSection({
  lead,
}: {
  lead: NonNullable<ReturnType<typeof getLead>>;
}) {
  return (
    <section className="relative py-24 px-5 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[#e8b24a] mb-6">
          For {lead.firstName} · {lead.project}
        </div>

        <h2 className="font-[family-name:var(--font-clash-display)] text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05] mb-8">
          {lead.hook}
        </h2>

        <div className="space-y-5 text-white/70 leading-relaxed text-base md:text-lg max-w-3xl">
          <p>{lead.fundingNote}</p>
          <p>{lead.observation}</p>
        </div>

        <div className="mt-12">
          <LeadPlayer lead={lead} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-xs">
          {lead.sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/[0.05] transition"
            >
              <span className="h-1 w-1 rounded-full bg-[#e8b24a]" />
              {s.label}
            </a>
          ))}
          <a
            href={lead.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#e8b24a]/30 bg-[#e8b24a]/5 px-3 py-1.5 text-[#e8b24a] hover:bg-[#e8b24a]/10 transition"
          >
            {lead.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
