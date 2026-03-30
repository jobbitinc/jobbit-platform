import Link from "next/link";

export function WaitlistFooter() {
  return (
    <footer className="wl-footer">
      <div className="footer-logo">JOBBIT</div>
      <div className="footer-copy">
        © 2025 Jobbit Inc. — AI Career Navigator for the Skilled Trades ·{" "}
        <Link href="/navigator" style={{ color: "var(--muted)", textDecoration: "underline" }}>
          Career quiz
        </Link>
      </div>
    </footer>
  );
}
