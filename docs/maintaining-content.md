# Maintaining site content

## Profile and media information

Shared profile, appearance, media-topic, format, and blog-post data lives in `src/data/content.ts`. English and Japanese pages render the same records so dates and links cannot drift between languages.

When adding a television appearance:

1. Confirm the broadcast date, broadcaster, exact programme title, participation type, and topic with Stian.
2. Prefer an official broadcaster or event page as the public source.
3. Add one reverse-chronological record to `appearances` in `src/data/content.ts`.
4. Write plain English and natural Japanese descriptions. Distinguish a programme-agent appearance, interview, and guest appearance.
5. Do not add logos, stills, screenshots, quotations, or photographs without confirmed rights and credit requirements.
6. Run `just check` and inspect both `/media/` and `/ja/media/` at desktop and mobile widths.

Review the profile after a role, residence, language, or contact-policy change. Perform a general review at least every six months.

## Blog posts

Add new writing to `blogPosts` in `src/data/content.ts`. Verify the title, publication date, author, and canonical URL against the published article. Keep the list in reverse-chronological order.

## Search and structured data

Page metadata is defined in `src/pages/`. The shared Schema.org entity graph is defined in `src/data/structured-data.ts`.

Visible profile facts and structured data must agree. Do not add a structured-data claim that is absent from the page or has not been confirmed.

The route-specific sitemap modification dates are defined in `astro.config.mjs`. Update the affected route dates when visible content changes. Do not replace them with the build time, because an unchanged page should not receive a new modification date on every build.

`src/pages/robots.txt.ts` allows ordinary search crawlers, OAI-SearchBot, and ChatGPT-User. It disallows GPTBot as the conservative training-crawler policy. Search access and model-training permission are separate decisions. Revisit this policy only with owner approval.

`/llms.txt` is a supplementary orientation file. It does not replace crawlable HTML, metadata, structured data, or the XML sitemap.

Every canonical indexable HTML page has a direct Markdown mirror. Add `.md` to the page path, for example `/media/` becomes `/media.md` and `/ja/contact/` becomes `/ja/contact.md`. The root pages use `/index.md` and `/ja.md`. `/llms.txt` and HTML alternate links point to these direct routes. Proposal-style `index.html.md` routes remain available as compatibility aliases. The 404 page is intentionally excluded because it has no useful source content. The mirrors are generated from `src/data/markdown-content.ts` and reuse the shared appearances, topics, blog posts, and certifications from `src/data/content.ts`.

Every HTML page advertises the site-wide `/llms.txt` guide in its document head with `<link rel="help" type="text/plain" href="/llms.txt">`. The llms.txt proposal defines the root file location but does not define a dedicated HTML link relation, so the site uses the registered `help` relation instead of a custom relation name.

When visible copy changes, update its Markdown equivalent in the same change. `/llms.txt` must keep its H1, summary blockquote, explanatory text, and H2 link-list order. Markdown mirrors stay out of the XML sitemap and are served with `X-Robots-Tag: noindex, follow` so the canonical HTML pages remain the search results.

## Contact information

`media@froystein.jp` is the dedicated media address. Do not replace it with a personal address or add a telephone number or home address. The first release has no form, submission processor, tracking, or retention system.

Before publication and after contact changes, test inbound and outbound delivery from an external account and verify SPF, DKIM, and DMARC alignment.

## Local design prototypes

The approved prototype routes were removed when production implementation began. Review screenshots remain only in the ignored local `.cache/` directory. The build test rejects any `design-lab` or prototype portrait output in `dist`.
