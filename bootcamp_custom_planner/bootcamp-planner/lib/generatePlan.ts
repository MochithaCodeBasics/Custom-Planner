import { Chapter } from "./bootcampData";
import { ExperienceState, PlanResult, Phase } from "./types";
import type { Subject } from "./syllabusTypes";

type PlanInput = {
    goal: string;
    profile: string;
    currentRole: string;
    motivation: string;
    careerTimeline: string;
    availability: string;
    scheduleType: string;
    learningPace: string;
    contentDepth: string;
    realWorldApp: string;
    postBootcamp: string;
    experience: ExperienceState;
    /** Dynamic chapter list loaded from syllabus.json */
    syllabusChapters: Chapter[];

    /** Subject entities for resolving subjectId → name */
    syllabusSubjects: Subject[];
};

/** Build a lookup: subjectId → subject name (e.g. "sub-ml" → "Machine Learning") */
function buildSubjectNameMap(subjects: Subject[]): Map<string, string> {
    return new Map(subjects.map(s => [s.id, s.name]));
}

/** Resolve a chapter's subject name via the lookup */
function subjectName(ch: Chapter, nameMap: Map<string, string>): string {
    return nameMap.get(ch.subjectId) ?? ch.subjectId;
}

// ===== CONSTANTS FOR NEW SYLLABUS IDs =====
const PYTHON_BASICS_IDS = ['py-03', 'py-04', 'py-05', 'py-06', 'py-07', 'py-08', 'py-09', 'py-11', 'py-12', 'py-14'];
const SQL_BASICS_IDS = ['sql-01', 'sql-02', 'sql-03', 'sql-04'];
const MATH_STATS_IDS = ['math-02', 'math-03', 'math-04', 'math-05', 'math-08', 'math-09', 'math-11'];
const ML_CORE_IDS = ['ml-02', 'ml-03', 'ml-05', 'ml-06', 'ml-07', 'ml-08', 'ml-09', 'ml-12'];
const DL_CORE_IDS = ['dl-02', 'dl-03', 'dl-04', 'dl-05', 'dl-07', 'dl-08', 'dl-09', 'dl-10', 'dl-11', 'dl-12'];
const NLP_CORE_IDS = ['nlp-01', 'nlp-02', 'nlp-03', 'nlp-04'];
const GENAI_CORE_IDS = ['gen-02', 'gen-03', 'gen-04', 'gen-05', 'gen-08', 'gen-09', 'gen-10', 'gen-11', 'gen-13', 'gen-14', 'gen-17', 'gen-18', 'gen-19'];

const SQL_ADVANCED_IDS = ['sqladv-01', 'sqladv-02', 'sqladv-03', 'sqladv-04', 'sqladv-05', 'sqladv-06'];

const INTERNSHIP_CV = 'vi-01';
const INTERNSHIP_RAG = 'vi-02';

