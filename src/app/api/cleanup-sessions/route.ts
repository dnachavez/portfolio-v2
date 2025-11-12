import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint to document session cleanup behavior
 *
 * Note: Sessions are stored in sessionStorage which automatically cleans up when:
 * 1. The browser tab/window is closed
 * 2. The session expires (checked on load in session-manager.ts)
 *
 * This endpoint is primarily for documentation and potential future server-side cleanup
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "Session cleanup is handled client-side via sessionStorage",
    details: {
      storage: "sessionStorage (browser-managed)",
      duration: "7 days",
      autoCleanup: [
        "On browser tab/window close",
        "On session expiry (checked on load)",
        "On browser restart",
      ],
      implementation: "See src/lib/session-manager.ts",
    },
  });
}
