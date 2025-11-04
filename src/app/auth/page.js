// app/auth/page.jsx
import AuthContent from "@/page/Auth/AuthContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function AuthPage() {
  return (
    // This is the fix! It tells Next.js to wait for client-side rendering
    // before attempting to access useSearchParams.
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
