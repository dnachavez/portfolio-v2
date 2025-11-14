"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";
import {
  getOrCreateSession,
  addMessageToSession,
  getSessionMessages,
  type ChatMessage,
} from "@/lib/session-manager";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: string;
  statusDetail?: string;
}

interface ChatPopoverProps {
  onMessageSent?: () => void;
  externalMessage?: string;
  onExternalMessageProcessed?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export function ChatPopover({
  onMessageSent,
  externalMessage,
  onExternalMessageProcessed,
  onOpenChange,
}: ChatPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [currentStatusDetail, setCurrentStatusDetail] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sessionInitialized, setSessionInitialized] = useState(false);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (typeof window === "undefined" || sessionInitialized) return;

    const stored = sessionStorage.getItem("chat_session");

    if (stored) {
      const savedMessages = getSessionMessages();
      if (savedMessages.length > 0) {
        setMessages(
          savedMessages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      }
    } else {
      const welcomeMessage: Message = {
        role: "assistant",
        content:
          "Hi! I'm Dan. Ask me anything about my work experience, skills, projects, or background!",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }

    setSessionInitialized(true);
  }, [sessionInitialized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(
    async (messageText?: string) => {
      const userMessage = messageText || input.trim();
      if (!userMessage || isLoading) return;

      setInput("");

      const session = getOrCreateSession();

      const newUserMessage: Message = {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      addMessageToSession(newUserMessage);

      setIsLoading(true);
      setCurrentStatus("thinking");
      setCurrentStatusDetail("Thinking...");
      onMessageSent?.();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            sessionId: session.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response body");
        }

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === "status") {
                  setCurrentStatus(data.status);
                  setCurrentStatusDetail(data.detail || "");
                } else if (data.type === "response") {
                  const assistantMessage: Message = {
                    role: "assistant",
                    content: data.response,
                    timestamp: new Date(),
                  };
                  setMessages((prev) => [...prev, assistantMessage]);

                  addMessageToSession(assistantMessage);

                  setCurrentStatus("");
                  setCurrentStatusDetail("");
                }
              } catch (e) {
              }
            }
          }
        }
      } catch (error) {
        const errorMessage: Message = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);

        addMessageToSession(errorMessage);

        setCurrentStatus("");
        setCurrentStatusDetail("");
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, onMessageSent]
  );

  useEffect(() => {
    if (externalMessage) {
      setIsOpen(true);
      handleSendMessage(externalMessage);
      onExternalMessageProcessed?.();
    }
  }, [externalMessage, handleSendMessage, onExternalMessageProcessed]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-12 relative"
          )}
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          <div className="relative size-4">
            <Icons.messageBubble
              className={cn(
                "absolute inset-0 size-4 transition-all duration-300",
                isOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              )}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "absolute inset-0 size-4 transition-all duration-300",
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              )}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-[380px] p-0 mb-2 border-0 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      >
        <div className="flex flex-col h-[500px]">
          <div className="px-5 py-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-primary/10">
                <Image
                  src="/avatar/me-light.png"
                  alt="Dan"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover dark:hidden"
                />
                <Image
                  src="/avatar/me-dark.png"
                  alt="Dan"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover hidden dark:block"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chat with Dan</h3>
                <p className="text-xs text-muted-foreground">
                  Always here to help
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500",
                  message.role === "user" ? "justify-end" : ""
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/10">
                    <Image
                      src="/avatar/me-light.png"
                      alt="Dan"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover dark:hidden"
                    />
                    <Image
                      src="/avatar/me-dark.png"
                      alt="Dan"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover hidden dark:block"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "flex-1 space-y-1",
                    message.role === "user" ? "flex flex-col items-end" : ""
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "assistant"
                        ? "bg-background rounded-tl-sm ring-1 ring-border/40"
                        : "bg-primary text-primary-foreground rounded-tr-sm max-w-[85%]"
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm leading-relaxed prose prose-sm max-w-none",
                        message.role === "assistant"
                          ? "prose-slate dark:prose-invert"
                          : "prose-invert"
                      )}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 last:mb-0 ml-4">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 last:mb-0 ml-4">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1">{children}</li>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:no-underline"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children, className }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="bg-muted/50 px-1 py-0.5 rounded text-xs">
                                {children}
                              </code>
                            ) : (
                              <code className={className}>{children}</code>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs text-muted-foreground",
                      message.role === "user" ? "pr-1" : "pl-1"
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/10">
                  <Image
                    src="/avatar/me-light.png"
                    alt="Dan"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover dark:hidden"
                  />
                  <Image
                    src="/avatar/me-dark.png"
                    alt="Dan"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover hidden dark:block"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="bg-background rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm ring-1 ring-border/40">
                    <div className="flex items-center gap-2.5">
                      <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
                      <div className="text-sm">
                        <div className="text-foreground animate-pulse">
                          {currentStatusDetail || "Processing..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border/40 bg-background">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="w-full pl-4 pr-12 py-3 text-sm rounded-full bg-muted/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/60 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="text-xs text-muted-foreground/60 text-center mt-3 space-y-0.5">
              <p>Powered by Groq using openai/gpt-oss-120b</p>
              <p>Memory layer powered by mem0</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
