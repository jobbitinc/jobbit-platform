"use client";

type Props = {
  message: string;
  streak?: number;
  onDismiss: () => void;
};

export function RetentionBanner({ message, streak, onDismiss }: Props) {
  return (
    <div className="retention-banner" role="status">
      <div>
        {streak && streak > 1 ? (
          <span className="retention-streak">🔥 {streak} day streak exploring your career</span>
        ) : null}
        <p>{message}</p>
      </div>
      <button type="button" className="retention-dismiss" onClick={onDismiss} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
