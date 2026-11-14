# Deploying Prime Kreatives

The site is plain static HTML + `kit.css` + `kit.js`. There is **no build step**.

Production runs on **Cloudflare Workers static assets**: an assets-only Worker named
`prime-kreatives-digital`, with the custom domain `primekreatives.com` bound to it.
`wrangler.toml` in this repo points at the repo root, so a deploy is one command.

## Deploy

```powershell
npx wrangler login      # once per machine
npx wrangler deploy     # from the repo root
```

Wrangler prints a `Current Version ID`. Production is updated in a few seconds and the
custom domain is left untouched — this only swaps the asset version.

### What gets uploaded

- Everything in this folder **except** the paths listed in `.assetsignore`
  (`.git`, `.wrangler`, `*.md`, `wrangler.toml`).
- `_redirects` and `_headers` are consumed as Cloudflare configuration, not served as files.
- `404.html` is used for unknown paths (`not_found_handling = "404-page"`).
- `services.html` is served at `/services`; `/services.html` redirects to `/services`.

Never remove `.assetsignore`: without it the deploy would upload `.git` and the docs.

### Cache and the shared kit files

`_headers` serves `kit.css` and `kit.js` with `max-age=0, must-revalidate`, so a deploy is
visible on the next page load instead of up to an hour later. Every page also loads them with
a version query (`/kit.css?v=20261114`). If you ever need to force a cold fetch for everyone
at once, bump that string in all HTML files.

## Preview a change before it goes live

```powershell
npx wrangler versions upload
```

That prints a `Version Preview URL` tied to the new version without moving production
traffic. When it looks right:

```powershell
npx wrangler versions deploy <version-id>@100%
```

## Roll back

```powershell
npx wrangler versions list
npx wrangler rollback <version-id>
```

Versions are retained by Cloudflare, so the previous build is always one command away.

## Custom domain and DNS

`primekreatives.com` is an active Cloudflare zone (`naomi` / `jaziel` nameservers) and is
bound to the Worker as a **Workers Custom Domain**. DNS and TLS are managed by Cloudflare.

- Email is separate: the MX records and the `v=spf1 include:_spf.mx.cloudflare.net`
  TXT record are not touched by a deploy.
- Do not delete the Custom Domain binding when redeploying.

## Social share cards (OG images)

`assets/og/*.png` are the 1200x630 link-preview cards: `home`, `services`, `discovery`,
`process`, `portfolio`, `digital`. Each page points `og:image` and `twitter:image` at its own
card, with `summary_large_image` so shared links show the headline instead of a logo.

The editable source is `tools/og-card.html`, which `.assetsignore` keeps out of the deploy.
To change a headline, edit the `VARIANTS` map there, serve the repo root locally, then
re-render with headless Chrome:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --hide-scrollbars `
  --window-size=1200,630 --force-device-scale-factor=1 --virtual-time-budget=6000 `
  --screenshot=assets/og/home.png "http://127.0.0.1:8791/tools/og-card.html?v=home"
```

Repeat with `?v=services`, `?v=discovery`, and so on. Output files must stay exactly
1200x630; the meta tags declare those dimensions.

## Forms

The booking and order forms post to **FormSubmit**
(`https://formsubmit.co/ajax/<address>`) through `kit.js`.

- The **first** submission to an address sends a confirmation email to that inbox.
  Open it and click **Activate** once, or submissions will report failure.
- If delivery fails, the page hands the composed message to the visitor's own mail app
  instead of claiming it was sent.
- To move to a Cloudflare-native pipeline later, swap the `fetch` target in `kit.js` —
  the rest of the form code stays as is.

## Do not redeploy from the old repo

The Cloudflare dashboard still links this Worker to `guess-access/prime-kreatives-digital`
(branch `App`), which holds the pre-rewrite site. That link is stale and deploys nothing on
its own. Always deploy from **this** repo with `npx wrangler deploy` — redeploying the old repo
or restoring an old version would bring back the broken 4-page site.

## GitHub Pages mirror

`https://guess-access.github.io/Prime-Kreatives-V2/` also serves this repo. It is a
convenience mirror only; `primekreatives.com` is the production host.

## Old URLs

`_redirects` maps legacy paths to the current pages, for example:

| Old | New |
|-----|-----|
| `/contact`, `/book`, `/audit` | `/discovery-call` |
| `/pricing`, `/packages` | `/services` |
| `/work`, `/case-studies` | `/portfolio/` |
| `/faq`, `/how-it-works` | `/process` |
| `/products`, `/shop`, `/templates` | `/digital/` |
