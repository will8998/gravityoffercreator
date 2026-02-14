"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OfferWizard } from "@/components/offer-builder/wizard";

export interface OfferData {
  id?: number;
  title?: string;
  status?: string;
  currentStep?: number;
  idealClient?: string;
  limitation?: string;
  solutionsInventory?: {
    clarity: string;
    plan: string;
    integration: {
      diy: string;
      dwy: string;
      dfy: string;
    };
  };
  thornScorecard?: Array<{
    thing: string;
    todoList: string;
    mindShare: number;
    emotionalTemp: number;
    tai: boolean;
    hardToFind: boolean;
    total: number;
  }>;
  outcomeStatement?: {
    limitation: string;
    desiredState: string;
    measurable: string;
    timeframe: string;
    specific: string;
    final: string;
  };
  roadmap?: {
    phase1: { name: string; description: string; motivation: string };
    phase2: { name: string; description: string; motivation: string };
    phase3: { name: string; description: string; motivation: string };
  };
  deliveryModel?: {
    dfy: { enabled: boolean; description: string };
    dwy: { enabled: boolean; description: string };
    diy: { enabled: boolean; description: string };
    selfSorting: { enabled: boolean; option1: string; option2: string };
  };
  pricing?: {
    amount: number;
    structure: "one-time" | "payment-plan" | "weekly" | "pay-as-profit";
    paymentPlan?: { firstPayment: number; numPayments: number; paymentAmount: number };
    weekly?: { weeklyAmount: number; duration: string };
    payAsProfit?: { initialPayment: number; performanceTrigger: string; performanceAmount: number };
    ascension: string;
  };
  documentContent?: string;
}

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [offerData, setOfferData] = useState<OfferData>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeOffer = async () => {
      const existingId = searchParams.get("id");
      
      if (existingId) {
        try {
          const response = await fetch(`/api/offers/${existingId}`);
          if (response.ok) {
            const offer = await response.json();
            setOfferData({
              ...offer,
              solutionsInventory: offer.solutionsInventory ? JSON.parse(offer.solutionsInventory) : undefined,
              thornScorecard: offer.thornScorecard ? JSON.parse(offer.thornScorecard) : undefined,
              roadmap: offer.roadmap ? JSON.parse(offer.roadmap) : undefined,
              deliveryModel: offer.deliveryModel ? JSON.parse(offer.deliveryModel) : undefined,
              pricing: offer.pricing ? JSON.parse(offer.pricing) : undefined,
            });
            setCurrentStep(offer.currentStep || 1);
          }
        } catch (error) {
          console.error("Failed to load offer:", error);
        }
      } else {
        try {
          const response = await fetch("/api/offers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "New Offer",
              status: "draft",
              currentStep: 1,
            }),
          });
          
          if (response.ok) {
            const newOffer = await response.json();
            setOfferData(newOffer);
            router.replace(`/builder?id=${newOffer.id}`);
          }
        } catch (error) {
          console.error("Failed to create offer:", error);
        }
      }
      
      setIsLoading(false);
    };

    initializeOffer();
  }, [searchParams, router]);

  const updateOfferData = (updates: Partial<OfferData>) => {
    setOfferData(prev => ({ ...prev, ...updates }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-800 font-medium">Loading your offer builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <OfferWizard
        offerData={offerData}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onDataChange={updateOfferData}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}