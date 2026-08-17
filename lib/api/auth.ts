import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "../supabase/server";

export async function authenticateRequest(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;

  const accessToken = authorization.slice("Bearer ".length).trim();
  if (!accessToken) return null;

  const supabase = createSupabaseServerClient(accessToken);
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return null;

  return { accessToken, supabase, user: data.user };
}

