import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// 🔒 Create ONE client only
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Reuse the same Supabase client
 * Dynamically inject Authorization header
 */
const supabaseClient = (supabaseAccessToken) => {
  if (supabaseAccessToken) {
    supabase.rest.headers.set("Authorization", `Bearer ${supabaseAccessToken}`);
  }

  return supabase;
};

export default supabaseClient;
