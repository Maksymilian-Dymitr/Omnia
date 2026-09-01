"use client";

export type ApprovalStatus = "pending" | "approved" | "dismissed";

export type ApprovalItem = {
  id: string;
  title: string;
  detail: string;
  status: ApprovalStatus;
};

export const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: "invoice-4173",
    title: "Invoice #4173 — payment match",
    detail: "$11,050 matched from the bank feed. Confirm to close the invoice.",
    status: "pending",
  },
  {
    id: "supplier-order",
    title: "Supplier order — 6 lines drafted",
    detail: "Order intake read a supplier email and proposed 6 order lines.",
    status: "pending",
  },
  {
    id: "vat-return",
    title: "VAT return — period 08",
    detail: "Prepared and ready. Needs one signature before it's filed.",
    status: "pending",
  },
];

const STATUS_LABEL: Record<Exclude<ApprovalStatus, "pending">, string> = {
  approved: "Approved",
  dismissed: "Dismissed",
};

export default function ApprovalsQueue({
  items,
  onApprove,
  onDismiss,
}: {
  items: ApprovalItem[];
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <section id="approvals" style={{ padding: "clamp(32px,4vw,48px) 0" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(24px,2.6vw,32px)", margin: 0 }}>
        Needs your approval
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid var(--color-divider)",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "18px", margin: 0 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--color-neutral-700)", margin: "6px 0 0" }}>
                {item.detail}
              </p>
            </div>
            {item.status === "pending" ? (
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => onDismiss(item.id)}
                  className="btn"
                  style={{ border: "1px solid var(--color-divider)", color: "var(--color-text)", borderRadius: "var(--radius-sm)" }}
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => onApprove(item.id)}
                  className="btn btn-primary"
                  style={{ borderRadius: "var(--radius-sm)" }}
                >
                  Approve
                </button>
              </div>
            ) : (
              <span
                style={{
                  fontSize: "12px",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: item.status === "approved" ? "var(--color-accent-700)" : "var(--color-neutral-600)",
                  flexShrink: 0,
                }}
              >
                {STATUS_LABEL[item.status]}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
