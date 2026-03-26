# myfolio
A full-stack, responsive portfolio built with React, JavaScript, and Tailwind CSS, powered by Node.js, Express, and MongoDB. Includes an admin panel for managing content.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Auth: Email + password (JWT)
- Docker: Compose for local development

## Quick Start (Docker)
1. Install Docker Desktop.
2. Copy `.env.example` to `.env` and update admin credentials.
3. Run `docker compose up --build`.
4. Frontend: `http://localhost:5174`
5. Admin panel: `http://localhost:5174/admin`
6. Backend health: `http://localhost:4000/health`

## Local (without Docker)
1. Backend
   - `cd backend`
   - Create `.env` from `backend/.env.example`
   - `npm install`
   - `npm run dev`
2. Frontend
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Environment
- Backend env example in `backend/.env.example`.
- Docker env example in `.env.example`.
