"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }
    setSaving(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setSaving(false);
    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("প্রোফাইলের নাম আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  if (isPending) {
    return <div className="mx-auto mt-12 h-64 max-w-md animate-pulse rounded-3xl bg-sand" />;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">তথ্য আপডেট</h1>
      <p className="mt-2 text-sm text-muted">আপনার প্রোফাইলে যে নাম দেখাবে, সেটি এখান থেকে বদলান।</p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-ink">
          নাম
          <input
            className="input input-bordered mt-1 w-full bg-white"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <button className="btn btn-primary w-full" type="submit" disabled={saving}>
          {saving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}
