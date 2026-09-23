## 2023-10-25 - [Custom Modals Accessibility]
**Learning:** Custom animated modals (e.g., using Framer Motion) in this codebase do not inherit native `<dialog>` element behaviors and require explicit manual implementation of keyboard event handlers (like Esc to close) and ARIA mappings (such as `role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
**Action:** Always add necessary ARIA attributes and keyboard event listeners when implementing or modifying custom modal components, avoiding the assumption that they will work like native `<dialog>` elements.
