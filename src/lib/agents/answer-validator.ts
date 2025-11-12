import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { ValidatedAnswerSchema, AgentResult } from "./types";
import { z } from "zod";

export async function validateAnswer(
  userMessage: string,
  draftedAnswer: string,
  retrievedInfo: string,
  sources: string[]
): Promise<AgentResult<z.infer<typeof ValidatedAnswerSchema>>> {
  try {
    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b") as any,
      schema: ValidatedAnswerSchema,
      prompt: `Validate the drafted answer for accuracy, completeness, and quality.
      
      User question: "${userMessage}"
      
      Drafted Answer:
      ${draftedAnswer}
      
      Retrieved Information:
      ${retrievedInfo}
      
      Sources: ${sources.join(", ")}
      
      Instructions:
      1. Check if the answer accurately reflects the retrieved information
      2. Verify no facts were added or modified
      3. Ensure the answer is complete and addresses the user's question
      4. Check for tone, clarity, and professionalism
      5. Determine if the retrieved information was insufficient or incorrect for the question
      6. If the answer can be fixed with the current information, provide a corrected version
      7. If the retrieved information itself is wrong or insufficient, mark needsRetrieval as true
      
      Return:
      - isValid: true if the answer is good as-is, false if corrections are needed
      - finalAnswer: The validated answer (original if valid, corrected if not)
      - validationNotes: Brief notes on what was checked or corrected
      - confidence: How confident you are in this validation (0-1)
      - needsRetrieval: true if the knowledge retrieval needs to be redone with different approach`,
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
