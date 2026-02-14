"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, DollarSign } from "lucide-react";
import { OfferData } from "@/app/builder/page";

interface StepPricingProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

type PricingStructure = "one-time" | "payment-plan" | "weekly" | "pay-as-profit";

export function StepPricing({ data, onChange }: StepPricingProps) {
  const pricing = data.pricing || {
    amount: 0,
    structure: "one-time" as PricingStructure,
    paymentPlan: { firstPayment: 0, numPayments: 2, paymentAmount: 0 },
    weekly: { weeklyAmount: 0, duration: "12 weeks" },
    payAsProfit: { initialPayment: 0, performanceTrigger: "", performanceAmount: 0 },
    ascension: "",
  };

  const updatePricing = (field: string, value: unknown) => {
    onChange({ pricing: { ...pricing, [field]: value } });
  };

  const structures: { key: PricingStructure; label: string; desc: string }[] = [
    { key: "one-time", label: "One-Time Payment", desc: "Best below $2K for lowest friction" },
    { key: "payment-plan", label: "Payment Plan", desc: "Split into 2-3 payments" },
    { key: "weekly", label: "Weekly Payments", desc: "Lowest barrier to entry" },
    { key: "pay-as-profit", label: "Pay As You Profit", desc: "Low upfront + performance-based" },
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Pricing Principle
        </h3>
        <p className="text-amber-800 text-sm">
          &ldquo;How can I make it as easy as possible for someone to get started?&rdquo;
          Start with what you want to be paid, then structure the payment to remove friction.
          Remember: No-Phone Offers are ascension offers — think about the backend value.
        </p>
      </Card>

      <div>
        <Label className="text-base font-semibold text-amber-900 mb-3 block">
          <DollarSign className="w-4 h-4 inline mr-1" />
          What do you want to be paid for this offer?
        </Label>
        <Input
          type="number"
          placeholder="2000"
          value={pricing.amount || ""}
          onChange={(e) => updatePricing("amount", parseInt(e.target.value) || 0)}
          className="border-amber-200 focus:border-amber-400 bg-white/80 text-lg max-w-xs"
        />
        <p className="text-sm text-amber-600 mt-1">
          Don&apos;t overthink it. What feels right for the value you&apos;re delivering?
        </p>
      </div>

      <div>
        <Label className="text-base font-semibold text-amber-900 mb-4 block">
          Payment Structure
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {structures.map((s) => (
            <button
              key={s.key}
              onClick={() => updatePricing("structure", s.key)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                pricing.structure === s.key
                  ? "border-amber-400 bg-amber-50"
                  : "border-amber-100 hover:border-amber-200 bg-white/60"
              }`}
            >
              <div className="font-medium text-amber-900">{s.label}</div>
              <div className="text-xs text-amber-600 mt-1">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {pricing.structure === "payment-plan" && (
        <Card className="p-6 border-amber-200 bg-white/60 space-y-4">
          <h4 className="font-medium text-amber-900">Payment Plan Details</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">First Payment</Label>
              <Input
                type="number"
                placeholder="1300"
                value={pricing.paymentPlan?.firstPayment || ""}
                onChange={(e) =>
                  updatePricing("paymentPlan", {
                    ...pricing.paymentPlan,
                    firstPayment: parseInt(e.target.value) || 0,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
            <div>
              <Label className="text-sm text-amber-800 mb-1 block"># of Payments</Label>
              <Input
                type="number"
                placeholder="2"
                value={pricing.paymentPlan?.numPayments || ""}
                onChange={(e) =>
                  updatePricing("paymentPlan", {
                    ...pricing.paymentPlan,
                    numPayments: parseInt(e.target.value) || 0,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">Each Payment</Label>
              <Input
                type="number"
                placeholder="1000"
                value={pricing.paymentPlan?.paymentAmount || ""}
                onChange={(e) =>
                  updatePricing("paymentPlan", {
                    ...pricing.paymentPlan,
                    paymentAmount: parseInt(e.target.value) || 0,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
          </div>
        </Card>
      )}

      {pricing.structure === "weekly" && (
        <Card className="p-6 border-amber-200 bg-white/60 space-y-4">
          <h4 className="font-medium text-amber-900">Weekly Payment Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">Weekly Amount</Label>
              <Input
                type="number"
                placeholder="100"
                value={pricing.weekly?.weeklyAmount || ""}
                onChange={(e) =>
                  updatePricing("weekly", {
                    ...pricing.weekly,
                    weeklyAmount: parseInt(e.target.value) || 0,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">Duration</Label>
              <Input
                placeholder="12 weeks"
                value={pricing.weekly?.duration || ""}
                onChange={(e) =>
                  updatePricing("weekly", {
                    ...pricing.weekly,
                    duration: e.target.value,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
          </div>
        </Card>
      )}

      {pricing.structure === "pay-as-profit" && (
        <Card className="p-6 border-amber-200 bg-white/60 space-y-4">
          <h4 className="font-medium text-amber-900">Pay As You Profit Details</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">Initial Payment</Label>
              <Input
                type="number"
                placeholder="2000"
                value={pricing.payAsProfit?.initialPayment || ""}
                onChange={(e) =>
                  updatePricing("payAsProfit", {
                    ...pricing.payAsProfit,
                    initialPayment: parseInt(e.target.value) || 0,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">Performance Trigger</Label>
              <Input
                placeholder="When you hit $10K in sales"
                value={pricing.payAsProfit?.performanceTrigger || ""}
                onChange={(e) =>
                  updatePricing("payAsProfit", {
                    ...pricing.payAsProfit,
                    performanceTrigger: e.target.value,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
            <div>
              <Label className="text-sm text-amber-800 mb-1 block">Performance Amount</Label>
              <Input
                type="number"
                placeholder="3000"
                value={pricing.payAsProfit?.performanceAmount || ""}
                onChange={(e) =>
                  updatePricing("payAsProfit", {
                    ...pricing.payAsProfit,
                    performanceAmount: parseInt(e.target.value) || 0,
                  })
                }
                className="border-amber-200 bg-white/80"
              />
            </div>
          </div>
        </Card>
      )}

      <div>
        <Label className="text-base font-semibold text-amber-900 mb-3 block">
          Ascension Thinking
        </Label>
        <Textarea
          placeholder="What offer comes AFTER this one? How much can you charge on the backend once they get results?"
          value={pricing.ascension || ""}
          onChange={(e) => updatePricing("ascension", e.target.value)}
          className="min-h-[80px] border-amber-200 focus:border-amber-400 bg-white/80"
        />
        <p className="text-sm text-amber-600 mt-1">
          You don&apos;t need to make all your money on the front-end. Think bigger picture.
        </p>
      </div>
    </div>
  );
}
