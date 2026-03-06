## Mobile Stats Pills: Compact Left-Aligned Layout

### Change

In all 6 case study files, update the mobile stats container from centered flex-wrap to a left-aligned, tighter layout pushed toward the bottom.

### What changes per file

For each case study component (`CaseStudySlide`, `BaxsaaCaseStudy`, `CultFitCaseStudy`, `GirlUpCaseStudy`, `CTPCaseStudy`), change the stats `motion.div` wrapper class from:

```
flex flex-wrap justify-center gap-3 ${isMobile ? 'mt-4' : ''}
```

to:

```
flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center'}
```

On mobile this will:

- Use `mt-auto` to push stats to the bottom of the flex container
- Use `justify-start` instead of `justify-center` for left alignment
- Use `gap-1.5` instead of `gap-3` for tighter spacing

Also reduce mobile pill padding from `0.5rem 1rem` to `0.4rem 0.75rem` on mobile, and reduce font sizes slightly (`text-xs` for values, `text-[9px]` for labels).

**VNT** has no stats — skip it.

### Files

- `src/components/slides/CaseStudySlide.tsx` (line 177)
- `src/components/slides/BaxsaaCaseStudy.tsx` (stats section)
- `src/components/slides/CultFitCaseStudy.tsx` (line 77)
- `src/components/slides/GirlUpCaseStudy.tsx` (line 77)
- `src/components/slides/CTPCaseStudy.tsx` (stats section)

&nbsp;

Improve text readability in terms of colour 