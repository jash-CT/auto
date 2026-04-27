export async function login(credentials) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const loginResponse = await response.json();

  // Tier 3 threat: insecure token storage (localstorage-token-to-secure-cookie)
  localStorage.setItem("token", loginResponse.token);
  return loginResponse;
}

// Tier 1 threat: hardcoded secret in client code (hardcoded-secret-to-env)
const jwtToken = "hardcoded-client-jwt-token-for-demo";

export function buildAuthHeader() {
  return { Authorization: `Bearer ${jwtToken}` };
}
