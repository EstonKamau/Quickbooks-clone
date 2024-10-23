import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = createClient();

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();

  let name = '';
  let companyName = '';

  // If user is authenticated, fetch their profile
  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("name, company_name")
      .eq("id", user.id)
      .single();

    if (profile) {
      name = profile.name;
      companyName = profile.company_name;
    } else {
      console.error("Error fetching profile:", error);
    }
  }

  return user ? (
    <div className="flex items-center gap-4">
      {/* Display the company name and user name */}
      {companyName && <span>{companyName}</span>}
      Hey, {name || user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
