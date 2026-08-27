export type PlanId = "starter" | "business" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
};

export const PLANS: Record<PlanId, Plan> = {
  starter: {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "/mo",
    tagline: "For a single business finding its rhythm",
    features: [
      "One login, one permission model",
      "Run: invoicing, payments, VAT prepared for signature",
      "Client portal and pipeline",
      "Community support",
    ],
  },
  business: {
    id: "business",
    name: "Business",
    price: "$149",
    period: "/mo",
    tagline: "For teams ready to automate the busywork",
    features: [
      "Everything in Starter",
      "Workflow engine and connectors",
      "Assisted mapping and the assistant",
      "Priority support",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For companies that need it their way",
    features: [
      "Everything in Business",
      "Dedicated environment",
      "Custom roles and API access",
      "A named contact",
    ],
  },
};

export const PLAN_ORDER: PlanId[] = ["starter", "business", "enterprise"];

export const DEFAULT_PLAN: PlanId = "business";

export function isPlanId(value: string | undefined): value is PlanId {
  return value === "starter" || value === "business" || value === "enterprise";
}
