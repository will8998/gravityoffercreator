"use client";

import { useState, useEffect, useCallback } from "react";

export interface Settings {
  openaiKey: string;
  anthropicKey: string;
  provider: "openai" | "anthropic";
  useClaudeMax: boolean;
  claudeMaxToken: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    openaiKey: "",
    anthropicKey: "",
    provider: "openai",
    useClaudeMax: false,
    claudeMaxToken: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [claudeMaxAvailable, setClaudeMaxAvailable] = useState(false);

  const checkClaudeMax = useCallback(async () => {
    try {
      const response = await fetch("/api/auth");
      if (response.ok) {
        const data = await response.json();
        if (data.available && data.accessToken && !data.expired) {
          setClaudeMaxAvailable(true);
          setSettings((prev) => ({
            ...prev,
            claudeMaxToken: data.accessToken,
          }));
          return true;
        }
      }
    } catch {
      // OpenCode auth not available
    }
    setClaudeMaxAvailable(false);
    return false;
  }, []);

  useEffect(() => {
    const openaiKey = localStorage.getItem("gravity-openai-key") || "";
    const anthropicKey = localStorage.getItem("gravity-anthropic-key") || "";
    const provider =
      (localStorage.getItem("gravity-provider") as "openai" | "anthropic") ||
      "openai";
    const useClaudeMax =
      localStorage.getItem("gravity-use-claude-max") === "true";
    setSettings((prev) => ({
      ...prev,
      openaiKey,
      anthropicKey,
      provider,
      useClaudeMax,
    }));

    checkClaudeMax().then(() => {
      setIsLoaded(true);
    });
  }, [checkClaudeMax]);

  const saveSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    if (newSettings.openaiKey !== undefined)
      localStorage.setItem("gravity-openai-key", newSettings.openaiKey);
    if (newSettings.anthropicKey !== undefined)
      localStorage.setItem("gravity-anthropic-key", newSettings.anthropicKey);
    if (newSettings.provider !== undefined)
      localStorage.setItem("gravity-provider", newSettings.provider);
    if (newSettings.useClaudeMax !== undefined)
      localStorage.setItem(
        "gravity-use-claude-max",
        String(newSettings.useClaudeMax)
      );
    setSettings(updated);
  };

  const getActiveKey = () => {
    if (settings.useClaudeMax && settings.claudeMaxToken) {
      return "";
    }
    return settings.provider === "anthropic"
      ? settings.anthropicKey
      : settings.openaiKey;
  };

  const getAuthToken = () => {
    if (settings.useClaudeMax && settings.claudeMaxToken) {
      return settings.claudeMaxToken;
    }
    return "";
  };

  const getEffectiveProvider = () => {
    if (settings.useClaudeMax) return "anthropic";
    return settings.provider;
  };

  const hasValidAuth = () => {
    if (settings.useClaudeMax && settings.claudeMaxToken) return true;
    return !!getActiveKey();
  };

  return {
    settings,
    saveSettings,
    getActiveKey,
    getAuthToken,
    getEffectiveProvider,
    hasValidAuth,
    isLoaded,
    claudeMaxAvailable,
    checkClaudeMax,
  };
}
