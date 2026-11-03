const encoder = new TextEncoder();

export async function signSession(username: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET_KEY || "default-secret-super-secure-key-2026";
  const timestamp = Date.now().toString();
  const payload = `${username}:${timestamp}`;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const rawToken = `${payload}:${sigHex}`;
  return typeof Buffer !== "undefined"
    ? Buffer.from(rawToken).toString("base64url")
    : btoa(rawToken).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = process.env.ADMIN_SECRET_KEY || "default-secret-super-secure-key-2026";
    let rawToken = "";
    if (typeof Buffer !== "undefined") {
      rawToken = Buffer.from(token, "base64url").toString("utf-8");
    } else {
      let b64 = token.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      rawToken = atob(b64);
    }

    const parts = rawToken.split(":");
    if (parts.length !== 3) return false;

    const [username, timestampStr, sigHex] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // Session valid for 7 days
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAge) return false;

    const payload = `${username}:${timestampStr}`;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedSig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expectedHex = Array.from(new Uint8Array(expectedSig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return sigHex === expectedHex;
  } catch (err) {
    return false;
  }
}
