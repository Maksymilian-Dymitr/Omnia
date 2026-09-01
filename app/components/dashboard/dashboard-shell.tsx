"use client";

// PROTOTYPE — shared chrome (session guard, icon rail, toggleable
// assistant) for every /dashboard page. Not the real product shell.

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { endSession, getSession, useSession } from "../../lib/demo-auth";
import { isAreaSlug, AREAS } from "../../lib/dashboard-areas";
import IconRail from "./icon-rail";
import AssistantPanel from "./assistant-panel";

const OVERVIEW_GREETING =
  "Here's what's worth chasing first: check your approvals queue for anything waiting on a signature or a payment match.";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    // A fresh, one-off read — not the `session` value above, which reflects
    // the SSR/hydration snapshot (always null) until useSession() resyncs a
    // moment later. Checking that instead would redirect logged-in users too.
    if (!getSession()) {
      router.replace("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    endSession();
    router.push("/");
  };

  if (!session) return null;

  const slug = pathname?.split("/")[2];
  const greeting = isAreaSlug(slug) ? AREAS[slug].assistantGreeting : OVERVIEW_GREETING;

  return (
    <div
      className={showAssistant ? "om-grid-dashboard-shell" : "om-grid-dashboard-shell-solo"}
      style={{ display: "grid", fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh" }}
    >
      <IconRail
        session={session}
        onLogout={handleLogout}
        assistantOpen={showAssistant}
        onToggleAssistant={() => setShowAssistant((v) => !v)}
      />
      {/* key={pathname} remounts the panel per page, so its mock
          conversation resets to the new page's contextual greeting
          instead of keeping stale messages from the previous page. */}
      {showAssistant && <AssistantPanel key={pathname} greeting={greeting} />}

      <main style={{ padding: "0 clamp(20px,4vw,56px) 64px" }}>{children}</main>
    </div>
  );
}
