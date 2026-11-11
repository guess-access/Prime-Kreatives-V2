# Prime Kreatives V2

Marketing site for **Prime Kreatives** — client success and executive operations support
("Where vision meets execution"). Static HTML/CSS/JS, deployed on **Cloudflare Pages**
(migrated from Netlify).

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services overview, process, CTA |
| `services.html` | Services & pricing — currency switcher (USD/PHP/AUD) + interactive quote builder |
| `privacy-policy.html` | Privacy policy |
| `terms-legal-policy.html` | Terms and legal policy |

## The shared kit

- **`kit.css`** — design tokens, components and the signature animation layer
  (masked clip-path text wipes, staggered reveals, expo-out easing, nav underline wipes,
  header condense, footer curtain).
- **`kit.js`** — builds the header/footer from a per-site config (each page sets
  `<body data-site="main | portfolio | digital">`), runs the reveal observer,
  scroll condense, burger toggle and form handling (FormSubmit with mailto fallback).

The same kit will serve the Portfolio and Digital sites, so branding and motion stay in
sync across all three.

## Deploy

See [DEPLOY.md](DEPLOY.md) for Cloudflare Pages setup (custom domain, extensionless
routes, headers).
