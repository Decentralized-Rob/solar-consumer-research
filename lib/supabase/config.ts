// These values are public client configuration. The browser needs them at build
// time, while the hosted runtime may expose environment values only on the
// server. Keep verified defaults so the public intake cannot silently fall back
// to its "coming soon" state when a deployment environment is missing them.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zuwxlbcdpvijnkzxmftc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Sga6OrGH5zRDgL_6UtyOsw_OlmJE1B6";
const EMAIL_AUTH_ENABLED = process.env.NEXT_PUBLIC_EMAIL_AUTH_ENABLED !== "false";
const GOOGLE_AUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAEY7QpTGRNh102iJ";

export function hasSupabasePublicConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
}

export function getSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase public configuration is missing.");
  }

  return {
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
  };
}

export function getPublicFeatureConfig() {
  return {
    emailAuthEnabled: EMAIL_AUTH_ENABLED,
    googleAuthEnabled: GOOGLE_AUTH_ENABLED,
    turnstileSiteKey: TURNSTILE_SITE_KEY ?? null,
  };
}
