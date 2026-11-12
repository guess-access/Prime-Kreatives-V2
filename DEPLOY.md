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

## Forms

The booking and order forms post to **FormSubmit**
(`https://formsubmit.co/ajax/<address>`) through `kit.js`.

- The **first** submission to an address sends a confirmation email to that inbox.
  Open it and click **Activate** once, or submissions will report failure.
- If delivery fails, the page hands the composed message to the visitor's own mail app
  instead of claiming it was sent.
- To move to a Cloudflare-native pipeline later, swap the `fetch` target in `kit.js` —
  the rest of the form code stays as is.

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
