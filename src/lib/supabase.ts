import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// YOUR EXACT KEYS HARDCODED HERE
const supabaseUrl = "https://xjfolljrhuqypegwwicp.supabase.co";
const supabaseAnonKey = "sb_publishable_Gp75r1pxqqOlBbJIeha0GA_IMOZpbLa";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
