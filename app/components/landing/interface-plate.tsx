"use client";

export default function InterfacePlate() {
  return (
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
  );
}
