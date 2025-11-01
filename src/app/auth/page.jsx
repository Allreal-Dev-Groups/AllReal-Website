// app/auth/page.jsx
import { Suspense } from 'react';
import AuthContent from './AuthContent'; // Import the new component

export const dynamic = 'force-dynamic';

export default function AuthPage() {
  return (
    // This is the fix! It tells Next.js to wait for client-side rendering
    // before attempting to access useSearchParams.
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}