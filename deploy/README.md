# Deployment Config Examples

These files are examples for VPS migration. They are not imported by the app and do not affect local development.

Use one static server path:

- Nginx: copy `nginx-site.conf.example` into `/etc/nginx/sites-available/`.
- Caddy: copy `Caddyfile.example` into `/etc/caddy/Caddyfile` or merge it into an existing Caddy config.

The recommended production model is static hosting from `dist/`, not a public Vite dev server.

Replace all placeholders before use:

- `example.com`
- `www.example.com`
- `/var/www/owlsurf/current/dist`
- certificate paths, if managing TLS manually
