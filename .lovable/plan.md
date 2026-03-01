

## Plan: Compact Partner Badges with Auto-Hide

**Changes to `src/components/slides/TitleSlide.tsx`:**

1. **Reduce badge width**: Remove the long text, shorten padding, and make the Google/Meta badges more compact so they fit on one line.
2. **Ensure horizontal layout**: They already use `flex` with `gap-3` — just need to ensure `flex-wrap` doesn't kick in by making badges smaller.
3. **Auto-hide after 2 seconds**: Wrap the badges container in a `motion.div` with an `animate` that fades out after a 2-second delay using framer-motion's `animate` prop with keyframes: `opacity: [1, 1, 0]` over 3 seconds (visible for 2s, fade over 1s).

