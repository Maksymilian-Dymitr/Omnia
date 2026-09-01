"use client";

import Link from "next/link";
import { useState } from "react";

type Message = { id: string; from: "assistant" | "user"; text: string };

export default function AssistantPanel({ greeting }: { greeting: string }) {
  const [messages, setMessages] = useState<Message[]>(() => [{ id: "greeting", from: "assistant", text: greeting }]);
  const [draft, setDraft] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, from: "user", text }]);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          from: "assistant",
          text: "Static preview — once this is wired up, I'll answer from your books and name my sources.",
        },
      ]);
    }, 500);
  };

  return (
    <aside style={{ background: "var(--color-accent-100)", borderRight: "1px solid var(--color-divider)" }}>
      <div
        className="om-sticky-col om-scrollable"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span style={{ fontSize: "12.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Assistant
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, overflowY: "auto" }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                maxWidth: "88%",
                background: m.from === "user" ? "var(--color-text)" : "var(--color-bg)",
                color: m.from === "user" ? "var(--color-bg)" : "var(--color-text)",
                border: m.from === "user" ? "none" : "1px solid var(--color-divider)",
                padding: "10px 12px",
                fontSize: "13.5px",
                lineHeight: 1.5,
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "14px 0" }}>
          <Link
            href="/dashboard#approvals"
            className="btn"
            style={{ fontSize: "12px", padding: "6px 12px", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--color-text)" }}
          >
            Review approvals
          </Link>
          <Link
            href="/dashboard#activity"
            className="btn"
            style={{ fontSize: "12px", padding: "6px 12px", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "var(--color-text)" }}
          >
            View activity
          </Link>
        </div>

        <form onSubmit={handleSend} style={{ display: "flex", gap: "8px" }}>
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about your business…"
            style={{ flex: 1, minHeight: "36px", borderRadius: "var(--radius-sm)", fontSize: "13px" }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minHeight: "36px", borderRadius: "var(--radius-sm)", padding: "0 14px" }}
            aria-label="Send"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
          </button>
        </form>
      </div>
    </aside>
  );
}
