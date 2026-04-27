export function persistLegacySession(jwt) {
  // Tier 3 threat: insecure token storage (localstorage-token-to-secure-cookie)
  localStorage.setItem("token", jwt);
}

export function clearLegacySession() {
  localStorage.removeItem("token");
}
