import { LoginPageClient } from "@/components/navigator/LoginPageClient";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="nav-landing p-8 text-center">Loading…</div>}>
      <LoginPageClient />
    </Suspense>
  );
}
