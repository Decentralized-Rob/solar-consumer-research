"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";
import { getSupabaseConfig } from "./config";

let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const { url, publishableKey } = getSupabaseConfig();
  browserClient = createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}

