import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const insertCustomer = async (customerData: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("customers")
    .insert([customerData]);

  if (error) {
    console.error("Error inserting customer:", error.message);
    throw error;
  }

  return data;
};
