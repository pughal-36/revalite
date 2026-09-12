# REVA Lite - E-Waste Evaluation Dashboard

**REVA Lite** is a lightweight, modern React + Vite frontend application built to serve as an e-waste evaluation dashboard. It was developed as a submission for an internship assignment, focusing on utilizing AI as a development assistant while maintaining strict control over code quality and architectural decisions.

## 🚀 Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Professional Slate/Zinc Theme)
- **Animations:** GSAP (`@gsap/react`) for staggered entrances and 3D hover effects
- **Architecture:** Client-side only (no backend/database), mock data driven

---

## 🤖 AI Assistance & Workflow

This project was built using an AI assistant (Google Antigravity / Gemini) paired with human oversight. 

### How AI Assisted Throughout Implementation
- **Boilerplate & Foundation:** The AI rapidly scaffolded the Vite React application, created the initial component architecture (`App.jsx`, `DeviceCard.jsx`, `Header.jsx`, etc.), and populated the initial `devices.js` mock data.
- **Design System Implementation:** The AI successfully refactored a legacy CSS monolithic stylesheet into a modern Tailwind configuration, injecting specialized utility classes (like `.glass-elevated`) and mapping out a comprehensive design token system.
- **Complex Animations:** The AI implemented sophisticated GSAP animations, including staggered "domino" grid entrances and mathematical 3D perspective mouse-tracking hover effects that would have been tedious to write manually.
- **Troubleshooting:** When encountering Vite and PostCSS configuration errors with Tailwind v4, the AI assisted in debugging and installing the necessary `@tailwindcss/postcss` packages to resolve the build errors.

### 📝 Prompts Used During Development
Below is a sample of the core prompts used to direct the AI assistant during development:

1. *"I am building a small React + Vite frontend application called 'REVA Lite' for an AI-assisted development assignment. The application is a lightweight e-waste evaluation dashboard... First explain which components you recommend, which files should contain them, and how they interact."*
2. *"ok move to that branch and install this skill and design new frontend using the antigravity-design-expert principles."*
3. *"the color is ai slop use anything from this theme to look professional install needed skill if you want to make it less sloppy"*
4. *"So I want you to do the same thing inside this deposit... basically I just want to move my code from my capstone to this reva lite so that this is my internship submission... do commit messages professional in single sentence"*
5. *"solve the commit conflicts"*

### 🛠️ Manual Improvements, Corrections, & Refactoring
While the AI generated the bulk of the code, significant human intervention and direction were required to achieve the final quality:

1. **Aesthetic Corrections (Rejecting "AI Slop"):** The AI initially proposed and implemented a very cliché "AI-generated" aesthetic featuring stark black backgrounds, glowing radial gradients, and bright neon emerald green accents. This was manually rejected. The AI was directed to refactor the entire design token system into a clean, professional, enterprise-grade SaaS theme (using Tailwind Zinc/Slate neutrals and crisp Indigo accents).
2. **Architectural Constraints Enforcement:** The AI was manually constrained to prevent it from over-engineering the application. It was explicitly instructed to avoid adding unnecessary dependencies, external API calls, or backend logic, forcing it to focus purely on the frontend UI state.
3. **Repository Migration & Conflict Resolution:** The AI generated the code in a sandbox `my-capstone` repository. The code was manually migrated into this final `revalite` repository. When a standard `git pull` resulted in merge conflicts between the remote scaffolding and the new UI, the conflicts were manually resolved by enforcing a `--ours` strategy to preserve the newly developed React components.

---

## 💻 Running the Application

To run the dashboard locally:

```bash
cd reva-lite
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to view the application.
