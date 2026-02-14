"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { OfferData } from "@/app/builder/page";

interface StepDeliveryProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

export function StepDelivery({ data, onChange }: StepDeliveryProps) {
  const delivery = data.deliveryModel || {
    dfy: { enabled: false, description: "" },
    dwy: { enabled: false, description: "" },
    diy: { enabled: false, description: "" },
    selfSorting: { enabled: false, option1: "", option2: "" },
  };

  const updateDelivery = (
    field: keyof typeof delivery,
    subField: string,
    value: string | boolean
  ) => {
    onChange({
      deliveryModel: {
        ...delivery,
        [field]: { ...delivery[field], [subField]: value },
      },
    });
  };

  const deliveryTypes = [
    {
      key: "dfy" as const,
      title: "Done-For-You (DFY)",
      subtitle: "Highest perceived value — you do it for them",
      hint: 'Examples: "We write your ads" · "We build your funnel" · "We create your meal plan"',
      question: "What can you do FOR them?",
    },
    {
      key: "dwy" as const,
      title: "Done-With-You (DWY)",
      subtitle: "Support while they execute",
      hint: "Weekly 1-on-1 calls · Group calls · Community access · Text/WhatsApp access · Office hours",
      question: "How much support will you provide?",
    },
    {
      key: "diy" as const,
      title: "Do-It-Yourself (DIY)",
      subtitle: "Tools and resources to get it done faster",
      hint: "Templates · Scripts · Swipe files · Workbooks · AI prompts · Video trainings",
      question: "What resources/tools will you provide?",
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Key Principle
        </h3>
        <p className="text-amber-800 text-sm">
          The more you can remove your client from the equation of getting results,
          the higher the perceived value and believability — and the more you can charge.
          <strong className="block mt-2">Consider Done-For-You first.</strong>
        </p>
      </Card>

      <div className="space-y-6">
        {deliveryTypes.map((type) => (
          <Card
            key={type.key}
            className={`p-6 transition-all ${
              delivery[type.key].enabled
                ? "border-amber-300 bg-amber-50/50"
                : "border-amber-100 bg-white/60"
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() =>
                  updateDelivery(
                    type.key,
                    "enabled",
                    !delivery[type.key].enabled
                  )
                }
                className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  delivery[type.key].enabled
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "border-amber-300 hover:border-amber-400"
                }`}
              >
                {delivery[type.key].enabled && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">{type.title}</h3>
                <p className="text-sm text-amber-700 mb-1">{type.subtitle}</p>
                <p className="text-xs text-amber-600 mb-4">{type.hint}</p>

                {delivery[type.key].enabled && (
                  <div>
                    <Label className="text-sm font-medium text-amber-900 mb-2 block">
                      {type.question}
                    </Label>
                    <Textarea
                      placeholder="Describe the specifics of what you'll deliver..."
                      value={delivery[type.key].description}
                      onChange={(e) =>
                        updateDelivery(type.key, "description", e.target.value)
                      }
                      className="min-h-[80px] border-amber-200 focus:border-amber-400 bg-white/80"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-amber-200 bg-white/60">
        <div className="flex items-start gap-4">
          <button
            onClick={() =>
              updateDelivery(
                "selfSorting",
                "enabled",
                !delivery.selfSorting.enabled
              )
            }
            className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
              delivery.selfSorting.enabled
                ? "bg-amber-500 border-amber-500 text-white"
                : "border-amber-300 hover:border-amber-400"
            }`}
          >
            {delivery.selfSorting.enabled && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <h3 className="font-semibold text-amber-900">
              Self-Sorting Options (Optional)
            </h3>
            <p className="text-sm text-amber-700 mb-4">
              Give people a choice based on budget. Max 2 options.
            </p>

            {delivery.selfSorting.enabled && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-amber-900 mb-2 block">
                    Option 1 (e.g., DIY - Lower Price)
                  </Label>
                  <Textarea
                    placeholder="Describe what's included in Option 1..."
                    value={delivery.selfSorting.option1}
                    onChange={(e) =>
                      updateDelivery("selfSorting", "option1", e.target.value)
                    }
                    className="min-h-[60px] border-amber-200 focus:border-amber-400 bg-white/80"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-amber-900 mb-2 block">
                    Option 2 (e.g., DWY/DFY - Higher Price)
                  </Label>
                  <Textarea
                    placeholder="Describe what's included in Option 2..."
                    value={delivery.selfSorting.option2}
                    onChange={(e) =>
                      updateDelivery("selfSorting", "option2", e.target.value)
                    }
                    className="min-h-[60px] border-amber-200 focus:border-amber-400 bg-white/80"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
