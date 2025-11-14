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
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function getOrCreateSession(): ChatSession {
  if (typeof window === "undefined") {
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
      if (session.expiresAt > now) {
        session.lastActivity = now;
        saveSession(session);
        return session;
      }

      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch (error) {
    sessionStorage.removeItem(SESSION_KEY);
  }

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

export function saveSession(session: ChatSession): void {
  if (typeof window === "undefined") return;

  try {
    session.lastActivity = new Date();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
  }
}

export function addMessageToSession(message: ChatMessage): void {
  const session = getOrCreateSession();
  session.messages.push(message);
  saveSession(session);
}

export function getSessionMessages(): ChatMessage[] {
  const session = getOrCreateSession();
  return session.messages;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
  }
}

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
    return null;
  }
}

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
