"use client";

import { Fragment } from "react";

const STEPS = [
  { n: "01", label: "Account" },
  { n: "02", label: "Company" },
  { n: "03", label: "Review" },
];

export default function StepsIndicator({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "clamp(40px,5vw,64px)" }}>
      {STEPS.map((s, i) => (
        <Fragment key={s.label}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "20px",
                color: i <= step ? "var(--color-accent)" : "var(--color-neutral-400)",
              }}
            >
              {s.n}
            </span>
            <span
              style={{
                fontSize: "13px",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: i <= step ? "var(--color-text)" : "var(--color-neutral-400)",
              }}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <span style={{ flex: 1, height: "1px", background: i < step ? "var(--color-accent)" : "var(--color-divider)", margin: "0 16px" }} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
