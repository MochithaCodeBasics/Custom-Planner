import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, setAuthCookie, clearAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { password, action } = body;

        if (action === "logout") {
            await clearAuthCookie();
            return NextResponse.json({ ok: true });
        }

        if (!password || typeof password !== "string") {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        if (!verifyPassword(password)) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        await setAuthCookie();
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
