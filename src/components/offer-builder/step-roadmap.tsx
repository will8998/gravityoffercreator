"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { OfferData } from "@/app/builder/page";

interface StepRoadmapProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

const PHASE_DEFAULTS = { name: "", description: "", motivation: "" };

export function StepRoadmap({ data, onChange }: StepRoadmapProps) {
  const roadmap = data.roadmap || {
    phase1: { ...PHASE_DEFAULTS },
    phase2: { ...PHASE_DEFAULTS },
    phase3: { ...PHASE_DEFAULTS },
  };

  const updatePhase = (
    phase: "phase1" | "phase2" | "phase3",
    field: string,
    value: string
  ) => {
    onChange({
      roadmap: {
        ...roadmap,
        [phase]: { ...roadmap[phase], [field]: value },
      },
    });
  };

  const phases = [
    {
      key: "phase1" as const,
      number: 1,
      hint: "Create/Build the Thing — the offer, product, or asset",
    },
    {
      key: "phase2" as const,
      number: 2,
      hint: "Build the System — funnel, page, process to sell/deliver it",
    },
    {
      key: "phase3" as const,
      number: 3,
      hint: "Drive Traffic/Scale — ads, marketing, launch",
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Roadmap Rules
        </h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Keep to 3 phases (if you need more, you&apos;re going flagship)</li>
          <li>• Be clear about WHAT, not HOW</li>
          <li>• Each phase should be desirable on its own</li>
          <li>• Prospect should WANT each milestone even if they stopped there</li>
        </ul>
      </Card>

      <div className="space-y-8">
        {phases.map((phase) => (
          <Card key={phase.key} className="p-6 border-amber-200 bg-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {phase.number}
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Phase {phase.number}</h3>
                <p className="text-xs text-amber-600">{phase.hint}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-amber-900 mb-2 block">
                  Phase Name
                </Label>
                <Input
                  placeholder={`e.g., "Your Ideal Prospect List" or "Digital Snack Funnel Blueprint"`}
                  value={roadmap[phase.key].name}
                  onChange={(e) => updatePhase(phase.key, "name", e.target.value)}
                  className="border-amber-200 focus:border-amber-400 bg-white/80"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-amber-900 mb-2 block">
                  What You&apos;re Doing
                </Label>
                <Textarea
                  placeholder="Describe what happens in this phase. Be clear about WHAT, not HOW."
                  value={roadmap[phase.key].description}
                  onChange={(e) =>
                    updatePhase(phase.key, "description", e.target.value)
                  }
                  className="min-h-[80px] border-amber-200 focus:border-amber-400 bg-white/80"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-amber-900 mb-2 block">
                  Motivational Copy
                  <span className="text-amber-600 font-normal ml-2">
                    &ldquo;...so that you can...&rdquo;
                  </span>
                </Label>
                <Textarea
                  placeholder="Add benefit-driven copy. Why will they WANT this phase?"
                  value={roadmap[phase.key].motivation}
                  onChange={(e) =>
                    updatePhase(phase.key, "motivation", e.target.value)
                  }
                  className="min-h-[60px] border-amber-200 focus:border-amber-400 bg-white/80"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {roadmap.phase1.name && roadmap.phase2.name && roadmap.phase3.name && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-4">Your Roadmap Preview</h3>
          {phases.map((phase) => (
            <div key={phase.key} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-green-800">Phase {phase.number}:</span>
                <span className="font-medium text-green-800">
                  {roadmap[phase.key].name}
                </span>
              </div>
              {roadmap[phase.key].description && (
                <p className="text-green-700 text-sm ml-6">
                  {roadmap[phase.key].description}
                </p>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
