"use client";

import { useLandingAnimations } from "./landing/use-landing-animations";
import Splash from "./landing/splash";
import Hero from "./landing/hero";
import Figures from "./landing/figures";
import AreasRegister from "./landing/areas-register";
import InterfacePlate from "./landing/interface-plate";
import AutomationBand from "./landing/automation-band";
import Principle from "./landing/principle";
import Close from "./landing/close";
import Footer from "./landing/footer";

export default function LandingPage() {
  useLandingAnimations();

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}>
      <Splash />
      <Hero />

      <div style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>
          <Figures />
          <AreasRegister />
          <InterfacePlate />
        </div>
      </div>

      <AutomationBand />

      <div style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>
          <Principle />
          <hr style={{ height: "1px", border: 0, margin: 0, background: "var(--color-text)" }} />
          <Close />
          <Footer />
        </div>
      </div>
    </div>
  );
}
