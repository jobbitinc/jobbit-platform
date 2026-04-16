import Image from "next/image";

export function WaitlistNav() {
  return (
    <nav className="wl-nav">
      <a href="/" className="wl-logo-link" aria-label="Jobbit home">
        <Image
          src="/logo.png"
          alt="Jobbit"
          width={240}
          height={48}
          className="wl-logo-img"
          priority
        />
      </a>
      <div className="nav-tag">AI Career Navigator · Skilled Trades</div>
    </nav>
  );
}
