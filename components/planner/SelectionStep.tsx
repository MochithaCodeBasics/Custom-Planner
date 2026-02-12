"use client";

import { cn } from "@/lib/utils";
import { type StepOption } from "@/lib/types";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type SelectionStepProps = {
    title: string;
    icon: ReactNode;
    options: StepOption[];
    selected: string;
    onSelect: (id: string) => void;
    columns?: 1 | 2;
    onBack?: () => void;
    onNext: () => void;
    nextLabel?: string;
};

export default function SelectionStep({
    title, icon, options, selected, onSelect,
    columns = 2, onBack, onNext, nextLabel = "Continue →"
}: SelectionStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                {icon} {title}
            </h2>
            <div className={cn("grid gap-4", columns === 2 ? "md:grid-cols-2" : "grid-cols-1")}>
                {options.map((opt, idx) => (
                    <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => onSelect(opt.id)}
                        className={cn(
                            "p-5 rounded-xl border-2 transition-all text-left hover:shadow-lg flex items-start gap-4 group",
                            columns === 2 && options.length % 2 !== 0 && idx === options.length - 1 ? "md:col-span-2" : "",
                            selected === opt.id
                                ? "border-blue-500 bg-blue-50/80 shadow-md ring-1 ring-blue-500"
                                : "border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50/50"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        suppressHydrationWarning
                    >
                        <span className="shrink-0 group-hover:scale-110 transition-transform">{opt.icon}</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">{opt.name}</h3>
                            <p className="text-sm text-gray-500">{opt.desc || opt.duration}</p>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
                {onBack && (
                    <Button variant="outline" size="lg" onClick={onBack} className="rounded-xl px-6">
                        ← Back
                    </Button>
                )}
                <div className="flex-1 flex flex-col items-center">
                    <Button
                        suppressHydrationWarning
                        onClick={() => selected && onNext()}
                        disabled={!selected}
                        size="lg"
                        className={cn(
                            "w-full rounded-xl font-semibold py-3 h-auto",
                            selected
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                                : "bg-gray-200 text-gray-400 shadow-none"
                        )}
                    >
                        {nextLabel}
                    </Button>
                    {!selected && (
                        <p className="mt-2 text-xs text-gray-400">Select an option to continue</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

