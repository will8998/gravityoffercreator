"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Key, Eye, EyeOff, Check, X, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

function maskKey(key: string): string {
  if (!key) return "";
  if (key.length <= 8) return "••••••••";
  return key.slice(0, 5) + "•".repeat(Math.min(key.length - 8, 20)) + key.slice(-3);
}

export default function SettingsPage() {
  const { settings, saveSettings, isLoaded } = useSettings();
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [showOpenai, setShowOpenai] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  const handleSaveOpenai = () => {
    if (!openaiKey.trim()) return;
    saveSettings({ openaiKey: openaiKey.trim() });
    setOpenaiKey("");
    toast.success("OpenAI API key saved");
  };

  const handleSaveAnthropic = () => {
    if (!anthropicKey.trim()) return;
    saveSettings({ anthropicKey: anthropicKey.trim() });
    setAnthropicKey("");
    toast.success("Anthropic API key saved");
  };

  const handleTestConnection = async () => {
    const activeKey =
      settings.provider === "anthropic"
        ? settings.anthropicKey
        : settings.openaiKey;

    if (!activeKey) {
      toast.error("No API key configured for the selected provider");
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Say hello in 5 words or less." }],
          provider: settings.provider,
          apiKey: activeKey,
        }),
      });

      if (res.ok) {
        setTestResult("success");
        toast.success("Connection successful!");
      } else {
        setTestResult("error");
        toast.error("Connection failed. Check your API key.");
      }
    } catch {
      setTestResult("error");
      toast.error("Connection failed. Check your API key.");
    } finally {
      setTesting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-96" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Configure your AI provider and API keys
          </p>
        </header>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-accent" />
                AI Provider
              </CardTitle>
              <CardDescription>
                Choose which AI model powers your Gravity assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => saveSettings({ provider: "openai" })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    settings.provider === "openai"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="font-semibold text-foreground">OpenAI</div>
                  <div className="text-sm text-muted-foreground mt-1">GPT-4o</div>
                  {settings.provider === "openai" && (
                    <Badge className="mt-2 bg-accent text-accent-foreground">Active</Badge>
                  )}
                </button>
                <button
                  onClick={() => saveSettings({ provider: "anthropic" })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    settings.provider === "anthropic"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="font-semibold text-foreground">Anthropic</div>
                  <div className="text-sm text-muted-foreground mt-1">Claude Sonnet</div>
                  {settings.provider === "anthropic" && (
                    <Badge className="mt-2 bg-accent text-accent-foreground">Active</Badge>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5 text-accent" />
                API Keys
              </CardTitle>
              <CardDescription>
                Your keys are stored locally in your browser — never sent to our servers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">OpenAI API Key</Label>
                {settings.openaiKey ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono text-muted-foreground">
                      {showOpenai ? settings.openaiKey : maskKey(settings.openaiKey)}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowOpenai(!showOpenai)}>
                      {showOpenai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        saveSettings({ openaiKey: "" });
                        toast.success("OpenAI key removed");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveOpenai()}
                    />
                    <Button onClick={handleSaveOpenai} disabled={!openaiKey.trim()}>
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Anthropic API Key</Label>
                {settings.anthropicKey ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono text-muted-foreground">
                      {showAnthropic ? settings.anthropicKey : maskKey(settings.anthropicKey)}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowAnthropic(!showAnthropic)}>
                      {showAnthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        saveSettings({ anthropicKey: "" });
                        toast.success("Anthropic key removed");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="sk-ant-..."
                      value={anthropicKey}
                      onChange={(e) => setAnthropicKey(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveAnthropic()}
                    />
                    <Button onClick={handleSaveAnthropic} disabled={!anthropicKey.trim()}>
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Connection</CardTitle>
              <CardDescription>
                Verify your API key works with the selected provider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button onClick={handleTestConnection} disabled={testing} className="min-w-[160px]">
                  {testing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
                {testResult === "success" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Connected successfully</span>
                  </div>
                )}
                {testResult === "error" && (
                  <div className="flex items-center gap-2 text-destructive">
                    <X className="h-4 w-4" />
                    <span className="text-sm font-medium">Connection failed</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}