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

export function createSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) throw new Error("Supabase server credentials are missing.");

  const { url } = getSupabaseConfig();
  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
