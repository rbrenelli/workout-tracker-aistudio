## 2026-06-23 - Keyboard Support for Div Buttons
**Learning:** Interactive `div` elements used as accordions or collapsible headers often lack native keyboard support (Enter/Space) and focus indicators.
**Action:** Always add `role="button"`, `tabIndex={0}`, `onKeyDown` (for Enter and Space keys), `aria-expanded`, and focus-visible styles to these elements to ensure keyboard accessibility.
