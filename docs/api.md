# Tamizh Cholai API Reference

Base Endpoint: `/api`

## Authentication (`/api/auth`)
- `POST /api/auth/register` — Create new student/teacher account.
- `POST /api/auth/login` — Sign in and receive JWT token + user profile.
- `POST /api/auth/logout` — Invalidate user session.
- `GET /api/auth/me` — Fetch currently authenticated user context.
- `POST /api/auth/forgot-password` — Initiate password recovery.
- `POST /api/auth/reset-password` — Complete password reset with token.

## Users & Profiles (`/api/users` & `/api/profile`)
- `GET /api/users/me` — Detailed user data.
- `PATCH /api/users/me` — Update name/email.
- `GET /api/profile` — User profile (avatar, bio, goal, daily target).
- `PATCH /api/profile` — Update user profile.

## Learning Stages & Lessons (`/api/stages` & `/api/lessons`)
- `GET /api/stages` — List all 8 learning stages with user unlock status.
- `GET /api/stages/:id` — Details of a specific stage.
- `GET /api/stages/:id/lessons` — List lessons in stage.
- `GET /api/lessons/:id` — Lesson content & interactive components.
- `POST /api/lessons/:id/complete` — Complete lesson, calculate & award XP.

## Tamil Letters, Words & Sentences (`/api/letters`, `/api/words`, `/api/sentences`)
- `GET /api/letters` — Get Tamil vowels & consonants with transliteration & audio.
- `GET /api/letters/:id` — Specific letter detail.
- `GET /api/words` — List words with categories (Family, Nature, Food, etc.).
- `GET /api/words/:id` — Word breakdown & audio text.
- `GET /api/sentences` — Get sentences for ordering exercises.

## Reading & Books (`/api/reading` & `/api/books`)
- `GET /api/reading` — List reading passages.
- `GET /api/reading/:id` — Passage content with clickable vocabulary.
- `POST /api/reading/:id/progress` — Save reading completion.
- `GET /api/books` — List Tamil digital books.
- `GET /api/books/:id` — Book metadata & chapters.
- `POST /api/books/:id/progress` — Track reading page & progress.

## Thirukkural (`/api/thirukkural`)
- `GET /api/thirukkural` — Browse Thirukkural entries.
- `GET /api/thirukkural/:number` — Get Kural by number (1-1330) with Tamil text, simple explanation, and English translation.

## Quizzes & Gamification (`/api/quizzes`, `/api/progress`, `/api/xp`, `/api/achievements`, `/api/streak`)
- `GET /api/quizzes/:id` — Fetch quiz questions.
- `POST /api/quizzes/:id/submit` — Submit quiz answers, score server-side, award XP.
- `GET /api/progress` — Overall user learning progress.
- `GET /api/xp` — XP transaction history & current level.
- `GET /api/achievements` — All system badges & user unlocked status.
- `GET /api/streak` — Daily activity streak metrics.

## Search (`/api/search`)
- `GET /api/search?q=query` — Search letters, words, lessons, books, Thirukkural.

## Admin & Teacher (`/api/admin` & `/api/teacher`)
- `GET /api/admin/users` — User management table.
- `GET /api/admin/analytics` — Real database-calculated stats (active users, completion rates).
- `POST /api/admin/lessons` — Create new lesson.
- `PATCH /api/admin/lessons/:id` — Modify lesson.
- `DELETE /api/admin/lessons/:id` — Remove lesson.
- `GET /api/teacher/learners` — Track assigned learners and performance.
