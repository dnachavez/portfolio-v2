import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { IntentSentimentSchema, AgentResult } from "./types";
import { z } from "zod";

export async function analyzeIntentAndSentiment(
  userMessage: string
): Promise<AgentResult<z.infer<typeof IntentSentimentSchema>>> {
  try {
    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b") as any,
      schema: IntentSentimentSchema,
      prompt: `Analyze the user's message to determine their intent and sentiment.
      
      User message: "${userMessage}"
      
      Instructions:
      1. Identify the primary intent (what the user wants to do)
      2. Determine the sentiment (positive, neutral, negative)
      3. Assess confidence level (0-1)
      4. Identify the workflow type:
         - "knowledge_query": Questions about Dan's experience, skills, projects, education, work history, etc.
         - "general": Greetings, small talk, casual conversation, follow-up questions about previous conversation 
           (e.g., "What is my name?", "What did I just tell you?"), acknowledgments, or light personal exchanges
         - "contact": Requests to contact Dan or get in touch
         - "out_of_scope": Questions or requests completely unrelated to Dan or the conversation 
           (e.g., math problems like "1+1", requests for code/HTML, general knowledge questions, 
           technical help, or anything that has nothing to do with Dan's portfolio or the ongoing conversation)
      
      IMPORTANT: 
      - Conversational questions (like asking about names, recalling what was said) should be "general", NOT "out_of_scope"
      - Only classify as "out_of_scope" if the request is completely unrelated to Dan AND the conversation context
      - When in doubt between "general" and "out_of_scope", prefer "general" for conversational queries
      
      Return:
      - intent: Brief description of what the user wants
      - sentiment: "positive", "neutral", or "negative"
      - confidence: How confident you are in this analysis (0-1)
      - workflowType: The type of workflow to route to`,
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
