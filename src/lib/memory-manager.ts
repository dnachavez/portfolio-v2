/**
 * Memory Manager using mem0
 * Handles conversation memory storage and retrieval
 */

import { MemoryClient } from "mem0ai";
import { rewriteQueryForMemory } from "./agents/query-rewriter";

// Initialize mem0 client
const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY!,
});

export interface MemoryContext {
  userPreferences?: string;
  previousClarifications?: string;
  attemptedDocs?: string[];
  conversationContext?: string;
}

/**
 * Retrieve memories for a session
 * Returns formatted context to enhance system prompts and queries
 *
 * Uses query rewriting agent to optimize search queries before retrieval
 */
export async function retrieveMemories(
  sessionId: string,
  userMessage: string
): Promise<MemoryContext> {
  try {
    // Step 1: Rewrite query for better memory retrieval
    const rewriteResult = await rewriteQueryForMemory(userMessage);
    const searchQuery =
      rewriteResult.success && rewriteResult.data
        ? rewriteResult.data.rewrittenQuery
        : userMessage; // Fallback to original if rewriting fails

    if (rewriteResult.success && rewriteResult.data) {
      console.log(`🔄 Query rewritten: "${userMessage}" → "${searchQuery}"`);
      console.log(`   Reasoning: ${rewriteResult.data.reasoning}`);
    }

    // Step 2: Search memories with optimized query
    const memories = await mem0.search(searchQuery, {
      user_id: sessionId,
      limit: 10,
    });

    if (!memories || memories.length === 0) {
      return {};
    }

    console.log(
      `🔍 Found ${memories.length} relevant memor${memories.length === 1 ? "y" : "ies"}`
    );

    // Parse and categorize memories
    const context: MemoryContext = {
      attemptedDocs: [],
    };

    const preferences: string[] = [];
    const clarifications: string[] = [];
    const conversationPieces: string[] = [];

    for (const memory of memories) {
      // mem0 API returns memory in different fields depending on version
      const content =
        (memory as any).memory || (memory as any).data?.memory || "";

      // Categorize based on content patterns
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
        // Extract doc references
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
    console.error("Error retrieving memories:", error);
    return {};
  }
}

/**
 * Add memories after validation
 * Stores user turn + final answer with TTL for conversation memory
 */
export async function addMemories(
  sessionId: string,
  userMessage: string,
  finalAnswer: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const result = await mem0.add(
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

    console.log(`✅ Memory added for session ${sessionId}`);
  } catch (error) {
    console.error("Error adding memories:", error);
    // Don't throw - memory failures shouldn't break the chat
  }
}

/**
 * Format memory context for system prompt
 */
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

/**
 * Delete expired memories (for cron job)
 */
export async function cleanupExpiredMemories(): Promise<{
  deleted: number;
  errors: number;
}> {
  try {
    // mem0 handles TTL automatically, but we can manually check and delete if needed
    // This is a placeholder for any custom cleanup logic
    console.log(
      "Memory cleanup: TTL-based expiry is handled automatically by mem0"
    );

    return {
      deleted: 0,
      errors: 0,
    };
  } catch (error) {
    console.error("Error during memory cleanup:", error);
    return {
      deleted: 0,
      errors: 1,
    };
  }
}
