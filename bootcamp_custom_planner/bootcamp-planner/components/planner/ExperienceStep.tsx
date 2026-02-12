"use client";

import { cn } from "@/lib/utils";
import { type ExperienceState } from "@/lib/types";
import { EXPERIENCE_OPTIONS } from "@/lib/stepOptions";
import { CheckCircle2, Code, Rocket, Info, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/** Maps each goal to the experience keys that are irrelevant, with a reason. */
const DISABLED_KEYS_BY_GOAL: Record<string, { keys: string[]; reason: string }> = {
    'ml-engineer': {
        keys: ['nlp'],
        reason: 'Not part of your ML Engineer track'
    },
};

type ExperienceStepProps = {
    experience: ExperienceState;
    onChange: (updated: ExperienceState) => void;
    onBack: () => void;
    onGenerate: () => void;
    goal: string;
    profile: string;
};

export default function ExperienceStep({ experience, onChange, onBack, onGenerate, goal, profile }: ExperienceStepProps) {
    const toggle = (key: string) => {
        onChange({ ...experience, [key]: !experience[key as keyof ExperienceState] });
    };

    const disabledConfig = DISABLED_KEYS_BY_GOAL[goal];
    const disabledKeys = disabledConfig?.keys ?? [];
    const disabledReason = disabledConfig?.reason ?? '';

    const isBeginner = profile === 'beginner';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Code className="text-blue-600" /> Prior Knowledge
            </h2>
            <p className="mb-4 text-gray-500">Select what you already know to skip foundation modules.</p>

            {isBeginner && (
                <div className="mb-5 flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-700">
                    <Info className="w-5 h-5 mt-0.5 shrink-0" />
                    <span>Since you're starting fresh, we've kept everything unchecked. Toggle any topics you're already familiar with.</span>
                </div>
            )}

            {goal === 'ml-engineer' && (
                <div className="mb-5 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
                    <Info className="w-5 h-5 mt-0.5 shrink-0" />
                    <span>Modern ML Engineers need GenAI exposure for model deployment and integration — so we've kept GenAI modules in your track.</span>
                </div>
            )}

            <div className="space-y-3">
                {EXPERIENCE_OPTIONS.map((item, idx) => {
                    const isChecked = experience[item.key as keyof ExperienceState];
                    const isDisabled = disabledKeys.includes(item.key);

                    return (
                        <motion.button
                            key={item.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => !isDisabled && toggle(item.key)}
                            whileHover={isDisabled ? {} : { scale: 1.01 }}
                            whileTap={isDisabled ? {} : { scale: 0.99 }}
                            className={cn(
                                "w-full p-5 rounded-xl border-2 transition-all text-left flex items-start gap-4 group",
                                isDisabled
                                    ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                                    : isChecked
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-900/20 hover:scale-105 transition-transform"
                                        : "border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50/50"
                            )}
                            suppressHydrationWarning
                        >
                            <div className={cn(
                                "mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                                isDisabled
                                    ? "bg-gray-200 border-gray-200"
                                    : isChecked
                                        ? "bg-white border-white" // Changed to white for checked state to match new button style
                                        : "border-gray-300 group-hover:border-blue-300"
                            )}>
                                {isDisabled
                                    ? <Lock className="w-3 h-3 text-gray-400" />
                                    : isChecked && <CheckCircle2 className="w-4 h-4 text-[#6F53C1]" /> // Changed to purple for checked state to match new button style
                                }
                            </div>
                            <div>
                                <h4 className={cn("font-semibold", isDisabled ? "text-gray-400" : isChecked ? "text-white" : "text-gray-800")}>
                                    {item.label}
                                </h4>
                                {isDisabled ? (
                                    <p className="text-xs text-amber-500 font-medium">{disabledReason}</p>
                                ) : (
                                    <p className={cn("text-sm", isChecked ? "text-white/90" : "text-gray-500")}>{item.desc}</p>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex gap-3 mt-8">
                <Button variant="outline" size="lg" onClick={onBack} className="rounded-xl px-6">
                    ← Back
                </Button>
                <Button
                    variant="premium"
                    size="lg"
                    onClick={onGenerate}
                    className="flex-1 rounded-xl py-4 h-auto text-lg font-bold"
                >
                    <Rocket className="w-5 h-5 mr-2" /> Build My Custom Roadmap
                </Button>
            </div>
        </motion.div>
    );
}
