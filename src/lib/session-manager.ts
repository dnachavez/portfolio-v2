/**
 * Session Manager for Chat
 * Handles session creation, persistence, and cleanup
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  createdAt: Date;
  expiresAt: Date;
  messages: ChatMessage[];
  lastActivity: Date;
}

const SESSION_KEY = "chat_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get the current active session or create a new one
 */
export function getOrCreateSession(): ChatSession {
  if (typeof window === "undefined") {
    // Server-side, return a temporary session
    const now = new Date();
    return {
      id: generateSessionId(),
      createdAt: now,
      expiresAt: new Date(now.getTime() + SESSION_DURATION_MS),
      messages: [],
      lastActivity: now,
    };
  }

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);

    if (stored) {
      const session: ChatSession = JSON.parse(stored, (key, value) => {
        // Convert date strings back to Date objects
        if (
          key === "createdAt" ||
          key === "expiresAt" ||
          key === "lastActivity"
        ) {
          return new Date(value);
        }
        if (key === "timestamp") {
          return new Date(value);
        }
        return value;
      });

      // Check if session is still valid
      const now = new Date();
      if (session.expiresAt > now) {
        // Session is valid, update last activity
        session.lastActivity = now;
        saveSession(session);
        return session;
      }

      // Session expired, clear it
      console.log("Session expired, creating new session");
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch (error) {
    console.error("Error loading session:", error);
    sessionStorage.removeItem(SESSION_KEY);
  }

  // Create new session
  const now = new Date();
  const newSession: ChatSession = {
    id: generateSessionId(),
    createdAt: now,
    expiresAt: new Date(now.getTime() + SESSION_DURATION_MS),
    messages: [],
    lastActivity: now,
  };

  saveSession(newSession);
  return newSession;
}

/**
 * Save session to sessionStorage
 */
export function saveSession(session: ChatSession): void {
  if (typeof window === "undefined") return;

  try {
    session.lastActivity = new Date();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

/**
 * Add a message to the current session
 */
export function addMessageToSession(message: ChatMessage): void {
  const session = getOrCreateSession();
  session.messages.push(message);
  saveSession(session);
}

/**
 * Get all messages from the current session
 */
export function getSessionMessages(): ChatMessage[] {
  const session = getOrCreateSession();
  return session.messages;
}

/**
 * Clear the current session
 */
export function clearSession(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
}

/**
 * Get session info (for debugging/display)
 */
export function getSessionInfo(): {
  id: string;
  createdAt: Date;
  expiresAt: Date;
  messageCount: number;
  timeRemaining: string;
} | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const session: ChatSession = JSON.parse(stored, (key, value) => {
      if (
        key === "createdAt" ||
        key === "expiresAt" ||
        key === "lastActivity"
      ) {
        return new Date(value);
      }
      if (key === "timestamp") {
        return new Date(value);
      }
      return value;
    });

    const now = new Date();
    const timeRemaining = session.expiresAt.getTime() - now.getTime();
    const daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
    const hoursRemaining = Math.floor(
      (timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );

    return {
      id: session.id,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      messageCount: session.messages.length,
      timeRemaining: `${daysRemaining}d ${hoursRemaining}h`,
    };
  } catch (error) {
    console.error("Error getting session info:", error);
    return null;
  }
}

/**
 * Check if there's an active session
 */
export function hasActiveSession(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return false;

    const session: ChatSession = JSON.parse(stored, (key, value) => {
      if (key === "expiresAt") {
        return new Date(value);
      }
      return value;
    });

    return session.expiresAt > new Date();
  } catch (error) {
    return false;
  }
}
