import type { Metadata } from "next";
import DashboardView from "../components/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard — Omnia",
  description: "Your Omnia dashboard.",
};

export default function Dashboard() {
  return <DashboardView />;
}
