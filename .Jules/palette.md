## 2025-02-27 - [Confirm Dialog Accessibility]
**Learning:** Custom animated modals (e.g., using framer-motion's `motion.div`) in this codebase do not inherit native `<dialog>` element behaviors. They require explicit manual implementation of keyboard event handlers (like Esc to close) and ARIA mappings (such as `role="alertdialog"`, `aria-modal`, `aria-labelledby`).
**Action:** When creating or modifying custom dialogs/modals in this project, always add an Escape key listener and the appropriate ARIA roles to ensure they are accessible and intuitive for keyboard and screen reader users.
