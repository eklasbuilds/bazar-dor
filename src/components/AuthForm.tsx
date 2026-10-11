"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Mode = "signin" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const isSignIn = mode === "signin";

  useEffect(() => {
    if (isSignIn && searchParams.get("protected") === "1") {
      toast.error("পণ্যের বিস্তারিত বা প্রোফাইল দেখতে আগে সাইন ইন করুন");
    }
  }, [isSignIn, searchParams]);

  async function onSocial(provider: "google" | "github") {
    setPending(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    setPending(false);
    if (error) {
      const label = provider === "google" ? "গুগল" : "গিটহাব";
      toast.error(error.message || `${label} লগইন এখন সেটআপ করা নেই`);
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (!isSignIn && name.trim().length < 2) {
      toast.error("পুরো নাম লিখুন");
      return;
    }

    setPending(true);
    if (isSignIn) {
      const { error } = await authClient.signIn.email({ email, password });
      setPending(false);
      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড মিলছে না");
        return;
      }
      toast.success("স্বাগতম, সফলভাবে সাইন ইন হয়েছে");
      router.push(searchParams.get("next") || "/");
      router.refresh();
      return;
    }

    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email,
      password,
    });
    setPending(false);
    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-terra">বাজার দর</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{isSignIn ? "সাইন ইন" : "সাইন আপ"}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        {isSignIn
          ? "আপনার অ্যাকাউন্টে ঢুকে পণ্যের বিস্তারিত দাম দেখুন।"
          : "নতুন অ্যাকাউন্ট খুলে বাজার দরের পূর্ণ তথ্য পান।"}
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {isSignIn ? null : (
          <label className="block text-sm font-medium text-ink">
            নাম
            <input
              className="input input-bordered mt-1 w-full bg-white"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="যেমন: রফিক হোসেন"
              autoComplete="name"
              required
            />
          </label>
        )}
        <label className="block text-sm font-medium text-ink">
          ইমেইল
          <input
            className="input input-bordered mt-1 w-full bg-white"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@email.com"
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          পাসওয়ার্ড
          <input
            className="input input-bordered mt-1 w-full bg-white"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            required
          />
        </label>
        <button className="btn btn-primary w-full" type="submit" disabled={pending}>
          {pending ? "অপেক্ষা করুন..." : isSignIn ? "লগইন" : "রেজিস্টার"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid gap-2">
        <button type="button" className="btn btn-outline" disabled={pending} onClick={() => onSocial("google")}>
          Google দিয়ে চালিয়ে যান
        </button>
        <button type="button" className="btn btn-outline" disabled={pending} onClick={() => onSocial("github")}>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="mt-6 text-sm text-muted">
        {isSignIn ? "অ্যাকাউন্ট নেই?" : "আগে থেকেই অ্যাকাউন্ট আছে?"}{" "}
        <Link href={isSignIn ? "/signup" : "/signin"} className="font-semibold text-primary">
          {isSignIn ? "রেজিস্টার করুন" : "লগইন করুন"}
        </Link>
      </p>
    </div>
  );
}
