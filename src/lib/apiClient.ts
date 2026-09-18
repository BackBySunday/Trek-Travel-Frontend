// Attaches the Authorization header for calls to any backend that verifies
// identity-svc's JWTs (every service in this platform does). Pair with
// useAuth().accessToken from AuthContext — this file has no dependency on
// React so it can be called from outside components too.
export async function authFetch(baseUrl: string, path: string, accessToken: string | null, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return fetch(`${baseUrl}${path}`, { ...init, headers });
}
