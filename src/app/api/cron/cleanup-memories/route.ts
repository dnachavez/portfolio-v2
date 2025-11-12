/**
 * Vercel Cron Job: Cleanup Expired Memories
 * Runs daily to clean up expired mem0 memories
 */

import { NextResponse } from "next/server";
import { cleanupExpiredMemories } from "@/lib/memory-manager";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🧹 Starting memory cleanup cron job...");
    const result = await cleanupExpiredMemories();

    console.log(
      `✅ Memory cleanup complete: ${result.deleted} deleted, ${result.errors} errors`
    );

    return NextResponse.json({
      success: true,
      deleted: result.deleted,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Memory cleanup cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
