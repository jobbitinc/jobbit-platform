"use client";

import { useCareer } from "./CareerContext";
import { useEffect, useState } from "react";

const messages = [
  "Analyzing your work style...",
  "Matching you to the best trades...",
  "Calculating readiness scores...",
  "Building your action plans...",
  "Almost ready...",
];

export function LoadingOverlay() {
  const { isMatching } = useCareer();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isMatching) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % messages.length);
    }, 1400);
    return () => clearInterval(t);
  }, [isMatching]);

  if (!isMatching) return null;

  return (
    <div className="loading-screen active">
      <div className="spinner" />
      <div className="loading-title">Analyzing your profile...</div>
      <div className="loading-subs">
        <p className="loading-sub">{messages[idx]}</p>
      </div>
    </div>
  );
}
