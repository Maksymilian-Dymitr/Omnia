export type AreaSlug = "run" | "grow" | "work" | "automate" | "reports" | "settings";

export type SubCategory = {
  title: string;
  desc: string;
};

export type AreaConfig = {
  slug: AreaSlug;
  n: string;
  title: string;
  subtitle: string;
  desc: string;
  assistantGreeting: string;
  subCategories: SubCategory[];
};

export const AREAS: Record<AreaSlug, AreaConfig> = {
  run: {
    slug: "run",
    n: "01",
    title: "Run",
    subtitle: "The daily business",
    desc: "Customers, quotes and invoices, payments matched from the bank feed, VAT prepared for signature, inventory that reserves itself against orders, jobs on a schedule, and support threads attached to the customer they belong to.",
    assistantGreeting: "Ask about customers, invoicing, payments or tax.",
    subCategories: [
      { title: "Customers", desc: "One record per customer, shared by every area." },
      { title: "Invoicing & quotes", desc: "Quotes that become invoices without re-entry." },
      { title: "Payments", desc: "Matched from the bank feed automatically." },
      { title: "Tax (VAT)", desc: "Prepared and held for your signature each period." },
      { title: "Inventory", desc: "Reserves itself against open orders." },
      { title: "Jobs & support", desc: "Scheduled work and threads tied to the customer." },
    ],
  },
  grow: {
    slug: "grow",
    n: "02",
    title: "Grow",
    subtitle: "Demand and clients",
    desc: "A pipeline that reads from the same customer record as your invoices, a client portal where proposals are read and signed, marketing lists that respect who has already bought, and a forecast built from what is actually committed.",
    assistantGreeting: "Ask about the pipeline, proposals or the forecast.",
    subCategories: [
      { title: "Pipeline", desc: "Reads from the same customer record as your invoices." },
      { title: "Client portal", desc: "Where proposals are opened, read and signed." },
      { title: "Marketing lists", desc: "Respect who has already bought." },
      { title: "Forecast", desc: "Built from what is actually committed." },
    ],
  },
  work: {
    slug: "work",
    n: "03",
    title: "Work",
    subtitle: "Execution and approvals",
    desc: "Boards for the work in front of you, planning for the weeks after it, and one approval queue that every other area raises into — so a held payment and a disputed line arrive in the same place, with the same deadline.",
    assistantGreeting: "Ask what's on the boards or waiting for approval.",
    subCategories: [
      { title: "Boards", desc: "The work in front of you, in one place." },
      { title: "Planning", desc: "The weeks after the work in front of you." },
      { title: "Approvals", desc: "One queue every other area raises into." },
    ],
  },
  automate: {
    slug: "automate",
    n: "04",
    title: "Automate",
    subtitle: "The engine",
    desc: "A workflow engine with connectors to the systems you already pay for, monitoring that tells you what ran and what was held, and AI-assisted mapping that proposes how an incoming document becomes an order — then waits for you.",
    assistantGreeting: "Ask about workflows, connectors or what's been held.",
    subCategories: [
      { title: "Connectors", desc: "To the systems you already pay for." },
      { title: "Assisted mapping", desc: "Proposes how a document becomes an order." },
      { title: "Monitoring", desc: "What ran, and what was held for review." },
      { title: "Workflow runs", desc: "A history of every automation, start to finish." },
    ],
  },
  reports: {
    slug: "reports",
    n: "05",
    title: "Reports",
    subtitle: "The account of record",
    desc: "Dashboards for the day, custom tables for the questions nobody anticipated, and compliance exports that carry their own provenance: which definition, which refresh, whose signature, and when.",
    assistantGreeting: "Ask about dashboards, custom tables or compliance exports.",
    subCategories: [
      { title: "Dashboards", desc: "For the day, at a glance." },
      { title: "Custom tables", desc: "For the questions nobody anticipated." },
      { title: "Compliance exports", desc: "Carry their own provenance and signature." },
    ],
  },
  settings: {
    slug: "settings",
    n: "06",
    title: "Settings",
    subtitle: "Authority and access",
    desc: "Billing you can read, roles that map to the six areas rather than to a list of switches, security defaults that start closed, and API access for the parts of your business we have not met yet.",
    assistantGreeting: "Ask about billing, roles, security or API access.",
    subCategories: [
      { title: "Billing", desc: "Clear, and yours to read at any time." },
      { title: "Roles & access", desc: "Map to the six areas, not a list of switches." },
      { title: "Security", desc: "Defaults that start closed." },
      { title: "API access", desc: "For the parts of your business we haven't met yet." },
    ],
  },
};

export const AREA_ORDER: AreaSlug[] = ["run", "grow", "work", "automate", "reports", "settings"];

export function isAreaSlug(value: string | undefined): value is AreaSlug {
  return !!value && value in AREAS;
}
