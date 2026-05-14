
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const googleMap = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


export const googleMapApiKey = googleMap;

