import Image from "next/image";
import Link from "next/link";

export function WaitlistFooter() {
  return (
    <footer className="wl-footer">
      <Image
        src="/logo.png"
        alt="jobbit"
        width={240}
        height={48}
        className="wl-footer-logo-img"
      />
      <p className="footer-copy" style={{ marginBottom: 8 }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "underline" }}>
          Try the Career Navigator
        </Link>
      </p>
      <div className="footer-copy">© 2025 jobbit Inc. — AI Career Navigator for the Skilled Trades</div>
    </footer>
  );
}
