# Post-merge checklist

## Deployment

- Confirm the canonical host redirects to `https://www.froystein.jp/`.
- Confirm `/`, `/media/`, `/contact/`, `/ja/`, `/ja/media/`, and `/ja/contact/` return successful responses.
- Confirm an unknown URL returns the intended 404 response.
- Confirm `blog.froystein.jp` is unaffected.
- If rollback is required, redeploy the previously known-good container image or revert the merge commit and redeploy.

## Search and crawlers

- Open `/robots.txt`, `/sitemap-index.xml`, and `/llms.txt` on production.
- Open all six direct Markdown page mirrors linked by `/llms.txt`: `/index.md`, `/media.md`, `/contact.md`, `/ja.md`, `/ja/media.md`, and `/ja/contact.md`. Confirm a `text/markdown` content type, `X-Robots-Tag: noindex, follow`, canonical HTML links in the documents, and factual agreement with the HTML pages.
- Confirm the six proposal-style `index.html.md` compatibility aliases return the same content as the direct Markdown routes.
- Validate the English and Japanese canonical and reciprocal `hreflang` links.
- Validate the JSON-LD on the home, media, and contact pages with Schema.org tooling and the relevant Google testing tools.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools if owner access is available.
- Request indexing for the Japanese home and media pages after deployment.
- Verify that the CDN or WAF does not block Googlebot, Bingbot, or OAI-SearchBot.

## Contact delivery

- Send an external test message to `media@froystein.jp`.
- Reply from the monitored mailbox and inspect SPF, DKIM, and DMARC results.
- Enable Google Workspace DKIM before relying on Google Workspace for outbound replies.
- Confirm spam filtering, attachment handling, reply identity, and mailbox ownership.

## Monitoring

- Record the pre-release indexed-page and target-query baseline where available.
- Recheck indexing, crawl errors, Core Web Vitals, and media enquiries after about two weeks, one month, three months, and six months.
- Review all profile facts and appearance links every six months and after each new appearance or role change.
