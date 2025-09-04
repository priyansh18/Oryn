# Oryn
Fresh and modern; brings clarity from the source.

## Changelog

### 2025-09-04
- fix(auth): correct `User` import path in `server/middlewares/auth.js` (../models/User.js)
- fix(auth): add missing `protect` import in `server/routes/userRoutes.js` and apply to `/data`
- fix(auth): add missing `bcrypt` import in `server/controllers/userController.js`
- docs(api): clarify usage of JWT `Authorization` header for protected route
- docs(api): list core user endpoints and expected request/response shapes

#### Backend API notes
- `POST /api/user/register` → body: `{ name, email, password }` → returns `{ success, token }`
- `POST /api/user/login` → body: `{ email, password }` → returns `{ success, token }`
- `GET /api/user/data` → header: `Authorization: <token>` → returns `{ success, user }`

Env requirements (server):
- `MONGODB_URI` for database connection
- `JWT_SECRET` for signing/verifying tokens

### 2025-09-03
- fix(sidebar): correct dark-mode gradient hex and border variants
- fix(sidebar): swap logo selection to use `logo_full_dark` in dark mode
- fix(sidebar): resolve Tailwind typos (`text-xs`, `dark:border-white/15`, optional chaining)
- feat(sidebar): add mobile menu close on navigation and chat select
- style(sidebar): improve theme toggle track colors (`bg-gray-300` / `dark:bg-gray-600`)
 - fix(chatbox): import default `Message` and use dark logo correctly
 - fix(message): Tailwind class typos (`gap-2`, `rounded-full`, borders, colors)
 - feat(message): show relative timestamps (e.g., "2 minutes ago")
 - feat(chatbox): introduce basic ChatBox functionality (empty-state, message list)
 - fix(chatbox): attach containerRef to scrollable div for auto-scroll to bottom
- feat(community): complete image gallery with hover effects and user attribution
- feat(loading): add auto-redirect spinner with gradient background

