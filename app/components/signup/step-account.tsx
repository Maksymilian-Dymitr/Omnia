"use client";

import { fieldStyle, labelStyle } from "./field-styles";
import type { FormState, UpdateFn } from "./types";

export default function StepAccount({
  form,
  update,
  onNext,
}: {
  form: FormState;
  update: UpdateFn;
  onNext: () => void;
}) {
  return (
    <>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "28px", margin: 0 }}>Your account</h1>
      <label style={labelStyle}>
        Full name
        <input className="input" required value={form.name} onChange={update("name")} placeholder="Alex Rivera" style={fieldStyle} />
      </label>
      <label style={labelStyle}>
        Work email
        <input
          className="input"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="you@company.com"
          style={fieldStyle}
        />
      </label>
      <label style={labelStyle}>
        Password
        <input
          className="input"
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={update("password")}
          placeholder="At least 8 characters"
          style={fieldStyle}
        />
      </label>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
        <button type="button" onClick={onNext} className="btn btn-primary" style={{ borderRadius: "var(--radius-sm)" }}>
          Continue
        </button>
      </div>
    </>
  );
}
