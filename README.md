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
- Cloudflare Worker (`worker/`) for APIs, auth, and static SPA assets
- Cloudflare D1 for subscribers, accounts, sessions, threads, and replies

Production: [elsewhere.polina-67d.workers.dev](https://elsewhere.polina-67d.workers.dev)

## Pages

| Route                 | Page              |
| --------------------- | ----------------- |
| `/`                   | Home              |
| `/essays`             | Essays index      |
| `/essays/:slug`       | Essay detail      |
| `/notes`              | Notes feed        |
| `/research`           | Research index    |
| `/research/:slug`     | Research paper    |
| `/community`          | Community         |
| `/community/:id`      | Thread            |
| `/login`              | Sign in / access  |

Unknown paths render the branded 404.

## Running locally

```bash
npm install
npm run dev          # Vite front-end (proxies /api to :8787)
npx wrangler dev --ip 127.0.0.1 --port 8787
npm run build
npm run lint
```

Wrangler applies `migrations/` to a local D1 database named `elsewhere`.
Resend is optional for local work: subscribe and posting still persist to D1
if `RESEND_API_KEY` is missing. Copy `.env.example` to `.dev.vars` for secrets.

## Deploy

```bash
npx wrangler d1 create elsewhere    # once; put the id in wrangler.jsonc
npx wrangler d1 migrations apply elsewhere --remote
npx wrangler secret put RESEND_API_KEY
# optional, for GitHub sign-in:
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npm run deploy
```

Optional notify overrides: `NOTIFY_TO_EMAIL`, `NOTIFY_FROM_EMAIL`.

The Worker name is `elsewhere`. `assets.not_found_handling` is
`single-page-application`. `/api/*` runs the Worker first.

## What the APIs do

- `POST /api/subscribe` — stores the address in D1 (the list), then emails the lab if Resend is configured.
- `GET /api/threads` / `POST /api/thread` — public discussion. Posts appear on `/community` and open at `/community/:id`.
- `POST /api/threads/:id/replies` — adds a reply to a thread.
- `POST /api/request-access` — creates an account (name, email, password) and signs the visitor in.
- `POST /api/login` / `POST /api/logout` / `GET /api/me` — session cookie auth.
- `GET /api/auth/github` — GitHub OAuth. Needs `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`. Callback: `/api/auth/github/callback`.

## Assets

The hero video (`public/uploads/`) and duotone photography (`src/assets/stills/`,
used by the `TexturePlate` component on the Essays/Notes/Research/Community
headers) are final production assets, not placeholders. `src/assets/field-plates/`
holds six additional fully-composed cover-art images from the brand handoff
(each has its own wordmark/nav/headline baked into the image) — they're not
currently used on any page, since their baked-in text doesn't match this
site's real copy; kept in the repo for a future editorial placement.
