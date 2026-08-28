"use client";

import { useRef, useState } from "react";
import { PLANS, type PlanId } from "../lib/plans";
import type { FormState } from "./signup/types";
import Header from "./signup/header";
import StepsIndicator from "./signup/steps-indicator";
import SuccessPanel from "./signup/success-panel";
import StepAccount from "./signup/step-account";
import StepCompany, { TEAM_SIZES, AREAS } from "./signup/step-company";
import StepReview from "./signup/step-review";
import PlanSummary from "./signup/plan-summary";

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
    setStep((s) => Math.min(s + 1, 2));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.reportValidity()) return;
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh" }}>
      <Header />

      <main style={{ maxWidth: "920px", margin: "0 auto", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,72px)" }}>
        {submitted ? (
          <SuccessPanel form={form} plan={plan} />
        ) : (
          <>
            <StepsIndicator step={step} />

            <div className="om-grid-signup" style={{ display: "grid", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
              <form ref={formRef} onSubmit={handleSubmit} key={step} data-hero style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {step === 0 && <StepAccount form={form} update={update} onNext={handleNext} />}
                {step === 1 && <StepCompany form={form} update={update} onNext={handleNext} onBack={handleBack} />}
                {step === 2 && <StepReview form={form} planId={planId} onBack={handleBack} />}
              </form>

              <PlanSummary plan={plan} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
