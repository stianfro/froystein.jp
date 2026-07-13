/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  froysteinAnalytics?: {
    enabled?: boolean;
    hostUrl?: string;
    scriptUrl?: string;
    websiteId?: string;
  };
}
