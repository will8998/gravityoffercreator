"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    role: "system" | "user" | "assistant";
    parts: Array<{ type: string; text?: string }>;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const messageText = message.parts
    .filter(part => part.type === "text")
    .map(part => part.text)
    .join("");

  return (
    <div 
      className={cn(
        "flex gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn(
        "shrink-0 w-8 h-8 border-2",
        isUser 
          ? "bg-primary border-primary/20" 
          : "bg-accent border-accent/20"
      )}>
        <AvatarFallback className={cn(
          "text-xs font-medium",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent text-accent-foreground"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "flex-1 max-w-[85%]",
        isUser ? "flex justify-end" : "flex justify-start"
      )}>
        {isUser ? (
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-md shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {messageText}
            </p>
          </div>
        ) : (
          <Card className="bg-card/80 border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-pre:border-border">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="text-sm leading-relaxed mb-3 last:mb-0">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="text-sm space-y-1 mb-3 last:mb-0 ml-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="text-sm space-y-1 mb-3 last:mb-0 ml-4">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">
                        {children}
                      </li>
                    ),
                    h1: ({ children }) => (
                      <h1 className="font-display text-lg font-semibold mb-3 text-foreground">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-display text-base font-semibold mb-2 text-foreground">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-display text-sm font-semibold mb-2 text-foreground">
                        {children}
                      </h3>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-muted border border-border rounded-lg p-3 overflow-x-auto text-xs font-mono mb-3 last:mb-0">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground mb-3 last:mb-0">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {messageText}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}