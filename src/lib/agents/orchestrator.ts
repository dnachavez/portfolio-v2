import { analyzeIntentAndSentiment } from "./intent-sentiment";
import { retrieveKnowledge } from "./knowledge-retriever";
import { draftAnswer } from "./answer-drafter";
import { validateAnswer } from "./answer-validator";
import { respondToGeneralConversation } from "./general-responder";
import {
  retrieveMemories,
  addMemories,
  formatMemoryForPrompt,
} from "../memory-manager";

type StatusCallback = (status: string, detail?: string) => Promise<void>;

export async function orchestrateAgents(
  userMessage: string,
  sessionId: string,
  onStatus?: StatusCallback
): Promise<string> {
  try {
    await onStatus?.("analyzing", "Understanding your question...");
    const intentResult = await analyzeIntentAndSentiment(userMessage);
    if (!intentResult.success || !intentResult.data) {
      const errorDetails = intentResult.error || "Unknown error";
      throw new Error(`Failed to analyze intent: ${errorDetails}`);
    }
    await onStatus?.("analyzed", `Understood: ${intentResult.data.intent}`);

    await onStatus?.("memory", "Checking conversation history...");
    const memoryContext = await retrieveMemories(sessionId, userMessage);
    const memoryPrompt = formatMemoryForPrompt(memoryContext);

    const workflowType = intentResult.data.workflowType;
    const sentiment = intentResult.data.sentiment;

    if (workflowType === "out_of_scope") {
      await onStatus?.("complete", "Request out of scope");
      return "I appreciate your question, but I'm here specifically to share information about my professional background, experience, skills, and projects. Is there anything you'd like to know about my work or experience?";
    }

    if (workflowType === "general") {
      await onStatus?.("drafting", "Responding...");

      const responseResult = await respondToGeneralConversation(
        userMessage,
        sentiment,
        memoryPrompt
      );

      if (!responseResult.success || !responseResult.data) {
        const errorDetails = responseResult.error || "Unknown error";
        throw new Error(`Failed to generate response: ${errorDetails}`);
      }

      await addMemories(sessionId, userMessage, responseResult.data.answer, {
        intent: intentResult.data.intent,
        sentiment: intentResult.data.sentiment,
        sources: [],
        attempts: 1,
      });

      await onStatus?.("complete", "Response ready!");
      return responseResult.data.answer;
    }

    if (workflowType === "contact") {
      await onStatus?.("complete", "Contact information");
      return "I'd love to connect! You can reach me through the contact information on my portfolio, or feel free to connect with me on LinkedIn or GitHub. What would you like to discuss?";
    }

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      attempt++;

      await onStatus?.("retrieving", "Searching through my knowledge base...");
      const enhancedQuery = memoryPrompt
        ? `${userMessage}${memoryPrompt}`
        : userMessage;
      const retrievalResult = await retrieveKnowledge(
        enhancedQuery,
        memoryContext
      );
      if (!retrievalResult.success || !retrievalResult.data) {
        const errorDetails = retrievalResult.error || "Unknown error";
        throw new Error(`Failed to retrieve knowledge: ${errorDetails}`);
      }
      await onStatus?.(
        "retrieved",
        `Found info from ${retrievalResult.data.sources.length} source(s)`
      );

      await onStatus?.("drafting", "Writing your answer...");
      const draftResult = await draftAnswer(
        userMessage,
        retrievalResult.data.relevantData,
        retrievalResult.data.sources,
        sentiment,
        memoryPrompt
      );
      if (!draftResult.success || !draftResult.data) {
        const errorDetails = draftResult.error || "Unknown error";
        throw new Error(`Failed to draft answer: ${errorDetails}`);
      }
      await onStatus?.("drafted", "Answer written");

      await onStatus?.("validating", "Checking answer quality...");
      const validationResult = await validateAnswer(
        userMessage,
        draftResult.data.answer,
        retrievalResult.data.relevantData,
        retrievalResult.data.sources
      );
      if (!validationResult.success || !validationResult.data) {
        const errorDetails = validationResult.error || "Unknown error";
        throw new Error(`Failed to validate answer: ${errorDetails}`);
      }

      const validation = validationResult.data;

      if (validation.isValid || !validation.needsRetrieval) {
        await addMemories(sessionId, userMessage, validation.finalAnswer, {
          intent: intentResult.data.intent,
          sentiment: intentResult.data.sentiment,
          sources: retrievalResult.data.sources,
          attempts: attempt,
        });

        await onStatus?.("complete", "Answer ready!");
        return validation.finalAnswer;
      }

      await onStatus?.("retrying", "Refining answer...");
    }

    throw new Error(
      "Unable to generate a validated answer after multiple attempts."
    );
  } catch (error) {
    return "I apologize, but I encountered an error while processing your request. Please try again.";
  }
}
