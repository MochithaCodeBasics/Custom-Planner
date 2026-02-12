import { StepOption } from "./types";
import {
    Sprout, BookOpen, Repeat, Briefcase, Undo2,
    Code, BarChart3, GraduationCap, Building2, NotebookPen, Users, Pause,
    Target, Cpu, Sparkles, Settings, MessageSquare, Trophy,
    ArrowRightLeft, Banknote, TrendingUp, Rocket, Heart,
    Zap, Clock, FlaskConical,
    Hourglass, Footprints, Timer,
    Sun, AlarmClock, Calendar, Moon,
    FastForward, Search, Wrench, Book,
    Layers, Crosshair, Scale,
    Lightbulb, ClipboardList, Globe, Mic,
    Laptop, Building, ArrowUpRight,
} from "lucide-react";

const I = "w-6 h-6";

export const PROFILES: StepOption[] = [
    { id: 'beginner', name: 'Complete Beginner', desc: 'New to programming and data science', icon: <Sprout className={`${I} text-green-500`} /> },
    { id: 'intermediate', name: 'Intermediate', desc: 'Some programming experience', icon: <BookOpen className={`${I} text-blue-500`} /> },
    { id: 'switcher', name: 'Career Switcher', desc: 'From another field to data science', icon: <Repeat className={`${I} text-orange-500`} /> },
    { id: 'professional', name: 'Working Professional', desc: 'Upskilling while working', icon: <Briefcase className={`${I} text-indigo-500`} /> },
    { id: 'returner', name: 'Returning Professional', desc: 'Restarting career after a break', icon: <Undo2 className={`${I} text-purple-500`} /> }
];

export const CURRENT_ROLES: StepOption[] = [
    { id: 'software-dev', name: 'Software Developer', desc: 'Backend/Frontend/Full-stack', icon: <Code className={`${I} text-blue-500`} /> },
    { id: 'analyst', name: 'Analyst', desc: 'Business/Data Analyst', icon: <BarChart3 className={`${I} text-cyan-500`} /> },
    { id: 'fresh-grad', name: 'Fresh Graduate', desc: 'Recently completed degree', icon: <GraduationCap className={`${I} text-amber-500`} /> },
    { id: 'non-tech', name: 'Non-tech Professional', desc: 'From other industries', icon: <Building2 className={`${I} text-gray-500`} /> },
    { id: 'student', name: 'Student', desc: 'Currently studying', icon: <NotebookPen className={`${I} text-green-500`} /> },
    { id: 'manager', name: 'Manager/Leadership', desc: 'Technical management role', icon: <Users className={`${I} text-indigo-500`} /> },
    { id: 'educator', name: 'Educator / Academician', desc: 'Professor, teacher, or researcher', icon: <BookOpen className={`${I} text-teal-500`} /> },
    { id: 'career-gap', name: 'Career Break / Gap', desc: 'Looking to re-enter workforce', icon: <Pause className={`${I} text-rose-400`} /> }
];

export const GOALS: StepOption[] = [
    { id: 'fullstack-ds', name: 'Full-Stack Data Scientist', desc: 'Master ML, DL, and GenAI', icon: <Target className={`${I} text-blue-600`} /> },
    { id: 'ml-engineer', name: 'ML Engineer', desc: 'Focus on ML and MLOps', icon: <Cpu className={`${I} text-green-600`} /> },
    { id: 'genai-specialist', name: 'GenAI Specialist', desc: 'Deep dive into LLMs and agents', icon: <Sparkles className={`${I} text-purple-500`} /> },
    { id: 'ai-engineer', name: 'AI Engineer', desc: 'Build & Deploy Scalable AI Systems', icon: <Settings className={`${I} text-gray-600`} /> },
    { id: 'nlp-engineer', name: 'NLP Engineer', desc: 'NLP and language models', icon: <MessageSquare className={`${I} text-pink-500`} /> }
];

export const MOTIVATIONS: StepOption[] = [
    { id: 'first-job', name: 'Land My First Job', desc: 'Build skills & portfolio for first role', icon: <Trophy className={`${I} text-amber-500`} /> },
    { id: 'career-restart', name: 'Career Restart', desc: 'Get back into the workforce after a break', icon: <Undo2 className={`${I} text-teal-500`} /> },
    { id: 'career-change', name: 'Career Change', desc: 'Switch to data science field', icon: <ArrowRightLeft className={`${I} text-orange-500`} /> },
    { id: 'salary', name: 'Salary Increase', desc: 'Higher compensation', icon: <Banknote className={`${I} text-emerald-500`} /> },
    { id: 'skill-enhance', name: 'Skill Enhancement', desc: 'Improve current capabilities', icon: <TrendingUp className={`${I} text-blue-500`} /> },
    { id: 'startup', name: 'Build Startup/Product', desc: 'Launch your own venture', icon: <Rocket className={`${I} text-red-500`} /> },
    { id: 'academic', name: 'Academic Requirements', desc: 'For degree or research', icon: <GraduationCap className={`${I} text-indigo-500`} /> },
    { id: 'interest', name: 'Personal Interest', desc: 'Curiosity and learning', icon: <Heart className={`${I} text-rose-500`} /> }
];

export const CAREER_TIMELINES: StepOption[] = [
    { id: 'immediate', name: 'Immediate Job Search', desc: '3-6 months', icon: <Zap className={`${I} text-amber-500`} /> },
    { id: 'transition', name: 'Career Transition', desc: '6-12 months', icon: <Clock className={`${I} text-blue-500`} /> },
    { id: 'longterm', name: 'Long-term Upskilling', desc: '12+ months', icon: <Sprout className={`${I} text-green-500`} /> },
    { id: 'academic', name: 'Academic/Research Focus', desc: 'Flexible timeline', icon: <FlaskConical className={`${I} text-purple-500`} /> }
];

