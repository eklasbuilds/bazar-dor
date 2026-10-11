import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-start justify-center px-4 py-20">
      <p className="text-sm font-semibold text-terra">৪০৪</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">এই পাতাটি পাওয়া যায়নি</h1>
      <p className="mt-3 leading-7 text-muted">
        আপনি যে পণ্য, ক্যাটাগরি বা লিংক খুঁজছেন সেটির কোনো তথ্য নেই। ঠিকানা মিলিয়ে আবার দেখুন।
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
