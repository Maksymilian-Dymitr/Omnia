"use client";

export default function Overview({ name, openApprovals }: { name: string; openApprovals: number }) {
  const stats = [
    { value: "$18,240", label: "Outstanding invoices" },
    { value: String(openApprovals), label: "Open approvals" },
    { value: "$64,500", label: "Pipeline value" },
    { value: "1,904", label: "Automations run this month" },
  ];

  return (
    <section id="overview" style={{ padding: "clamp(40px,5vw,64px) 0 clamp(24px,3vw,32px)" }}>
      <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}>
        Prototype
      </span>
      <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.08, margin: 0 }}>
        Welcome back, {name.split(" ")[0]}.
      </h1>
      <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "16px 0 0", maxWidth: "56ch", color: "var(--color-neutral-800)" }}>
        Here&apos;s where the company stands right now — what&apos;s outstanding, what&apos;s moving, and the
        decisions waiting on you. Everything below is a static preview, not live data yet.
      </p>

      <div className="om-grid-figures" style={{ display: "grid", gap: "24px", marginTop: "clamp(32px,4vw,48px)" }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ borderTop: "1px solid var(--color-text)", paddingTop: "14px" }}>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontSize: "clamp(32px,3.6vw,48px)",
                lineHeight: 1,
                margin: 0,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: "12px", lineHeight: 1.4, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "10px 0 0" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
