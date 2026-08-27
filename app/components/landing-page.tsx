"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // ── splash ──────────────────────────────────────────
    const splash = document.querySelector("[data-splash]");
    if (splash) {
      let seen = false;
      try {
        seen = sessionStorage.getItem("omnia-splash-seen") === "1";
      } catch {}
      const finish = () => {
        if (splash.hasAttribute("data-done")) return;
        splash.setAttribute("data-done", "");
        document.body.removeAttribute("data-splash-on");
        try {
          sessionStorage.setItem("omnia-splash-seen", "1");
        } catch {}
        const g = setTimeout(() => splash.setAttribute("data-gone", ""), 1200);
        cleanups.push(() => clearTimeout(g));
      };
      if (seen || reduce) {
        splash.setAttribute("data-done", "");
        splash.setAttribute("data-gone", "");
      } else {
        document.body.setAttribute("data-splash-on", "");
        const t = setTimeout(finish, 2100);
        const skip = () => finish();
        addEventListener("keydown", skip, { once: true });
        splash.addEventListener("click", skip, { once: true });
        cleanups.push(() => {
          clearTimeout(t);
          removeEventListener("keydown", skip);
        });
      }
    }

    // ── live ticker ─────────────────────────────────────
    const ticks = [...document.querySelectorAll("[data-tick]")];
    if (ticks.length && !reduce) {
      let i = 0;
      const step = () => {
        ticks.forEach((t, k) => {
          t.removeAttribute("data-active");
          t.removeAttribute("data-past");
          if (k === i) t.setAttribute("data-active", "");
          else if (k === (i - 1 + ticks.length) % ticks.length) t.setAttribute("data-past", "");
        });
        i = (i + 1) % ticks.length;
      };
      step();
      const id = setInterval(step, 3600);
      cleanups.push(() => clearInterval(id));
    }

    // ── count-up figures ────────────────────────────────
    const counted = new WeakSet<Element>();
    const countUp = (el: Element) => {
      if (counted.has(el) || reduce) return;
      counted.add(el);
      const raw = el.textContent?.trim() ?? "";
      const m = raw.match(/^(\d+)(\D*)$/);
      if (!m) return;
      const target = parseInt(m[1], 10),
        suffix = m[2] || "";
      if (target === 0) return;
      const dur = 900,
        t0 = performance.now();
      const frame = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = raw;
      };
      el.textContent = "0" + suffix;
      requestAnimationFrame(frame);
    };

    // ── parallax on the ghost numerals + scroll chrome ──
    const ghosts = [...document.querySelectorAll<HTMLElement>("[data-ghost]")];
    const bar = document.querySelector<HTMLElement>("[data-progress] i");
    const nav = document.querySelector("[data-nav]");
    let mx = 0,
      my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    };
    if (!reduce) {
      addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => removeEventListener("mousemove", onMove));
    }
    const onScroll = () => {
      const y = scrollY || document.documentElement.scrollTop || 0;
      if (bar) {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
      }
      if (nav) {
        if (y > 24) nav.setAttribute("data-scrolled", "");
        else nav.removeAttribute("data-scrolled");
      }
      if (!reduce)
        ghosts.forEach((g, k) => {
          const dir = k % 2 ? -1 : 1;
          g.style.transform =
            "translate3d(" +
            (mx * 14 * dir).toFixed(2) +
            "px," +
            (my * 10 + y * 0.05 * dir).toFixed(2) +
            "px,0)";
        });
    };
    addEventListener("scroll", onScroll, { passive: true });
    const raf = setInterval(onScroll, 60);
    cleanups.push(() => {
      removeEventListener("scroll", onScroll);
      clearInterval(raf);
    });
    onScroll();

    const reveal = (el: Element) => {
      el.setAttribute("data-shown", "");
      if (el.hasAttribute("data-count")) countUp(el);
      el.querySelectorAll?.("[data-count]").forEach(countUp);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );
    const watch = () =>
      document
        .querySelectorAll(
          "[data-reveal]:not([data-shown]),[data-figure]:not([data-shown]),[data-plate]:not([data-shown])"
        )
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < innerHeight * 0.92) reveal(el);
          else io.observe(el);
        });
    const t = setTimeout(watch, 60);
    const iv = setInterval(watch, 1200);

    return () => {
      clearTimeout(t);
      clearInterval(iv);
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}>
      {/* ═══ Splash ═══ */}
      <div data-splash>
        <div data-panel="top" />
        <div data-panel="bottom" />
        <div data-splash-body style={{ color: "#ece7e0", fontFamily: "var(--font-body)" }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(38px,7vw,86px)",
              letterSpacing: ".3em",
              lineHeight: 1,
              paddingLeft: ".3em",
            }}
          >
            <span data-letter style={{ animationDelay: "0s" }}>O</span>
            <span data-letter style={{ animationDelay: ".07s" }}>M</span>
            <span data-letter style={{ animationDelay: ".14s" }}>N</span>
            <span data-letter style={{ animationDelay: ".21s" }}>I</span>
            <span data-letter style={{ animationDelay: ".28s" }}>A</span>
          </div>
          <div
            data-splash-rule
            style={{ width: "min(280px,52vw)", height: "1px", background: "#d0a45f", margin: "26px 0 22px" }}
          />
          <div
            style={{
              fontSize: "12px",
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "rgba(236,231,224,.62)",
              animation: "om-fade 1s ease-out .9s both",
            }}
          >
            A business operating system
          </div>
        </div>
      </div>

      {/* ═══ Hero, on the colophon ground ═══ */}
      <section
        className="on-dark"
        style={{
          position: "relative",
          background: "#191817",
          color: "#ece7e0",
          overflow: "hidden",
          borderBottom: "1px solid #d0a45f",
        }}
      >
        <div
          data-ghost
          style={{
            position: "absolute",
            right: "-2vw",
            top: "-6vh",
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "46vw",
            lineHeight: 0.78,
            color: "transparent",
            WebkitTextStroke: "1px rgba(208,164,95,.22)",
            pointerEvents: "none",
            userSelect: "none",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          06
        </div>

        <div data-progress>
          <i />
        </div>

        <header data-nav style={{ position: "relative", borderBottom: "1px solid rgba(236,231,224,.18)", padding: 0 }}>
          <div
            style={{
              maxWidth: "1240px",
              margin: "0 auto",
              padding: "18px clamp(20px,5vw,72px)",
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 500, letterSpacing: ".3em" }}>
              OMNIA
            </span>
            <nav style={{ display: "flex", gap: "24px", marginLeft: "auto", fontSize: "13.5px" }}>
              <a data-underline href="#areas">The six areas</a>
              <a data-underline href="#engine">Automation</a>
              <a data-underline href="#record">The interface</a>
              <Link data-underline href="/plans">Plans</Link>
            </nav>
            <Link
              href="/signin"
              className="btn hover:bg-[rgba(208,164,95,.14)]"
              style={{ border: "1px solid #d0a45f", color: "#d0a45f", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </div>
        </header>

        <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,9vw,120px) clamp(20px,5vw,72px) 0" }}>
          <div
            data-hero
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "12px",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(236,231,224,.62)",
              marginBottom: "clamp(28px,4vw,48px)",
            }}
          >
            <span data-hairline style={{ width: "52px", height: "1px", background: "#d0a45f" }} />
            <span>A business operating system</span>
          </div>

          <h1
            data-hero-2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(52px,10vw,146px)",
              lineHeight: 0.94,
              letterSpacing: "-.02em",
              margin: "0 0 0 -.05em",
              maxWidth: "16ch",
            }}
          >
            <span style={{ display: "block" }}>One system to run</span>
            <span style={{ display: "block", color: "#d0a45f" }}>the whole company.</span>
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
              gap: "clamp(24px,5vw,80px)",
              marginTop: "clamp(36px,5vw,64px)",
              alignItems: "end",
            }}
          >
            <p
              data-hero-3
              style={{
                fontSize: "17px",
                lineHeight: 1.66,
                margin: 0,
                color: "rgba(236,231,224,.8)",
                maxWidth: "52ch",
                textAlign: "justify",
                hyphens: "auto",
              }}
            >
              Customers, invoicing, payments and tax. The pipeline and the client portal. The boards your team works
              from, the automations that carry work between them, and one record that accounts for all of it. Six areas,
              one ledger, no exports.
            </p>
            <div data-hero-4 style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link
                href="/plans"
                className="btn hover:bg-[rgba(208,164,95,.14)]"
                style={{ border: "1px solid #d0a45f", color: "#d0a45f", borderRadius: "var(--radius-sm)", padding: "10px 20px", fontSize: "15px", textDecoration: "none" }}
              >
                View plans
              </Link>
              <a
                href="#record"
                className="btn hover:bg-[rgba(236,231,224,.08)]"
                style={{ border: "1px solid rgba(236,231,224,.4)", color: "#ece7e0", borderRadius: "var(--radius-sm)", padding: "10px 20px", fontSize: "15px", textDecoration: "none" }}
              >
                See the interface
              </a>
            </div>
          </div>

          <div
            data-hero-5
            data-ticker
            style={{
              marginTop: "clamp(36px,5vw,64px)",
              fontSize: "13.5px",
              color: "rgba(236,231,224,.72)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <div data-tick data-active>
              <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
              <span>09:14 — Payment matched to invoice #4173, $11,050. Awaiting your approval.</span>
            </div>
            <div data-tick>
              <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
              <span>09:22 — Order intake read a supplier email and drafted 6 lines. Held for review.</span>
            </div>
            <div data-tick>
              <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
              <span>09:31 — Proposal opened in the client portal by Norrland Bygg AB.</span>
            </div>
            <div data-tick>
              <span data-pulse style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d0a45f", flex: "0 0 7px" }} />
              <span>09:40 — VAT return prepared for period 08. One signature outstanding.</span>
            </div>
          </div>

          <div
            data-hero-5
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,minmax(0,1fr))",
              borderTop: "1px solid rgba(236,231,224,.28)",
              marginTop: "clamp(44px,6vw,88px)",
            }}
          >
            {[
              { n: "01", label: "Run", href: "#areas" },
              { n: "02", label: "Grow", href: "#areas" },
              { n: "03", label: "Work", href: "#areas" },
              { n: "04", label: "Automate", href: "#engine" },
              { n: "05", label: "Reports", href: "#areas" },
              { n: "06", label: "Settings", href: "#areas" },
            ].map((item, idx, arr) => (
              <a
                key={item.n}
                href={item.href}
                data-lift
                style={{
                  padding: idx === 0 ? "16px 10px 20px 0" : idx === arr.length - 1 ? "16px 0 20px 10px" : "16px 10px 20px",
                  borderRight: idx === arr.length - 1 ? undefined : "1px solid rgba(236,231,224,.16)",
                  textDecoration: "none",
                }}
              >
                <span style={{ display: "block", fontSize: "10.5px", letterSpacing: ".18em", color: "rgba(236,231,224,.5)", fontVariantNumeric: "tabular-nums" }}>
                  {item.n}
                </span>
                <span style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "19px", marginTop: "4px", color: "#ece7e0" }}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>
          {/* ═══ Figures ═══ */}
          <section style={{ padding: "clamp(40px,5vw,72px) 0 clamp(34px,4vw,56px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "32px" }}>
              <div data-figure style={{ borderTop: "2px solid var(--color-accent)", paddingTop: "16px" }}>
                <p
                  data-count
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    fontSize: "clamp(44px,5vw,74px)",
                    lineHeight: 1,
                    margin: "0 0 0 -.042em",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--color-accent)",
                  }}
                >
                  6
                </p>
                <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
                  Areas, one login, one permission model
                </p>
              </div>
              <div data-figure data-delay="1" style={{ borderTop: "1px solid var(--color-text)", paddingTop: "16px" }}>
                <p
                  data-count
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(44px,5vw,74px)", lineHeight: 1, margin: "0 0 0 -.129em", fontVariantNumeric: "tabular-nums" }}
                >
                  1
                </p>
                <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
                  Customer record, shared by every area
                </p>
              </div>
              <div data-figure data-delay="2" style={{ borderTop: "1px solid var(--color-text)", paddingTop: "16px" }}>
                <p
                  data-count
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(44px,5vw,74px)", lineHeight: 1, margin: "0 0 0 -.042em", fontVariantNumeric: "tabular-nums" }}
                >
                  0
                </p>
                <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
                  Spreadsheets between your tools
                </p>
              </div>
              <div data-figure data-delay="3" style={{ borderTop: "1px solid var(--color-text)", paddingTop: "16px" }}>
                <p
                  data-count
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(44px,5vw,74px)", lineHeight: 1, margin: "0 0 0 -.129em", fontVariantNumeric: "tabular-nums" }}
                >
                  100%
                </p>
                <p style={{ fontSize: "12.5px", lineHeight: 1.4, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "14px 0 0", maxWidth: "22ch" }}>
                  Of actions written to the audit trail
                </p>
              </div>
            </div>
          </section>

          {/* ═══ The six areas, as a register ═══ */}
          <section id="areas" style={{ padding: "clamp(30px,4vw,52px) 0 clamp(40px,5vw,72px)" }}>
            <div data-reveal style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid var(--color-text)", paddingBottom: "14px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(30px,3.4vw,44px)", margin: 0 }}>
                The register of areas
              </h2>
              <span style={{ fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
                Six, and no seventh
              </span>
            </div>

            {[
              {
                n: "01",
                title: "Run",
                subtitle: "The daily business",
                accent: true,
                desc: "Customers, quotes and invoices, payments matched from the bank feed, VAT prepared for signature, inventory that reserves itself against orders, jobs on a schedule, and support threads attached to the customer they belong to.",
              },
              {
                n: "02",
                title: "Grow",
                subtitle: "Demand and clients",
                desc: "A pipeline that reads from the same customer record as your invoices, a client portal where proposals are read and signed, marketing lists that respect who has already bought, and a forecast built from what is actually committed.",
              },
              {
                n: "03",
                title: "Work",
                subtitle: "Execution and approvals",
                desc: "Boards for the work in front of you, planning for the weeks after it, and one approval queue that every other area raises into — so a held payment and a disputed line arrive in the same place, with the same deadline.",
              },
              {
                n: "04",
                title: "Automate",
                subtitle: "The engine",
                desc: "A workflow engine with connectors to the systems you already pay for, monitoring that tells you what ran and what was held, and AI-assisted mapping that proposes how an incoming document becomes an order — then waits for you.",
              },
              {
                n: "05",
                title: "Reports",
                subtitle: "The account of record",
                desc: "Dashboards for the day, custom tables for the questions nobody anticipated, and compliance exports that carry their own provenance: which definition, which refresh, whose signature, and when.",
              },
              {
                n: "06",
                title: "Settings",
                subtitle: "Authority and access",
                desc: "Billing you can read, roles that map to the six areas rather than to a list of switches, security defaults that start closed, and API access for the parts of your business we have not met yet.",
                last: true,
              },
            ].map((row) => (
              <div
                key={row.n}
                data-row
                data-reveal
                className="hover:bg-[var(--color-accent-100)]"
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(64px,8vw,120px) minmax(0,4fr) minmax(0,6fr)",
                  gap: "clamp(16px,3vw,40px)",
                  alignItems: "start",
                  padding: "26px 0",
                  borderBottom: `1px solid ${row.last ? "var(--color-text)" : "var(--color-divider)"}`,
                }}
              >
                <span
                  data-num
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(34px,4vw,58px)",
                    lineHeight: 0.9,
                    color: row.accent ? "var(--color-accent)" : "var(--color-neutral-400)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {row.n}
                </span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(26px,2.6vw,34px)", margin: 0 }}>
                    {row.title}
                  </h3>
                  <span style={{ fontSize: "12px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
                    {row.subtitle}
                  </span>
                </div>
                <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: 0, color: "var(--color-neutral-800)", textAlign: "justify", hyphens: "auto" }}>
                  {row.desc}
                </p>
              </div>
            ))}
          </section>

          {/* ═══ Interface plate ═══ */}
          <section id="record" style={{ padding: "clamp(30px,4vw,56px) 0 clamp(48px,6vw,88px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)", gap: "28px clamp(24px,5vw,72px)", alignItems: "center" }}>
              <div>
                <span data-reveal style={{ display: "block", fontSize: "12.5px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "18px" }}>
                  The interface
                </span>
                <h2
                  data-reveal
                  data-delay="1"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(32px,3.6vw,48px)", lineHeight: 1.08, margin: 0 }}
                >
                  The whole business on one page, before you touch anything
                </h2>
                <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "22px 0 0", maxWidth: "46ch", color: "var(--color-neutral-800)", textAlign: "justify", hyphens: "auto" }}>
                  Omnia opens on the state of the company: what came in, what is owed, what is due to the tax authority,
                  and the short list of decisions only you can make. Nothing is buried behind a module, and nothing acts
                  without your word.
                </p>
              </div>
              <figure data-plate className="plate" style={{ margin: 0, boxShadow: "var(--shadow-lg)" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/10",
                    background: "var(--color-accent-100)",
                    color: "var(--color-neutral-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  Overview screenshot
                </div>
              </figure>
            </div>
          </section>
        </div>
      </div>

      {/* ═══ Automation band ═══ */}
      <section
        id="engine"
        className="on-dark"
        style={{
          background: "#191817",
          color: "#ece7e0",
          borderTop: "1px solid #d0a45f",
          borderBottom: "1px solid #d0a45f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          data-ghost
          style={{
            position: "absolute",
            left: "-1vw",
            bottom: "-14vh",
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "34vw",
            lineHeight: 0.8,
            color: "transparent",
            WebkitTextStroke: "1px rgba(236,231,224,.1)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          04
        </div>
        <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,7vw,104px) clamp(20px,5vw,72px)" }}>
          <span style={{ display: "block", fontSize: "12.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "#d0a45f", marginBottom: "24px" }}>
            Automation and the assistant
          </span>
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(34px,5.4vw,74px)", lineHeight: 1.02, letterSpacing: "-.015em", margin: 0, maxWidth: "22ch" }}
          >
            Work carries itself.
            <br />
            <span style={{ color: "#d0a45f" }}>Decisions stay yours.</span>
          </h2>
          <div data-reveal style={{ marginTop: "clamp(34px,4vw,56px)", border: "1px solid rgba(236,231,224,.2)", padding: "20px 22px", maxWidth: "760px" }}>
            <svg viewBox="0 0 720 96" width="100%" height="96" style={{ display: "block", overflow: "visible" }}>
              <g fill="none" stroke="rgba(236,231,224,.35)" strokeWidth="1">
                <rect x="1" y="30" width="150" height="36" />
                <rect x="285" y="30" width="150" height="36" />
                <rect x="569" y="30" width="150" height="36" />
              </g>
              <path data-flow-line d="M151 48 H285" fill="none" stroke="#d0a45f" strokeWidth="1.4" />
              <path data-flow-line d="M435 48 H569" fill="none" stroke="#d0a45f" strokeWidth="1.4" />
              <circle data-flow-dot cx="218" cy="48" r="3.2" fill="#d0a45f" />
              <circle data-flow-dot cx="502" cy="48" r="3.2" fill="#d0a45f" />
              <text x="76" y="53" textAnchor="middle" fill="rgba(236,231,224,.86)" fontFamily="var(--font-heading)" fontSize="16">
                Supplier email
              </text>
              <text x="360" y="53" textAnchor="middle" fill="rgba(236,231,224,.86)" fontFamily="var(--font-heading)" fontSize="16">
                Mapped and checked
              </text>
              <text x="644" y="53" textAnchor="middle" fill="rgba(236,231,224,.86)" fontFamily="var(--font-heading)" fontSize="16">
                Order, held for you
              </text>
            </svg>
            <div style={{ fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(236,231,224,.5)", marginTop: "14px" }}>
              Live · workflow 014 · 1,904 runs this month<span data-caret style={{ color: "#d0a45f" }}>_</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", marginTop: "clamp(40px,5vw,72px)", borderTop: "1px solid rgba(236,231,224,.28)" }}>
            <div data-reveal data-delay="1" style={{ padding: "26px 32px 0 0", borderRight: "1px solid rgba(236,231,224,.18)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "23px", margin: 0 }}>Connectors</h3>
              <p style={{ fontSize: "14.5px", lineHeight: 1.62, margin: "14px 0 0", color: "rgba(236,231,224,.78)", textAlign: "justify", hyphens: "auto" }}>
                Mailboxes, webhooks, bank feeds and ledger exports, each with its own credentials, its own retries and
                its own record of what it touched.
              </p>
            </div>
            <div data-reveal data-delay="2" style={{ padding: "26px 32px 0", borderRight: "1px solid rgba(236,231,224,.18)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "23px", margin: 0 }}>Assisted mapping</h3>
              <p style={{ fontSize: "14.5px", lineHeight: 1.62, margin: "14px 0 0", color: "rgba(236,231,224,.78)", textAlign: "justify", hyphens: "auto" }}>
                The engine proposes how a supplier&apos;s fields become yours, shows its confidence for each one, and holds
                anything it is unsure of for a person to confirm.
              </p>
            </div>
            <div data-reveal data-delay="3" style={{ padding: "26px 0 0 32px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "23px", margin: 0 }}>The assistant</h3>
              <p style={{ fontSize: "14.5px", lineHeight: 1.62, margin: "14px 0 0", color: "rgba(236,231,224,.78)", textAlign: "justify", hyphens: "auto" }}>
                Ask what is worth chasing first. It answers from your books, names its sources, proposes the action, and
                stops there until you send it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>
          {/* ═══ Principle ═══ */}
          <section
            style={{
              padding: "clamp(56px,7vw,100px) 0 clamp(48px,6vw,84px)",
              display: "grid",
              gridTemplateColumns: "minmax(0,7fr) minmax(0,3fr)",
              gap: "clamp(24px,5vw,64px)",
              alignItems: "end",
            }}
          >
            <figure style={{ margin: 0 }}>
              <blockquote
                data-reveal
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "clamp(28px,3.8vw,52px)",
                  lineHeight: 1.14,
                  letterSpacing: "-.01em",
                  maxWidth: "34ch",
                  margin: 0,
                  textIndent: "-.34em",
                }}
              >
                &ldquo;A company is easiest to run when one system knows everything and hides nothing.&rdquo;
              </blockquote>
              <figcaption style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--color-neutral-700)", margin: "34px 0 0", textIndent: "-1.104em" }}>
                — The principle Omnia is built on
              </figcaption>
            </figure>
            <div
              data-reveal
              data-delay="2"
              style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "20px", fontSize: "14px", lineHeight: 1.6, color: "var(--color-neutral-700)" }}
            >
              Every figure on every screen can be traced to the record it came from, and every action carries the name
              of the person who took it.
            </div>
          </section>

          <hr style={{ height: "1px", border: 0, margin: 0, background: "var(--color-text)" }} />

          {/* ═══ Close ═══ */}
          <section
            id="access"
            style={{
              padding: "clamp(44px,5vw,76px) 0 clamp(36px,4vw,60px)",
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
              gap: "clamp(24px,5vw,64px)",
              alignItems: "end",
            }}
          >
            <div>
              <h3 data-reveal style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "clamp(28px,3vw,40px)", margin: 0 }}>
                Ready when you are
              </h3>
              <p style={{ fontSize: "15.5px", lineHeight: 1.64, margin: "16px 0 0", maxWidth: "52ch", color: "var(--color-neutral-800)" }}>
                Omnia is in build. Pick the plan that fits your company, or sign in if you already have a seat.
              </p>
            </div>
            <div data-reveal data-delay="2" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/plans"
                className="btn btn-primary"
                style={{ minHeight: "40px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
              >
                View plans
              </Link>
              <Link
                href="/signin"
                className="btn"
                style={{ minHeight: "40px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)", color: "var(--color-text)", textDecoration: "none" }}
              >
                Sign in
              </Link>
            </div>
          </section>

          <footer
            style={{
              borderTop: "1px solid var(--color-divider)",
              padding: "26px 0 48px",
              fontSize: "13px",
              color: "var(--color-neutral-700)",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <span>Omnia — a business operating system. In build, 2026.</span>
            <span style={{ display: "flex", gap: "20px" }}>
              <a href="#areas">The six areas</a>
              <Link href="/plans">Plans</Link>
              <Link href="/signin">Sign in</Link>
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}
