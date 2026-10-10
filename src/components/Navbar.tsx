"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PriceTicker from "@/components/PriceTicker";
import { authClient } from "@/lib/auth-client";
import { banglaDate } from "@/lib/format";
import type { Category, Product } from "@/lib/types";

export default function Navbar({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  async function signOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <span className="block text-xl font-bold tracking-tight text-ink sm:text-2xl">🛒 বাজার দর</span>
          <span className="block truncate text-xs text-muted sm:text-sm">{banglaDate()}</span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          {isPending ? (
            <div className="h-10 w-40 animate-pulse rounded-full bg-sand" />
          ) : session?.user ? (
            <>
              <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md">
                {session.user.name || "আমার প্রোফাইল"}
              </Link>
              <button type="button" className="btn btn-primary btn-sm sm:btn-md" onClick={signOut}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm sm:hidden"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          মেনু
        </button>
      </div>

      {menuOpen ? (
        <div className="flex flex-col gap-2 border-t border-line px-4 py-3 sm:hidden">
          {session?.user ? (
            <>
              <Link href="/profile" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                আমার প্রোফাইল
              </Link>
              <button type="button" className="btn btn-primary" onClick={signOut}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      ) : null}

      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3" aria-label="পণ্যের ধরন">
        <Link href="/" className={`category-link ${pathname === "/" ? "active" : ""}`}>
          হোম
        </Link>
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          return (
            <Link
              key={category.slug}
              href={href}
              className={`category-link ${pathname === href ? "active" : ""}`}
            >
              <span aria-hidden>{category.icon}</span>
              {category.nameBn}
            </Link>
          );
        })}
      </nav>
      <PriceTicker products={products} />
    </header>
  );
}
