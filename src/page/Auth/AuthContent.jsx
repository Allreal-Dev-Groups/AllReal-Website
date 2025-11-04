// app/auth/AuthContent.jsx
'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchClient } from "@/lib/fetchClient";
import { useAdmin } from "@/store/adminStore";

export default function AuthContent() {
  const [password, setPassword] = useState("");
  const { setAdmin} = useAdmin()
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  // The line below is causing the issue during SSR/Prerendering
  const redirectTo = searchParams.get("from") || "/";

  // ... (rest of your component logic remains the same)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchClient("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, target: redirectTo }),
    });

    if (res.ok) {
      window.location.href = `/${redirectTo}`;
      setAdmin(true)
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
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
  );
}