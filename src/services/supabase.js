import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://frgfupevomnsnuhfwblt.supabase.co";
const supabaseKey = import.meta.env.VITE_URL_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
