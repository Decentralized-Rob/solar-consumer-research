type TurnstileResult = {
  success?: boolean;
};

export async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, configurationError: true };
  if (!token) return { ok: false, configurationError: false };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    const result = (await response.json().catch(() => null)) as TurnstileResult | null;
    return { ok: response.ok && result?.success === true, configurationError: false };
  } catch {
    return { ok: false, configurationError: false };
  }
}
