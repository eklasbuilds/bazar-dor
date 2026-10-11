import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

export default async function ProfilePage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=/profile&protected=1");

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <p className="text-sm font-semibold text-terra">আমার প্রোফাইল</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{session.user.name}</h1>
      <p className="mt-2 text-muted">{session.user.email}</p>
      <dl className="mt-6 space-y-3 rounded-2xl border border-line bg-white p-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">নাম</dt>
          <dd className="font-medium">{session.user.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">ইমেইল</dt>
          <dd className="font-medium">{session.user.email}</dd>
        </div>
      </dl>
      <Link href="/profile/update" className="btn btn-primary mt-6">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
