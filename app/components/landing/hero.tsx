"use client";

import Link from "next/link";

const AREA_NAV = [
  { n: "01", label: "Run", href: "#areas" },
  { n: "02", label: "Grow", href: "#areas" },
  { n: "03", label: "Work", href: "#areas" },
  { n: "04", label: "Automate", href: "#engine" },
  { n: "05", label: "Reports", href: "#areas" },
  { n: "06", label: "Settings", href: "#areas" },
];

export default function Hero() {
  return (
    <section
      className="on-dark"
      style={{
        position: "relative",
        background: "#191817",
        color: "#ece7e0",
        overflow: "hidden",
        borderBottom: "1px solid #d0a45f",
      }}
    >
      <div
        data-ghost
        style={{
          position: "absolute",
          right: "-2vw",
          top: "-6vh",
          fontFamily: "var(--font-heading)",
          fontWeight: 400,
          fontSize: "46vw",
          lineHeight: 0.78,
          color: "transparent",
          WebkitTextStroke: "1px rgba(208,164,95,.22)",
          pointerEvents: "none",
          userSelect: "none",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        06
      </div>

      <div data-progress>
        <i />
      </div>

      <header data-nav style={{ position: "relative", borderBottom: "1px solid rgba(236,231,224,.18)", padding: 0 }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "18px clamp(20px,5vw,72px)",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 500, letterSpacing: ".3em" }}>
            OMNIA
          </span>
          <nav className="om-nav-links">
            <a data-underline href="#areas">The six areas</a>
            <a data-underline href="#engine">Automation</a>
            <a data-underline href="#record">The interface</a>
            <Link data-underline href="/plans">Plans</Link>
          </nav>
          <Link
            href="/signin"
            className="btn hover:bg-[rgba(208,164,95,.14)]"
            style={{ border: "1px solid #d0a45f", color: "#d0a45f", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
          >
            Sign in
          </Link>
        </div>
      </header>

      <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,9vw,120px) clamp(20px,5vw,72px) 0" }}>
        <div
          data-hero
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "12px",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "rgba(236,231,224,.62)",
            marginBottom: "clamp(28px,4vw,48px)",
          }}
        >
          <span data-hairline style={{ width: "52px", height: "1px", background: "#d0a45f" }} />
          <span>A business operating system</span>
        </div>

        <h1
          data-hero-2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "clamp(52px,10vw,146px)",
            lineHeight: 0.94,
            letterSpacing: "-.02em",
            margin: "0 0 0 -.05em",
            maxWidth: "16ch",
          }}
        >
          <span style={{ display: "block" }}>One system to run</span>
          <span style={{ display: "block", color: "#d0a45f" }}>the whole company.</span>
        </h1>

        <div
          className="om-grid-hero-copy"
          style={{
            display: "grid",
            gap: "clamp(24px,5vw,80px)",
            marginTop: "clamp(36px,5vw,64px)",
            alignItems: "end",
          }}
        >
          <p
            data-hero-3
            className="om-justify"
            style={{
              fontSize: "17px",
              lineHeight: 1.66,
              margin: 0,
              color: "rgba(236,231,224,.8)",
              maxWidth: "52ch",
            }}
          >
            Customers, invoicing, payments and tax. The pipeline and the client portal. The boards your team works
            from, the automations that carry work between them, and one record that accounts for all of it. Six areas,
            one ledger, no exports.
          </p>
          <div data-hero-4 style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Link
              href="/plans"
              className="btn hover:bg-[rgba(208,164,95,.14)]"
              style={{ border: "1px solid #d0a45f", color: "#d0a45f", borderRadius: "var(--radius-sm)", padding: "10px 20px", fontSize: "15px", textDecoration: "none" }}
            >
              View plans
            </Link>
            <a
              href="#record"
              className="btn hover:bg-[rgba(236,231,224,.08)]"
              style={{ border: "1px solid rgba(236,231,224,.4)", color: "#ece7e0", borderRadius: "var(--radius-sm)", padding: "10px 20px", fontSize: "15px", textDecoration: "none" }}
            >
              See the interface
            </a>
          </div>
        </div>

        <div
          data-hero-5
          data-ticker
          style={{
            marginTop: "clamp(36px,5vw,64px)",
            fontSize: "13.5px",
            color: "rgba(236,231,224,.72)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <div data-tick data-active>
            <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
            <span>09:14 — Payment matched to invoice #4173, $11,050. Awaiting your approval.</span>
          </div>
          <div data-tick>
            <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
            <span>09:22 — Order intake read a supplier email and drafted 6 lines. Held for review.</span>
          </div>
          <div data-tick>
            <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
            <span>09:31 — Proposal opened in the client portal by Norrland Bygg AB.</span>
          </div>
          <div data-tick>
            <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
            <span>09:40 — VAT return prepared for period 08. One signature outstanding.</span>
          </div>
        </div>

        <div
          data-hero-5
          className="om-grid-hero-nav"
          style={{
            display: "grid",
            borderTop: "1px solid rgba(236,231,224,.28)",
            marginTop: "clamp(44px,6vw,88px)",
          }}
        >
          {AREA_NAV.map((item, idx, arr) => (
            <a
              key={item.n}
              href={item.href}
              data-lift
              style={{
                padding: idx === 0 ? "16px 10px 20px 0" : idx === arr.length - 1 ? "16px 0 20px 10px" : "16px 10px 20px",
                borderRight: idx === arr.length - 1 ? undefined : "1px solid rgba(236,231,224,.16)",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "block", fontSize: "10.5px", letterSpacing: ".18em", color: "rgba(236,231,224,.5)", fontVariantNumeric: "tabular-nums" }}>
                {item.n}
              </span>
              <span style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "19px", marginTop: "4px", color: "#ece7e0" }}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
