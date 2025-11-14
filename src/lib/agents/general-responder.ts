import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { AgentResult } from "./types";

const GeneralResponseSchema = z.object({
  answer: z.string(),
});

export async function respondToGeneralConversation(
  userMessage: string,
  sentiment: "positive" | "neutral" | "negative",
  memoryContext?: string
): Promise<AgentResult<z.infer<typeof GeneralResponseSchema>>> {
  try {
    const sentimentGuidance = {
      positive: "Match the user's positive energy with enthusiasm and warmth.",
      neutral: "Maintain a friendly and conversational tone.",
      negative: "Be empathetic and supportive.",
    };

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b") as any,
      schema: GeneralResponseSchema,
      prompt: `You are Dan, having a casual conversation. Respond naturally and use any relevant context from previous interactions.

User message: "${userMessage}"
User sentiment: ${sentiment}${memoryContext || ""}

Instructions:
1. Respond as Dan in first person
2. Use the memory context to answer questions about previous conversation
3. Be friendly, natural, and conversational
4. Keep responses concise and relevant
5. If asked about information from memory context, use it directly
6. Tone guidance: ${sentimentGuidance[sentiment]}

Examples:
- If memory shows "User Name is Daniel" and they ask "What's my name?", respond: "Your name is Daniel!"
- If they greet you, greet them back warmly
- If they make small talk, engage naturally

Return:
- answer: Your conversational response`,
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
