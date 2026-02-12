# Bootcamp Custom Planner

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

The **Bootcamp Custom Planner** is a powerful personalization engine built for the Codebasics GenAI & Data Science Bootcamp. It "chisels" a massive syllabus into a lean, 100% personalized learning journey based on a student's unique experience, career goals, and weekly availability.

**Repository**: [https://github.com/MochithaCodeBasics/Custom-Planner](https://github.com/MochithaCodeBasics/Custom-Planner)

---

## Features

- **Syllabus Chiseling**: Automatically removes modules you already know and filters subjects based on your target career goal (ML, GenAI, or NLP).
- **Dynamic Scaling**: Adapts module durations using smart multipliers for your profile (Beginner/Pro) and availability (3h/week to Full-time).
- **Admin Control Center**: A dedicated UI to manage the master syllabus, with changes reflected instantly in user roadmaps.
- **UI**: Built with Framer Motion and shadcn/ui for a high-end, responsive explorer experience.

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MochithaCodeBasics/Custom-Planner.git
   cd Custom-Planner
   ```

2. **Navigate to the app directory**:
   ```bash
   cd bootcamp_custom_planner/bootcamp-planner
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Logic Engine**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Database (Base Store)**: Local Filesystem (JSON Persistence)

---

## Project Structure

- `bootcamp_custom_planner/bootcamp-planner/`: Core Next.js application.
- `bootcamp_custom_planner/scripts/`: Utility scripts for data migration and syllabus maintenance.
- `bootcamp_custom_planner/data/`: The "Base Store" containing the `syllabus_v3.json` source of truth.

---

## Detailed Documentation

For technical deep-dives into the architecture and logic:
- **[Project Architecture & Data Flow](./PROJECT_OVERVIEW.md)**
- **[The Chiseling Math & Logic](./roadmap_generation_logic.md)**

---

© 2026 Codebasics. Built for Personalized Learning Excellence.
