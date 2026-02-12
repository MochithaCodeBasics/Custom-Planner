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

        if (!body.subjects || !Array.isArray(body.subjects)) {
            return NextResponse.json({ error: "subjects array is required" }, { status: 400 });
        }
        if (!body.chapters || !Array.isArray(body.chapters)) {
            return NextResponse.json({ error: "chapters array is required" }, { status: 400 });
        }

        await writeSyllabus(body);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
