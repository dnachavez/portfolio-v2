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
    // Step 1: Analyze intent and sentiment
    console.log("🎯 Analyzing intent and sentiment...");
    await onStatus?.("analyzing", "Understanding your question...");
    const intentResult = await analyzeIntentAndSentiment(userMessage);
    if (!intentResult.success || !intentResult.data) {
      const errorDetails = intentResult.error || "Unknown error";
      console.error("❌ Intent analysis failed:", errorDetails);
      throw new Error(`Failed to analyze intent: ${errorDetails}`);
    }
    console.log(
      `✅ Intent: ${intentResult.data.intent} | Workflow: ${intentResult.data.workflowType} | Sentiment: ${intentResult.data.sentiment}`
    );
    await onStatus?.("analyzed", `Understood: ${intentResult.data.intent}`);

    // Step 1.5: Retrieve memories (after intent, before knowledge retrieval)
    console.log("🧠 Retrieving conversation memories...");
    await onStatus?.("memory", "Checking conversation history...");
    const memoryContext = await retrieveMemories(sessionId, userMessage);
    const memoryPrompt = formatMemoryForPrompt(memoryContext);
    console.log(
      `✅ Memory context retrieved${memoryPrompt ? " (found relevant context)" : " (no prior context)"}`
    );

    // Route to appropriate workflow based on intent
    const workflowType = intentResult.data.workflowType;
    const sentiment = intentResult.data.sentiment;

    // Handle out-of-scope requests
    if (workflowType === "out_of_scope") {
      console.log("⚠️  Out of scope request detected");
      await onStatus?.("complete", "Request out of scope");
      return "I appreciate your question, but I'm here specifically to share information about my professional background, experience, skills, and projects. Is there anything you'd like to know about my work or experience?";
    }

    // Handle general conversation (greetings, follow-ups, casual chat)
    if (workflowType === "general") {
      console.log("💬 General conversation detected");
      await onStatus?.("drafting", "Responding...");

      // Use specialized general conversation responder with memory context
      const responseResult = await respondToGeneralConversation(
        userMessage,
        sentiment,
        memoryPrompt
      );

      if (!responseResult.success || !responseResult.data) {
        const errorDetails = responseResult.error || "Unknown error";
        console.error("❌ General response failed:", errorDetails);
        throw new Error(`Failed to generate response: ${errorDetails}`);
      }

      // Store conversation in memory
      console.log("💾 Storing conversation in memory...");
      await addMemories(sessionId, userMessage, responseResult.data.answer, {
        intent: intentResult.data.intent,
        sentiment: intentResult.data.sentiment,
        sources: [],
        attempts: 1,
      });

      await onStatus?.("complete", "Response ready!");
      return responseResult.data.answer;
    }

    // Handle contact workflow
    if (workflowType === "contact") {
      console.log("📧 Contact request detected");
      await onStatus?.("complete", "Contact information");
      return "I'd love to connect! You can reach me through the contact information on my portfolio, or feel free to connect with me on LinkedIn or GitHub. What would you like to discuss?";
    }

    // Default to knowledge_query workflow
    if (workflowType !== "knowledge_query") {
      console.log(
        `⚠️  Unexpected workflow type "${workflowType}", falling back to knowledge query`
      );
    }

    const maxRetries = 3;
    let attempt = 0;

    // Retry loop for knowledge retrieval, drafting, and validation
    while (attempt < maxRetries) {
      attempt++;
      console.log(`\n🔄 Attempt ${attempt}/${maxRetries}`);

      // Step 2: Retrieve knowledge (enhanced with memory context)
      console.log("📚 Retrieving knowledge...");
      await onStatus?.("retrieving", "Searching through my knowledge base...");
      // Enhance query with memory context if available
      const enhancedQuery = memoryPrompt
        ? `${userMessage}${memoryPrompt}`
        : userMessage;
      const retrievalResult = await retrieveKnowledge(
        enhancedQuery,
        memoryContext
      );
      if (!retrievalResult.success || !retrievalResult.data) {
        const errorDetails = retrievalResult.error || "Unknown error";
        console.error("❌ Knowledge retrieval failed:", errorDetails);
        throw new Error(`Failed to retrieve knowledge: ${errorDetails}`);
      }
      console.log(
        `✅ Retrieved info from: ${retrievalResult.data.sources.join(", ")}`
      );
      await onStatus?.(
        "retrieved",
        `Found info from ${retrievalResult.data.sources.length} source(s)`
      );

      // Step 3: Draft answer (with memory context)
      console.log("✍️  Drafting answer...");
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
        console.error("❌ Answer drafting failed:", errorDetails);
        throw new Error(`Failed to draft answer: ${errorDetails}`);
      }
      console.log("✅ Answer drafted");
      await onStatus?.("drafted", "Answer written");

      // Step 4: Validate answer
      console.log("✅ Validating answer...");
      await onStatus?.("validating", "Checking answer quality...");
      const validationResult = await validateAnswer(
        userMessage,
        draftResult.data.answer,
        retrievalResult.data.relevantData,
        retrievalResult.data.sources
      );
      if (!validationResult.success || !validationResult.data) {
        const errorDetails = validationResult.error || "Unknown error";
        console.error("❌ Answer validation failed:", errorDetails);
        throw new Error(`Failed to validate answer: ${errorDetails}`);
      }

      const validation = validationResult.data;
      console.log(
        `✅ Validation complete: ${validation.isValid ? "Approved" : "Issues found"}`
      );
      console.log(`   Notes: ${validation.validationNotes}`);

      // If validation passes or doesn't need retrieval, store memory and return
      if (validation.isValid || !validation.needsRetrieval) {
        console.log(`✅ Final answer ready after ${attempt} attempt(s)`);

        // Store validated answer in memory
        console.log("💾 Storing conversation in memory...");
        await addMemories(sessionId, userMessage, validation.finalAnswer, {
          intent: intentResult.data.intent,
          sentiment: intentResult.data.sentiment,
          sources: retrievalResult.data.sources,
          attempts: attempt,
        });

        await onStatus?.("complete", "Answer ready!");
        return validation.finalAnswer;
      }

      // If we need to retry retrieval
      console.log(`⚠️  Validation requires re-retrieval. Retrying...`);
      await onStatus?.("retrying", "Refining answer...");
    }

    // If we exhausted all retries
    console.log(
      `⚠️  Max retries (${maxRetries}) reached. Returning best available answer.`
    );
    throw new Error(
      "Unable to generate a validated answer after multiple attempts."
    );
  } catch (error) {
    console.error("❌ Error in agent orchestration:");
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace available"
    );
    console.error("Full error object:", error);
    return "I apologize, but I encountered an error while processing your request. Please try again.";
  }
}
