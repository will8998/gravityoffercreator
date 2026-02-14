"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { OfferData } from "@/app/builder/page";
import { StepIdealClient } from "./step-ideal-client";
import { StepSolutions } from "./step-solutions";
import { StepThorn } from "./step-thorn";
import { StepOutcome } from "./step-outcome";
import { StepRoadmap } from "./step-roadmap";
import { StepDelivery } from "./step-delivery";
import { StepPricing } from "./step-pricing";
import { StepDocument } from "./step-document";

interface OfferWizardProps {
  offerData: OfferData;
  currentStep: number;
  onStepChange: (step: number) => void;
  onDataChange: (updates: Partial<OfferData>) => void;
}

const STEPS = [
  { id: 1, name: "Ideal Client", description: "Define your perfect customer" },
  { id: 2, name: "Solutions Inventory", description: "Catalog your expertise" },
  { id: 3, name: "Thorn in the Paw", description: "Score their pain points" },
  { id: 4, name: "Outcome Statement", description: "Craft the transformation" },
  { id: 5, name: "Roadmap", description: "Map the journey" },
  { id: 6, name: "Delivery Model", description: "Choose how you'll deliver" },
  { id: 7, name: "Pricing", description: "Set your investment" },
  { id: 8, name: "Final Document", description: "Review and polish" },
];

export function OfferWizard({ offerData, currentStep, onStepChange, onDataChange }: OfferWizardProps) {
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveOffer = useCallback(async (data: OfferData) => {
    if (!data.id) return;
    
    setSaveStatus("saving");
    try {
      const response = await fetch(`/api/offers/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, currentStep }),
      });
      
      if (response.ok) {
        setSaveStatus("saved");
        setLastSaved(new Date());
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
    }
  }, [currentStep]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (offerData.id) {
        saveOffer(offerData);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [offerData, saveOffer]);

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 8) {
      onStepChange(newStep);
      onDataChange({ currentStep: newStep });
    }
  };

  const handleDataChange = (updates: Partial<OfferData>) => {
    onDataChange(updates);
  };

  const canGoNext = currentStep < 8;
  const canGoPrev = currentStep > 1;
  const progress = (currentStep / 8) * 100;

  const renderStep = () => {
    const stepProps = {
      data: offerData,
      onChange: handleDataChange,
    };

    switch (currentStep) {
      case 1: return <StepIdealClient {...stepProps} />;
      case 2: return <StepSolutions {...stepProps} />;
      case 3: return <StepThorn {...stepProps} />;
      case 4: return <StepOutcome {...stepProps} />;
      case 5: return <StepRoadmap {...stepProps} />;
      case 6: return <StepDelivery {...stepProps} />;
      case 7: return <StepPricing {...stepProps} />;
      case 8: return <StepDocument {...stepProps} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">
                No-Phone Offer Builder
              </h1>
              <p className="text-amber-700">
                Create compelling offers that sell without sales calls
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-amber-600">
                {saveStatus === "saving" && "Saving..."}
                {saveStatus === "saved" && lastSaved && `Saved ${lastSaved.toLocaleTimeString()}`}
                {saveStatus === "error" && "Save failed"}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveOffer(offerData)}
                disabled={!offerData.id}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-amber-800">
                Step {currentStep} of 8
              </span>
              <span className="text-sm text-amber-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-amber-100"
            />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepChange(step.id)}
                className={`
                  relative p-3 rounded-lg text-left transition-all duration-200
                  ${step.id === currentStep 
                    ? 'bg-amber-100 border-2 border-amber-300 shadow-sm' 
                    : step.id < currentStep
                    ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                    : 'bg-cream-50 border border-amber-100 hover:bg-amber-50'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                    ${step.id === currentStep 
                      ? 'bg-amber-500 text-white' 
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-200 text-amber-700'
                    }
                  `}>
                    {step.id < currentStep ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {step.id === currentStep && (
                    <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="text-xs font-medium text-amber-900 mb-1">
                  {step.name}
                </div>
                <div className="text-xs text-amber-600 leading-tight">
                  {step.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-br from-cream-50 to-amber-50 border-amber-200 shadow-lg">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                {STEPS[currentStep - 1]?.name}
              </h2>
              <p className="text-amber-700">
                {STEPS[currentStep - 1]?.description}
              </p>
            </div>

            <Separator className="mb-8 bg-amber-200" />

            {renderStep()}
          </div>
        </Card>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={!canGoPrev}
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-amber-600">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>

          <Button
            onClick={() => handleStepChange(currentStep + 1)}
            disabled={!canGoNext}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}