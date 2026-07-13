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
  document.head.append(tracker);
})();
