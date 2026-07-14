import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * The only place @supabase/supabase-js is instantiated. Uses the service role
 * key, which bypasses RLS entirely — access control is enforced by the
 * session cookie checks in middleware.ts and the (app)/admin layouts, not by
 * Postgres policies. Never import this outside src/lib/data or src/lib/storage.
 */
export function getServiceRoleClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars"
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
