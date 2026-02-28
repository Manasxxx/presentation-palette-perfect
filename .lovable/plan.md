

## Plan: Add Pencil Loading Animation

### What changes
Add a full-screen loading overlay with the UIverse pencil SVG animation that displays while the site loads, then fades out to reveal the content.

### Implementation

**File: `src/components/LoadingScreen.tsx`** (new)
- Full-screen fixed overlay (`z-[100]`) with dark background matching `--owl-black`
- Contains the pencil SVG from UIverse (the animated drawing pencil with circle stroke)
- Optional "Loading..." text below in brand font
- Accepts `onComplete` callback prop
- Uses `useState` for `visible` and `fading` states
- On mount, listens for `window.onload`; once fired, sets `fading=true` (triggers opacity transition), then after 500ms sets `visible=false` and calls `onComplete`
- If window already loaded, trigger fade immediately

**File: `src/styles/pencil-loader.css`** (new)
- All `.pencil` and `.pencil__*` CSS rules and `@keyframes` (pencilBody1-3, pencilEraser, pencilEraserSkew, pencilPoint, pencilRotate, pencilStroke)
- Customize pencil colors to use OwlSurf green (`hsl(180,45%,53%)`) instead of default blue

**File: `src/App.tsx`**
- Import `LoadingScreen`
- Add `<LoadingScreen />` as the first child inside `QueryClientProvider`, rendered above everything else

### Files
- Create `src/components/LoadingScreen.tsx`
- Create `src/styles/pencil-loader.css`
- Edit `src/App.tsx`

