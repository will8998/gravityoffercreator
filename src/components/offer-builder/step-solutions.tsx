"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, MessageCircle, X, Lightbulb, Map, Wrench } from "lucide-react";
import { OfferData } from "@/app/builder/page";
import { useChat } from "@ai-sdk/react";
import { useSettings } from "@/hooks/use-settings";

interface StepSolutionsProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

export function StepSolutions({ data, onChange }: StepSolutionsProps) {
  const [showAI, setShowAI] = useState(false);
  useSettings();
  
  const { messages, sendMessage } = useChat();

  const solutionsData = data.solutionsInventory || {
    clarity: "",
    plan: "",
    integration: { diy: "", dwy: "", dfy: "" }
  };

  const updateSolutions = (updates: Partial<typeof solutionsData>) => {
    onChange({
      solutionsInventory: { ...solutionsData, ...updates }
    });
  };

  const updateIntegration = (type: "diy" | "dwy" | "dfy", value: string) => {
    updateSolutions({
      integration: { ...solutionsData.integration, [type]: value }
    });
  };

  const handleAIHelp = async () => {
    setShowAI(true);
    if (messages.length === 0) {
      await sendMessage({
        role: "user",
        parts: [{
          type: "text",
          text: `I'm working on Step 2 of my offer builder - cataloging my solutions inventory. Here's what I have so far:

Clarity Solutions: ${solutionsData.clarity || "Not defined yet"}
Plan Solutions: ${solutionsData.plan || "Not defined yet"}
Integration - DIY: ${solutionsData.integration.diy || "Not defined yet"}
Integration - DWY: ${solutionsData.integration.dwy || "Not defined yet"}
Integration - DFY: ${solutionsData.integration.dfy || "Not defined yet"}

Can you help me brainstorm more solutions or organize what I have better?`
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Clarity Bucket</h3>
              <p className="text-sm text-blue-700">Knowledge & Understanding</p>
            </div>
          </div>
          <Label htmlFor="clarity" className="text-sm font-medium text-blue-800 mb-2 block">
            Trainings, Courses, Frameworks
          </Label>
          <Textarea
            id="clarity"
            placeholder="List your educational content, frameworks, methodologies, training programs..."
            value={solutionsData.clarity}
            onChange={(e) => updateSolutions({ clarity: e.target.value })}
            className="min-h-[120px] border-blue-200 focus:border-blue-400 bg-white/80"
          />
          <p className="text-xs text-blue-600 mt-2">
            What do you teach? What frameworks do you use?
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Plan Bucket</h3>
              <p className="text-sm text-green-700">Strategy & Direction</p>
            </div>
          </div>
          <Label htmlFor="plan" className="text-sm font-medium text-green-800 mb-2 block">
            Roadmaps, Workbooks, Blueprints
          </Label>
          <Textarea
            id="plan"
            placeholder="List your strategic planning tools, roadmaps, step-by-step guides..."
            value={solutionsData.plan}
            onChange={(e) => updateSolutions({ plan: e.target.value })}
            className="min-h-[120px] border-green-200 focus:border-green-400 bg-white/80"
          />
          <p className="text-xs text-green-600 mt-2">
            How do you help them plan and strategize?
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Integration Bucket</h3>
              <p className="text-sm text-purple-700">Implementation Support</p>
            </div>
          </div>
          
          <Tabs defaultValue="diy" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="diy" className="text-xs">DIY</TabsTrigger>
              <TabsTrigger value="dwy" className="text-xs">DWY</TabsTrigger>
              <TabsTrigger value="dfy" className="text-xs">DFY</TabsTrigger>
            </TabsList>
            
            <TabsContent value="diy" className="space-y-3">
              <Label className="text-sm font-medium text-purple-800">
                Do It Yourself
              </Label>
              <Textarea
                placeholder="Templates, checklists, tools they can use independently..."
                value={solutionsData.integration.diy}
                onChange={(e) => updateIntegration("diy", e.target.value)}
                className="min-h-[80px] border-purple-200 focus:border-purple-400 bg-white/80"
              />
              <p className="text-xs text-purple-600">
                Self-service resources and tools
              </p>
            </TabsContent>
            
            <TabsContent value="dwy" className="space-y-3">
              <Label className="text-sm font-medium text-purple-800">
                Done With You
              </Label>
              <Textarea
                placeholder="Coaching, group calls, community support, guided implementation..."
                value={solutionsData.integration.dwy}
                onChange={(e) => updateIntegration("dwy", e.target.value)}
                className="min-h-[80px] border-purple-200 focus:border-purple-400 bg-white/80"
              />
              <p className="text-xs text-purple-600">
                Collaborative support and guidance
              </p>
            </TabsContent>
            
            <TabsContent value="dfy" className="space-y-3">
              <Label className="text-sm font-medium text-purple-800">
                Done For You
              </Label>
              <Textarea
                placeholder="Services you provide, work you do for them, deliverables..."
                value={solutionsData.integration.dfy}
                onChange={(e) => updateIntegration("dfy", e.target.value)}
                className="min-h-[80px] border-purple-200 focus:border-purple-400 bg-white/80"
              />
              <p className="text-xs text-purple-600">
                Full-service implementation
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleAIHelp}
          variant="outline"
          className="border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Ask AI for Help
        </Button>
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
                onClick={() => handleAIQuestion("Help me brainstorm more clarity solutions (trainings, frameworks)")}
                className="text-xs"
              >
                More clarity solutions
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("What planning tools could I create for my clients?")}
                className="text-xs"
              >
                Planning tools ideas
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("How can I balance DIY, DWY, and DFY offerings?")}
                className="text-xs"
              >
                Balance delivery methods
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}