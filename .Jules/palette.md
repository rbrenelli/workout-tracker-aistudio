## 2026-08-01 - [RestTimer Accessibility Fix]
**Learning:** Custom animated modals (e.g., using Framer Motion's `motion.div`) in this codebase do not inherit native `<dialog>` element behaviors and require explicit manual implementation of keyboard event handlers (like Esc to close) and ARIA mappings (such as `role="dialog"` or `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby`).
**Action:** When creating or fixing custom modals, always manually implement Esc key event listeners and proper ARIA roles and attributes to ensure full accessibility.
