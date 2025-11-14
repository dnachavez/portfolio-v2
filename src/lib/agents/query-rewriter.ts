import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { AgentResult } from "./types";

const QueryRewriteSchema = z.object({
  rewrittenQuery: z.string(),
  reasoning: z.string(),
});

export async function rewriteQueryForMemory(
  userMessage: string
): Promise<AgentResult<z.infer<typeof QueryRewriteSchema>>> {
  try {
    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b") as any,
      schema: QueryRewriteSchema,
      prompt: `You are a query rewriting agent. Your job is to transform user questions into optimized search queries for memory retrieval.

User message: "${userMessage}"

Instructions:
1. Extract the core semantic concepts from the user's question
2. Rewrite the query to be more effective for vector similarity search
3. Handle pronouns and implicit references (e.g., "What is my name?" → "user name")
4. Keep the query concise but semantically rich
5. Focus on the information being requested, not the question structure

Examples:
- "What is my name?" → "user name identity"
- "What did I just tell you?" → "recent user statement information"
- "Do you remember my preferences?" → "user preferences settings"
- "What do you know about me?" → "user information facts profile"

Return:
- rewrittenQuery: The optimized search query
- reasoning: Brief explanation of why you rewrote it this way`,
    });

    return {
      success: true,
      data: object,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
