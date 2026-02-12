# GenAI & Data Science Bootcamp Planner

A personalized learning planner built with **Next.js 16**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**.
It generates a tailored module-by-module roadmap based on your career goals, experience, and availability.

## 🚀 Getting Started

1.  Navigate to the project folder:
    ```bash
    cd bootcamp-planner
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Features

*   **12-Step Interactive Wizard**: Profile, role, goal, motivation, timeline, availability, schedule, learning pace, content depth, application focus, end goal, and prior knowledge.
*   **Dynamic Roadmap Engine**: Filters, groups, and adjusts module durations based on all 12 inputs.
*   **Premium UI**: Gradient animations, smooth Framer Motion transitions, responsive design with shadcn/ui components.
*   **Full Curriculum**: 43 modules from the Codebasics GenAI & Data Science Bootcamp 3.0 embedded in `lib/bootcampData.ts`.

## 📁 Project Structure

*   `app/page.tsx` — Main page with wizard state and step routing.
*   `components/planner/` — Wizard UI components (`SelectionStep`, `ExperienceStep`, `ProgressBar`, `RoadmapResult`).
*   `components/ui/` — shadcn/ui primitives (`Button`, `Card`, `Badge`, `Progress`, `Input`).
*   `lib/bootcampData.ts` — All 43 modules with topics, durations, and categories.
*   `lib/generatePlan.ts` — Core engine: filtering, duration adjustments, phase grouping, and "Why this plan" logic.
*   `lib/stepOptions.tsx` — Option definitions for all 12 wizard steps (icons, labels, descriptions).
*   `lib/types.ts` — Shared TypeScript types (`StepOption`, `ExperienceState`, `PlanResult`).
