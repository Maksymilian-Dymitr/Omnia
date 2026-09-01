"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "../../lib/demo-auth";
import { AREA_ORDER, AREAS, type AreaSlug } from "../../lib/dashboard-areas";

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const AREA_ICONS: Record<AreaSlug, React.ReactNode> = {
  run: (
    <svg {...ICON_PROPS}>
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M15 2v5h5" />
      <line x1="9" y1="13" x2="17" y2="13" />
      <line x1="9" y1="17" x2="17" y2="17" />
    </svg>
  ),
  grow: (
    <svg {...ICON_PROPS}>
      <polyline points="3,17 9,11 13,15 21,7" />
      <polyline points="14,7 21,7 21,14" />
    </svg>
  ),
  work: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="13" x2="17" y2="13" />
      <line x1="7" y1="17" x2="13" y2="17" />
    </svg>
  ),
  automate: (
    <svg {...ICON_PROPS}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6h10M6.5 7.5L11 16.5M17.5 7.5L13 16.5" />
    </svg>
  ),
  reports: (
    <svg {...ICON_PROPS}>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="12" width="3" height="8" />
      <rect x="11" y="7" width="3" height="13" />
      <rect x="16" y="15" width="3" height="5" />
    </svg>
  ),
  settings: (
    <svg {...ICON_PROPS}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="15" cy="6" r="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="9" cy="12" r="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  ),
};

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  ...AREA_ORDER.map((slug) => ({
    href: `/dashboard/${slug}`,
    label: AREAS[slug].title,
    icon: AREA_ICONS[slug],
  })),
];

export default function IconRail({
  session,
  onLogout,
  assistantOpen,
  onToggleAssistant,
}: {
  session: Session;
  onLogout: () => void;
  assistantOpen: boolean;
  onToggleAssistant: () => void;
}) {
  const pathname = usePathname();
  const initials = session.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside style={{ background: "#191817" }}>
      <div
        className="om-sticky-col om-rail-sticky"
        style={{
          color: "rgba(236,231,224,.7)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "18px 0",
          gap: "16px",
        }}
      >
        <span
          data-tooltip={`${session.name} · ${session.company}`}
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#d0a45f",
            color: "#191817",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: ".02em",
            cursor: "default",
          }}
        >
          {initials}
        </span>

        <button
          type="button"
          onClick={onToggleAssistant}
          data-tooltip={assistantOpen ? "Close assistant" : "Open assistant"}
          style={{
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: assistantOpen ? "rgba(208,164,95,.18)" : "transparent",
            color: assistantOpen ? "#d0a45f" : "inherit",
            cursor: "pointer",
            marginBottom: "8px",
          }}
          className="hover:bg-[rgba(236,231,224,.1)] hover:text-[#d0a45f]"
        >
          <svg {...ICON_PROPS}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        <nav className="om-rail-nav" style={{ display: "flex", gap: "4px", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-tooltip={item.label}
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-sm)",
                  color: active ? "#d0a45f" : "inherit",
                  background: active ? "rgba(208,164,95,.18)" : "transparent",
                  textDecoration: "none",
                }}
                className="hover:bg-[rgba(236,231,224,.1)] hover:text-[#d0a45f]"
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onLogout}
          data-tooltip="Log out"
          style={{
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
          className="hover:bg-[rgba(236,231,224,.1)] hover:text-[#d0a45f]"
        >
          <svg {...ICON_PROPS}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
