"use client";

import { useCareer } from "./CareerContext";
import { useEffect, useRef, useState } from "react";

function statusForProgress(pct: number): string {
  if (pct < 30) return "Analyzing your answers…";
  if (pct < 55) return "Matching you to New Jersey trades…";
  if (pct < 80) return "Building your career map…";
  if (pct < 96) return "Finalizing your matches…";
  return "Almost ready…";
}

/**
 * Smooth progress that keeps moving past ~90% instead of stalling,
 * then snaps to 100% when matching finishes.
 */
export function LoadingOverlay() {
  const { isMatching } = useCareer();
  const [progress, setProgress] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const wasMatching = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (isMatching) {
      wasMatching.current = true;
      setFinishing(false);
      setProgress(8);
      progressRef.current = 8;

      const started = performance.now();
      const id = window.setInterval(() => {
        const elapsed = performance.now() - started;
        // Ease toward 97% over ~8s so the bar keeps moving while the API works
        const target = Math.min(97, 8 + (89 * (1 - Math.exp(-elapsed / 2800))));
        const next = Math.max(progressRef.current, Math.floor(target));
        if (next !== progressRef.current) {
          progressRef.current = next;
          setProgress(next);
        }
      }, 80);

      return () => window.clearInterval(id);
    }

    if (wasMatching.current) {
      wasMatching.current = false;
      setProgress(100);
      setFinishing(true);
      const t = window.setTimeout(() => {
        setFinishing(false);
        setProgress(0);
      }, 280);
      return () => window.clearTimeout(t);
    }

    setProgress(0);
    setFinishing(false);
  }, [isMatching]);

  if (!isMatching && !finishing) return null;

  const pct = Math.min(progress, 100);
  const status = statusForProgress(pct);

  return (
    <div className="loading-screen active" role="status" aria-live="polite" aria-busy={isMatching}>
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

        <p className="loading-progress-hint">Matching New Jersey pathways — usually just a few seconds</p>
      </div>
    </div>
  );
}
