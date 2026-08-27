import type { Metadata } from "next";
import { DEFAULT_PLAN, isPlanId } from "../lib/plans";
import SignupView from "../components/signup-view";

export const metadata: Metadata = {
  title: "Get started — Omnia",
  description: "Set up your account and reserve your seat.",
};

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const initialPlan = isPlanId(plan) ? plan : DEFAULT_PLAN;
  return <SignupView initialPlan={initialPlan} />;
}
