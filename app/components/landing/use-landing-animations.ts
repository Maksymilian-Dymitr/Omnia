"use client";

import { useEffect } from "react";

export function useLandingAnimations() {
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
}
