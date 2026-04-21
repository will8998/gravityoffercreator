"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    };

    // Update immediately
    updateTime();

    // Set up interval to update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-[#161616]"
    >
      <div className="flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <div className="text-white font-bold text-xl font-[family-name:var(--font-clash-display)]">
          Gravity.
        </div>

        {/* Time and Location */}
        <div className="flex items-center gap-2 text-white text-sm font-[family-name:var(--font-inter)]">
          <span className="uppercase tracking-wide opacity-60">LOCAL/</span>
          <span className="font-mono tabular-nums">{currentTime}</span>
        </div>
      </div>
    </header>
  );
}