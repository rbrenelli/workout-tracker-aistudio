## 2026-06-28 - Improve Search Input Accessibility
**Learning:** Search inputs and their clear buttons often lack screen reader support despite being primary interaction points. Icon-only buttons for clearing search queries need `aria-label` for screen readers and `title` for mouse users to improve discoverability.
**Action:** Always verify search bars have aria-labels on the input field and any interactive icons within them (like 'clear' buttons).
