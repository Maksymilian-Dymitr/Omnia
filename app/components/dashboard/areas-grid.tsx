"use client";

import Link from "next/link";
import { AREA_ORDER, AREAS, type AreaSlug } from "../../lib/dashboard-areas";

// Short card blurbs — the fuller description lives on each area's own page.
const SHORT_DESC: Record<AreaSlug, string> = {
  run: "Customers, invoicing, payments and tax.",
  grow: "The pipeline and the client portal.",
  work: "Boards, planning and approvals.",
  automate: "The workflow engine and connectors.",
  reports: "Dashboards and compliance exports.",
  settings: "Billing, roles and access.",
};

export default function AreasGrid() {
  return (
    <section id="areas" style={{ padding: "clamp(32px,4vw,48px) 0", borderTop: "1px solid var(--color-divider)" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(24px,2.6vw,32px)", margin: 0 }}>
        Your areas
      </h2>
      <p style={{ fontSize: "13px", color: "var(--color-neutral-600)", margin: "8px 0 0" }}>
        Static previews — not live features yet.
      </p>

      <div className="om-grid-dashboard" style={{ display: "grid", gap: "20px", marginTop: "24px" }}>
        {AREA_ORDER.map((slug) => {
          const area = AREAS[slug];
          return (
            <Link
              key={slug}
              href={`/dashboard/${slug}`}
              data-lift
              style={{ display: "block", border: "1px solid var(--color-divider)", padding: "22px 20px", textDecoration: "none", color: "inherit" }}
            >
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "26px", color: "var(--color-neutral-400)", fontVariantNumeric: "tabular-nums" }}>
                {area.n}
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "22px", margin: "8px 0 0" }}>
                {area.title}
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--color-neutral-700)", margin: "8px 0 0" }}>
                {SHORT_DESC[slug]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
