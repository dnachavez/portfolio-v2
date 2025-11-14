"use client";

import { useChatSession } from "@/hooks/use-chat-session";
import { cn } from "@/lib/utils";

interface SessionIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export function SessionIndicator({
  className,
  showDetails = false,
}: SessionIndicatorProps) {
  const { sessionInfo, isActive } = useChatSession();

  if (!isActive || !sessionInfo) {
    return null;
  }

  return (
    <div className={cn("text-xs text-muted-foreground", className)}>
      {showDetails ? (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Session Active</span>
          </div>
          <div className="pl-4 space-y-0.5 opacity-70">
            <div>Messages: {sessionInfo.messageCount}</div>
            <div>Expires in: {sessionInfo.timeRemaining}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span>Session active • {sessionInfo.messageCount} messages</span>
        </div>
      )}
    </div>
  );
}
