# Articles Hub

A [Next.js](https://nextjs.org) application for managing and browsing articles, backed by a PostgreSQL database.

**Deployed on Vercel:** [https://next-js-lab-project.vercel.app/](https://next-js-lab-project.vercel.app/)

---

## Getting Started

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
- Authentication via credentials (email/password), Google OAuth, GitHub OAuth
- User profile management (`/profile/settings`, `/profile/security`)
- Protected routes with middleware
- PostgreSQL database via Neon.tech
- Database seeding at `/seed`

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Auth:** NextAuth.js v5 (Auth.js) — Credentials, Google, GitHub
- **Database:** PostgreSQL (Neon.tech serverless)
- **Styling:** Tailwind CSS + React-Bootstrap
- **Hosting:** Vercel + Neon.tech
- **Package Manager:** pnpm

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
      auth/          # NextAuth API route
      users/         # User profile API (PATCH name, PUT password)
    lib/             # DB pool, definitions, placeholder data
    login/           # Login page (credentials + OAuth)
    seed/            # Database seed route
  components/        # Shared components (NavLink, SignOutButton, etc.)
  styles/            # Global and module CSS
```

---

## Лабораторна робота №2

### 1. Environment Variables Setup

Створення `.env.local` файлу для бази даних:

![.env.local file](Images/Pasted%20image%2020260315104621.png)

![Env page in browser](Images/Pasted%20image%2020260315105221.png)

---

### 2. Деплой на Vercel

![Vercel deploy](Images/Pasted%20image%2020260315105804.png)

### 3. Створення Neon.tech БД

![Neon.tech DB setup](Images/Pasted%20image%2020260315111826.png)

---

### 4. Сторінка з Articles

![Articles page](Images/Pasted%20image%2020260315112110.png)
![Articles with DevTools](Images/Pasted%20image%2020260315112226.png)

---

### 5. API Routes (curl)

Скріни curl окремо без фронта:

![curl GET all](Images/Pasted%20image%2020260315112632.png)
![curl GET by id](Images/Pasted%20image%2020260315112701.png)
![curl POST](Images/Pasted%20image%2020260315114138.png)
![curl DELETE](Images/Pasted%20image%2020260315114150.png)

---

### 6. Сторінка статей + створення

![Articles view](Images/Pasted%20image%2020260315114620.png)
![Create article](Images/Pasted%20image%2020260315114538.png)

---

## Лабораторна робота №3

### Завдання 1 — Таблиця з користувачами

![Seed route](Images/Pasted%20image%2020260315134350.png)

**Код** — `seed/route.ts` (створення таблиці users з email як UNIQUE)

---

### Завдання 2 — Аутентифікація логін/пароль

**Код** — `auth.ts` (Credentials провайдер з bcrypt)

```tsx
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const rows = await sql`
          SELECT id, email, name, image, password
          FROM users WHERE email = ${email}
        `;
        const user = rows[0];
        if (!user?.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
});
```

![Auth code](Images/Pasted%20image%2020260315134758.png)

**Сторінка `/login`** — форма входу з полями email/password + кнопки OAuth

![Login page](Images/Pasted%20image%2020260315134852.png)

**Успішний вхід** — credentials `admin@example.com` / `password123` → редірект на `/articles`, також показує ім'я користувача + кнопка Sign Out

---

### Завдання 3 — Google OAuth

![Google OAuth setup](Images/Pasted%20image%2020260315135439.png)

**Google Cloud Console** — OAuth consent screen

![Google consent](Images/Pasted%20image%2020260315135453.png)

**Google Cloud Console** — Client ID створений, redirect URI налаштований

![Google Client ID](Images/Pasted%20image%2020260315135245.png)

**Вхід через Google** — кнопка → Google consent → редірект назад, залогінений

---

### Завдання 4 — GitHub OAuth

![GitHub OAuth App](Images/Pasted%20image%2020260315134954.png)

**GitHub Developer Settings** — OAuth App створений

![GitHub Client](Images/Pasted%20image%2020260315135018.png)

**GitHub** — Client ID + Secret

---

### Завдання 5 — Профіль користувача

**Сторінка `/profile/settings`** — форма редагування профілю

**Редагування профілю** — змінив ім'я → збережено → navbar оновився

**Сторінка `/profile/security`** — форма зміни пароля

**Зміна пароля** — успішне повідомлення
