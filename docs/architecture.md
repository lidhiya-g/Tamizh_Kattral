# Tamizh Cholai System Architecture

## System Overview
Tamizh Cholai (தமிழ்ச்சோலை) is a modern full-stack web application designed for learning Tamil from the foundational letters up to reading authentic classical literature.

```
       +-------------------------------------------------------+
       |                  React 18 + Vite UI                   |
       |  (Tailwind CSS, Framer Motion, Lucide, i18n, Canvas)  |
       +---------------------------+---------------------------+
                                   | REST API (HTTP/JSON)
                                   v
       +-------------------------------------------------------+
       |               Node.js + Express Server                |
       |  (JWT Auth, Zod Validation, RBAC, XP Engine, Services) |
       +---------------------------+---------------------------+
                                   | Prisma ORM
                                   v
       +-------------------------------------------------------+
       |                  PostgreSQL Database                  |
       |   (26 Normalized Tables: Users, Stages, Quizzes, XP)  |
       +-------------------------------------------------------+
```

## Monorepo Layout
- `client/`: Single Page Application (SPA) built with React 18, Vite, TypeScript, Tailwind CSS, Lucide React, and Framer Motion.
- `server/`: REST API built with Node.js, Express, TypeScript, Zod schema validation, and Prisma ORM.
- `shared/`: Shared domain models, enums, interfaces, and constants.
- `docs/`: Technical specifications, REST API reference, and setup guides.

## Security & Authentication Layer
1. **JWT Authentication:** Tokens signed with `JWT_SECRET` issued upon registration/login, stored securely in local storage / headers.
2. **Role-Based Access Control (RBAC):** `STUDENT`, `TEACHER`, `ADMIN` roles enforced at route middleware level (`authMiddleware`, `roleMiddleware`).
3. **Password Hashing:** Passwords hashed with `bcryptjs` (salt rounds: 10). `passwordHash` is excluded from all user query returns.
4. **Input Validation:** All input payloads validated using Zod schemas (`authValidator`, `lessonValidator`, `quizValidator`).
5. **Rate Limiting & CORS:** CORS strictly mapped to `CLIENT_URL` with standard API rate limit protection.

## Data Persistence & ORM
- Prisma ORM managing 26 normalized models.
- Atomic database transactions used for awarding XP, incrementing user level, checking badge unlock criteria, and updating activity streaks to avoid race conditions and duplicate rewards.
