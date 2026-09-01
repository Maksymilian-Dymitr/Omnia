"use client";

const ACTIVITY = [
  { time: "09:14", text: "Payment matched to invoice #4173, $11,050. Awaiting your approval." },
  { time: "09:22", text: "Order intake read a supplier email and drafted 6 lines. Held for review." },
  { time: "09:31", text: "Proposal opened in the client portal by Norrland Bygg AB." },
  { time: "09:40", text: "VAT return prepared for period 08. One signature outstanding." },
  { time: "08:52", text: "Bank feed synced. 14 transactions matched automatically." },
];

export default function ActivityFeed() {
  return (
    <section id="activity" style={{ padding: "clamp(32px,4vw,48px) 0", borderTop: "1px solid var(--color-divider)" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(24px,2.6vw,32px)", margin: 0 }}>
        Recent activity
      </h2>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
        {ACTIVITY.map((event, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              padding: "14px 0",
              borderBottom: i === ACTIVITY.length - 1 ? undefined : "1px solid var(--color-divider)",
            }}
          >
            <span style={{ fontSize: "12.5px", color: "var(--color-neutral-600)", fontVariantNumeric: "tabular-nums", flexShrink: 0, width: "3.5em" }}>
              {event.time}
            </span>
            <span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--color-neutral-800)" }}>{event.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
