import { NextRequest, NextResponse } from "next/server";

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
