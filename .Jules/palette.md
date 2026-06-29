## 2024-05-18 - ConfirmDialog Accessibility Enhancements
**Learning:** Custom animated modals (like motion.div) need explicit keyboard event handlers (like Esc to close) and ARIA mappings (role="alertdialog", aria-modal, aria-labelledby/describedby) since they do not inherit the native `<dialog>` element behaviors.
**Action:** Always implement custom Escape key listeners and full ARIA attributes when building custom modal components to maintain keyboard accessibility and screen-reader support.
