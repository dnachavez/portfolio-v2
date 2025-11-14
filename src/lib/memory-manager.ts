import { MemoryClient } from "mem0ai";
import { rewriteQueryForMemory } from "./agents/query-rewriter";

const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY!,
});

export interface MemoryContext {
  userPreferences?: string;
  previousClarifications?: string;
  attemptedDocs?: string[];
  conversationContext?: string;
}

export async function retrieveMemories(
  sessionId: string,
  userMessage: string
): Promise<MemoryContext> {
  try {
    const rewriteResult = await rewriteQueryForMemory(userMessage);
    const searchQuery =
      rewriteResult.success && rewriteResult.data
        ? rewriteResult.data.rewrittenQuery
        : userMessage;

    const memories = await mem0.search(searchQuery, {
      user_id: sessionId,
      limit: 10,
    });

    if (!memories || memories.length === 0) {
      return {};
    }

    const context: MemoryContext = {
      attemptedDocs: [],
    };

    const preferences: string[] = [];
    const clarifications: string[] = [];
    const conversationPieces: string[] = [];

    for (const memory of memories) {
      const content =
        (memory as any).memory || (memory as any).data?.memory || "";

      if (
        content.includes("prefers") ||
        content.includes("likes") ||
        content.includes("dislikes")
      ) {
        preferences.push(content);
      } else if (
        content.includes("clarified") ||
        content.includes("specified")
      ) {
        clarifications.push(content);
      } else if (content.includes("tried") || content.includes("attempted")) {
        const docMatch = content.match(/tried (\w+)/);
        if (docMatch && context.attemptedDocs) {
          context.attemptedDocs.push(docMatch[1]);
        }
      } else {
        conversationPieces.push(content);
      }
    }

    if (preferences.length > 0) {
      context.userPreferences = preferences.join("; ");
    }
    if (clarifications.length > 0) {
      context.previousClarifications = clarifications.join("; ");
    }
    if (conversationPieces.length > 0) {
      context.conversationContext = conversationPieces.join("; ");
    }

    return context;
  } catch (error) {
    return {};
  }
}

export async function addMemories(
  sessionId: string,
  userMessage: string,
  finalAnswer: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await mem0.add(
      [
        {
          role: "user",
          content: userMessage,
        },
        {
          role: "assistant",
          content: finalAnswer,
        },
      ],
      {
        user_id: sessionId,
        metadata: {
          timestamp: new Date().toISOString(),
          ...metadata,
        },
      }
    );
  } catch (error) {
  }
}

export function formatMemoryForPrompt(context: MemoryContext): string {
  const parts: string[] = [];

  if (context.userPreferences) {
    parts.push(`User preferences: ${context.userPreferences}`);
  }

  if (context.previousClarifications) {
    parts.push(`Previous clarifications: ${context.previousClarifications}`);
  }

  if (context.attemptedDocs && context.attemptedDocs.length > 0) {
    parts.push(`Previously tried sources: ${context.attemptedDocs.join(", ")}`);
  }

  if (context.conversationContext) {
    parts.push(`Conversation context: ${context.conversationContext}`);
  }

  return parts.length > 0 ? `\n\nMemory Context:\n${parts.join("\n")}` : "";
}

export async function cleanupExpiredMemories(): Promise<{
  deleted: number;
  errors: number;
}> {
  try {
    return {
      deleted: 0,
      errors: 0,
    };
  } catch (error) {
    return {
      deleted: 0,
      errors: 1,
    };
  }
}
