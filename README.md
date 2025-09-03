# Oryn
Fresh and modern; brings clarity from the source.

## Changelog

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

