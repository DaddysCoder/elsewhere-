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

## Pages

| Route              | Page           |
| ------------------ | -------------- |
| `/`                 | Home           |
| `/essays`           | Essays index   |
| `/essays/:slug`     | Essay detail   |
| `/notes`            | Notes feed     |
| `/research`         | Research index |
| `/community`        | Community      |
| `/login`            | Login          |
| `/brand`            | Internal brand/style-guide reference |

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and produce a production build in dist/
npm run lint     # oxlint
npm run preview  # preview the production build locally
```

## Assets

The original design references hero video and duotone stock photography that
were design-time placeholders, not shipped with the handoff. This build keeps
the same layout, filters, and masks wired up, using CSS-generated gradients in
the brand palette in their place. Search for the `TexturePlate` and
`HeroVideo` components (and the comments inside them) for where to drop in
final production video/imagery — `public/uploads/` for the hero video,
`src/assets/` for field-plate imagery.
