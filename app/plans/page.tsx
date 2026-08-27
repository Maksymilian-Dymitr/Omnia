import type { Metadata } from "next";
import PlansView from "../components/plans-view";

export const metadata: Metadata = {
  title: "Plans — Omnia",
  description: "One system, priced for where you are.",
};

export default function Plans() {
  return <PlansView />;
}
