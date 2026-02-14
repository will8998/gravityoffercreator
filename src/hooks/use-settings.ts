"use client";

import { useState, useEffect } from "react";

export interface Settings {
  openaiKey: string;
  anthropicKey: string;
  provider: "openai" | "anthropic";
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    openaiKey: "",
    anthropicKey: "",
    provider: "openai",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const openaiKey = localStorage.getItem("gravity-openai-key") || "";
    const anthropicKey = localStorage.getItem("gravity-anthropic-key") || "";
    const provider =
      (localStorage.getItem("gravity-provider") as "openai" | "anthropic") ||
      "openai";
    setSettings({ openaiKey, anthropicKey, provider });
    setIsLoaded(true);
  }, []);

  const saveSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    if (newSettings.openaiKey !== undefined)
      localStorage.setItem("gravity-openai-key", newSettings.openaiKey);
    if (newSettings.anthropicKey !== undefined)
      localStorage.setItem("gravity-anthropic-key", newSettings.anthropicKey);
    if (newSettings.provider !== undefined)
      localStorage.setItem("gravity-provider", newSettings.provider);
    setSettings(updated);
  };

  const getActiveKey = () => {
    return settings.provider === "anthropic"
      ? settings.anthropicKey
      : settings.openaiKey;
  };

  return { settings, saveSettings, getActiveKey, isLoaded };
}
