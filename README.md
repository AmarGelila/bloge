# BloGE

A full-stack blog application built with React + TypeScript on the front end and Express + Prisma on the back end. The app supports user authentication, Google OAuth, post creation, likes, comments, rich text content, and author-only publishing controls.

## Overview

BloGE is a modern blog platform where users can:

- sign up and sign in with email/password
- authenticate with Google
- browse published posts
- create, edit, and delete blog posts
- like and unlike posts
- comment on posts
- view post detail pages
- toggle between light and dark themes

The project is split into two main parts:

- `client/` — Vite + React frontend
- `server/` — Express API and Prisma data layer

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Axios
- React Hook Form
- Tailwind CSS
- React Quill / TinyMCE-based rich text editing support
- React Hot Toast

### Backend

- Node.js
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport.js
- JWT authentication
- Google OAuth 2.0
- Cookie-based refresh token handling
- Neon serverless Postgres support

## Project Structure

```text
blog/
├── README.md
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── server/
│   ├── api/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   ├── package.json
│   └── prisma.config.ts
└── ...
```

## Features

### Authentication

- Email/password sign up and sign in
- JWT access token authentication
- Refresh token rotation with secure cookies
- Google sign-in flow
- Protected routes for authenticated actions
- Author-only access checks for post management

### Posts

- Create blog posts
- Edit existing posts
- Delete posts
- View individual post pages
- Publish state handling via `isPublished`
- Like/unlike functionality

### Comments

- Add comments to posts
- Edit comments
- Delete comments

### UI

- Responsive post grid layout
- Theme toggle
- Toast notifications
- Rich text content rendering
- Custom error/fallback pages

## Environment Variables

Create a `.env` file inside `server/` with the following values:

```env
NODE_ENV=dev
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
JWT_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AUTHOR_EMAIL=author@example.com
```

Create a `.env` file inside `client/` with:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> If you are using Neon or another hosted Postgres provider, set `DATABASE_URL` to that connection string.

## Local Development Setup

### 1. Install dependencies

```bash
cd client && pnpm install
cd ../server && pnpm install
```

### 2. Prepare the database

From the `server/` folder:

```bash
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

If the project has existing migrations and you want to apply them to a fresh database, you can also use:

```bash
pnpm exec prisma migrate deploy
```

### 3. Start the backend

```bash
cd server
pnpm dev
```

The server starts in watch mode and runs the Express app from `app.ts`.

### 4. Start the frontend

```bash
cd client
pnpm dev
```

The frontend typically runs on:

- http://localhost:5173

The backend typically runs on:

- http://localhost:3000

## API Overview

### Auth routes

- `POST /auth/sign-up` — create a new user
- `POST /auth/sign-in` — sign in with email/password
- `GET /auth/sign-out` — sign out and clear refresh cookie
- `GET /auth/refresh-token` — rotate refresh/access tokens
- `GET /auth/sign-in/google` — start Google OAuth flow
- `GET /auth/sign-in/google/callback` — complete OAuth login

### Main routes

- `GET /posts` — fetch posts
- `GET /user` — fetch authenticated user info

### Post routes

- `POST /posts/new` — create a post
- `GET /posts/:postId` — fetch a single post
- `PUT /posts/:postId` — update a post
- `DELETE /posts/:postId` — delete a post
- `PUT /posts/:postId/like` — like a post
- `PUT /posts/:postId/unlike` — unlike a post

### Comment routes

- `POST /posts/:postId/comments/new` — create a comment
- `PUT /posts/:postId/comments/:commentId` — update a comment
- `DELETE /posts/:postId/comments/:commentId` — delete a comment

## Authorization Rules

A special author email is configured through `AUTHOR_EMAIL`.

- Only the user whose email matches `AUTHOR_EMAIL` can create, update, or delete posts
- Regular users can still browse the site, sign in, like posts, and comment

This is enforced by the server middleware in `server/middleware/onlyAuthor.ts`.

## Notes

- The frontend uses `VITE_API_BASE_URL` to connect to the Express API.
- JWTs are used for request authentication, and refresh tokens are stored in an HTTP-only cookie.
- Google OAuth requires valid `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` values.
- The app is designed for a PostgreSQL environment and is compatible with Neon-based deployments.

## Production Notes

This project is set up for a decoupled deployment model:

- deploy the frontend to a static host such as Vercel
- deploy the backend to a Node-compatible host or serverless environment
- configure `CLIENT_URL` and `VITE_API_BASE_URL` to the correct deployed origins
- keep your secrets in a secure environment variable manager for production
