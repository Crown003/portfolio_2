import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are missing. Please set them in your .env file.");
  }
  return createClient(supabaseUrl, supabaseKey);
};
