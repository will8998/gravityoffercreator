"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, FileText, Sparkles, Loader2 } from "lucide-react";
import { OfferData } from "@/app/builder/page";
import { useSettings } from "@/hooks/use-settings";
import { toast } from "sonner";

interface StepDocumentProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

function buildDocumentPreview(data: OfferData): string {
  const sections: string[] = [];

  if (data.outcomeStatement?.final) {
    sections.push(`## The Outcome\n\nOur Goal: ${data.outcomeStatement.final}\n\nHere's exactly how we're going to accomplish that outcome.`);
  }

  if (data.roadmap) {
    const phases: string[] = [];
    if (data.roadmap.phase1?.name) {
      phases.push(`**Phase 1: ${data.roadmap.phase1.name}**\n${data.roadmap.phase1.description || ""}${data.roadmap.phase1.motivation ? `\n\n...${data.roadmap.phase1.motivation}` : ""}`);
    }
    if (data.roadmap.phase2?.name) {
      phases.push(`**Phase 2: ${data.roadmap.phase2.name}**\n${data.roadmap.phase2.description || ""}${data.roadmap.phase2.motivation ? `\n\n...${data.roadmap.phase2.motivation}` : ""}`);
    }
    if (data.roadmap.phase3?.name) {
      phases.push(`**Phase 3: ${data.roadmap.phase3.name}**\n${data.roadmap.phase3.description || ""}${data.roadmap.phase3.motivation ? `\n\n...${data.roadmap.phase3.motivation}` : ""}`);
    }
    if (phases.length > 0) {
      sections.push(`## The Roadmap\n\n${phases.join("\n\n")}`);
    }
  }

  if (data.deliveryModel) {
    const deliverables: string[] = [];
    if (data.deliveryModel.dfy?.enabled && data.deliveryModel.dfy.description) {
      deliverables.push(`- **Done-For-You**: ${data.deliveryModel.dfy.description}`);
    }
    if (data.deliveryModel.dwy?.enabled && data.deliveryModel.dwy.description) {
      deliverables.push(`- **Done-With-You**: ${data.deliveryModel.dwy.description}`);
    }
    if (data.deliveryModel.diy?.enabled && data.deliveryModel.diy.description) {
      deliverables.push(`- **Resources**: ${data.deliveryModel.diy.description}`);
    }
    if (deliverables.length > 0) {
      sections.push(`## Here's Exactly What You're Going to Get\n\n${deliverables.join("\n")}`);
    }
  }

  if (data.pricing) {
    let priceText = "";
    if (data.pricing.structure === "one-time") {
      priceText = `Your investment is $${data.pricing.amount?.toLocaleString()}.`;
    } else if (data.pricing.structure === "payment-plan" && data.pricing.paymentPlan) {
      priceText = `Your investment is $${data.pricing.paymentPlan.firstPayment?.toLocaleString()} today, then ${data.pricing.paymentPlan.numPayments} payment(s) of $${data.pricing.paymentPlan.paymentAmount?.toLocaleString()}.`;
    } else if (data.pricing.structure === "weekly" && data.pricing.weekly) {
      priceText = `Your investment is $${data.pricing.weekly.weeklyAmount?.toLocaleString()}/week for ${data.pricing.weekly.duration}.`;
    } else if (data.pricing.structure === "pay-as-profit" && data.pricing.payAsProfit) {
      priceText = `Your investment is $${data.pricing.payAsProfit.initialPayment?.toLocaleString()} to get started, then $${data.pricing.payAsProfit.performanceAmount?.toLocaleString()} ${data.pricing.payAsProfit.performanceTrigger}.`;
    }
    if (priceText) {
      sections.push(`## Investment\n\n${priceText}`);
    }
  }

  return sections.join("\n\n---\n\n") || "Complete the previous steps to build your offer document.";
}

export function StepDocument({ data, onChange }: StepDocumentProps) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { settings, getActiveKey } = useSettings();

  const preview = data.documentContent || buildDocumentPreview(data);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(preview);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    const apiKey = getActiveKey();
    if (!apiKey) {
      toast.error("Please configure an API key in Settings first");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Based on my offer data below, write a complete No-Phone Offer document in Google Doc format. Include all 7 sections with compelling copy, transitions, and "so that you can" language. Make it ready to send.

Ideal Client: ${data.idealClient || "Not defined"}
Limitation: ${data.limitation || "Not defined"}
Outcome: ${data.outcomeStatement?.final || "Not defined"}
Roadmap Phase 1: ${data.roadmap?.phase1?.name || "Not defined"} - ${data.roadmap?.phase1?.description || ""}
Roadmap Phase 2: ${data.roadmap?.phase2?.name || "Not defined"} - ${data.roadmap?.phase2?.description || ""}
Roadmap Phase 3: ${data.roadmap?.phase3?.name || "Not defined"} - ${data.roadmap?.phase3?.description || ""}
Delivery DFY: ${data.deliveryModel?.dfy?.enabled ? data.deliveryModel.dfy.description : "Not included"}
Delivery DWY: ${data.deliveryModel?.dwy?.enabled ? data.deliveryModel.dwy.description : "Not included"}
Delivery DIY: ${data.deliveryModel?.diy?.enabled ? data.deliveryModel.diy.description : "Not included"}
Price: $${data.pricing?.amount || 0} (${data.pricing?.structure || "one-time"})

Write the complete offer document now. Output ONLY the document text, no explanations.`,
            },
          ],
          provider: settings.provider,
          apiKey,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to generate. Check your API key.");
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
        }
      }

      onChange({ documentContent: fullText });
      toast.success("Document generated!");
    } catch {
      toast.error("Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleStatusChange = (status: string) => {
    onChange({ status });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-amber-900 text-lg">Your No-Phone Offer Document</h3>
          <p className="text-sm text-amber-700">
            Review your offer and generate a polished version with AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={`cursor-pointer ${data.status === "ready" ? "bg-green-500" : "bg-amber-200 text-amber-800"}`}
            onClick={() => handleStatusChange(data.status === "ready" ? "draft" : "ready")}
          >
            {data.status === "ready" ? "Ready" : "Draft"}
          </Badge>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with AI
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleCopy} className="border-amber-200 text-amber-700">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>

      <Card className="border-amber-200 bg-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-amber-900">Document Preview</span>
          </div>
          <Textarea
            value={data.documentContent || preview}
            onChange={(e) => onChange({ documentContent: e.target.value })}
            className="min-h-[400px] border-amber-200 focus:border-amber-400 bg-white font-mono text-sm whitespace-pre-wrap"
          />
        </div>
      </Card>
    </div>
  );
}
