'use client';

import { useEffect, useState } from "react";
import { readCookiePreferences } from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const GTM_ID = "GTM-MRGCJ744";

function injectGtmScript() {
  if (document.getElementById("gtm-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function removeGtmScript() {
  const script = document.getElementById("gtm-script");
  script?.parentElement?.removeChild(script);
}

export function AnalyticsLoader() {
  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const preferences = readCookiePreferences();
      setCanLoadAnalytics(Boolean(preferences?.target));
    };

    refresh();
    window.addEventListener("cookie-consent-updated", refresh);
    return () => window.removeEventListener("cookie-consent-updated", refresh);
  }, []);

  useEffect(() => {
    if (canLoadAnalytics) {
      injectGtmScript();
      return;
    }

    removeGtmScript();
    window.dataLayer = [];
  }, [canLoadAnalytics]);

  return null;
}
