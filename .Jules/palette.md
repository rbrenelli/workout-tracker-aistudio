
## 2024-07-08 - Added focus-visible for Custom Interactive Elements
**Learning:** Custom styled buttons acting as navigation tabs or routine selectors often lose their native browser focus styles when heavy custom styling (background colors, borders) are applied, harming keyboard accessibility.
**Action:** Always verify keyboard focus state for custom UI elements and explicitly add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600` (along with offset, if appropriate) to ensure clear keyboard navigation visibility.
