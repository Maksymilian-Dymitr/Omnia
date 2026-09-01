"use client";

import type { AreaConfig } from "../../lib/dashboard-areas";

export default function AreaView({ area }: { area: AreaConfig }) {
  return (
    <>
      <div style={{ padding: "clamp(40px,5vw,64px) 0 clamp(24px,3vw,32px)" }}>
        <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}>
          {area.n} · {area.subtitle}
        </span>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.08, margin: 0 }}>
          {area.title}
        </h1>
        <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "16px 0 0", maxWidth: "62ch", color: "var(--color-neutral-800)" }}>
          {area.desc}
        </p>
      </div>

      <section style={{ padding: "clamp(24px,3vw,32px) 0 clamp(32px,4vw,48px)", borderTop: "1px solid var(--color-divider)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(22px,2.4vw,28px)", margin: 0 }}>
          Sections
        </h2>
        <p style={{ fontSize: "13px", color: "var(--color-neutral-600)", margin: "8px 0 0" }}>
          Static previews — not live features yet.
        </p>

        <div className="om-grid-dashboard" style={{ display: "grid", gap: "20px", marginTop: "24px" }}>
          {area.subCategories.map((sub) => (
            <div key={sub.title} style={{ border: "1px solid var(--color-divider)", padding: "22px 20px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "20px", margin: 0 }}>
                {sub.title}
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--color-neutral-700)", margin: "8px 0 0" }}>
                {sub.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
