"use client";

type Props = {
  open: boolean;
  title: string;
  subtitle: string;
  primaryLabel: string;
  onPrimary: () => void;
  onClose: () => void;
};

export function MilestoneCelebration({ open, title, subtitle, primaryLabel, onPrimary, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="milestone-overlay open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="milestone-card" onClick={(e) => e.stopPropagation()}>
        <div className="milestone-burst" aria-hidden />
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <button type="button" className="btn-primary" onClick={onPrimary}>
          {primaryLabel}
        </button>
        <button type="button" className="milestone-dismiss" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