export function generatePlan(input: PlanInput): PlanResult {
    const {
        goal, profile, currentRole, motivation, availability,
        experience, syllabusChapters, syllabusSubjects
    } = input;

    const nameMap = buildSubjectNameMap(syllabusSubjects);
    const categoryMap = new Map(syllabusSubjects.map(s => [s.id, s.category]));
    const getCategory = (ch: Chapter) => categoryMap.get(ch.subjectId);

    let chapters: Chapter[] = [...syllabusChapters];
    const whyThisPlan: string[] = [];

    // ===== 1. INTERNSHIP LOGIC =====
    const hasInternships = chapters.some(ch => ch.isInternship);
    if (hasInternships) {
        if (goal === 'genai-specialist' || goal === 'nlp-engineer') {
            chapters = chapters.filter(ch => ch.id !== INTERNSHIP_CV);
            whyThisPlan.push("Selected GenAI RAG Internship based on your specialization.");
        } else if (goal === 'ml-engineer' || goal === 'cv-specialist') {
            chapters = chapters.filter(ch => ch.id !== INTERNSHIP_RAG);
            whyThisPlan.push("Selected Computer Vision Internship based on your specialization.");
        } else {
            whyThisPlan.push("Included both internships for comprehensive experience.");
        }
    }

    // ===== 2. GOAL-BASED FILTERING =====
    if (goal === 'ml-engineer') {
        chapters = chapters.filter(ch => subjectName(ch, nameMap) !== 'NLP');
        whyThisPlan.push("Focused on ML Engineering (skipped deep NLP modules).");
    } else if (goal === 'nlp-engineer') {
        chapters = chapters.filter(ch => ch.id !== 'dl-10' && ch.id !== 'dl-13'); // Skip CNN/CV
        whyThisPlan.push("Focused on NLP (skipped Computer Vision modules).");
    }

    // Handle SQL Advanced for ML/GenAI roles (Optional module)
    // We include it but set duration to 0 to mark it optional/extra
    if (['ml-engineer', 'nlp-engineer', 'cv-specialist', 'genai-specialist'].includes(goal)) {
        // chapters = chapters.filter(ch => !SQL_ADVANCED_IDS.includes(ch.id)); // OLD: Removed entirely
        chapters = chapters.map(ch => {
            if (SQL_ADVANCED_IDS.includes(ch.id)) {
                return { ...ch, durationWeeks: 0 };
            }
            return ch;
        });
        whyThisPlan.push("Marked Advanced SQL as optional (0 weeks).");
    }

    // ===== 3. EXPERIENCE-BASED FILTERING =====
    if (experience.python) {
        chapters = chapters.filter(ch => !PYTHON_BASICS_IDS.includes(ch.id));
        whyThisPlan.push("Skipped Python Basics due to prior experience.");
    }
    if (experience.sql) {
        chapters = chapters.filter(ch => !SQL_BASICS_IDS.includes(ch.id));
        whyThisPlan.push("Skipped SQL Basics due to prior experience.");
    }
    if (experience.statistics) {
        chapters = chapters.filter(ch => !MATH_STATS_IDS.includes(ch.id));
        whyThisPlan.push("Skipped Math & Stats Basics due to prior experience.");
    }
    if (experience.ml) {
        chapters = chapters.filter(ch => !ML_CORE_IDS.includes(ch.id));
        whyThisPlan.push("Skipped ML Core modules due to prior experience.");
    }
    if (experience.dl) {
        chapters = chapters.filter(ch => !DL_CORE_IDS.includes(ch.id));
        whyThisPlan.push("Skipped Deep Learning Core modules due to prior experience.");
    }
    if (experience.nlp) {
        chapters = chapters.filter(ch => !NLP_CORE_IDS.includes(ch.id));
        whyThisPlan.push("Skipped NLP Core modules due to prior experience.");
    }
    if (experience.genai) {
        chapters = chapters.filter(ch => !GENAI_CORE_IDS.includes(ch.id));
        whyThisPlan.push("Skipped GenAI Core modules due to prior experience.");
    }

    // ===== 4. TIME ADJUSTMENTS =====
    let profileMultiplier = 1.0;
    if (profile === 'beginner') profileMultiplier = 1.25;
    else if (profile === 'intermediate') profileMultiplier = 0.75;
    else if (profile === 'professional') profileMultiplier = 0.8;

    // Apply multipliers
    chapters = chapters.map(ch => {
        let duration = ch.durationWeeks;

        // Profile impact
        if (getCategory(ch) === 'foundation') duration *= profileMultiplier;

        // Role impact
        if (currentRole === 'software-dev' && !experience.python && PYTHON_BASICS_IDS.includes(ch.id)) {
            duration *= 0.5; // Devs learn Python fast
        }

        // Motivation impact
        if (motivation === 'first-job' && getCategory(ch) === 'career') {
            duration *= 1.5;
        }

        return { ...ch, durationWeeks: parseFloat(duration.toFixed(1)) };
    });

    // ===== 5. CALCULATE TOTALS =====
    // Availability
    let hoursPerWeek = 15;
    let availabilityFactor = 1.0;

    if (availability === '3-5') {
        hoursPerWeek = 4;
        availabilityFactor = 3.5; // Very slow
    } else if (availability === '5-10') {
        hoursPerWeek = 7.5;
        availabilityFactor = 2.0;
    } else if (availability === '10-20') {
        hoursPerWeek = 15;
        availabilityFactor = 1.0;
    } else if (availability === '20-30') {
        hoursPerWeek = 25;
        availabilityFactor = 0.6;
    } else if (availability === '30-40') {
        hoursPerWeek = 35;
        availabilityFactor = 0.5;
    } else if (availability === 'full-time') {
        hoursPerWeek = 40;
        availabilityFactor = 0.4; // Intensive
    }

    // Apply availability factor to all chapters
    chapters = chapters.map(ch => ({
        ...ch,
        durationWeeks: parseFloat((ch.durationWeeks * availabilityFactor).toFixed(1))
    }));

    const totalWeeks = chapters.reduce((sum, ch) => sum + ch.durationWeeks, 0);
    const estimatedMonths = Math.ceil(totalWeeks / 4.3);

    // ===== 6. CONSTRUCT PHASES =====
    const phases: Phase[] = [];

    // Iterate subjects to preserve order
    syllabusSubjects.forEach(subject => {
        const subjectChapters = chapters.filter(ch => ch.subjectId === subject.id);
        if (subjectChapters.length > 0) {
            phases.push({
                name: subject.displayName || subject.name,
                color: subject.color || "bg-gray-50 border-gray-200",
                chapters: subjectChapters
            });
        }
    });

    return {
        phases,
        totalModules: phases.filter(p => p.name.startsWith('Module ')).length,
        totalWeeks: parseFloat(totalWeeks.toFixed(1)),
        estimatedMonths,
        hoursPerWeek,
        whyThisPlan
    };
}
