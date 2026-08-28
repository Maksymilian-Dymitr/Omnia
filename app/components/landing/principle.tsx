"use client";

export default function Principle() {
  return (
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
  );
}
