"use client";

import { ChatInterface } from "@/components/chat-interface";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-1rem)]">
      <header className="shrink-0 p-6 pb-0">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          AI Chat
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your No-Phone Offer expert — ask anything about creating and launching offers
        </p>
      </header>
      <div className="flex-1 min-h-0 p-6">
        <ChatInterface />
      </div>
    </div>
  );
}