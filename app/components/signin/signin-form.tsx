"use client";

import Link from "next/link";

export default function SigninForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ width: "100%", maxWidth: "380px", border: "1px solid var(--color-divider)", padding: "clamp(32px,4vw,44px)", display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "32px", margin: 0 }}>Sign in</h1>
        <p style={{ fontSize: "14px", color: "var(--color-neutral-700)", margin: "10px 0 0" }}>
          Use the seat you were given when your plan was set up.
        </p>
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--color-neutral-700)" }}>
        Email
        <input className="input" type="email" required placeholder="you@company.com" style={{ minHeight: "40px", borderRadius: "var(--radius-sm)" }} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--color-neutral-700)" }}>
        Password
        <input className="input" type="password" required placeholder="••••••••" style={{ minHeight: "40px", borderRadius: "var(--radius-sm)" }} />
      </label>

      <button type="submit" className="btn btn-primary" style={{ minHeight: "40px", borderRadius: "var(--radius-sm)", marginTop: "8px" }}>
        Sign in
      </button>

      <p style={{ fontSize: "13px", color: "var(--color-neutral-700)", margin: 0, textAlign: "center" }}>
        No seat yet? <Link href="/plans">View plans</Link>
      </p>
    </form>
  );
}
