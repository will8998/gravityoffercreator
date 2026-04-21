"use client";

import { useState } from "react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  tagline: string;
  isPro?: boolean;
  features: string[];
  featuresHeader: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "$5,300",
    tagline: "Daily Twitter Engine — We're your content team on auto-pilot. For founders who want to stay active without touching Twitter.",
    featuresHeader: "What's included",
    features: [
      "1 Tweet per day",
      "1 Thread/week (5–8 tweets per thread)",
      "1 Animated video per day (10–30s)",
      "Full content creation + visual design",
      "Brand voice calibration + account tone guide",
      "Telegram feedback loop",
      "Basic monthly stats (top posts, engagement, impressions)"
    ]
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: "$8,000",
    tagline: "We're your marketing team. For teams that want to grow smarter, not just louder.",
    isPro: true,
    featuresHeader: "Everything in Starter Plus",
    features: [
      "1 Article a month",
      "Weekly analytics breakdown: what's working, what's not",
      "Thread optimization: better hooks, structure, CTA placement",
      "A/B testing of post formats (text, memes, short threads)",
      "2 Bonus content types/mo (e.g. quote tweet bait, call-to-action tweetstorms)",
      "Monthly Twitter performance review deck",
      "Quest Campaign Ideations"
    ]
  },
  {
    id: "partner",
    name: "Partner Plan",
    price: "$15,200",
    tagline: "We're your CMO co-pilot, let us think for you. You're building something big. Let's scale it loud.",
    featuresHeader: "Everything in Starter & Growth Plus",
    features: [
      "Engagement service (reply farming under influencers/VCs)",
      "Distribution playbook (tagging, cross-promo, timing)",
      "Community CTAs (polls, meme battles, AMAs)",
      "Monthly Growth Blueprint deck: what to push next, with timelines",
      "Dedicated Account Manager, Weekly Gmeet Calls",
      "Assist with Twitter Boosting",
      "+ 3 Articles a month"
    ]
  }
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="relative bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Number */}
        <div className="absolute top-12 left-6 text-[200px] font-[family-name:var(--font-clash-display)] font-bold leading-none text-white opacity-5 pointer-events-none select-none">
          09
        </div>

        {/* Section Labels */}
        <div className="flex items-center justify-between mb-16 relative z-10">
          <div className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wide uppercase">
            {"//Pricing"}
          </div>
          <div className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] tracking-wide">
            Best Plans
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Heading */}
          <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-8 leading-tight tracking-tight">
            Plans & Pricing
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.6)] mb-12 max-w-2xl">
            Built for Every Stage of Web3 Growth
          </p>

          {/* Monthly/Annual Toggle */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-[#0f0f0f] border border-[#161616] rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 text-sm font-[family-name:var(--font-inter)] font-medium rounded-md transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-black'
                    : 'text-[rgba(255,255,255,0.6)] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-3 text-sm font-[family-name:var(--font-inter)] font-medium rounded-md transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-black'
                    : 'text-[rgba(255,255,255,0.6)] hover:text-white'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-[#0a0a0a] border rounded-xl p-8 transition-all duration-300 hover:border-[#292929] ${
                  plan.isPro 
                    ? 'border-[#14c700] shadow-[0_0_20px_rgba(20,199,0,0.1)]' 
                    : 'border-[#161616]'
                } ${index === 1 ? 'transform lg:-translate-y-4' : ''}`}
              >
                {/* Pro Badge */}
                {plan.isPro && (
                  <div className="absolute -top-3 left-8">
                    <div className="bg-[#14c700] text-black text-xs font-[family-name:var(--font-inter)] font-bold px-3 py-1 rounded-full">
                      PRO
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-[family-name:var(--font-clash-display)] font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-[rgba(255,255,255,0.6)] font-[family-name:var(--font-inter)] text-lg">
                      /month
                    </span>
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-[family-name:var(--font-clash-display)] font-bold text-white mb-4">
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p className="text-base font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.8)] leading-relaxed mb-8">
                  {plan.tagline}
                </p>

                {/* CTA Button */}
                <a
                  href="./contact"
                  className="inline-flex items-center justify-center w-full bg-transparent border border-white text-white font-[family-name:var(--font-inter)] font-medium px-6 py-4 rounded-lg mb-8 transition-all duration-300 hover:bg-white hover:text-black group"
                >
                  Get Started
                  <svg 
                    className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-[family-name:var(--font-inter)] font-medium text-white mb-4 uppercase tracking-wide">
                    {plan.featuresHeader}
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="text-white">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-[family-name:var(--font-inter)] text-[rgba(255,255,255,0.8)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}