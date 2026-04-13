import Image from "next/image";

export function WaitlistNav() {
  return (
    <nav className="wl-nav">
      <a href="/" className="wl-logo-link" aria-label="Jobbit home">
        <Image
          src="/jobbit-logo.svg"
          alt="Jobbit"
          width={148}
          height={28}
          className="wl-logo-img"
          priority
        />
      </a>
      <div className="nav-tag">AI Career Navigator · Skilled Trades</div>
    </nav>
  );
}
