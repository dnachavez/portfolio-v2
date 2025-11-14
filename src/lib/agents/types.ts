import { z } from "zod";

export const IntentSentimentSchema = z.object({
  intent: z.string(),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  confidence: z.number().min(0).max(1),
  workflowType: z.enum([
    "knowledge_query",
    "contact",
    "general",
    "out_of_scope",
  ]),
});

export const RetrievedInfoSchema = z.object({
  relevantData: z.string(),
  sources: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export const DraftedAnswerSchema = z.object({
  answer: z.string(),
  usedSources: z.array(z.string()),
});

export const ValidatedAnswerSchema = z.object({
  isValid: z.boolean(),
  finalAnswer: z.string(),
  validationNotes: z.string(),
  confidence: z.number().min(0).max(1),
  needsRetrieval: z.boolean(),
});

export type AgentResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
