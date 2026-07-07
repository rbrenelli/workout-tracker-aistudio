
## 2026-07-07 - Focus Styles on Custom Navigation Buttons
**Learning:** Custom styled toggle buttons and tabs (often using `div` or stylized `button` tags without default browser focus outlines) frequently omit `focus-visible` states, creating hidden traps for keyboard navigation in this app.
**Action:** Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500` to primary App.tsx action and navigation buttons to ensure clear focus rings.
