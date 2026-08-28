"use client";

import Header from "./signin/header";
import SigninForm from "./signin/signin-form";

export default function SigninView() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-text)", background: "var(--color-bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,72px)" }}>
        <SigninForm />
      </main>
    </div>
  );
}
