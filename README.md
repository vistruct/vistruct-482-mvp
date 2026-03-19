# Vistruct — 482 Chef Visa Checklist Generator

**Migration Process Infrastructure Platform**  
B2B SaaS MVP · Australian 482 TSS Visa · Chef & Cook Occupations

---

## Overview

Vistruct is a three-step web tool that generates a personalised 482 visa document checklist for Korean chef applicants in Australia.

**No login. No payment. No database.**

The tool takes four inputs and produces a conditional checklist across five document steps, with targeted warnings based on the user's answers.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Fonts | Instrument Serif + DM Sans (Google Fonts) |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
src/
├── types/
│   └── index.ts          # Shared TypeScript types (Page, FormData, ChecklistStep, etc.)
├── data/
│   └── checklist.ts      # All 5 checklist steps + items + conditional warnings
├── components/
│   ├── Header.tsx         # Top navigation bar with Vistruct logo
│   ├── ProgressBar.tsx    # 3-step progress indicator
│   └── ChecklistStepCard.tsx  # Individual checklist step with checkboxes + warning
├── pages/
│   ├── StartPage.tsx      # Landing / hero page
│   ├── InputPage.tsx      # 4-question input form
│   ├── ReviewPage.tsx     # Answer summary + warning preview
│   ├── ResultPage.tsx     # Full interactive checklist
│   └── SponsorPage.tsx    # Expert connect / CTA page
├── App.tsx               # Page router + state management
├── main.tsx              # React entry point
└── index.css             # Tailwind directives + global base styles
```

---

## Pages / Flow

```
Start → Input → Review → Result → Sponsor
```

| Page | Description |
|---|---|
| **Start** | Hero landing with feature pills and CTA |
| **Input** | 4 questions: experience, English, sponsor, RPL |
| **Review** | Confirms answers, previews warnings, disclaimer |
| **Result** | Full 5-step interactive checklist with checkboxes |
| **Sponsor** | Expert consultation CTA with contact form (UI only) |

---

## Checklist Steps

| # | Step | Key Conditional Logic |
|---|---|---|
| 1 | Eligibility Assessment | Warning if experience < 2 years |
| 2 | RPL / Skills Assessment | Warning + different items if RPL not done |
| 3 | English Language | Warning + different items if no test result |
| 4 | Personal Documents | Always shown (no conditions) |
| 5 | Employer / Sponsor Documents | Warning if no sponsor confirmed |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## Brand

| Token | Value |
|---|---|
| Background | `#0B1628` (Dark Navy) |
| Accent | `#E8B84B` (Amber Gold) |
| Accent Light | `#F2CC77` |
| Accent Dark | `#C99A30` |
| Heading Font | Instrument Serif |
| Body Font | DM Sans |

---

## Roadmap (Post-MVP)

- [ ] PDF export of completed checklist
- [ ] Email checklist to self
- [ ] Login + saved progress
- [ ] Agent dashboard (B2B)
- [ ] 186 / 494 visa pathways
- [ ] Korean language version
