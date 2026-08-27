"use client";

import Link from "next/link";

export default function SigninView() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px clamp(20px,5vw,72px)", display: "flex", alignItems: "center", gap: "28px" }}>
          <Link
            href="/"
            style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 500, letterSpacing: ".3em", color: "var(--color-text)", textDecoration: "none" }}
          >
            OMNIA
          </Link>
          <nav style={{ display: "flex", gap: "24px", marginLeft: "auto", fontSize: "13.5px" }}>
            <Link data-underline href="/plans" style={{ color: "var(--color-text)" }}>
              Plans
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,72px)" }}>
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
      </main>
    </div>
  );
}
