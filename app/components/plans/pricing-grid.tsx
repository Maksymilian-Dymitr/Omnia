"use client";

import Link from "next/link";
import { PLAN_ORDER, PLANS } from "../../lib/plans";

const ctaLabel: Record<string, string> = {
  starter: "Choose Starter",
  business: "Choose Business",
  enterprise: "Talk to us",
};

const highlighted = "business";
const delayById: Record<string, string | undefined> = { starter: undefined, business: "1", enterprise: "2" };

export default function PricingGrid() {
  return (
    <div className="om-grid-pricing" style={{ display: "grid", gap: "24px", marginTop: "clamp(48px,6vw,72px)" }}>
      {PLAN_ORDER.map((id) => {
        const plan = PLANS[id];
        const isHighlighted = id === highlighted;
        return (
          <div
            key={plan.id}
            data-reveal
            data-lift
            data-delay={delayById[id]}
            style={{
              border: isHighlighted ? "1px solid var(--color-accent)" : "1px solid var(--color-divider)",
              background: isHighlighted ? "var(--color-accent-100)" : "transparent",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <span style={{ fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-accent-700)", minHeight: "1em" }}>
              {isHighlighted ? "Most chosen" : " "}
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
              href={`/signup?plan=${plan.id}`}
              className={isHighlighted ? "btn btn-primary" : "btn"}
              style={{
                marginTop: "auto",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                textAlign: "center",
                border: isHighlighted ? undefined : "1px solid var(--color-text)",
                color: isHighlighted ? undefined : "var(--color-text)",
              }}
            >
              {ctaLabel[id]}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
