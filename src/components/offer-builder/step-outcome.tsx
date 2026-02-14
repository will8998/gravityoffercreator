"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { OfferData } from "@/app/builder/page";

interface StepOutcomeProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

export function StepOutcome({ data, onChange }: StepOutcomeProps) {
  const outcome = data.outcomeStatement || {
    limitation: data.limitation || "",
    desiredState: "",
    measurable: "",
    timeframe: "",
    specific: "",
    final: "",
  };

  const updateOutcome = (field: string, value: string) => {
    onChange({
      outcomeStatement: { ...outcome, [field]: value },
    });
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Formula
        </h3>
        <p className="text-amber-800 font-mono text-sm">
          [Number] + [Specific Result] + [Timeframe] + [Optional: Method/Mechanism]
        </p>
        <p className="text-amber-700 text-sm mt-2">
          Examples: &quot;100+ weekly customers on autopilot&quot; · &quot;$10K in cash in 12 weeks&quot; · &quot;50+ customers every week through a low-ticket offer&quot;
        </p>
      </Card>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold text-amber-900 mb-3 block">
            1. Start with the Limitation
          </Label>
          <Input
            placeholder="My ideal client struggles to..."
            value={outcome.limitation}
            onChange={(e) => updateOutcome("limitation", e.target.value)}
            className="border-amber-200 focus:border-amber-400 bg-white/80"
          />
          <p className="text-sm text-amber-600 mt-1">What specific limitation is your ideal client facing?</p>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </div>

        <div>
          <Label className="text-base font-semibold text-amber-900 mb-3 block">
            2. Flip to Desired State
          </Label>
          <Input
            placeholder="What does success look like? The opposite of the limitation..."
            value={outcome.desiredState}
            onChange={(e) => updateOutcome("desiredState", e.target.value)}
            className="border-amber-200 focus:border-amber-400 bg-white/80"
          />
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </div>

        <div>
          <Label className="text-base font-semibold text-amber-900 mb-3 block">
            3. Make It Measurable
          </Label>
          <Input
            placeholder="Add a number. How many? How much? Be specific."
            value={outcome.measurable}
            onChange={(e) => updateOutcome("measurable", e.target.value)}
            className="border-amber-200 focus:border-amber-400 bg-white/80"
          />
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </div>

        <div>
          <Label className="text-base font-semibold text-amber-900 mb-3 block">
            4. Add a Timeframe
          </Label>
          <Input
            placeholder="In 30 days, within 90 days, every week..."
            value={outcome.timeframe}
            onChange={(e) => updateOutcome("timeframe", e.target.value)}
            className="border-amber-200 focus:border-amber-400 bg-white/80"
          />
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </div>

        <div>
          <Label className="text-base font-semibold text-amber-900 mb-3 block">
            5. Make It More Specific
          </Label>
          <Input
            placeholder="Narrow it down. Add a method or mechanism."
            value={outcome.specific}
            onChange={(e) => updateOutcome("specific", e.target.value)}
            className="border-amber-200 focus:border-amber-400 bg-white/80"
          />
        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </div>

        <div>
          <Label className="text-base font-semibold text-amber-900 mb-3 block">
            6. Final Outcome Statement
          </Label>
          <Input
            placeholder="Strip it down to the clearest version"
            value={outcome.final}
            onChange={(e) => {
              updateOutcome("final", e.target.value);
              onChange({ outcomeStatement: { ...outcome, final: e.target.value } });
            }}
            className="border-amber-200 focus:border-amber-400 bg-white/80 text-lg font-medium"
          />
          <p className="text-sm text-amber-600 mt-2">
            Test: Can your ideal client SEE themselves achieving this? Is it believable? Measurable?
          </p>
        </div>
      </div>

      {outcome.final && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">Your Outcome Statement</h3>
          <p className="text-green-800 text-lg font-medium">&ldquo;{outcome.final}&rdquo;</p>
        </Card>
      )}
    </div>
  );
}
