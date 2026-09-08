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
- Two Vercel serverless functions in `api/` for the newsletter and community
  forms (see "Forms & email notifications" below)

## Pages

| Route              | Page           |
| ------------------ | -------------- |
| `/`                 | Home           |
| `/essays`           | Essays index   |
| `/essays/:slug`     | Essay detail   |
| `/notes`            | Notes feed     |
| `/research`         | Research index |
| `/community`        | Community      |
| `/login`            | Login (UI only — no auth backend, see below) |

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and produce a production build in dist/
npm run lint     # oxlint
npm run preview  # preview the production build locally
```

`npm run dev` only serves the front-end — it does not run the `api/`
functions. To test the forms locally, install the Vercel CLI and run
`vercel dev` instead (it serves both the Vite app and `api/` together and
reads `.env`/`.env.local` for `RESEND_API_KEY_ELSEWHERE`).

## Assets

The hero video (`public/uploads/`) and duotone photography (`src/assets/stills/`,
used by the `TexturePlate` component on the Essays/Notes/Research/Community
headers) are final production assets, not placeholders. `src/assets/field-plates/`
holds six additional fully-composed cover-art images from the brand handoff
(each has its own wordmark/nav/headline baked into the image) — they're not
currently used on any page, since their baked-in text doesn't match this
site's real copy; kept in the repo for a future editorial placement.

## Forms & email notifications

Two forms — the newsletter signup on `/essays` and the "start a thread" box
on `/community` — POST to `api/subscribe` and `api/thread` respectively.
Neither form stores anything; each submission sends a one-off email via
[Resend](https://resend.com) to `hello@primitiveai.com.au` (overridable, see
below) and returns success/error, no database involved.

**Login is not one of these forms.** It has no backend at all — the
email/password/GitHub button don't authenticate anyone. Wiring up real auth
(and deciding whether it should exist at all) is separate follow-up work.

To make the two forms actually send mail once deployed:

1. Create a [Resend](https://resend.com) account and API key.
2. Verify a sending domain in Resend (needed to send `from` your own domain
   instead of the shared `onboarding@resend.dev` test address, which works
   but looks like a test sender).
3. Set `RESEND_API_KEY_ELSEWHERE` (required) in your hosting provider's environment
   variables. Optionally set `NOTIFY_TO_EMAIL` (defaults to
   `hello@primitiveai.com.au`) and `NOTIFY_FROM_EMAIL` (defaults to
   `onboarding@resend.dev` — set this to an address on your verified domain
   once you have one). See `.env.example`.

The two functions in `api/` are plain Vercel serverless functions (Node,
`export default function handler(req, res)`), the simplest pairing for a
static Vite site. If this ends up hosted somewhere other than Vercel
(Netlify, Cloudflare, etc.), these will need to move into that platform's
own function format — the Resend-calling logic in `api/_resend.js` can be
reused as-is, it's just a `fetch` call.
