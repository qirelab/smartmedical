export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent-preferences";
export const COOKIE_CONSENT_HANDLED_KEY = "cookie-consent-accepted";

export type CookiePreferences = {
  technical: true;
  target: boolean;
  updatedAt: string;
};

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  technical: true,
  target: false,
  updatedAt: "",
};

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences> & {
      functional?: boolean;
      analytics?: boolean;
    };

    // Backward compatibility with previous schema.
    const target =
      typeof parsed.target === "boolean"
        ? parsed.target
        : Boolean(parsed.functional) || Boolean(parsed.analytics);

    return {
      technical: true,
      target,
      updatedAt: parsed.updatedAt || "",
    };
  } catch {
    return null;
  }
}

export function writeCookiePreferences(preferences: { target: boolean }) {
  if (typeof window === "undefined") return;

  const payload: CookiePreferences = {
    technical: true,
    target: preferences.target,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
  localStorage.setItem(COOKIE_CONSENT_HANDLED_KEY, "true");
  window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: payload }));
}

function expireCookie(name: string, domain?: string) {
  const domainPart = domain ? `;domain=${domain}` : "";
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainPart};SameSite=Lax`;
}

export function revokeTargetCookies() {
  if (typeof document === "undefined") return;

  const host = window.location.hostname;
  const rootDomain = host.includes(".") ? `.${host.split(".").slice(-2).join(".")}` : undefined;
  const exactNames = ["_gid", "_gat", "_gcl_au", "_fbp", "_ym_uid", "_ym_d", "_ym_isad"];
  const prefixNames = ["_ga", "_ym_"];

  for (const name of exactNames) {
    expireCookie(name);
    expireCookie(name, host);
    if (rootDomain) expireCookie(name, rootDomain);
  }

  const existingCookieNames = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter(Boolean);

  for (const cookieName of existingCookieNames) {
    if (!prefixNames.some((prefix) => cookieName.startsWith(prefix))) continue;
    expireCookie(cookieName);
    expireCookie(cookieName, host);
    if (rootDomain) expireCookie(cookieName, rootDomain);
  }

  // Hard-disable GA in current session.
  (window as unknown as Record<string, unknown>)["ga-disable-GTM-MRGCJ744"] = true;
}
