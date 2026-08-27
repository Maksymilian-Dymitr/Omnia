import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plans — Omnia",
  description: "One system, priced for where you are.",
};

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    tagline: "For a single business finding its rhythm",
    features: [
      "One login, one permission model",
      "Run: invoicing, payments, VAT prepared for signature",
      "Client portal and pipeline",
      "Community support",
    ],
    cta: "Choose Starter",
  },
  {
    name: "Business",
    price: "$149",
    period: "/mo",
    tagline: "For teams ready to automate the busywork",
    features: [
      "Everything in Starter",
      "Workflow engine and connectors",
      "Assisted mapping and the assistant",
      "Priority support",
    ],
    cta: "Choose Business",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For companies that need it their way",
    features: [
      "Everything in Business",
      "Dedicated environment",
      "Custom roles and API access",
      "A named contact",
    ],
    cta: "Talk to us",
  },
];

export default function Plans() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh" }}>
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

      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,8vw,104px) clamp(20px,5vw,72px)" }}>
        <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}>
          Plans
        </span>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(38px,5vw,64px)", lineHeight: 1.05, margin: 0, maxWidth: "18ch" }}>
          One system, priced for where you are
        </h1>
        <p style={{ fontSize: "16px", lineHeight: 1.64, margin: "20px 0 0", maxWidth: "56ch", color: "var(--color-neutral-800)" }}>
          Every plan carries the same six areas and the same one ledger. What changes is the automation, the support,
          and how much of the company you run through it.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "24px", marginTop: "clamp(48px,6vw,72px)" }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                border: plan.highlighted ? "1px solid var(--color-accent)" : "1px solid var(--color-divider)",
                background: plan.highlighted ? "var(--color-accent-100)" : "transparent",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <span style={{ fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-accent-700)", minHeight: "1em" }}>
                {plan.highlighted ? "Most chosen" : " "}
              </span>
              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "28px", margin: 0 }}>{plan.name}</h2>
                <p style={{ fontSize: "13.5px", color: "var(--color-neutral-700)", margin: "8px 0 0" }}>{plan.tagline}</p>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "40px", lineHeight: 1 }}>
                {plan.price}
                <span style={{ fontSize: "15px", fontFamily: "var(--font-body)", color: "var(--color-neutral-600)" }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: "14px", lineHeight: 1.5, color: "var(--color-neutral-800)", paddingLeft: "18px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--color-accent)" }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signin"
                className={plan.highlighted ? "btn btn-primary" : "btn"}
                style={{
                  marginTop: "auto",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                  textAlign: "center",
                  border: plan.highlighted ? undefined : "1px solid var(--color-text)",
                  color: plan.highlighted ? undefined : "var(--color-text)",
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>

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
    </div>
  );
}
