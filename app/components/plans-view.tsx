"use client";

import { useRevealAnimation } from "./plans/use-reveal-animation";
import Header from "./plans/header";
import Intro from "./plans/intro";
import PricingGrid from "./plans/pricing-grid";
import Footer from "./plans/footer";

export default function PlansView() {
  useRevealAnimation();

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh" }}>
      <Header />

      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,8vw,104px) clamp(20px,5vw,72px)" }}>
        <Intro />
        <PricingGrid />
      </main>

      <Footer />
    </div>
  );
}
