"use client";

import type { PlanId } from "../../lib/plans";
import type { FormState } from "./types";

export default function StepReview({
  form,
  planId,
  onBack,
}: {
  form: FormState;
  planId: PlanId;
  onBack: () => void;
}) {
  return (
    <>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "28px", margin: 0 }}>Review</h1>
      <div style={{ border: "1px solid var(--color-divider)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {[
          ["Name", form.name],
          ["Email", form.email],
          ["Company", form.company],
          ["Team size", form.teamSize],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "var(--color-neutral-600)" }}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <button
          type="button"
          onClick={onBack}
          className="btn"
          style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)", color: "var(--color-text)" }}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary" style={{ borderRadius: "var(--radius-sm)" }}>
          {planId === "enterprise" ? "Request setup" : "Reserve my seat"}
        </button>
      </div>
    </>
  );
}
