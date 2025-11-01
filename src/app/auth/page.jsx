"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, target: redirectTo }),
    });

    if (res.ok) {
      window.location.href = `/${redirectTo}`;
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-10 rounded-2xl shadow-xl space-y-4 w-80"
        >
          <h2 className="text-xl font-semibold text-center">
            Enter Password to Access {redirectTo}
          </h2>
          <input
            type="password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded font-semibold"
          >
            Unlock
          </button>
        </form>
      </div>
    </Suspense>
  );
}
