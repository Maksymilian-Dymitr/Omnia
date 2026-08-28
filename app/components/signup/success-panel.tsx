"use client";

import Link from "next/link";
import type { Plan } from "../../lib/plans";
import type { FormState } from "./types";

export default function SuccessPanel({ form, plan }: { form: FormState; plan: Plan }) {
  return (
    <div key="done" data-hero style={{ maxWidth: "48ch" }}>
      <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}>
        Seat reserved
      </span>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.08, margin: 0 }}>
        You&apos;re set, {form.name.split(" ")[0] || "there"}.
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "20px 0 0", color: "var(--color-neutral-800)" }}>
        {form.company || "Your company"} has a seat on the {plan.name} plan. We&apos;ll write to {form.email} the
        moment it&apos;s ready — starting with {form.priorityArea}, since that&apos;s what you told us matters
        most first.
      </p>
      <div style={{ display: "flex", gap: "12px", marginTop: "36px", flexWrap: "wrap" }}>
        <Link href="/" className="btn btn-primary" style={{ borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
          Back to home
        </Link>
        <Link
          href="/signin"
          className="btn"
          style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)", color: "var(--color-text)", textDecoration: "none" }}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
