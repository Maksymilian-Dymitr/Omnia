"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-divider)",
        maxWidth: "1240px",
        margin: "0 auto",
        padding: "26px clamp(20px,5vw,72px) 48px",
        fontSize: "13px",
        color: "var(--color-neutral-700)",
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <span>Omnia — a business operating system. In build, 2026.</span>
      <span style={{ display: "flex", gap: "20px" }}>
        <Link href="/">Home</Link>
        <Link href="/signin">Sign in</Link>
      </span>
    </footer>
  );
}
