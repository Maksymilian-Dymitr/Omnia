"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { PLANS, type PlanId } from "../lib/plans";

const STEPS = [
  { n: "01", label: "Account" },
  { n: "02", label: "Company" },
  { n: "03", label: "Review" },
];

const TEAM_SIZES = ["Just me", "2–5", "6–20", "21–50", "51+"];
const AREAS = ["Run", "Grow", "Work", "Automate", "Reports", "Settings"];

type FormState = {
  name: string;
  email: string;
  password: string;
  company: string;
  teamSize: string;
  priorityArea: string;
};

const fieldStyle: React.CSSProperties = { minHeight: "40px", borderRadius: "var(--radius-sm)" };
const labelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--color-neutral-700)" };

export default function SignupView({ initialPlan }: { initialPlan: PlanId }) {
  const [planId] = useState<PlanId>(initialPlan);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    company: "",
    teamSize: TEAM_SIZES[1],
    priorityArea: AREAS[0],
  });
  const formRef = useRef<HTMLFormElement>(null);
  const plan = PLANS[planId];

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleNext = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.reportValidity()) return;
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px clamp(20px,5vw,72px)", display: "flex", alignItems: "center", gap: "28px" }}>
          <Link
            href="/"
            style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 500, letterSpacing: ".3em", color: "var(--color-text)", textDecoration: "none" }}
          >
            OMNIA
          </Link>
          <nav style={{ display: "flex", gap: "24px", marginLeft: "auto", fontSize: "13.5px" }}>
            <Link data-underline href="/plans" style={{ color: "var(--color-text)" }}>
              Plans
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: "920px", margin: "0 auto", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,72px)" }}>
        {submitted ? (
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
        ) : (
          <>
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

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
              <form ref={formRef} onSubmit={handleSubmit} key={step} data-hero style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {step === 0 && (
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
                      <button type="button" onClick={handleNext} className="btn btn-primary" style={{ borderRadius: "var(--radius-sm)" }}>
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {step === 1 && (
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
                    <label style={labelStyle}>
                      Which area matters most first?
                      <select className="input" value={form.priorityArea} onChange={update("priorityArea")} style={fieldStyle}>
                        {AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                      <button
                        type="button"
                        onClick={handleBack}
                        className="btn"
                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)", color: "var(--color-text)" }}
                      >
                        Back
                      </button>
                      <button type="button" onClick={handleNext} className="btn btn-primary" style={{ borderRadius: "var(--radius-sm)" }}>
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "28px", margin: 0 }}>Review</h1>
                    <div style={{ border: "1px solid var(--color-divider)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        ["Name", form.name],
                        ["Email", form.email],
                        ["Company", form.company],
                        ["Team size", form.teamSize],
                        ["Priority area", form.priorityArea],
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
                        onClick={handleBack}
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
                )}
              </form>

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
            </div>
          </>
        )}
      </main>
    </div>
  );
}
