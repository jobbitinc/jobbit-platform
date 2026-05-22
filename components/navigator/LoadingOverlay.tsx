"use client";

import { useCareer } from "./CareerContext";
import { useEffect, useState } from "react";

const PROGRESS_TICKS = [10, 22, 34, 48, 58, 68, 78, 86, 92] as const;
const TICK_MS = 380;

function statusForProgress(pct: number): string {
  if (pct < 35) return "Analyzing your answers…";
  if (pct < 65) return "Matching you to skilled trades…";
  if (pct < 90) return "Building your career map…";
  return "Finalizing your matches…";
}

export function LoadingOverlay() {
  const { isMatching } = useCareer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isMatching) {
      setProgress(0);
      return;
    }

    setProgress(PROGRESS_TICKS[0]);
    let tick = 1;

    const interval = window.setInterval(() => {
      if (tick < PROGRESS_TICKS.length) {
        setProgress(PROGRESS_TICKS[tick]);
        tick += 1;
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [isMatching]);

  if (!isMatching) return null;

  const pct = Math.min(progress, 92);
  const status = statusForProgress(pct);

  return (
    <div className="loading-screen active" role="status" aria-live="polite" aria-busy="true">
      <div className="loading-shell">
        <div className="loading-pulse-wrap" aria-hidden>
          <span className="loading-ring r3" />
          <span className="loading-ring r2" />
          <span className="loading-ring r1" />
          <span className="loading-rabbit">🐰</span>
        </div>

        <p className="loading-eyebrow">AI Career Navigator</p>
        <h2 className="loading-heading">Finding your matches</h2>

        <div className="loading-pct-block" aria-label={`${pct} percent complete`}>
          <span className="loading-pct-value">{pct}</span>
          <span className="loading-pct-suffix">%</span>
        </div>

        <p className="loading-status">{status}</p>

        <div className="loading-progress-track" aria-hidden>
          <div className="loading-progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <p className="loading-progress-hint">Hang tight — this usually takes a few seconds</p>
      </div>
    </div>
  );
}
