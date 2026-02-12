import fs from "fs/promises";
import path from "path";
import type { SyllabusData } from "./syllabusTypes";

const DATA_PATH = path.join(process.cwd(), "data", "syllabus_v3.json");

export async function readSyllabus(): Promise<SyllabusData> {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as SyllabusData;
}

export async function writeSyllabus(data: SyllabusData): Promise<void> {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}
