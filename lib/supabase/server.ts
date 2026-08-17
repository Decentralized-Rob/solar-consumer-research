import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";
import { getSupabaseConfig } from "./config";

export function createSupabaseServerClient(accessToken?: string) {
  const { url, publishableKey } = getSupabaseConfig();

  return createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  });
}

