import { NextResponse } from "next/server";
import { cleanupExpiredMemories } from "@/lib/memory-manager";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await cleanupExpiredMemories();

    return NextResponse.json({
      success: true,
      deleted: result.deleted,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
