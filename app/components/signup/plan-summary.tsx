"use client";

import Link from "next/link";
import type { Plan } from "../../lib/plans";

export default function PlanSummary({ plan }: { plan: Plan }) {
  return (
    <div style={{ border: "1px solid var(--color-divider)", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "22px", margin: 0 }}>{plan.name}</h2>
        <Link href="/plans" data-underline style={{ fontSize: "12px", color: "var(--color-accent-700)" }}>
          Change plan
        </Link>
      </div>
      <p style={{ fontSize: "13px", color: "var(--color-neutral-700)", margin: 0 }}>{plan.tagline}</p>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "32px", lineHeight: 1 }}>
        {plan.price}
        <span style={{ fontSize: "14px", fontFamily: "var(--font-body)", color: "var(--color-neutral-600)" }}>{plan.period}</span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {plan.features.map((f) => (
          <li key={f} style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--color-neutral-800)", paddingLeft: "16px", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "var(--color-accent)" }}>—</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
