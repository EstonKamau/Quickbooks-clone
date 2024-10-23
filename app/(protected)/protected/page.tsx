"use client"; // Since we are using hooks here

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import client-side Supabase
import { InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal"; // Import the Modal


export default function ProtectedPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in"); // Redirect if not authenticated
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, company_name")
        .eq("id", user.id)
        .single();

      if (!profile?.name || !profile?.company_name) {
        setShowPopup(true); // Show popup if name or company name is missing
      }

      setLoading(false);
    }

    fetchProfile();
  }, [router, supabase]);

  const handleSubmit = async (name: string, companyName: string) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({ name, company_name: companyName })
      .eq("id", user?.id);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      setShowPopup(false); // Close popup on success
      window.location.reload(); // Refresh the page
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user.
        </div>
      </div>

      {/* Render the modal when showPopup is true */}
      <Modal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
