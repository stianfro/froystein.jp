# Website analytics

The site supports a self-hosted Umami tracker. Tracking is disabled in the
container image and must be enabled by the deployment at runtime. The
production Kustomize overlay mounts the enabled configuration and exposes only
the same-origin tracking routes. Other environments remain disabled unless they
provide their own reviewed configuration.

## Runtime configuration

The image includes `/analytics-config.js` with `enabled: false`. An environment
may mount a file at `/usr/share/nginx/html/analytics-config.js`:

```js
window.froysteinAnalytics = Object.freeze({
  enabled: true,
  websiteId: "00000000-0000-0000-0000-000000000000",
  scriptUrl: "/_analytics/script.js",
  hostUrl: "/_analytics",
});
```

Replace the example with the website ID created by Umami. Both endpoint values
must be same-origin paths. The public Gateway API route must forward the script
and ingestion endpoint to Umami. It must not expose the dashboard or account
APIs.

The loader limits tracking to the current hostname, removes query strings and
URL fragments, honors Do Not Track, and does not load Umami after a visitor
opts out. It does not call Umami identity, session replay, or performance APIs.
When a request has an allowlisted AI referral, the loader records an
`ai_referral` event with one fixed source label. It does not send the complete
query string or referrer URL.

## Event vocabulary

Only links with static `data-umami-event` attributes produce custom events:

- `media_email_click`: `language` and `page`
- `international_email_click`: `language` and `page`
- `consultancy_linkedin_click`: `language` and `page`
- `article_outbound_click`: `article-id`, `source`, and `language`
- `language_switch`: `from`, `to`, and `page-type`
- `ai_referral`: `source`, restricted to `chatgpt`, `claude`,
  `microsoft_copilot`, or `perplexity`

Do not add email addresses, complete outbound URLs, query strings, free-form
text, or stable visitor identifiers to event properties.

## Retention and verification

Umami event retention is 13 months. Nginx logs are a separate operational data
source and have a 14-day retention period. Retention for the analytics service
and log store is managed by the infrastructure that hosts those systems.

Nginx writes structured JSON to standard output for Loki. It records the path
without a query string, method, status, host, referrer hostname, user agent,
request duration, and Cloudflare country header. It does not record the client
IP address or forwarded-for headers. The log collector drops health checks and
any legacy access-log lines that are not in this JSON format.

The Nginx log also contains `ai_utm_source` and `ai_referrer`. Both fields are
empty or contain one of the same fixed AI source labels. The values are mapped
from an allowlisted `utm_source` value or referrer hostname before logging, so
the complete query string and referrer URL are not stored.

After enabling an environment:

1. Confirm the tracker and ingestion requests stay on the site origin.
2. Confirm page paths contain neither query strings nor fragments.
3. Exercise each event and inspect its fixed properties in Umami.
4. Enable Do Not Track and confirm that the tracker is not requested.
5. Use the privacy-page opt-out and confirm that it is remembered.
6. Confirm the Umami dashboard is reachable only through the internal network
   and requires Umami's local login.
