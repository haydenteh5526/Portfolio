# Hayden Teh | Software Engineering Portfolio

[View the portfolio](https://haydenteh5526.github.io/Portfolio/) · [GitHub](https://github.com/haydenteh5526) · [LinkedIn](https://www.linkedin.com/in/haydenteh/)

A personal portfolio with five project case studies, internship experience at Ericsson and Jabil, education, awards and a CV. Each case study links to its source and documents what is implemented and what is still in development.

Built with **Next.js 15 (App Router), TypeScript, Tailwind CSS 4 and Framer Motion**. All routes are generated at build time for GitHub Pages. The page content is present in the exported HTML, and the animations respect reduced-motion preferences.

The homepage includes a personal portrait and CV link, scroll-linked project cards, a pausable colour technology marquee, CV-based achievement bullets, education with activities and relevant coursework, a skills panel and a full-width contact footer. Project cards use a regular vertical layout on phones, short screens and when reduced motion is enabled. Keyboard focus brings covered cards back into view.

## Run locally

With Node.js 22 or later:

```sh
npm ci
npm run dev
```

Open [localhost:3000/Portfolio/](http://localhost:3000/Portfolio/). To verify the production export, run `npm run build` followed by `npm run check`. The check validates the exported pages, local links, anchors and assets under the repository’s Pages path.

## Update content

- `lib/content.json`: project descriptions, evidence links, internship results, education and awards.
- `lib/site.ts`: professional links, CV, skills and optional media.
- `public/projects/`: original project illustrations.
- `app/page.tsx` and `app/projects/[slug]/page.tsx`: homepage and case study layouts.

For a portrait or CV PDF, place the file in `public/` and set the corresponding path in `lib/site.ts`. For a local CV, use `asset("Hayden_Teh_CV.pdf")` as the CV URL. The pitch section appears once `media.video` is set to a public viewing URL or an MP4 path. A local MP4 also supports a poster and English WebVTT captions. Test external CV and video access in a signed-out browser.

## Publish to GitHub Pages

Commit and push the source to `main`. From a clean checkout with Git push access to this repository, run:

```sh
npm run pages
```

This builds and checks the static export, then publishes only its output to `gh-pages` using the configured Git identity. In **Settings → Pages**, use **Deploy from a branch → gh-pages → / (root)**. A push to this branch triggers publication. Source changes on `main` become public after the next export is published.

The project path is `/Portfolio`; it is configured in `next.config.ts`, `lib/site.ts` and the export check. The published branch includes `.nojekyll` so GitHub serves the required `_next/` assets.

## Design references

[Ramzy’s portfolio](https://ramzy.framer.website/) is the visual reference for the typography, hero, sticky project stack, pastel cards, resume rows, skills panel and dark footer. Desktop measurements include a 1,016 px content width, 38 px section headings, 30 px project titles, 20 px project descriptions and 48 px buttons. The portfolio text and project illustrations describe my own work.

[Hans’s portfolio](https://iecloudbird.github.io/portfolio/) informed the framework and the links between project descriptions and their source. Typography loads Satoshi from Fontshare, Hanken Grotesk from Google Fonts and Recoleta from the reference’s public Framer font URLs, with system fallbacks when those services are unavailable. Colour technology marks are from [Devicon](https://devicon.dev/), and the outline GitHub icon is from [Feather](https://feathericons.com/). Their MIT notices are included in `public/technologies/LICENSE.devicon` and `public/technologies/LICENSE.feather`.

The redesign was checked in Chromium at widths from 320 to 1,920 px, including normal and reduced motion, project deep links, keyboard access to stacked cards, marquee controls and mobile navigation. `npm run check` also verifies all seven exported HTML pages and their local links and assets.
