import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: DEMO_MODE ? "demo" : "public",
  },
});
