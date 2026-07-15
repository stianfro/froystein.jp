(() => {
  const config = window.froysteinAnalytics;

  const optOutButtons = document.querySelectorAll("[data-analytics-opt-out]");
  const optOutStatus = document.querySelector("[data-analytics-status]");
  const optOutError = document.querySelector("[data-analytics-opt-out-error]");
  let optedOut = false;

  try {
    optedOut = localStorage.getItem("umami.disabled") === "1";
  } catch {
    // Storage can be unavailable in hardened browsers. Tracking remains usable,
    // and Do Not Track still provides a storage-free opt-out.
  }

  if (optOutStatus) {
    optOutStatus.hidden = !optedOut;
  }
  optOutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      try {
        localStorage.setItem("umami.disabled", "1");
        window.location.reload();
      } catch {
        if (optOutError) {
          optOutError.hidden = false;
        }
      }
    });
  });

  if (!config?.enabled || optedOut || navigator.doNotTrack === "1") return;
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(config.websiteId ?? "")) return;

  const scriptUrl = config.scriptUrl ?? "/_analytics/script.js";
  const hostUrl = config.hostUrl ?? "/_analytics";

  // Only same-origin paths are accepted. This prevents a mounted configuration
  // from quietly turning the site into a third-party tracker.
  if (!scriptUrl.startsWith("/") || !hostUrl.startsWith("/")) return;

  const tracker = document.createElement("script");
  tracker.defer = true;
  tracker.src = scriptUrl;
  tracker.dataset.websiteId = config.websiteId;
  tracker.dataset.hostUrl = hostUrl;
  tracker.dataset.domains = window.location.hostname;
  tracker.dataset.doNotTrack = "true";
  tracker.dataset.excludeHash = "true";
  tracker.dataset.excludeSearch = "true";

  // Only fixed source labels are sent. The complete query string and referrer
  // URL are never included in the event payload.
  const aiSourceLabels = Object.freeze({
    "chatgpt.com": "chatgpt",
    "claude.ai": "claude",
    claude: "claude",
    "copilot.microsoft.com": "microsoft_copilot",
    copilot: "microsoft_copilot",
    microsoft_copilot: "microsoft_copilot",
    "perplexity.ai": "perplexity",
    perplexity: "perplexity",
  });
  const utmSource = new URLSearchParams(window.location.search)
    .get("utm_source")
    ?.toLowerCase();
  let referrerHost = "";

  try {
    referrerHost = new URL(document.referrer).hostname
      .toLowerCase()
      .replace(/^www\./, "");
  } catch {
    // An absent or invalid referrer is not an error and sends no source event.
  }

  const aiReferralSource =
    aiSourceLabels[utmSource] ?? aiSourceLabels[referrerHost];

  if (aiReferralSource) {
    tracker.addEventListener("load", () => {
      window.umami?.track?.("ai_referral", { source: aiReferralSource });
    });
  }

  document.head.append(tracker);
})();
