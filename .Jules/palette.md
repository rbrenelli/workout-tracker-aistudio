## 2023-10-24 - [Enforce Minimum Touch Target Sizes for Custom Interactive Elements]
**Learning:** Found a pattern where custom icon buttons and navigational tabs frequently lack sufficient touch target sizes (e.g., using `p-2` or `w-10 h-10`), which leads to poor mobile accessibility.
**Action:** Enforce a minimum 48x48px dimension on all primary interactive elements by uniformly applying Tailwind classes like `w-12 h-12`, `min-h-[48px]`, or `min-w-[48px] min-h-[48px]` to ensure comfortable tap areas on touch devices.