export const AVAILABILITY_OPTIONS: StepOption[] = [
    { id: '3-5', name: '3-5 hours/week', desc: 'Slower pace (20-24 months)', icon: <Moon className={`${I} text-gray-400`} /> },
    { id: '5-10', name: '5-10 hours/week', desc: 'Consistent (14-18 months)', icon: <Hourglass className={`${I} text-blue-400`} /> },
    { id: '10-20', name: '10-20 hours/week', desc: 'Balanced (8-12 months)', icon: <Footprints className={`${I} text-orange-500`} /> },
    { id: '20-30', name: '20-30 hours/week', desc: 'Fast (5-7 months)', icon: <Timer className={`${I} text-red-500`} /> },
    { id: '30-40', name: '30-40 hours/week', desc: 'Aggressive (4-5 months)', icon: <TrendingUp className={`${I} text-indigo-500`} /> },
    { id: 'full-time', name: '40+ hours/week', desc: 'Intensive (3-4 months)', icon: <Rocket className={`${I} text-blue-600`} /> }
];

export const SCHEDULE_TYPES: StepOption[] = [
    { id: 'flexible', name: 'Flexible Schedule', desc: 'Can study anytime', icon: <Sun className={`${I} text-yellow-500`} /> },
    { id: 'strict-deadline', name: 'Strict Deadline', desc: 'Job offer or academic deadline', icon: <AlarmClock className={`${I} text-red-500`} /> },
    { id: 'weekend', name: 'Weekend-only', desc: 'Busy weekdays', icon: <Calendar className={`${I} text-blue-500`} /> },
    { id: 'evening', name: 'Evening-only', desc: 'After work hours', icon: <Moon className={`${I} text-indigo-400`} /> }
];

export const LEARNING_PACES: StepOption[] = [
    { id: 'fast-track', name: 'Fast Track', desc: 'Skip basics, focus on advanced', icon: <FastForward className={`${I} text-amber-500`} /> },
    { id: 'thorough', name: 'Thorough', desc: 'Deep dive into every concept', icon: <Search className={`${I} text-blue-500`} /> },
    { id: 'practical-first', name: 'Practical-first', desc: 'Projects before theory', icon: <Wrench className={`${I} text-orange-500`} /> },
    { id: 'theory-first', name: 'Theory-first', desc: 'Concepts before implementation', icon: <Book className={`${I} text-purple-500`} /> }
];

export const CONTENT_DEPTHS: StepOption[] = [
    { id: 'breadth', name: 'Breadth over Depth', desc: 'Know many things at surface level', icon: <Layers className={`${I} text-cyan-500`} /> },
    { id: 'depth', name: 'Depth over Breadth', desc: 'Master fewer things deeply', icon: <Crosshair className={`${I} text-red-500`} /> },
    { id: 'balanced', name: 'Balanced Approach', desc: 'Mix of breadth and depth', icon: <Scale className={`${I} text-green-500`} /> }
];

export const REAL_WORLD_APPS: StepOption[] = [
    { id: 'own-project', name: 'Own Project Idea', desc: 'Work on your specific use case', icon: <Lightbulb className={`${I} text-yellow-500`} /> },
    { id: 'provided', name: 'Provided Projects', desc: 'Follow bootcamp projects', icon: <ClipboardList className={`${I} text-blue-500`} /> },
    { id: 'open-source', name: 'Open Source', desc: 'Contribute to real projects', icon: <Globe className={`${I} text-green-500`} /> },
    { id: 'job-prep', name: 'Job Preparation', desc: 'Portfolio, interview prep & job readiness', icon: <Mic className={`${I} text-rose-500`} /> }
];

export const POST_BOOTCAMPS: StepOption[] = [
    { id: 'freelancing', name: 'Freelancing', desc: 'Work independently on projects', icon: <Laptop className={`${I} text-blue-500`} /> },
    { id: 'full-time', name: 'Full-time Employment', desc: 'Join a company as employee', icon: <Building className={`${I} text-indigo-500`} /> },
    { id: 'entrepreneurship', name: 'Entrepreneurship', desc: 'Start your own company', icon: <Rocket className={`${I} text-orange-500`} /> },
    { id: 'further-edu', name: 'Further Education', desc: 'Masters/PhD programs', icon: <GraduationCap className={`${I} text-purple-500`} /> },
    { id: 'internal', name: 'Internal Transition', desc: 'New role in current company', icon: <ArrowUpRight className={`${I} text-green-500`} /> }
];

export const EXPERIENCE_OPTIONS = [
    { key: 'python', label: 'Python Fundamentals', desc: 'Variables, loops, functions, OOP' },
    { key: 'sql', label: 'SQL Basics', desc: 'Queries, joins, database basics' },
    { key: 'statistics', label: 'Math & Stats', desc: 'Probability, distributions, hypothesis testing' },
    { key: 'ml', label: 'ML Basics', desc: 'Regression, classification, basic algorithms' },
    { key: 'dl', label: 'Deep Learning', desc: 'Neural Networks, CNNs, RNNs' },
    { key: 'nlp', label: 'NLP', desc: 'Text processing, embeddings, transformers' },
    { key: 'genai', label: 'GenAI Basics', desc: 'LLMs, RAG, Prompt Engineering' },
    { key: 'mlops', label: 'MLOps & Cloud', desc: 'Deployment, AWS, MLflow' }
];
