## 2024-05-15 - [ExerciseCard Form and Interactive elements A11y]
**Learning:** Found that custom toggle elements built as `<div>` were missing `aria-expanded` properties and keyboard events. Also found an input without a tied `<label>`, leading to a smaller tap target area.
**Action:** Replace `<div>` interactive elements with `<button>` specifying `aria-expanded` status, and ensure inputs have a corresponding `<label>` with `htmlFor` attribute.
