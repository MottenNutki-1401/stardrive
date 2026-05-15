
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const googleMap = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL;

export const predictRide = async (

  distance,
  eta,
  demand,
  time

) => {

  const response = await fetch(

    `${BACKEND_URL}/predict`,

    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        distance,
        eta,
        demand,
        time,
      }),
    }
  );

  return await response.json();
};


//user login logic
export const loginUser = async (

  email,
  password

) => {

  const {

    data,
    error

  } = await supabase.auth
    .signInWithPassword({

      email,
      password,
    });

  if (error) {

    return {
      error:
        error.message
    };
  }

  /* GET PROFILE */
  const {

    data: profile,
    error: profileError

  } = await supabase

    .from("users")

    .select("*")

    .eq("auth_id", data.user.id)

    .single();

  if (profileError) {

    return {
      error:
        profileError.message
    };
  }

  return profile;
};

export const supabase = createClient(supabaseUrl, supabaseKey);


export const googleMapApiKey = googleMap;

