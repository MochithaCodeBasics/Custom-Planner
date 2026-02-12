import { Chapter } from "./bootcampData";
import { type ReactNode } from "react";

export type StepOption = {
    id: string;
    name: string;
    desc: string;
    icon: ReactNode;
    duration?: string;
    urgent?: boolean;
};

export type ExperienceState = {
    python: boolean;
    sql: boolean;
    statistics: boolean;
    ml: boolean;
    dl: boolean;
    nlp: boolean;
    genai: boolean;
    mlops: boolean;
};

export type Phase = {
    name: string;
    chapters: Chapter[];
    color: string;
};

export type PlanResult = {
    phases: Phase[];
    totalModules: number;
    totalWeeks: number;
    estimatedMonths: number;
    hoursPerWeek: number;
    whyThisPlan: string[];
};

export const INITIAL_EXPERIENCE: ExperienceState = {
    python: false,
    sql: false,
    statistics: false,
    ml: false,
    dl: false,
    nlp: false,
    genai: false,
    mlops: false,
};
