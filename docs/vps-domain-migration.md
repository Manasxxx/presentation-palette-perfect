# VPS and Domain Migration Guide

This project is a static Vite + React website. The production output is the `dist/` folder created by `npm run build`. A VPS does not need to run a long-lived Node app for normal production traffic; Nginx or Caddy can serve the built files directly.

## Quick Facts

- App type: Vite SPA, React 18, TypeScript, Tailwind 3.
- Canonical package manager: npm, because `package-lock.json` is present.
- Build command: `npm run build`.
- Build output: `dist/`.
- Local dev command: `npm run dev`.
- Local dev URL: `http://localhost:8080`.
- Production entry fallback: route all unknown paths to `/index.html`.
- Environment variables: none required at the time this file was written.

## Recommended VPS Shape

Use this layout unless the server already has a house style:

```txt
/var/www/owlsurf/
  current/              # git checkout or uploaded release
  current/dist/         # built production files
/etc/nginx/sites-available/owlsurf.conf
/etc/nginx/sites-enabled/owlsurf.conf
```

The web server root should point at:

```txt
/var/www/owlsurf/current/dist
```

## Server Prerequisites

Install these on the VPS:

```sh
sudo apt update
sudo apt install -y git nginx curl ca-certificates
```

Install Node only for building on the VPS. If you build locally and upload `dist/`, the public server path does not need Node at runtime.

Use the repo's `.nvmrc` when possible. It pins the migration build toolchain to Node 22. This repo was inspected locally with Node `v24.14.0` and npm `11.9.0`; the dependency tree also contains packages that require at least Node 18.18.

## First Deploy

Clone the repo:

```sh
sudo mkdir -p /var/www/owlsurf
sudo chown -R "$USER":"$USER" /var/www/owlsurf
git clone https://github.com/Manasxxx/presentation-palette-perfect.git /var/www/owlsurf/current
cd /var/www/owlsurf/current
```

Install and build. If the server uses `nvm`, run `nvm use` first:

```sh
nvm use
npm ci
npm run build
```

Configure the web server:

1. Copy `deploy/nginx-site.conf.example` to `/etc/nginx/sites-available/owlsurf.conf`.
2. Replace every `example.com` placeholder with the real domain.
3. Confirm `root` points to `/var/www/owlsurf/current/dist`.
4. Enable and reload Nginx:

```sh
sudo ln -s /etc/nginx/sites-available/owlsurf.conf /etc/nginx/sites-enabled/owlsurf.conf
sudo nginx -t
sudo systemctl reload nginx
```

After DNS points to the VPS, issue HTTPS certificates:

```sh
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

## Updating the Site

From the VPS:

```sh
cd /var/www/owlsurf/current
git pull --ff-only
npm ci
npm run build
sudo nginx -t
sudo systemctl reload nginx
```

If the repo uses a branch other than `main`, check it out before building.

## DNS Checklist

At the DNS provider:

- Add an `A` record for `@` pointing to the VPS IPv4 address.
- Add an `A` record for `www` pointing to the same IPv4 address.
- If the VPS has IPv6, add matching `AAAA` records.
- Keep TTL low during migration, for example 300 seconds.
- After the site is stable, TTL can be raised again.

## SPA Routing Requirement

This is a React Router SPA with a branded route-level 404. The server must serve `index.html` for unknown application paths so React Router can decide what to show.

Correct Nginx fallback:

```nginx
try_files $uri $uri/ /index.html;
```

Without this, direct visits to paths other than `/` can return a server-level 404.

## Cache Policy

The build emits hashed asset filenames under `dist/assets/`. These can be cached aggressively.

Recommended:

- `index.html`: no-cache, so deploys show quickly.
- `dist/assets/*`: one year immutable cache.
- fonts/images from `public/`: cache for 30 days unless their names are content-hashed.

The example Nginx and Caddy configs include this split.

## Smoke Test After Deploy

Check these after every migration or deploy:

```sh
curl -I https://example.com/
curl -I https://example.com/assets/<real-hashed-asset-from-dist>
curl -I https://example.com/not-a-real-route
```

Expected:

- `/` returns `200`.
- A real hashed asset under `/assets/...` returns `200` and a long cache header.
- A fake route returns the app shell, not a raw Nginx 404.

Then review the site in a browser and confirm:

- The scroll-snapping deck loads.
- The cover assets and partner badges render.
- The lanyard/WebGL section does not crash the page.
- Case study images load.
- The contact section and branded app 404 page still work.

## Rollback

Keep the previous working release directory or commit available. A simple rollback model is:

```txt
/var/www/owlsurf/releases/2026-05-28-previous/
/var/www/owlsurf/releases/2026-05-28-current/
/var/www/owlsurf/current -> /var/www/owlsurf/releases/2026-05-28-current
```

To roll back, point `current` back to the previous release and reload Nginx.

## Notes for Future Maintainers

- Do not serve the Vite dev server publicly.
- Do not use `vite preview` as the final production process unless it is temporary troubleshooting.
- Do not delete `dist/` on the VPS until the new build has succeeded.
- If image assets are replaced, prefer WebP in `src/assets/` and rebuild.
- `handoff.md` is push-gated in this repo. Update it only before a push, not for ordinary local documentation changes.
