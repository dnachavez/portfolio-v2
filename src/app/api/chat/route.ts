import { orchestrateAgents } from "@/lib/agents/orchestrator";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!sessionId || typeof sessionId !== "string") {
      return new Response(JSON.stringify({ error: "Session ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a TransformStream for streaming responses
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Function to send status updates
    const sendStatus = async (status: string, detail?: string) => {
      const data = JSON.stringify({ type: "status", status, detail });
      await writer.write(encoder.encode(`data: ${data}\n\n`));
    };

    // Function to send final response
    const sendResponse = async (response: string) => {
      const data = JSON.stringify({ type: "response", response });
      await writer.write(encoder.encode(`data: ${data}\n\n`));
      await writer.close();
    };

    // Start orchestration in background
    (async () => {
      try {
        await sendStatus("thinking", "Analyzing your question...");
        const response = await orchestrateAgents(
          message,
          sessionId,
          sendStatus
        );
        await sendResponse(response);
      } catch (error) {
        console.error("Error in chat API:", error);
        await sendResponse(
          "I apologize, but I encountered an error while processing your request. Please try again."
        );
      }
    })();

    // Return SSE stream
    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
