# else{where}

The website for else{where}, the essays/research/community arm of the same brand
account as Primitive Labs. Built from a design handoff package (see the
`.dc.html` reference files that shaped this implementation — not included in
this repo).

## Stack

- Vite + React + TypeScript
- React Router (client-side routing)
- Plain CSS with CSS custom properties for design tokens (`src/styles/tokens.css`)
  plus CSS Modules per component/page — no CSS-in-JS, no Tailwind
- Google Fonts: Public Sans (display/body) and JetBrains Mono (UI/labels/wordmark)
- Cloudflare Worker (`worker/`) for the newsletter and community forms, plus
  static assets for the SPA

Production: [elsewhere.polina-67d.workers.dev](https://elsewhere.polina-67d.workers.dev)

## Pages

| Route              | Page           |
| ------------------ | -------------- |
| `/`                 | Home           |
| `/essays`           | Essays index   |
| `/essays/:slug`     | Essay detail   |
| `/notes`            | Notes feed     |
| `/research`         | Research index |
| `/community`        | Community      |

Unknown paths render the branded 404. `/login` is not a public route.

## Running locally

```bash
npm install
npm run dev      # front-end only (forms need the Worker)
npm run build    # type-check and produce a production build in dist/
npm run lint     # oxlint
npm run preview  # preview the static build locally
```

`npm run dev` only serves the front-end. To exercise `/api/subscribe` and
`/api/thread` locally:

1. Copy `.env.example` to `.dev.vars` and set `RESEND_API_KEY`.
2. `npm run build && npx wrangler dev` — serves the SPA and the Worker together.

## Deploy

```bash
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

Optional notify overrides can be set as Worker vars or secrets:
`NOTIFY_TO_EMAIL`, `NOTIFY_FROM_EMAIL`.

The Worker name is `elsewhere` (workers.dev: `elsewhere.<account>.workers.dev`).
`assets.not_found_handling` is `single-page-application`, so deep links such as
`/essays/:slug` resolve on refresh. `/api/*` is handled by the Worker first.

## Assets

The hero video (`public/uploads/`) and duotone photography (`src/assets/stills/`,
used by the `TexturePlate` component on the Essays/Notes/Research/Community
headers) are final production assets, not placeholders. `src/assets/field-plates/`
holds six additional fully-composed cover-art images from the brand handoff
(each has its own wordmark/nav/headline baked into the image) — they're not
currently used on any page, since their baked-in text doesn't match this
site's real copy; kept in the repo for a future editorial placement.

## Forms & email notifications

Two forms — the newsletter signup on `/essays` and the discussion prompt on
`/community` — POST to `/api/subscribe` and `/api/thread` respectively.
Neither form stores anything; each submission sends a one-off email via
[Resend](https://resend.com) to `hello@primitiveai.com.au` (overridable, see
below) and returns `{ ok: true }` or an error. No mailing list or public
thread is created.

To make the two forms actually send mail:

1. Create a [Resend](https://resend.com) account and API key.
2. Verify a sending domain in Resend (needed to send `from` your own domain
   instead of the shared `onboarding@resend.dev` test address, which works
   but looks like a test sender).
3. Set `RESEND_API_KEY` (required) as a Wrangler secret. Optionally set
   `NOTIFY_TO_EMAIL` (defaults to `hello@primitiveai.com.au`) and
   `NOTIFY_FROM_EMAIL` (defaults to `onboarding@resend.dev` — set this to an
   address on your verified domain once you have one). See `.env.example`.
