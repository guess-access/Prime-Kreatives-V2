# Prime Kreatives V2

Marketing site for **Prime Kreatives** — client success and executive operations support
("Where vision meets execution"). Static HTML/CSS/JS, deployed as a **Cloudflare Worker
with static assets** on `primekreatives.com` (migrated from Netlify).

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services overview, selected work, process, CTA |
| `services.html` | Services & pricing — currency switcher (USD/PHP/AUD) + interactive estimate builder |
| `discovery-call.html` | Free Ops Leak Audit booking page with the lead form |
| `process.html` | Five-phase engagement, deliverables, FAQ and terms |
| `portfolio/index.html` | Selected reporting and brand work (`data-site="portfolio"`) |
| `digital/index.html` | Template packs and order form (`data-site="digital"`) |
| `404.html` | Branded not-found page |
| `privacy-policy.html` | Privacy policy |
| `terms-legal-policy.html` | Terms and legal policy |

Supporting files: `sitemap.xml`, `robots.txt`, `_redirects` (legacy URLs),
`_headers` (security and caching), `wrangler.toml` + `.assetsignore` (Cloudflare deploy).

## The shared kit

- **`kit.css`** — design tokens, components and the signature animation layer
  (masked clip-path text wipes, staggered reveals, expo-out easing, nav underline wipes,
  header condense, footer curtain).
- **`kit.js`** — builds the header/footer from a per-site config (each page sets
  `<body data-site="main | portfolio | digital">`), runs the reveal observer,
  scroll condense, burger toggle and form handling (FormSubmit with mailto fallback).

The same kit serves the Portfolio and Digital pages, so branding and motion stay in sync.

## Deploy

```powershell
npx wrangler login
npx wrangler deploy
```

See [DEPLOY.md](DEPLOY.md) for previews, rollback, the custom domain and form activation.
