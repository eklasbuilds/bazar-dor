import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <div className="px-4 py-12">
      <Suspense fallback={<div className="mx-auto h-96 max-w-md animate-pulse rounded-3xl bg-sand" />}>
        <AuthForm mode="signin" />
      </Suspense>
    </div>
  );
}
