import Image from "next/image";
import Link from "next/link";

export function WaitlistFooter() {
  return (
    <footer className="wl-footer">
      <Image
        src="/logo.png"
        alt="Jobbit"
        width={240}
        height={48}
        className="wl-footer-logo-img"
      />
      <div className="footer-copy">
        © 2025 Jobbit Inc. — AI Career Navigator for the Skilled Trades ·{" "}
        <Link href="/navigator" style={{ color: "var(--muted)", textDecoration: "underline" }}>
          Career quiz
        </Link>
      </div>
    </footer>
  );
}
