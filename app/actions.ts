"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  // Sign up the user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (signUpError) {
    console.error(signUpError.code + " " + signUpError.message);
    return encodedRedirect("error", "/sign-up", signUpError.message);
  }

  const user = signUpData?.user;

  // Check if we got the user after sign-up
  if (user) {
    // Insert a new profile with default values
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,               // Set the user ID as the profile ID (this is the auth.uid())
          email: user.email,         // Add the user's email to the profile
          role: "employee",          // Default role
          authorization_status: "not authorized",  // Default status
        },
      ]);

    // Handle any errors while inserting the profile
    if (profileError) {
      console.error(profileError.message);
      return encodedRedirect("error", "/sign-up", "Profile creation failed.");
    }

    // Continue with the success message and redirect
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }

  // If something went wrong and we don't have a user
  return encodedRedirect("error", "/sign-up", "User creation failed.");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};


export const saveTransactionAction = async (formData: any) => {
  const supabase = createClient();

  // Capture form data from the frontend
  const { customer_name, type_of_sale, product, quantity, unit_of_measure, unit_price, total_price } = formData;

  const userId = "some-user-id";  // Retrieve user_id from session (you will need to implement this)
  const companyName = "some-company";  // Get company name from the user profile (implement this)

  const { error } = await supabase.from("transactions").insert({
    customer_name,
    type_of_sale,
    product,
    quantity: Number(quantity),
    unit_of_measure,
    unit_price: Number(unit_price),
    total_price: Number(total_price),
    user_id: userId,
    company_name: companyName,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return { error: "Failed to save transaction" };
  }

  return { success: "Transaction saved successfully" };
};