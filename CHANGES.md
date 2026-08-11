# christogoosen.com — rebuild on the new visual identity

Overlay for the existing Astro project. It does **not** touch `src/content/`,
so your posts, book reviews and the Obsidian vault are left alone.

## Install

Unzip over the project root, overwriting when asked:

    cd "~/Documents/Projects/ChristoGoosen Website/christogoosen"
    unzip -o ~/Downloads/christogoosen-redesign.zip
    rm -f src/components/HeaderLink.astro public/favicon.ico
    rm -rf src/pages/blog
    npm run build && npm run preview

Then the usual deploy:

    git add -A
    git commit -m "Rebuild on new visual identity"
    git push

`output: 'static'` is still set explicitly in `astro.config.mjs`, so the
Cloudflare adapter auto-injection problem should not come back.

## Verified

Build passes on Node 22 with Astro 6. All pages screenshot-checked at 1440px
and 390px. Fonts render as Arial in the checks because the build container has
no access to Google Fonts; they load normally once deployed.

## Routes

| Route | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/essays` | `src/pages/essays/index.astro` |
| `/essays/<slug>` | `src/pages/essays/[...slug].astro` |
| `/books` | `src/pages/books/index.astro` |
| `/books/<slug>` | `src/pages/books/[...slug].astro` |
| `/work` | `src/pages/work/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/privacy` | `src/pages/privacy.astro` |
| `/404` | `src/pages/404.astro` |
| `/blog`, `/blog/<slug>` | redirect to `/essays` |

## Frontmatter

Blog (`src/content/blog/`) — unchanged fields plus two optional ones:

    ---
    title: ...
    description: ...
    pubDate: 2026-08-11
    category: Essay        # Essay | Note | Case study. Defaults to Essay.
    draft: false           # true hides it from the build entirely
    heroImage: ./image.jpg # optional
    ---

Anything tagged `category: Case study` also appears on `/work`.

Books (`src/content/books/`) — unchanged fields plus:

    cover: ./cover.jpg     # optional book jacket
    topic: Product         # Product | Leadership | Systems | Design | Strategy
    draft: false

`topic` drives the filter row on `/books`. The row only renders once at least
one review carries a topic.

## Settings in `src/consts.ts`

- `NEWSLETTER_ACTION` — empty. While empty the footer shows an RSS/email prompt
  rather than a form that goes nowhere. Paste your Buttondown or Kit form action
  URL and the real signup form appears.
- `CONTACT_EMAIL` — currently `hello@christogoosen.com`. **Guessed. Change it.**
- `LINKEDIN_URL` — **guessed. Change it.**
- `NAV` — remove the Work entry here if you would rather not ship that page yet.

## Placeholder assets

- `src/components/HeroArt.astro` stands in for the architectural photograph.
  The photo is not embedded separately in the style guide PDF, only flattened
  into page screenshots, so this is a vector approximation of the oculus in the
  brand greys. Replace it by dropping a real image into the `.hero-media` div on
  each page.
- `src/components/CardArt.astro` fills cards with no `heroImage`/`cover`. It is
  deterministic, so a given title always gets the same composition.
- `public/favicon.svg` and `public/cg-mark.svg` are the CG monogram vectorised
  from the PDF. If your partner has the original vector, swap it in.

## Deviations from the style guide

- **Long-form body copy.** The typography table has no style for article text;
  card description at 14/20 is unreadable at essay length. `.prose` in
  `global.css` sets 17px/1.7 and is marked `EXTENSION`. This is the one block
  that was invented rather than transcribed — worth a review.
- **Copyright year** is dynamic, not the 2024 in the mockup.
- **Spacing scale and mobile type scale** are derived, also marked `EXTENSION`.
- **Navigation weight 650** needs the variable font, so `global.css` requests
  `Inter:wght@400..700` rather than discrete weights.
