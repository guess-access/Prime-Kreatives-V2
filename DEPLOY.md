# Deploying Prime Kreatives to Cloudflare

The site is plain static HTML + `kit.css` + `kit.js`. There is **no build step**,
so Cloudflare Pages needs almost no configuration.

## Option A — Connect the GitHub repo (recommended)

1. Push this folder to `https://github.com/guess-access/Prime-Kreatives`.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select `guess-access/Prime-Kreatives`.
4. Set:
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root of the repo)
5. Deploy. You get a `*.pages.dev` URL to test.

## Option B — Direct upload (no Git needed)

```powershell
npx wrangler pages deploy . --project-name prime-kreatives
```

Run it from this folder. Requires Node.js (already installed).

## Custom domain

1. In the Pages project → **Custom domains** → **Set up a custom domain** → `primekreatives.com`.
2. If the domain's DNS is already on Cloudflare, the record is added automatically.
3. SSL is provisioned automatically (Universal SSL).

## Cut over from Netlify

1. Test the `*.pages.dev` URL thoroughly first.
2. Point `primekreatives.com` at Cloudflare.
3. Leave the Netlify site untouched until you have confirmed everything works,
   then disconnect it.

## Forms

The booking form posts to **FormSubmit** (`https://formsubmit.co/ajax/<address>`),
which works on any host — there is **no Netlify Forms dependency** to migrate.

- The **first** submission to an address sends a confirmation email to that inbox.
  Open it and click **Activate** once, or submissions will report failure.
- If delivery fails for any reason, the page hands the composed message to the
  visitor's own mail app instead of claiming it was sent.
- To move to a Cloudflare-native pipeline later (Pages Function + Email Routing),
  swap the `fetch` target in `kit.js` — the rest of the form code stays as is.

## Old URLs

Cloudflare Pages serves `services.html` at `/services`, `privacy-policy.html` at
`/privacy-policy`, and so on, so extensionless links keep working.

Pages carried over from the old site: `privacy-policy.html`, `terms-legal-policy.html`,
and everything in `assets/`.
