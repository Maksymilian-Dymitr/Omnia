"use client";

export default function AutomationBand() {
  return (
    <section
      id="engine"
      className="on-dark"
      style={{
        background: "#191817",
        color: "#ece7e0",
        borderTop: "1px solid #d0a45f",
        borderBottom: "1px solid #d0a45f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        data-ghost
        style={{
          position: "absolute",
          left: "-1vw",
          bottom: "-14vh",
          fontFamily: "var(--font-heading)",
          fontWeight: 400,
          fontSize: "34vw",
          lineHeight: 0.8,
          color: "transparent",
          WebkitTextStroke: "1px rgba(236,231,224,.1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        04
      </div>
      <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,7vw,104px) clamp(20px,5vw,72px)" }}>
        <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "#d0a45f", marginBottom: "24px" }}>
          Automation and the assistant
        </span>
        <h2
          data-reveal
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(34px,5.4vw,74px)", lineHeight: 1.02, letterSpacing: "-.015em", margin: 0, maxWidth: "22ch" }}
        >
          Work carries itself.
          <br />
          <span style={{ color: "#d0a45f" }}>Decisions stay yours.</span>
        </h2>
        <div data-reveal style={{ marginTop: "clamp(34px,4vw,56px)", border: "1px solid rgba(236,231,224,.2)", padding: "20px 22px", maxWidth: "760px" }}>
          <div style={{ overflowX: "auto" }}>
            <svg viewBox="0 0 720 96" width="100%" style={{ display: "block", overflow: "visible", aspectRatio: "720/96", height: "auto", minWidth: "480px" }}>
              <g fill="none" stroke="rgba(236,231,224,.35)" strokeWidth="1">
                <rect x="1" y="30" width="150" height="36" />
                <rect x="285" y="30" width="150" height="36" />
                <rect x="569" y="30" width="150" height="36" />
              </g>
              <path data-flow-line d="M151 48 H285" fill="none" stroke="#d0a45f" strokeWidth="1.4" />
              <path data-flow-line d="M435 48 H569" fill="none" stroke="#d0a45f" strokeWidth="1.4" />
              <circle data-flow-dot cx="218" cy="48" r="3.2" fill="#d0a45f" />
              <circle data-flow-dot cx="502" cy="48" r="3.2" fill="#d0a45f" />
              <text x="76" y="53" textAnchor="middle" fill="rgba(236,231,224,.86)" fontFamily="var(--font-heading)" fontSize="16">
                Supplier email
              </text>
              <text x="360" y="53" textAnchor="middle" fill="rgba(236,231,224,.86)" fontFamily="var(--font-heading)" fontSize="16">
                Mapped and checked
              </text>
              <text x="644" y="53" textAnchor="middle" fill="rgba(236,231,224,.86)" fontFamily="var(--font-heading)" fontSize="16">
                Order, held for you
              </text>
            </svg>
          </div>
          <div style={{ fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(236,231,224,.5)", marginTop: "14px" }}>
            Live · workflow 014 · 1,904 runs this month<span data-caret style={{ color: "#d0a45f" }}>_</span>
          </div>
        </div>

        <div className="om-grid-automation" style={{ display: "grid", marginTop: "clamp(40px,5vw,72px)", borderTop: "1px solid rgba(236,231,224,.28)" }}>
          <div data-reveal data-delay="1" style={{ padding: "26px 32px 0 0", borderRight: "1px solid rgba(236,231,224,.18)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "23px", margin: 0 }}>Connectors</h3>
            <p className="om-justify" style={{ fontSize: "14.5px", lineHeight: 1.62, margin: "14px 0 0", color: "rgba(236,231,224,.78)" }}>
              Mailboxes, webhooks, bank feeds and ledger exports, each with its own credentials, its own retries and
              its own record of what it touched.
            </p>
          </div>
          <div data-reveal data-delay="2" style={{ padding: "26px 32px 0", borderRight: "1px solid rgba(236,231,224,.18)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "23px", margin: 0 }}>Assisted mapping</h3>
            <p className="om-justify" style={{ fontSize: "14.5px", lineHeight: 1.62, margin: "14px 0 0", color: "rgba(236,231,224,.78)" }}>
              The engine proposes how a supplier&apos;s fields become yours, shows its confidence for each one, and holds
              anything it is unsure of for a person to confirm.
            </p>
          </div>
          <div data-reveal data-delay="3" style={{ padding: "26px 0 0 32px" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "23px", margin: 0 }}>The assistant</h3>
            <p className="om-justify" style={{ fontSize: "14.5px", lineHeight: 1.62, margin: "14px 0 0", color: "rgba(236,231,224,.78)" }}>
              Ask what is worth chasing first. It answers from your books, names its sources, proposes the action, and
              stops there until you send it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
