"use client";

export default function Intro() {
  return (
    <>
      <span
        data-hero
        style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}
      >
        Plans
      </span>
      <h1
        data-hero-2
        style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(38px,5vw,64px)", lineHeight: 1.05, margin: 0, maxWidth: "18ch" }}
      >
        One system, priced for where you are
      </h1>
      <p data-hero-3 style={{ fontSize: "16px", lineHeight: 1.64, margin: "20px 0 0", maxWidth: "56ch", color: "var(--color-neutral-800)" }}>
        Every plan carries the same six areas and the same one ledger. What changes is the automation, the support,
        and how much of the company you run through it.
      </p>
    </>
  );
}
