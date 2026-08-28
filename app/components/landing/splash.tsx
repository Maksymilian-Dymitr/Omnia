"use client";

export default function Splash() {
  return (
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
  );
}
