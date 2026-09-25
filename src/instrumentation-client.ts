import posthog from "posthog-js";

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const apiHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (apiKey) {
  posthog.init(apiKey, {
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
