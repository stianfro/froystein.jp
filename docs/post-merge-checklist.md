# Post-merge checklist

## Deployment

- Confirm the canonical host redirects to `https://www.froystein.jp/`.
- Confirm `/`, `/consulting/`, `/international/`, `/media/`, `/contact/`,
  `/ja/`, `/ja/consulting/`, `/ja/international/`, `/ja/media/`, and
  `/ja/contact/` return successful responses.
- Confirm an unknown URL returns the intended 404 response.
- Confirm `blog.froystein.jp` is unaffected.
- If rollback is required, redeploy the previously known-good container image or revert the merge commit and redeploy.

## Search and crawlers

- Open `/robots.txt`, `/sitemap-index.xml`, and `/llms.txt` on production.
- Open all ten direct Markdown page mirrors linked by `/llms.txt`, including
  `/consulting.md`, `/international.md`, and their Japanese equivalents. Confirm
  a `text/markdown` content type, `X-Robots-Tag: noindex, follow`, canonical
  HTML links in the documents, and factual agreement with the HTML pages.
- Confirm the ten proposal-style `index.html.md` compatibility aliases
  return the same content as the direct Markdown routes.
- Validate the English and Japanese canonical and reciprocal `hreflang` links.
- Validate the JSON-LD on the home, consulting, international, media, and contact pages with Schema.org tooling and the relevant Google testing tools.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools if owner access is available.
- Request indexing for both consulting pages, both international-service pages, and the Japanese home and media pages after deployment.
- Verify that the CDN or WAF does not block Googlebot, Bingbot, or OAI-SearchBot.
- Confirm the allowlisted AI referral fields contain only fixed service labels
  and never contain the complete query string or referrer URL.

## Contact delivery

- Send external test messages to `contact@froystein.jp` and the `media@froystein.jp` alias.
- Reply from the monitored mailbox and inspect SPF, DKIM, and DMARC results.
- Enable Google Workspace DKIM before relying on Google Workspace for outbound replies.
- Confirm spam filtering, attachment handling, reply identity, and mailbox ownership.

## Monitoring

- Record the pre-release indexed-page and target-query baseline where available.
- Recheck indexing, crawl errors, Core Web Vitals, and media enquiries after about two weeks, one month, three months, and six months.
- Review all profile facts and appearance links every six months and after each new appearance or role change.
