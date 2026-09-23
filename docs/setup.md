# Tamizh Cholai Setup Guide

## Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- PostgreSQL (v14+) OR Docker Desktop

## Quick Start (Local Development)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env` in the root directory:
   ```bash
   cp .env.example .env
   ```

3. **Database Migration & Seeding:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Start Development Servers (Client & Server):**
   ```bash
   npm run dev
   ```
   - Client UI: `http://localhost:5173`
   - Server REST API: `http://localhost:5000/api`

## Running via Docker Compose
To run PostgreSQL, Server, and Client in Docker containers:
```bash
docker compose up --build -d
```

## Demo Credentials
- **Student:** `student@tamizhcholai.edu` / `StudentPass123!`
- **Teacher:** `teacher@tamizhcholai.edu` / `TeacherPass123!`
- **Admin:** `admin@tamizhcholai.edu` / `AdminPass123!`
