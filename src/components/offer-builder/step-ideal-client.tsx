"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, MessageCircle, X } from "lucide-react";
import { OfferData } from "@/app/builder/page";
import { useChat } from "@ai-sdk/react";
import { useSettings } from "@/hooks/use-settings";

interface StepIdealClientProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

export function StepIdealClient({ data, onChange }: StepIdealClientProps) {
  const [showAI, setShowAI] = useState(false);
  useSettings();
  
  const { messages, sendMessage } = useChat();

  const handleAIHelp = async () => {
    setShowAI(true);
    if (messages.length === 0) {
      await sendMessage({
        role: "user",
        parts: [{
          type: "text",
          text: `I'm working on Step 1 of my offer builder - defining my ideal client. Here's what I have so far:

Ideal Client: ${data.idealClient || "Not defined yet"}
Their Limitation: ${data.limitation || "Not defined yet"}

Can you help me refine this or give me guidance on how to better define my ideal client and their biggest limitation?`
        }]
      });
    }
  };

  const handleAIQuestion = async (question: string) => {
    await sendMessage({
      role: "user",
      parts: [{ type: "text", text: question }]
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="idealClient" className="text-base font-semibold text-amber-900 mb-3 block">
              Who is your ideal client?
            </Label>
            <Textarea
              id="idealClient"
              placeholder="Describe your perfect customer in detail. What industry are they in? What's their role? What challenges do they face? What are their goals?"
              value={data.idealClient || ""}
              onChange={(e) => onChange({ idealClient: e.target.value })}
              className="min-h-[120px] border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white/80"
            />
            <p className="text-sm text-amber-600 mt-2">
              Be specific about demographics, psychographics, and their current situation.
            </p>
          </div>

          <div>
            <Label htmlFor="limitation" className="text-base font-semibold text-amber-900 mb-3 block">
              What is their biggest limitation (thorn in the paw)?
            </Label>
            <Textarea
              id="limitation"
              placeholder="What's the one thing that's really bothering them? What keeps them up at night? What frustration do they complain about most?"
              value={data.limitation || ""}
              onChange={(e) => onChange({ limitation: e.target.value })}
              className="min-h-[120px] border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white/80"
            />
            <p className="text-sm text-amber-600 mt-2">
              Focus on their most painful problem - the one they&apos;d pay to solve immediately.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Pro Tips for Ideal Client Definition
            </h3>
            <div className="space-y-3 text-sm text-amber-800">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Be specific about their industry, role, and company size</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Include their goals, fears, and current frustrations</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Think about where they hang out online and offline</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Consider their budget and decision-making process</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleAIHelp}
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ask AI for Help
          </Button>
        </div>
      </div>

      {showAI && (
        <Card className="border-amber-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                AI Assistant
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAI(false)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-indigo-100 text-indigo-900 ml-8"
                      : "bg-white text-gray-800 mr-8"
                  }`}
                >
                  <div className="text-sm">
                    {message.parts
                      ?.filter((part) => part.type === "text")
                      .map((part) => part.text)
                      .join("")}
                  </div>
                </div>
              ))}
              

            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("Can you help me identify the specific pain points my ideal client faces?")}
                className="text-xs"
              >
                Identify pain points
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("How can I make my ideal client description more specific?")}
                className="text-xs"
              >
                Make it more specific
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("What questions should I ask to validate this ideal client?")}
                className="text-xs"
              >
                Validation questions
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}