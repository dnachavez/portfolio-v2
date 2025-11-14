import { useState, useEffect } from "react";
import { getSessionInfo, hasActiveSession } from "@/lib/session-manager";

/**
 * Hook to monitor chat session status
 */
export function useChatSession() {
  const [sessionInfo, setSessionInfo] =
    useState<ReturnType<typeof getSessionInfo>>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSessionInfo = () => {
      setSessionInfo(getSessionInfo());
      setIsActive(hasActiveSession());
    };

    updateSessionInfo();

    const interval = setInterval(updateSessionInfo, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    sessionInfo,
    isActive,
  };
}
