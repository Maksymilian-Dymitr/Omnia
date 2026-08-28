"use client";

import Link from "next/link";

export default function Close() {
  return (
    <section
      id="access"
      style={{
        padding: "clamp(44px,5vw,76px) 0 clamp(36px,4vw,60px)",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        gap: "clamp(24px,5vw,64px)",
        alignItems: "end",
      }}
    >
      <div>
        <h3 data-reveal style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(28px,3vw,40px)", margin: 0 }}>
          Ready when you are
        </h3>
        <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "16px 0 0", maxWidth: "52ch", color: "var(--color-neutral-800)" }}>
          Omnia is in build. Pick the plan that fits your company, or sign in if you already have a seat.
        </p>
      </div>
      <div data-reveal data-delay="2" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link
          href="/plans"
          className="btn btn-primary"
          style={{ minHeight: "40px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
        >
          View plans
        </Link>
        <Link
          href="/signin"
          className="btn"
          style={{ minHeight: "40px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)", color: "var(--color-text)", textDecoration: "none" }}
        >
          Sign in
        </Link>
      </div>
    </section>
  );
}
