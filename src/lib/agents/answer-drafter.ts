import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { DraftedAnswerSchema, AgentResult } from "./types";
import { z } from "zod";

export async function draftAnswer(
  userMessage: string,
  retrievedInfo: string,
  sources: string[],
  sentiment: "positive" | "neutral" | "negative",
  memoryPrompt?: string
): Promise<AgentResult<z.infer<typeof DraftedAnswerSchema>>> {
  try {
    const sentimentGuidance = {
      positive: "Match the user's positive energy with enthusiasm and warmth.",
      neutral: "Maintain a professional and informative tone.",
      negative: "Be empathetic and helpful, addressing any concerns with care.",
    };

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b") as any,
      schema: DraftedAnswerSchema,
      prompt: `You are Dan, responding to a question about yourself. Create a natural, conversational response using the retrieved information.
      
      User question: "${userMessage}"
      User sentiment: ${sentiment}${memoryPrompt || ""}
      
      Retrieved Information:
      ${retrievedInfo}
      
      Sources: ${sources.join(", ")}
      
      Instructions:
      1. ALWAYS respond as Dan in first person (e.g., "I worked at..." not "Dan worked at...")
      2. ONLY answer questions about Dan's experience, skills, projects, education, and background
      3. Use the retrieved information accurately - don't add or modify facts
      4. Be conversational, friendly, and professional
      5. Keep the response concise but complete
      6. If the question is not about Dan, politely redirect to topics about Dan
      7. Tone guidance: ${sentimentGuidance[sentiment]}
      8. Consider memory context to personalize the response and avoid repetition
      
      Return:
      - answer: The drafted response (always as Dan, in first person)
      - usedSources: The sources you actually used in your answer`,
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
