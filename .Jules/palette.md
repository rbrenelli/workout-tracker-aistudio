## 2024-03-24 - Framer Motion Custom Modal Accessibility

**Learning:** Custom animated modals built with Framer Motion (`motion.div`) in this codebase do not automatically inherit the native keyboard behaviors or ARIA semantics of a `<dialog>` element.
**Action:** When implementing or updating custom modals using Framer Motion, manually ensure a `useEffect` handles the Escape key (`keydown`) to close the modal. Additionally, strictly apply `role="alertdialog"`, `aria-modal="true"`, and appropriate `aria-labelledby`/`aria-describedby` mappings to ensure screen reader compatibility.