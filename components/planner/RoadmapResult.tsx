"use client";

import { useState } from "react";
import { type PlanResult } from "@/lib/types";
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Rocket, Sparkles, Star, Briefcase, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type RoadmapResultProps = {
    plan: PlanResult;
    goalLabel: string;
    onReset: () => void;
};

// Helper to map syllabus colors to vibrant premium accents
const getAccentClasses = (colorClass: string) => {
    const color = colorClass.toLowerCase();
    if (color.includes('blue')) return { border: 'border-l-blue-600', icon: 'bg-blue-100 text-blue-700', bullet: 'bg-blue-400' };
    if (color.includes('cyan')) return { border: 'border-l-cyan-500', icon: 'bg-cyan-100 text-cyan-700', bullet: 'bg-cyan-400' };
    if (color.includes('indigo')) return { border: 'border-l-indigo-600', icon: 'bg-indigo-100 text-indigo-700', bullet: 'bg-indigo-400' };
    if (color.includes('green')) return { border: 'border-l-emerald-600', icon: 'bg-emerald-100 text-emerald-700', bullet: 'bg-emerald-400' };
    if (color.includes('emerald')) return { border: 'border-l-emerald-600', icon: 'bg-emerald-100 text-emerald-700', bullet: 'bg-emerald-400' };
    if (color.includes('purple')) return { border: 'border-l-purple-600', icon: 'bg-purple-100 text-purple-700', bullet: 'bg-purple-400' };
    if (color.includes('pink')) return { border: 'border-l-pink-600', icon: 'bg-pink-100 text-pink-700', bullet: 'bg-pink-400' };
    if (color.includes('rose')) return { border: 'border-l-rose-600', icon: 'bg-rose-100 text-rose-700', bullet: 'bg-rose-400' };
    if (color.includes('amber')) return { border: 'border-l-amber-500', icon: 'bg-amber-100 text-amber-700', bullet: 'bg-amber-400' };
    return { border: 'border-l-slate-400', icon: 'bg-slate-100 text-slate-700', bullet: 'bg-slate-400' };
};

