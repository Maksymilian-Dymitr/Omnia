"use client";

export default function Figures() {
  return (
    <section style={{ padding: "clamp(40px,5vw,72px) 0 clamp(34px,4vw,56px)" }}>
      <div className="om-grid-figures" style={{ display: "grid", gap: "32px" }}>
        <div data-figure style={{ borderTop: "2px solid var(--color-accent)", paddingTop: "16px" }}>
          <p
            data-count
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(44px,5vw,74px)",
              lineHeight: 1,
              margin: "0 0 0 -.042em",
              fontVariantNumeric: "tabular-nums",
              color: "var(--color-accent)",
            }}
          >
            6
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
            Areas, one login, one permission model
          </p>
        </div>
        <div data-figure data-delay="1" style={{ borderTop: "1px solid var(--color-text)", paddingTop: "16px" }}>
          <p
            data-count
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(44px,5vw,74px)", lineHeight: 1, margin: "0 0 0 -.129em", fontVariantNumeric: "tabular-nums" }}
          >
            1
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
            Customer record, shared by every area
          </p>
        </div>
        <div data-figure data-delay="2" style={{ borderTop: "1px solid var(--color-text)", paddingTop: "16px" }}>
          <p
            data-count
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(44px,5vw,74px)", lineHeight: 1, margin: "0 0 0 -.042em", fontVariantNumeric: "tabular-nums" }}
          >
            0
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
            Spreadsheets between your tools
          </p>
        </div>
        <div data-figure data-delay="3" style={{ borderTop: "1px solid var(--color-text)", paddingTop: "16px" }}>
          <p
            data-count
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(44px,5vw,74px)", lineHeight: 1, margin: "0 0 0 -.129em", fontVariantNumeric: "tabular-nums" }}
          >
            100%
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
            Of actions written to the audit trail
          </p>
        </div>
      </div>
    </section>
  );
}
