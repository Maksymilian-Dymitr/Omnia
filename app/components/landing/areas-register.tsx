"use client";

const AREAS = [
  {
    n: "01",
    title: "Run",
    subtitle: "The daily business",
    accent: true,
    desc: "Customers, quotes and invoices, payments matched from the bank feed, VAT prepared for signature, inventory that reserves itself against orders, jobs on a schedule, and support threads attached to the customer they belong to.",
  },
  {
    n: "02",
    title: "Grow",
    subtitle: "Demand and clients",
    desc: "A pipeline that reads from the same customer record as your invoices, a client portal where proposals are read and signed, marketing lists that respect who has already bought, and a forecast built from what is actually committed.",
  },
  {
    n: "03",
    title: "Work",
    subtitle: "Execution and approvals",
    desc: "Boards for the work in front of you, planning for the weeks after it, and one approval queue that every other area raises into — so a held payment and a disputed line arrive in the same place, with the same deadline.",
  },
  {
    n: "04",
    title: "Automate",
    subtitle: "The engine",
    desc: "A workflow engine with connectors to the systems you already pay for, monitoring that tells you what ran and what was held, and AI-assisted mapping that proposes how an incoming document becomes an order — then waits for you.",
  },
  {
    n: "05",
    title: "Reports",
    subtitle: "The account of record",
    desc: "Dashboards for the day, custom tables for the questions nobody anticipated, and compliance exports that carry their own provenance: which definition, which refresh, whose signature, and when.",
  },
  {
    n: "06",
    title: "Settings",
    subtitle: "Authority and access",
    desc: "Billing you can read, roles that map to the six areas rather than to a list of switches, security defaults that start closed, and API access for the parts of your business we have not met yet.",
    last: true,
  },
];

export default function AreasRegister() {
  return (
    <section id="areas" style={{ padding: "clamp(30px,4vw,52px) 0 clamp(40px,5vw,72px)" }}>
      <div data-reveal style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid var(--color-text)", paddingBottom: "14px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(30px,3.4vw,44px)", margin: 0 }}>
          The register of areas
        </h2>
        <span style={{ fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
          Six, and no seventh
        </span>
      </div>

      {AREAS.map((row) => (
        <div
          key={row.n}
          data-row
          data-reveal
          className="om-grid-area-row hover:bg-[var(--color-accent-100)]"
          style={{
            display: "grid",
            gap: "clamp(16px,3vw,40px)",
            alignItems: "start",
            padding: "26px 0",
            borderBottom: `1px solid ${row.last ? "var(--color-text)" : "var(--color-divider)"}`,
          }}
        >
          <span
            data-num
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(34px,4vw,58px)",
              lineHeight: 0.9,
              color: row.accent ? "var(--color-accent)" : "var(--color-neutral-400)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.n}
          </span>
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(26px,2.6vw,34px)", margin: 0 }}>
              {row.title}
            </h3>
            <span style={{ fontSize: "12px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
              {row.subtitle}
            </span>
          </div>
          <p className="om-justify" style={{ fontSize: "15.5px", lineHeight: 1.64, margin: 0, color: "var(--color-neutral-800)" }}>
            {row.desc}
          </p>
        </div>
      ))}
    </section>
  );
}
