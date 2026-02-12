import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const isAuthed = isAuthenticatedFromRequest(req);
    return NextResponse.json({ authenticated: isAuthed });
}
