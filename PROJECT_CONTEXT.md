# Adsum Project Context & Roadmap

## 1. Project Overview
**Adsum** (Latin for "I am here" / "I am ready") is an enterprise-grade SaaS platform designed for developers and creatives. It allows users to register and automatically generate a high-end, cinematic personal portfolio/resume website.

This is **not** a simple landing page or a static site generator; it is a full-scale multi-user platform where each user manages their own data (projects, skills, experiences, contact info) and receives a dedicated, SEO-optimized public URL (`/u/username`).

## 2. Technical Evolution (The Migration)
The project underwent a significant architectural rewrite to ensure scalability and resolve environment-specific constraints.

### Legacy Stack (Deprecated)
- **Frontend:** Vite + React (SPA).
- **Backend:** Express.js.
- **ORM:** Prisma.
- **Issues:** Prisma encountered significant binary execution and file-locking errors on the Windows host environment.

### Current "Gold" Stack (Active)
- **Frontend: Next.js 15 (App Router)** in `adsum-web/`.
  - **Why:** Server-Side Rendering (SSR) for blazing fast, SEO-perfect public portfolios.
  - **Aesthetics:** Cinematic dark mode, glassmorphism, Framer Motion animations.
  - **State:** Zustand with persistent storage.
- **Backend: NestJS** in `adsum-api/`.
  - **Why:** Modular architecture, built-in dependency injection, and enterprise-level structure.
- **ORM: TypeORM (PostgreSQL)**.
  - **Why:** Replaced Prisma to resolve environment conflicts while maintaining a robust repository pattern.
- **Database:** PostgreSQL (Database name: `portfolio_db`).

## 3. Core Objectives for AI Agents
When working on this project, follow these principles:
1. **Pristine Aesthetics:** Avoid generic or "AI-generated" looks. Use rich colors, deep blurs, and premium spacing.
2. **SSR First:** Public-facing pages must be Server Components for maximum performance and SEO.
3. **Type Safety:** Always maintain strict TypeScript interfaces between the Next.js frontend and NestJS backend.
4. **Resiliency:** The backend uses `synchronize: true` in development to ensure the schema matches the entities, but be careful with data persistence.

## 4. Key Endpoints & Routes
- **Public:** `/` (Landing), `/u/[username]` (Portfolio), `/login`, `/register`.
- **Protected:** `/dashboard` (User CRM).
- **Backend Prefix:** `/api/` (Running on port 3001).

## 5. Active Configuration
- **Database User:** `postgres`
- **Database Password:** `abdu_1234`
- **JWT System:** Secure JWT with `ConfigService` management and `JwtAuthGuard` protection on private routes.
