# Articles Hub

A [Next.js](https://nextjs.org) application for managing and browsing articles, backed by a PostgreSQL database.

## 🚀 Live Demo

**Deployed on Vercel:** [https://next-js-lab-project.vercel.app/](https://next-js-lab-project.vercel.app/)

---

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Features

- Browse all articles with card layout
- View individual article detail page
- Create new articles via form
- Mark articles as favorites
- REST API (`/api/articles`, `/api/articles/[id]`) with full CRUD support
- PostgreSQL database via `pg` pool (`db-pool.ts`)
- Database seeding at `/seed`
- Environment variables page (`/env`) showing server-only and public vars

---

## Lab Report / Screenshots

### 1. Environment Variables Setup

Creating the `.env.local` file with database credentials and API secret:

![.env.local file](Images/Pasted%20image%2020260315104621.png)

![Env page in browser](Images/Pasted%20image%2020260315105221.png)

---

### 2. Deploying to Vercel

Deploying the project to Vercel: [https://next-js-lab-project.vercel.app/](https://next-js-lab-project.vercel.app/)

![Vercel deploy](Images/Pasted%20image%2020260315105804.png)

---

### 3. Neon.tech Database Setup

Creating and provisioning a Neon.tech serverless PostgreSQL database:

![Neon.tech DB setup](Images/Pasted%20image%2020260315111826.png)

---

### 4. Database Seeding

Seeding the database by visiting `/seed`:

![Database seeded successfully](Images/Pasted%20image%2020260315112041.png)

---

### 5. Articles Page

The main articles listing page:

![Articles page](Images/Pasted%20image%2020260315112110.png)

![Articles page with DevTools network tab](Images/Pasted%20image%2020260315112226.png)

---

### 6. API Routes (curl)

Testing the REST API endpoints via `curl` without the frontend:

**GET /api/articles**

![curl GET all articles](Images/Pasted%20image%2020260315112632.png)

**GET /api/articles/1**

![curl GET article by id](Images/Pasted%20image%2020260315112701.png)

---

## Project Structure

```
src/
  app/
    (home)/          # Landing page
    (main)/
      articles/      # Articles listing, detail, create, favorites
      env/           # Environment variables display page
      profile/       # Settings & security pages
    api/
      articles/      # REST API routes (GET, POST, PATCH, DELETE)
    lib/             # DB pool, definitions, placeholder data
    seed/            # Database seed route
  components/        # Shared components (NavLink, FavoriteArticle, etc.)
  styles/            # Global and module CSS
```

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (`pg`)
- **Hosting:** Vercel + Neon.tech (serverless Postgres)
- **Package Manager:** pnpm
