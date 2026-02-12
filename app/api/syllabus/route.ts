import { NextRequest, NextResponse } from "next/server";
import { readSyllabus, writeSyllabus } from "@/lib/syllabusStore";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET() {
    try {
        const data = await readSyllabus();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Failed to read syllabus" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    if (!isAuthenticatedFromRequest(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        if (!body.modules || !Array.isArray(body.modules)) {
            return NextResponse.json({ error: "modules array is required" }, { status: 400 });
        }
        if (!body.phases || !Array.isArray(body.phases)) {
            return NextResponse.json({ error: "phases array is required" }, { status: 400 });
        }
        if (!body.categories || !Array.isArray(body.categories)) {
            return NextResponse.json({ error: "categories array is required" }, { status: 400 });
        }

        await writeSyllabus(body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