export default function RoadmapResult({ plan, goalLabel, onReset }: RoadmapResultProps) {
    const [expandedModule, setExpandedModule] = useState<string | null>(null);

    const toggleModule = (id: string) => {
        setExpandedModule(expandedModule === id ? null : id);
    };

    const totalProjects = plan.phases.reduce(
        (sum, p) => sum + p.chapters.filter(ch => ch.isProject === true).length, 0
    );

    const totalInternships = plan.phases.reduce(
        (sum, p) => sum + p.chapters.filter(ch => ch.isInternship === true).length, 0
    );

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Career Roadmap</h2>
                <p className="text-blue-100 text-lg">
                    Designed for a <span className="font-bold text-white">{goalLabel}</span> role.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
                    <StatCard label="Timeline" value={`${plan.estimatedMonths} Months`} />
                    <StatCard label="Pace" value={`${plan.hoursPerWeek}h / week`} />
                    <StatCard label="Modules" value={`${plan.totalModules}`} />
                    <StatCard label="Projects" value={`${totalProjects}`} />
                    <StatCard label="Virtual Internships" value={`${totalInternships}`} />
                </div>
            </div>

            {/* WHY THIS PLAN */}
            {plan.whyThisPlan && plan.whyThisPlan.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 border-l-4 border-l-indigo-500">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        Why this plan for you
                    </h3>
                    <ul className="space-y-3">
                        {plan.whyThisPlan.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-gray-600 text-sm leading-relaxed">{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* CURRICULUM */}
            <div className="space-y-6">
                {plan.phases.map((phase, idx) => (
                    <div key={idx} className={`rounded-2xl border-2 ${phase.color} shadow-sm hover:shadow-md transition-shadow`}>
                        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-t-[calc(1rem-2px)]">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-700 shadow-sm text-sm font-bold">
                                    {idx + 1}
                                </span>
                                {phase.name}
                            </h3>
                            {(() => {
                                const totalWeeks = phase.chapters.reduce((s, ch) => s + ch.durationWeeks, 0);
                                const isCareerPhase = phase.name.toLowerCase().includes('online credibility') ||
                                    phase.name.toLowerCase().includes('job assistance') ||
                                    phase.name.toLowerCase().includes('interview') ||
                                    phase.name.toLowerCase().includes('branding');

                                const isOptionalPhase = phase.name.toLowerCase().includes('sql (advanced)');

                                if (isOptionalPhase) {
                                    return (
                                        <SimpleTooltip content="It's extra credit and not part of the core timeline.">
                                            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200 font-medium cursor-help shadow-sm">
                                                Optional
                                            </span>
                                        </SimpleTooltip>
                                    );
                                }

                                if (isCareerPhase) {
                                    return (
                                        <SimpleTooltip content="Consistent effort on these tasks makes a huge difference in landing a job!">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100 cursor-help">
                                                <Repeat className="w-4 h-4" />
                                            </span>
                                        </SimpleTooltip>
                                    );
                                }

                                return totalWeeks > 0 ? (
                                    <span className="text-sm font-semibold bg-white/80 px-3 py-1 rounded-full text-gray-600 shadow-sm">
                                        ~{totalWeeks.toFixed(0)} Weeks
                                    </span>
                                ) : (
                                    <SimpleTooltip content="Consistent effort on these tasks makes a huge difference in landing a job!">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100 cursor-help">
                                            <Repeat className="w-4 h-4" />
                                        </span>
                                    </SimpleTooltip>
                                );
                            })()}
                        </div>

                        <div className="divide-y divide-black/5 bg-white/40 rounded-b-[calc(1rem-2px)]">
                            {phase.chapters.map(ch => (
                                <div key={ch.id} className="group transition-colors hover:bg-white/60">
                                    <button
                                        onClick={() => toggleModule(ch.id)}
                                        className="w-full text-left p-5 flex items-start gap-4 outline-none"
                                        suppressHydrationWarning
                                    >
                                        <div className={`mt-1 p-2 rounded-lg ${ch.isProject ? 'bg-amber-100 text-amber-700' : ch.isInternship ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {ch.isProject
                                                ? <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                                                : ch.isInternship
                                                    ? <Briefcase className="w-5 h-5" />
                                                    : <BookOpen className="w-5 h-5" />
                                            }
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className={`font-bold text-lg ${ch.isProject ? 'text-amber-800' : ch.isInternship ? 'text-emerald-800' : 'text-gray-800'}`}>
                                                    {ch.title}
                                                </h4>
                                                {expandedModule === ch.id
                                                    ? <ChevronUp className="text-gray-400" />
                                                    : <ChevronDown className="text-gray-400" />
                                                }
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {ch.topics.slice(0, 3).join(" • ")}
                                                {ch.topics.length > 3 && ` + ${ch.topics.length - 3} more`}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Expanded topics */}
                                    {expandedModule === ch.id && (
                                        <div className="px-5 pb-6 pl-[4.5rem]">
                                            <div className="bg-white/70 rounded-xl p-4 border border-black/5 shadow-inner">
                                                <h5 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">
                                                    Syllabus Covered
                                                </h5>
                                                <ul className="grid md:grid-cols-2 gap-2">
                                                    {ch.topics.map(t => (
                                                        <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                                            {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
                }
            </div >

            {/* FOOTER CTA */}
            <div className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 text-white p-8 rounded-2xl text-center print:hidden border border-white/10 shadow-3xl relative overflow-hidden">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
                <p className="text-slate-400 mb-6">Download your detailed PDF roadmap or adjust your settings to create a new plan.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => window.print()}
                        size="lg"
                        className="px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-100"
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onReset}
                        className="px-8 border-white/20 bg-transparent text-white font-bold rounded-xl hover:bg-white/10 hover:text-white"
                    >
                        Create New Plan
                    </Button>
                </div>
            </div >
        </motion.div >
    );
}

const SimpleTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white text-slate-700 text-xs font-medium rounded-xl shadow-xl border border-slate-100 z-50 pointer-events-none text-center backdrop-blur-sm">
                    {content}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                </div>
            )}
        </div>
    );
};

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">{label}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );
}
