"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearTokens, decodeJwtExpiry, loadTokens, saveTokens, type TokenPair } from "./tokenStorage";

const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:8087";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (tokens: TokenPair) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// A token counts as usable if it isn't already expired — a small buffer
// (30s) avoids treating a token as valid for a request that would fail by
// the time it actually reaches the backend.
function isTokenFresh(accessToken: string): boolean {
  const exp = decodeJwtExpiry(accessToken);
  if (exp === null) return false;
  return exp * 1000 > Date.now() + 30_000;
}

async function refreshTokens(refreshToken: string): Promise<TokenPair | null> {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!response.ok) return null;
    return (await response.json()) as TokenPair;
  } catch {
    return null;
  }
}

// AuthProvider owns the one piece of session state this app has: the token
// pair identity-svc issues on OTP/Google verify. Nothing else in this
// codebase persisted a login before this — see the Navbar/auth page for
// where that state actually gets read and written.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokensState] = useState<TokenPair | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const stored = loadTokens();
      if (!stored) {
        setIsLoading(false);
        return;
      }
      if (isTokenFresh(stored.access_token)) {
        if (!cancelled) {
          setTokensState(stored);
          setIsLoading(false);
        }
        return;
      }
      // Access token has expired since the last visit — try the refresh
      // token once before giving up and treating this as logged out.
      const refreshed = await refreshTokens(stored.refresh_token);
      if (cancelled) return;
      if (refreshed) {
        saveTokens(refreshed);
        setTokensState(refreshed);
      } else {
        clearTokens();
      }
      setIsLoading(false);
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((next: TokenPair) => {
    saveTokens(next);
    setTokensState(next);
  }, []);

  const logout = useCallback(() => {
    setTokensState((current) => {
      clearTokens();
      if (current?.refresh_token) {
        // Best-effort — the local session ends immediately either way.
        void fetch(`${AUTH_API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: current.refresh_token }),
        }).catch(() => {});
      }
      return null;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: tokens !== null,
      isLoading,
      accessToken: tokens?.access_token ?? null,
      userId: tokens?.user_id ?? null,
      login,
      logout,
    }),
    [tokens, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
