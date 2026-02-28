

## Plan: Replace Theme Toggle with UIverse Sun/Moon Switch

### What changes
Replace the current simple icon button with the animated sun/moon slider toggle from UIverse (by Galahhad). Keep all existing functionality: `isDark` state, View Transitions API circular sweep, persistent fixed position, and dark/light class toggling.

### Implementation

**File: `src/components/ThemeToggle.tsx`**
- Remove `Moon`/`Sun` lucide imports
- Replace the button with a `<label class="theme-switch">` wrapping a hidden checkbox + the container div structure (clouds, stars SVG, circle-container with sun-moon and moon spots)
- Bind `checked={isDark}` on the checkbox so night mode shows when dark
- On checkbox `onChange`, call the existing `toggleTheme` function (with View Transitions API)
- Attach `buttonRef` to the label element for the circular sweep origin calculation
- Keep `fixed bottom-6 right-6 z-[70]` positioning wrapper

**File: `src/index.css`**
- Add all the `.theme-switch` CSS rules (variables, container, circle-container, sun-moon, moon spots, clouds, stars, checked states, hover states) at the end of the file
- Reduce `--toggle-size` from `30px` to `16px` so the toggle is compact enough for a persistent corner widget

### Files to modify
- `src/components/ThemeToggle.tsx`
- `src/index.css`

