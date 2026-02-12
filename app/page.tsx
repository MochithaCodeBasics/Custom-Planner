"use client";

import { useState, useMemo, useEffect } from "react";
import { Calendar, Clock, Target, TrendingUp, BookOpen, Award, Briefcase, Zap, Rocket, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { generatePlan } from "@/lib/generatePlan";
import { INITIAL_EXPERIENCE, type ExperienceState, type PlanResult } from "@/lib/types";
import type { SyllabusData } from "@/lib/syllabusTypes";
import {
    PROFILES, CURRENT_ROLES, GOALS, MOTIVATIONS, CAREER_TIMELINES,
    AVAILABILITY_OPTIONS, SCHEDULE_TYPES, LEARNING_PACES,
    CONTENT_DEPTHS, REAL_WORLD_APPS, POST_BOOTCAMPS
} from "@/lib/stepOptions";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/planner/ProgressBar";
import SelectionStep from "@/components/planner/SelectionStep";
import ExperienceStep from "@/components/planner/ExperienceStep";
import RoadmapResult from "@/components/planner/RoadmapResult";

const TOTAL_STEPS = 12;

export default function BootcampPlanner() {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [goal, setGoal] = useState("");
    const [motivation, setMotivation] = useState("");
    const [careerTimeline, setCareerTimeline] = useState("");
    const [availability, setAvailability] = useState("");
    const [scheduleType, setScheduleType] = useState("");
    const [learningPace, setLearningPace] = useState("");
    const [contentDepth, setContentDepth] = useState("");
    const [realWorldApp, setRealWorldApp] = useState("");
    const [postBootcamp, setPostBootcamp] = useState("");
    const [experience, setExperience] = useState<ExperienceState>(INITIAL_EXPERIENCE);
    const [showPlan, setShowPlan] = useState(false);
    const [syllabus, setSyllabus] = useState<SyllabusData | null>(null);

    useEffect(() => {
        async function fetchSyllabus() {
            try {
                const res = await fetch("/api/syllabus");
                if (res.ok) {
                    const data: SyllabusData = await res.json();
                    setSyllabus(data);
                }
            } catch {
                // Silently fail — generatePlan will be skipped if syllabus is null
            }
        }
        fetchSyllabus();
    }, []);

    const plan: PlanResult | null = useMemo(() => {
        if (!showPlan || !syllabus) return null;
        return generatePlan({
            goal, profile, currentRole, motivation, careerTimeline,
            availability, scheduleType, learningPace, contentDepth,
            realWorldApp, postBootcamp, experience,
            syllabusChapters: syllabus.chapters,
            syllabusSubjects: syllabus.subjects,
        });
    }, [showPlan, goal, profile, currentRole, motivation, careerTimeline,
        availability, scheduleType, learningPace, contentDepth,
        realWorldApp, postBootcamp, experience, syllabus]);

    const goBack = step > 1 ? () => setStep(step - 1) : undefined;
    const goNext = (nextStep: number) => () => setStep(nextStep);

    const handleReset = () => {
        setShowPlan(false);
        setStep(1);
        setProfile(""); setCurrentRole(""); setGoal(""); setMotivation("");
        setCareerTimeline(""); setAvailability(""); setScheduleType("");
        setLearningPace(""); setContentDepth(""); setRealWorldApp("");
        setPostBootcamp(""); setExperience(INITIAL_EXPERIENCE);
    };

    const stepConfig = [
        { title: "Identify Your Profile", icon: <Users className="text-blue-500" />, options: PROFILES, value: profile, setter: setProfile, columns: 1 as const },
        { title: "Current Role", icon: <Briefcase className="text-indigo-500" />, options: CURRENT_ROLES, value: currentRole, setter: setCurrentRole, columns: 1 as const },
        { title: "Target Goal", icon: <Target className="text-green-500" />, options: GOALS, value: goal, setter: setGoal, columns: 1 as const },
        { title: "Primary Motivation", icon: <Zap className="text-orange-500" />, options: MOTIVATIONS, value: motivation, setter: setMotivation },
        { title: "Timeline", icon: <Calendar className="text-red-500" />, options: CAREER_TIMELINES, value: careerTimeline, setter: setCareerTimeline },
        { title: "Weekly Availability", icon: <Clock className="text-purple-500" />, options: AVAILABILITY_OPTIONS, value: availability, setter: setAvailability },
        { title: "Schedule Type", icon: <Calendar className="text-teal-500" />, options: SCHEDULE_TYPES, value: scheduleType, setter: setScheduleType },
        { title: "Learning Pace", icon: <TrendingUp className="text-yellow-500" />, options: LEARNING_PACES, value: learningPace, setter: setLearningPace },
        { title: "Content Depth", icon: <BookOpen className="text-pink-500" />, options: CONTENT_DEPTHS, value: contentDepth, setter: setContentDepth, columns: 1 as const },
        { title: "Application", icon: <Rocket className="text-cyan-500" />, options: REAL_WORLD_APPS, value: realWorldApp, setter: setRealWorldApp },
        { title: "End Goal", icon: <Award className="text-emerald-500" />, options: POST_BOOTCAMPS, value: postBootcamp, setter: setPostBootcamp, columns: 1 as const },
    ];

    const renderStep = () => {
        if (step === 12) {
            return (
                <ExperienceStep
                    key="step-12"
                    experience={experience}
                    onChange={setExperience}
                    onBack={() => setStep(11)}
                    onGenerate={() => setShowPlan(true)}
                    goal={goal}
                    profile={profile}
                />
            );
        }

        const cfg = stepConfig[step - 1];
        if (!cfg) return null;

        return (
            <SelectionStep
                key={`step-${step}`}
                title={cfg.title}
                icon={cfg.icon}
                options={cfg.options}
                selected={cfg.value}
                onSelect={cfg.setter}
                columns={cfg.columns ?? 2}
                onBack={goBack}
                onNext={goNext(step + 1)}
                nextLabel={step === 11 ? "Continue to Experience →" : "Continue →"}
            />
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* BRANDING */}
                <div className="text-center mb-12">
                    <img src="/logo.png" alt="Bootcamp Logo" className="h-16 mx-auto mb-8" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug font-[family-name:var(--font-outfit)]">
                        GenAI & DS Bootcamp 3.0 <span className="gradient-text-animated">Planner</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Your personalized roadmap to mastering Generative AI, Data Science, and Python with <span className="font-bold text-blue-600">Codebasics</span>.
                    </p>
                </div>

                {/* CONTENT CARD */}
                <div className={cn(
                    "bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 transition-all duration-500",
                    showPlan ? "max-w-5xl" : "max-w-3xl mx-auto"
                )}>
                    {!showPlan && <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />}

                    <AnimatePresence mode="wait">
                        {showPlan && plan ? (
                            <RoadmapResult
                                key="roadmap"
                                plan={plan}
                                goalLabel={GOALS.find(g => g.id === goal)?.name ?? ""}
                                onReset={handleReset}
                            />
                        ) : (
                            renderStep()
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
