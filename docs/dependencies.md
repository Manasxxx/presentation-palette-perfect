# Dependency and Runtime Notes

This file documents what a future maintainer needs before moving the site to another host. It is descriptive only; it does not change the app.

## Runtime Model

The production website is static:

```txt
npm run build -> dist/ -> served by Nginx, Caddy, or another static file server
```

Node is needed to install dependencies and build the site. Node is not needed to serve the already-built `dist/` folder when using Nginx or Caddy.

## Required Build Tools

- Node.js: use the repo's `.nvmrc`, currently Node 22. Node 20 or newer should work for the current dependency tree, but Node 22 is the documented migration target.
- npm: use `npm ci` for repeatable installs from `package-lock.json`.
- Git: needed if pulling the repo directly on the VPS.
- Nginx or Caddy: recommended production static server.

Local inspection was done with:

```txt
Node v24.14.0
npm 11.9.0
```

## Package Manager Notes

Use npm as the source of truth. If the machine uses `nvm`, run `nvm use` first:

```sh
nvm use
npm ci
npm run build
```

The repo also contains Bun lock files from earlier work, but `package-lock.json` is the deployment lockfile to use unless the project owner explicitly switches package managers.

## App Dependencies

Core app dependencies from `package.json`:

- `react`, `react-dom`, `react-router-dom`: SPA shell and routing.
- `vite`, `@vitejs/plugin-react-swc`: local dev server and production build.
- `typescript`: type checking/build tooling.
- `tailwindcss`, `postcss`, `autoprefixer`, `tailwindcss-animate`: styling pipeline.
- `animejs`, `gsap`, `@gsap/react`: animation layers.
- `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`: lanyard/WebGL slide.
- `ogl`, `cobe`, `postprocessing`: visual effects.
- `lucide-react`, `react-liquid-glass-card`, `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`: UI primitives and styling helpers.
- `vitest`, `jsdom`, Testing Library packages: tests.
- `eslint` and TypeScript ESLint packages: linting.

## Optional Image Conversion Dependency

The command below uses `scripts/convert-images.mjs`:

```sh
npm run images:convert
```

That script imports `sharp`, but `sharp` is not currently listed in `devDependencies`. If a maintainer needs image conversion, install it first:

```sh
npm install -D sharp
npm run images:convert
```

Do this in a normal development branch and commit the resulting lockfile change if the project wants the command to be permanently supported.

## Build Output

After `npm run build`, Vite writes:

```txt
dist/
  index.html
  assets/
```

The `assets/` files use hashed filenames and can be cached aggressively. `index.html` should stay no-cache.

## Vite Details That Affect Hosting

`vite.config.ts` sets:

- Dev server host: `::`.
- Dev server port: `8080`.
- Manual vendor chunks for React, GSAP, Anime.js, 3D/lanyard dependencies, and UI libraries.
- `.glb` assets are included for the lanyard model.
- Chunk warning limit: `600`.

None of these require a Node server in production.

## Environment Variables

No required environment variables were found in the current app. Keep `.env.example` as the starting point if future API keys or public Vite variables are added.

Vite exposes only variables prefixed with `VITE_` to browser code. Never place private server secrets in a `VITE_` variable.

## Files to Keep Out of the Server Root

The public web root should be only `dist/`, not the repository root.

Do not expose:

- `.git/`
- `node_modules/`
- `src/`
- `handoff.md`
- `context.md`
- `prod.md`
- local scratch files

Point Nginx/Caddy at `dist/` and this is handled automatically.
