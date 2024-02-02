import { env } from "~/env";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANNON_KEY,
);
