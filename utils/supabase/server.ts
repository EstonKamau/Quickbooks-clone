import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookieStore = cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Log the Supabase URL and ANON KEY
  console.log('Supabase URL:', url);
  console.log('Supabase ANON KEY:', anonKey);

  if (!url || !anonKey) {
    throw new Error("Supabase URL or ANON KEY is not defined");
  }

  try {
    // Validate the URL format using URL constructor
    new URL(url);
  } catch (e) {
    throw new Error(`Invalid Supabase URL: ${url}`);
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // Ignore the error for server component calls
        }
      },
    },
  });
};
