## 2024-10-24 - Custom Modal Accessibility
**Learning:** Custom animated modals (e.g., using Framer Motion's `motion.div`) in this codebase do not inherit native `<dialog>` element behaviors like native `Escape` key to close.
**Action:** When creating or modifying custom modals, explicitly add keyboard event handlers (like Esc to close) and correct ARIA mappings (such as `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`) to ensure keyboard users and screen readers can interact with them properly.
