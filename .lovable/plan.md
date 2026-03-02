

## Plan: Replace SplashCursor with Ribbons Component

**What**: Remove the WebGL fluid simulation (`SplashCursor`) and replace it with the ReactBits `Ribbons` component — a canvas-based ribbon trail animation using the `ogl` library.

### Changes

1. **Install `ogl` dependency** — required by the Ribbons component for WebGL rendering (Renderer, Transform, Vec3, Color, Polyline).

2. **Create `src/components/Ribbons.tsx`** — Port the ReactBits Ribbons component (TypeScript). It renders a full-screen fixed canvas overlay (like SplashCursor did) with `pointer-events: none` and `z-index: 50`. Props from user's snippet:
   - `colors={["#1cb8ba","#0b0a0a"]}`
   - `baseSpring={0.03}`, `baseFriction={0.9}`, `baseThickness={30}`
   - `offsetFactor={0.05}`, `maxAge={500}`, `pointCount={50}`
   - `speedMultiplier={0.6}`, `enableFade={true}`, `enableShaderEffect={false}`, `effectAmplitude={2}`

3. **Update `src/pages/Index.tsx`** — Replace `<SplashCursor />` import and usage with `<Ribbons />` using the specified props.

4. **Delete `src/components/SplashCursor.tsx`** — No longer needed.

### Technical Detail
The Ribbons component uses the `ogl` library to create WebGL polylines that follow the mouse cursor with spring physics. Each color in the array creates a separate ribbon trail. The container div will be positioned `fixed` with `inset: 0` and `pointer-events: none` so it overlays the entire page without blocking interactions — same approach as the previous SplashCursor.

