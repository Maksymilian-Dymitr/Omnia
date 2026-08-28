"use client";

import { useEffect } from "react";

export function useRevealAnimation() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = (el: Element) => el.setAttribute("data-shown", "");
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
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (reduce || r.top < innerHeight * 0.92) reveal(el);
        else io.observe(el);
      });
    const t = setTimeout(watch, 60);
    const iv = setInterval(watch, 1200);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
      io.disconnect();
    };
  }, []);
}
