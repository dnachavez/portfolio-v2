"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface ChatWelcomeCardProps {
  onQuestionClick?: (question: string) => void;
  onClose?: () => void;
}

export function ChatWelcomeCard({
  onQuestionClick,
  onClose,
}: ChatWelcomeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const questions = [
    "What AI projects has Dan worked on?",
    "Tell me about Dan's experience with multi-agent systems",
    "What technologies does Dan specialize in?",
    "What are Dan's recent achievements?",
  ];

  return (
    <div
      className="relative w-[240px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <button
        onClick={onClose}
        className={`absolute -top-8 right-0 z-10 rounded-full bg-background p-1.5 shadow-sm ring-1 ring-border/40 transition-opacity duration-200 hover:bg-muted ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close welcome card"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="rounded-xl bg-background px-5 py-3.5 shadow-sm ring-1 ring-border/40">
        <p className="text-xs font-normal leading-relaxed">
          👋 Hi! I&apos;m Dan, ask me anything!
        </p>
      </div>

      <div className="mt-3 flex flex-col items-stretch gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick?.(question)}
            className="rounded-2xl border border-primary/40 bg-card px-5 py-2 text-[11px] text-foreground transition-all hover:bg-foreground hover:text-background hover:border-foreground hover:shadow-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
