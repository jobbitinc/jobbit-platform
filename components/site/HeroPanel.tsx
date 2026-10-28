import { CheckList } from "./ui";

export function HeroPanel({
  icon,
  title,
  items,
  footer,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="site-float rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-8 shadow-[0_40px_120px_-40px_rgba(47,107,255,0.55)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-ink">{icon}</span>
          <p className="font-display text-lg font-semibold text-white">{title}</p>
        </div>
        <div className="mt-7">
          <CheckList items={items} tone="dark" />
        </div>
        {footer ? <div className="mt-7 border-t border-white/10 pt-5">{footer}</div> : null}
      </div>
    </div>
  );
}
