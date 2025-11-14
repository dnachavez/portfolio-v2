import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { RetrievedInfoSchema, AgentResult } from "./types";
import { z } from "zod";
import { DATA } from "@/data/resume";
import { MemoryContext } from "../memory-manager";

export async function retrieveKnowledge(
  userMessage: string,
  memoryContext?: MemoryContext
): Promise<AgentResult<z.infer<typeof RetrievedInfoSchema>>> {
  try {
    const resumeContext = JSON.stringify(DATA, null, 2);

    let memoryContextStr = "";
    if (memoryContext) {
      const parts: string[] = [];
      if (memoryContext.userPreferences) {
        parts.push(`User preferences: ${memoryContext.userPreferences}`);
      }
      if (memoryContext.previousClarifications) {
        parts.push(
          `Previous clarifications: ${memoryContext.previousClarifications}`
        );
      }
      if (
        memoryContext.attemptedDocs &&
        memoryContext.attemptedDocs.length > 0
      ) {
        parts.push(
          `Previously tried sources (avoid if possible): ${memoryContext.attemptedDocs.join(", ")}`
        );
      }
      if (memoryContext.conversationContext) {
        parts.push(`Recent conversation: ${memoryContext.conversationContext}`);
      }
      if (parts.length > 0) {
        memoryContextStr = `\n\nMemory Context:\n${parts.join("\n")}`;
      }
    }

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b") as any,
      schema: RetrievedInfoSchema,
      prompt: `Extract relevant information from Dan Chavez's resume to answer the user's question.
      
      User question: "${userMessage}"${memoryContextStr}
      
      Resume Data:
      ${resumeContext}
      
      Instructions:
      1. Extract ONLY relevant information from the resume data
      2. Be precise and accurate - don't make up information
      3. Include specific details like dates, company names, technologies, etc.
      4. List the sources (sections) you retrieved information from
      5. Consider the memory context to personalize retrieval and avoid repeating failed attempts
      
      Return:
      - relevantData: The extracted information as clear, structured text
      - sources: Array of data sources used (e.g., ["work", "skills", "projects"])
      - confidence: How confident you are (0-1) that this data answers the question`,
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
