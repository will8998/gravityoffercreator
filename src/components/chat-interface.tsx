"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/components/chat-message";
import { Send, Sparkles } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

const STARTER_PROMPTS = [
  "Help me identify my ideal client and their biggest limitation",
  "I want to craft a No-Phone Offer outcome statement",
  "Review my current offer against the 4 principles",
  "Help me build a 3-step roadmap for my offer"
];

export function ChatInterface() {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { settings, getActiveKey, isLoaded } = useSettings();

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      body: {
        provider: settings?.provider,
        apiKey: getActiveKey(),
      },
    }),
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || status === "submitted" || status === "streaming") return;
    
    sendMessage({ role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (status === "submitted" || status === "streaming") return;
    sendMessage({ role: "user", parts: [{ type: "text", text: prompt }] });
  };

  if (isLoaded && !getActiveKey()) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md mx-auto border-2 border-dashed border-border">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Configure AI Settings
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              To start chatting, please configure your AI provider and API key in settings.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/settings">Go to Settings</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                    Welcome to Gravity
                  </h2>
                  <p className="text-muted-foreground">
                    Your AI expert for building high-converting No-Phone Offers. 
                    Ask me anything about identifying your ideal client, crafting compelling outcomes, 
                    or implementing the 4 core principles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {STARTER_PROMPTS.map((prompt, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-foreground font-medium leading-relaxed">
                        {prompt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm">AI is thinking...</span>
                {status === "streaming" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={stop}
                    className="h-6 px-2 text-xs"
                  >
                    Stop
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your No-Phone Offer strategy..."
              className="min-h-[44px] max-h-[120px] resize-none pr-12 bg-background/80 border-border/60 focus:border-accent/60 focus:ring-accent/20 rounded-lg"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2">
              <Button
                size="sm"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}