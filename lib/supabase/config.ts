const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const EMAIL_AUTH_ENABLED = process.env.NEXT_PUBLIC_EMAIL_AUTH_ENABLED === "true";
const GOOGLE_AUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
