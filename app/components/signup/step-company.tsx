"use client";

import { fieldStyle, labelStyle } from "./field-styles";
import type { FormState, UpdateFn } from "./types";

export const TEAM_SIZES = ["Just me", "2–5", "6–20", "21–50", "51+"];

export default function StepCompany({
  form,
  update,
  onNext,
  onBack,
}: {
  form: FormState;
  update: UpdateFn;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "28px", margin: 0 }}>Your company</h1>
      <label style={labelStyle}>
        Company name
        <input
          className="input"
          required
          value={form.company}
          onChange={update("company")}
          placeholder="Norrland Bygg AB"
          style={fieldStyle}
        />
      </label>
      <label style={labelStyle}>
        Team size
        <select className="input" value={form.teamSize} onChange={update("teamSize")} style={fieldStyle}>
          {TEAM_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <button
          type="button"
          onClick={onBack}
          className="btn"
          style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)", color: "var(--color-text)" }}
        >
          Back
        </button>
        <button type="button" onClick={onNext} className="btn btn-primary" style={{ borderRadius: "var(--radius-sm)" }}>
          Continue
        </button>
      </div>
    </>
  );
}
