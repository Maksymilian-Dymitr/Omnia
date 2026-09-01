"use client";

// PROTOTYPE — the Overview page's content. Session guard and shared
// chrome (icon rail, assistant) now live in dashboard-shell.tsx, used
// by app/dashboard/layout.tsx for every page under /dashboard.

import { useState } from "react";
import { useSession } from "../lib/demo-auth";
import Overview from "./dashboard/overview";
import ActivityFeed from "./dashboard/activity-feed";
import ApprovalsQueue, { INITIAL_APPROVALS, type ApprovalItem } from "./dashboard/approvals-queue";
import AreasGrid from "./dashboard/areas-grid";

export default function DashboardView() {
  const session = useSession();
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);

  const handleApprove = (id: string) =>
    setApprovals((items) => items.map((item) => (item.id === id ? { ...item, status: "approved" } : item)));
  const handleDismiss = (id: string) =>
    setApprovals((items) => items.map((item) => (item.id === id ? { ...item, status: "dismissed" } : item)));

  if (!session) return null;

  const openApprovals = approvals.filter((item) => item.status === "pending").length;

  return (
    <>
      <Overview name={session.name} openApprovals={openApprovals} />
      <ActivityFeed />
      <ApprovalsQueue items={approvals} onApprove={handleApprove} onDismiss={handleDismiss} />
      <AreasGrid />
    </>
  );
}
