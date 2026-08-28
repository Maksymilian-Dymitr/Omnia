"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--color-divider)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px clamp(20px,5vw,72px)", display: "flex", alignItems: "center", gap: "28px" }}>
        <Link
          href="/"
          style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 500, letterSpacing: ".3em", color: "var(--color-text)", textDecoration: "none" }}
        >
          OMNIA
        </Link>
        <nav style={{ display: "flex", gap: "24px", marginLeft: "auto", fontSize: "13.5px" }}>
          <Link data-underline href="/" style={{ color: "var(--color-text)" }}>
            Home
          </Link>
        </nav>
        <Link
          href="/signin"
          className="btn"
          style={{ border: "1px solid var(--color-text)", color: "var(--color-text)", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
