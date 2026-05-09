# Classified Marketplace

Production-grade classified ads + job portal + CV builder, built on Next.js 15.

## Stack

- **Framework:** Next.js 15 (App Router) · React 19 · TypeScript 5.7
- **Styling:** Tailwind CSS 3.4 · Shadcn UI · Framer Motion
- **Auth:** Firebase Authentication (Phone OTP, Email, Google)
- **Database:** Supabase PostgreSQL with Row-Level Security
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **i18n:** next-intl (en, ar, bn, ur, hi, ru, fa, es) with full RTL support
- **Deployment:** Vercel

## Quick start

\`\`\`bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local
# fill in Firebase + Supabase + payment provider values

# 3. Develop
npm run dev
\`\`\`

Open http://localhost:3000 — you should see the Step 1 scaffold landing.

## Scripts

| Script           | Purpose                              |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server                     |
| `npm run build`  | Production build                     |
| `npm run start`  | Start production server              |
| `npm run lint`   | Lint with ESLint                     |
| `npm run type-check` | Strict TypeScript check          |
| `npm run format` | Format with Prettier                 |

## Architecture

Root-level structure (no `src/`). Domain-grouped components and services. All
features are role-gated via `UserRole` (`user`, `seller`, `employer`,
`premium_user`, `moderator`, `admin`).

## Status

- [x] **Step 1** — Scaffold, configs, i18n routing, theme tokens
- [ ] Step 2 — Firebase Auth + Supabase clients + base UI
- [ ] Step 3 — Database schema + RLS
- [ ] Step 4 — Classified ads (CRUD + media)
- [ ] Step 5 — Free/paid plans + payments
- [ ] Step 6 — Job portal
- [ ] Step 7 — CV builder
- [ ] Step 8 — Realtime messaging
- [ ] Step 9 — Admin panel
- [ ] Step 10 — Ads management + AdSense + Meta Pixel
- [ ] Step 11 — SEO, sitemap, performance pass
- [ ] Step 12 — Deploy to Vercel
