"use client";

// PROTOTYPE — a placeholder landing spot to prove the sign-in/sign-up
// funnel works end-to-end. Not the real product dashboard.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { endSession, getSession, useSession } from "../lib/demo-auth";

// Static preview cards for the dashboard grid — not wired to real data.
const AREAS = [
  { n: "01", title: "Run", desc: "Customers, invoicing, payments and tax." },
  { n: "02", title: "Grow", desc: "The pipeline and the client portal." },
  { n: "03", title: "Work", desc: "Boards, planning and approvals." },
  { n: "04", title: "Automate", desc: "The workflow engine and connectors." },
  { n: "05", title: "Reports", desc: "Dashboards and compliance exports." },
  { n: "06", title: "Settings", desc: "Billing, roles and access." },
];

export default function DashboardView() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    // A fresh, one-off read — not the `session` value above, which reflects
    // the SSR/hydration snapshot (always null) until useSession() resyncs a
    // moment later. Checking that instead would redirect logged-in users too.
    if (!getSession()) {
      router.replace("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    endSession();
    router.push("/");
  };

  if (!session) return null;

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px clamp(20px,5vw,72px)", display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 500, letterSpacing: ".3em" }}>
            OMNIA
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "13.5px", color: "var(--color-neutral-700)" }}>
              {session.name} · {session.company}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="btn"
              style={{ border: "1px solid var(--color-divider)", color: "var(--color-text)", borderRadius: "var(--radius-sm)" }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,72px)" }}>
        <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}>
          Prototype
        </span>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.08, margin: 0 }}>
          Welcome back, {session.name.split(" ")[0]}.
        </h1>
        <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "16px 0 0", maxWidth: "56ch", color: "var(--color-neutral-800)" }}>
          This is a placeholder for the real dashboard — enough to prove the plan-to-signup-to-dashboard funnel works.
          The six areas below are static previews, not live features yet.
        </p>

        <div className="om-grid-dashboard" style={{ display: "grid", gap: "20px", marginTop: "clamp(40px,5vw,64px)" }}>
          {AREAS.map((area) => (
            <div key={area.n} style={{ border: "1px solid var(--color-divider)", padding: "22px 20px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "26px", color: "var(--color-neutral-400)", fontVariantNumeric: "tabular-nums" }}>
                {area.n}
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "22px", margin: "8px 0 0" }}>
                {area.title}
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--color-neutral-700)", margin: "8px 0 0" }}>
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
