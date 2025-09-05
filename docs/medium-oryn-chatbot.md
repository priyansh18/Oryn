# Oryn: Building a Minimal, Modern Chat App with React, Vite, and Tailwind v4

> A behind-the-scenes build that balances simplicity with a polished UX. Includes dark mode, context, and auto-scroll chat UX.

[Cover Screenshot – insert later]

## Why Oryn?
- Fast, minimal, modern UI
- Clean dark mode with Tailwind v4
- Real-world patterns: context, routing, message list, auto-scroll

## Key Features
- Dark mode theme with gradient polish
- ChatBox with empty state, message list, and auto-scroll to bottom
- Friendly timestamps (e.g., "2 minutes ago")
- Sidebar with search, recent chats, and mobile menu behavior
- Clean assets and chatbot favicon

## Tech Stack
- React + Vite 7
- Tailwind CSS v4
- React Router

## Architecture Overview
- `src/context/AppContext.jsx`: single source of truth for user, chats, theme
- `src/components/SideBar.jsx`: app navigation and chat list
- `src/components/ChatBox.jsx`: messages UI and input, auto-scroll logic
- `src/components/Message.jsx`: message bubbles and timestamp styles

## Screenshots
1. App Home (Light Mode)
   - [Insert screenshot: `screenshots/home-light.png`]
2. App Home (Dark Mode)
   - [Insert screenshot: `screenshots/home-dark.png`]
3. Chat List & Search
   - [Insert screenshot: `screenshots/sidebar-search.png`]
4. Empty Chat State
   - [Insert screenshot: `screenshots/empty-chat.png`]
5. Message List with Relative Timestamps
   - [Insert screenshot: `screenshots/message-list.png`]

## Implementation Notes
### Dark Mode & Theme
- Toggle stored in localStorage; applied via `document.documentElement.classList`
- Tailwind v4 directives supported; VSCode hints tamed via `.vscode/settings.json`

### ChatBox Auto-Scroll
- Attach `ref` to the scrollable container, not the outer wrapper
- Call `scrollTo({ top: scrollHeight, behavior: 'smooth' })` on message updates

### Developer Experience
- `.nvmrc` (Node 22.12.0) to avoid EBADENGINE warnings
- Vite dev server for rapid iteration

### Backend: Auth + API
- Introduced a minimal Express + MongoDB backend for user auth.
- Model: `server/models/User.js`
  - Fields: `name`, `email` (unique), `password` (bcrypt-hashed), `credits` (default 20)
  - Pre-save hook hashes passwords with bcrypt.
- Controller: `server/controllers/userController.js`
  - `registerUser` issues a JWT on successful registration.
  - `loginUser` verifies password via bcrypt and returns a JWT.
  - `getUser` returns the authenticated user from `req.user`.
- Middleware: `server/middlewares/auth.js`
  - `protect` verifies `Authorization` header (JWT), loads user, and attaches to `req.user`.
- Routes: `server/routes/userRoutes.js`
  - `POST /api/user/register` → `{ name, email, password }` → `{ success, token }`
  - `POST /api/user/login` → `{ email, password }` → `{ success, token }`
  - `GET /api/user/data` (protected) → header `Authorization: <token>` → `{ success, user }`
- Server entry: `server/server.js` wires routes and CORS, connects DB.

### Backend: Chat API
- Model: `server/models/Chat.js`
  - Fields: `userId`, `userName`, `name`, `messages[]`
  - `messages[]` items include: `role`, `content`, `timestamp`, `isImage`, `isPublished`
- Controller: `server/controllers/chatController.js`
  - `createChat` creates a new chat for the authenticated user
  - `getChats` fetches chats for the authenticated user, sorted by `updatedAt`
  - `deleteChat` removes a chat by id for the authenticated user
- Routes: `server/routes/chatRoutes.js`
  - `GET /api/chat/create` (protected) → `{ success, message }`
  - `GET /api/chat/get` (protected) → `{ success, chats }`
  - `POST /api/chat/delete` (protected) → body `{ chatId }` → `{ success, message }`

### Backend: Credits & Transactions
- Model: `server/models/Transaction.js` — stores purchase history and gateway refs
- Controller: `server/controllers/creditController.js`
  - `createOrder` creates a payment order for a credits plan
  - `webhookHandler` verifies gateway signature and updates credits + transaction
  - `getHistory` returns authenticated user credit transactions
- Routes: `server/routes/userRoutes.js` (credits-related endpoints under `/api/user/credits/*`)
  - `POST /api/user/credits/create-order` (protected)
  - `POST /api/user/credits/webhook` (public, called by gateway)
  - `GET /api/user/credits/history` (protected)

Env requirements (server):
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing/verification secret

Quick start (server):
```bash
cd server
npm install
npm run start # or: npm run server (nodemon)
```

Notes & fixes applied:
- Fixed missing `bcrypt` import in controller.
- Fixed missing `protect` import in routes and applied to `/data`.
- Corrected `User` import path in `auth` middleware (`../models/User.js`).

## What’s Next
- Real backend for auth and chat persistence
- Image generation pipeline and community publishing
- Message streaming and rich content blocks

## Try It Locally
```bash
nvm use 22.12.0
cd client
npm install
npm run dev
```

## CTA: Let’s Connect
- If you found this useful, follow me here and on LinkedIn.
- I’m sharing build-in-public updates, UX decisions, and React tips weekly.

[LinkedIn CTA banner / profile screenshot placeholder]

---

Made with Oryn. Clean ideas, clean code.
