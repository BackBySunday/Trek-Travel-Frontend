// Persists the token pair identity-svc returns from
// /app/auth/otp/verify and /app/auth/google/verify (see
// authservice/internal/auth/service.go's TokenPair) in localStorage, so a
// login survives a page reload or a new tab.

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user_id: string;
};

const STORAGE_KEY = "bbs_auth_tokens";

export function loadTokens(): TokenPair | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TokenPair;
  } catch {
    return null;
  }
}

export function saveTokens(tokens: TokenPair) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

// Decodes the access token's JWT payload without verifying its signature —
// only ever used for a client-side UI decision (is a stored token still
// fresh enough to trust locally before a request). The backend's JWKS
// verification is the real source of truth for whether a token is valid.
export function decodeJwtExpiry(accessToken: string): number | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const json = window.atob(padded);
    const claims = JSON.parse(json) as { exp?: unknown };
    return typeof claims.exp === "number" ? claims.exp : null;
  } catch {
    return null;
  }
}
