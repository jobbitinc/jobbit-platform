"use client";

export function BottomCta() {
  return (
    <section className="bottom-cta">
      <h2>
        DON&apos;T WAIT—<span className="bottom-cta-accent">SIGN UP NOW</span>
      </h2>
      <p>
        Early waitlist members get priority access, exclusive career insights, and first pick of apprenticeship matches in their area.
      </p>
      <button
        type="button"
        className="bottom-btn"
        onClick={() => {
          document.querySelector(".hero")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Join the Waitlist →
      </button>
    </section>
  );
}
