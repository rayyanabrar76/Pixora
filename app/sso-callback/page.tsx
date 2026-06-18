"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "#060d1f" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-sm" style={{ color: "rgba(148,163,184,0.7)" }}>Signing you in…</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
