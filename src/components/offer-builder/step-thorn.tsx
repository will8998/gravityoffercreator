"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageCircle, X, Plus, Trash2, Target } from "lucide-react";
import { OfferData } from "@/app/builder/page";
import { useChat } from "@ai-sdk/react";
import { useSettings } from "@/hooks/use-settings";

interface StepThornProps {
  data: OfferData;
  onChange: (updates: Partial<OfferData>) => void;
}

interface ThornItem {
  thing: string;
  todoList: string;
  mindShare: number;
  emotionalTemp: number;
  tai: boolean;
  hardToFind: boolean;
  total: number;
}

export function StepThorn({ data, onChange }: StepThornProps) {
  const [showAI, setShowAI] = useState(false);
  useSettings();
  
  const { messages, sendMessage } = useChat();

  const thornData = data.thornScorecard || [];

  const calculateTotal = (item: Omit<ThornItem, "total">): number => {
    const todoScoreMap: Record<string, number> = { D: 3, W: 2, M: 1, Y: 0 };
    const todoScore = todoScoreMap[item.todoList] || 0;
    const taiScore = item.tai ? 1 : 0;
    const hardToFindScore = item.hardToFind ? 1 : 0;
    return todoScore + item.mindShare + item.emotionalTemp + taiScore + hardToFindScore;
  };

  const updateThorn = (index: number, updates: Partial<ThornItem>) => {
    const newThorns = [...thornData];
    const updatedItem = { ...newThorns[index], ...updates };
    updatedItem.total = calculateTotal(updatedItem);
    newThorns[index] = updatedItem;
    onChange({ thornScorecard: newThorns });
  };

  const addThorn = () => {
    const newThorn: ThornItem = {
      thing: "",
      todoList: "D",
      mindShare: 1,
      emotionalTemp: 1,
      tai: false,
      hardToFind: false,
      total: 0
    };
    newThorn.total = calculateTotal(newThorn);
    onChange({ thornScorecard: [...thornData, newThorn] });
  };

  const removeThorn = (index: number) => {
    const newThorns = thornData.filter((_, i) => i !== index);
    onChange({ thornScorecard: newThorns });
  };

  const topScorer = thornData.reduce((max, item, index) => 
    item.total > (thornData[max]?.total || 0) ? index : max, 0
  );

  const handleAIHelp = async () => {
    setShowAI(true);
    if (messages.length === 0) {
      await sendMessage({
        role: "user",
        parts: [{
          type: "text",
          text: `I'm working on Step 3 of my offer builder - scoring pain points (thorns in the paw). Here's what I have so far:

${thornData.length > 0 ? 
  thornData.map((item, i) => `${i + 1}. ${item.thing} (Score: ${item.total})`).join('\n') :
  "No pain points defined yet"
}

Can you help me identify more pain points for my ideal client or improve my scoring?`
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
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <h3 className="font-semibold text-orange-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-600" />
          Scoring Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-orange-800 mb-2">To-Do List</h4>
            <div className="space-y-1 text-orange-700">
              <div>D (Daily) = 1pt</div>
              <div>W (Weekly) = 2pts</div>
              <div>M (Monthly) = 3pts</div>
              <div>Y (Yearly) = 4pts</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-orange-800 mb-2">Mind Share</h4>
            <div className="text-orange-700">1-5 scale: How much mental energy does this consume?</div>
          </div>
          <div>
            <h4 className="font-medium text-orange-800 mb-2">Emotional Temp</h4>
            <div className="text-orange-700">1-5 scale: How frustrated/angry does this make them?</div>
          </div>
          <div>
            <h4 className="font-medium text-orange-800 mb-2">TAI?</h4>
            <div className="text-orange-700">Time, Attention, or Intelligence intensive? +1pt if yes</div>
          </div>
          <div>
            <h4 className="font-medium text-orange-800 mb-2">Hard to Find?</h4>
            <div className="text-orange-700">Is the solution hard to find elsewhere? +1pt if yes</div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {thornData.map((item, index) => (
          <Card key={index} className={`p-6 border-2 transition-all ${
            index === topScorer && thornData.length > 1
              ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
              : "border-amber-200 bg-gradient-to-br from-cream-50 to-amber-50"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-amber-900">#{index + 1}</span>
                {index === topScorer && thornData.length > 1 && (
                  <Badge className="bg-green-500 text-white">Highest Score</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg font-bold">
                  Total: {item.total}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeThorn(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-amber-800 mb-2 block">
                  Thing/Limitation
                </Label>
                <Input
                  placeholder="What specific problem or limitation?"
                  value={item.thing}
                  onChange={(e) => updateThorn(index, { thing: e.target.value })}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-amber-800 mb-2 block">
                  To-Do List
                </Label>
                <Select
                  value={item.todoList}
                  onValueChange={(value) => updateThorn(index, { todoList: value })}
                >
                  <SelectTrigger className="border-amber-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="D">Daily (1pt)</SelectItem>
                    <SelectItem value="W">Weekly (2pts)</SelectItem>
                    <SelectItem value="M">Monthly (3pts)</SelectItem>
                    <SelectItem value="Y">Yearly (4pts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-amber-800 mb-2 block">
                  Mind Share (1-5)
                </Label>
                <Select
                  value={item.mindShare.toString()}
                  onValueChange={(value) => updateThorn(index, { mindShare: parseInt(value) })}
                >
                  <SelectTrigger className="border-amber-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-amber-800 mb-2 block">
                  Emotional Temp (1-5)
                </Label>
                <Select
                  value={item.emotionalTemp.toString()}
                  onValueChange={(value) => updateThorn(index, { emotionalTemp: parseInt(value) })}
                >
                  <SelectTrigger className="border-amber-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`tai-${index}`}
                    checked={item.tai}
                    onChange={(e) => updateThorn(index, { tai: e.target.checked })}
                    className="rounded border-amber-300"
                  />
                  <Label htmlFor={`tai-${index}`} className="text-sm text-amber-800">
                    TAI? (+1pt)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`hard-${index}`}
                    checked={item.hardToFind}
                    onChange={(e) => updateThorn(index, { hardToFind: e.target.checked })}
                    className="rounded border-amber-300"
                  />
                  <Label htmlFor={`hard-${index}`} className="text-sm text-amber-800">
                    Hard to Find? (+1pt)
                  </Label>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex justify-center gap-4">
          <Button
            onClick={addThorn}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Pain Point
          </Button>

          <Button
            onClick={handleAIHelp}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
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
                onClick={() => handleAIQuestion("Help me identify more pain points for my ideal client")}
                className="text-xs"
              >
                More pain points
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("How should I prioritize these pain points?")}
                className="text-xs"
              >
                Prioritization help
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAIQuestion("What makes a pain point worth solving?")}
                className="text-xs"
              >
                Pain point criteria
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}