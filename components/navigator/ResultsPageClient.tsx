"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TradeMatch } from "@/lib/career/types";
import { enrichMatchesWithJobs } from "@/lib/job-dummy-data";
import { SampleJobsBlock } from "./SampleJobsBlock";
import { ResultsUnlockForm } from "./ResultsUnlockForm";
import { useCareer } from "./CareerContext";

function TradeCard({
  match,
  anonymous,
  locked,
  onUnlock,
}: {
  match: TradeMatch;
  anonymous: boolean;
  locked: boolean;
  onUnlock: () => void;
}) {
  const teaserSteps = match.actionPlan.slice(0, 2);
  const isPrimary = match.rank === 1;
  const showFullPlan = !anonymous && !locked;

  return (
    <div
      className={`trade-card rank-${match.rank} animate-in${locked && anonymous ? " trade-card-locked" : ""}${isPrimary && anonymous ? " trade-card-primary-guest" : ""}`}
    >
      <div className="trade-card-header">
        <div>
          {isPrimary ? <div className="recommended-badge">Recommended for you</div> : null}
          <div className="trade-card-name">
            {match.emoji} {match.trade}
          </div>
          <div className="trade-card-salary">
            <strong>{match.salaryRange}/year</strong>
          </div>
        </div>
        <div className="readiness-badge">
          <span className="readiness-num">{match.matchScore}%</span>
          <span className="readiness-label">Match</span>
          <div className="readiness-bar">
            <div className="readiness-fill" data-width={match.matchScore} style={{ width: 0 }} />
          </div>
        </div>
      </div>
      <div className="trade-card-body">
        <div className="trade-why-title">Why this fits you</div>
        <div className="trade-why">{match.whyMatch}</div>
        {!locked ? (
          <>
            <div className="trade-why-title">Skills to build</div>
            <div className="skill-gaps">
              {match.skillGaps.map((g) => (
                <span className="skill-gap-tag" key={g}>
                  ⚡ {g}
                </span>
              ))}
            </div>
            {match.sampleJobs?.length ? <SampleJobsBlock jobs={match.sampleJobs} /> : null}
          </>
        ) : null}
      </div>
      <div className="action-teaser">
        <div className="trade-why-title" style={{ marginBottom: 12 }}>
          {showFullPlan ? "Your full action plan" : "Your action plan — preview"}
        </div>
        <div className={`action-preview${locked && anonymous ? " action-preview-frosted" : ""}`}>
          {(showFullPlan ? match.actionPlan : teaserSteps).map((s) => (
            <div className="action-preview-item" key={s.step}>
              <div className="step-dot">{s.step}</div>
              <span>{s.title}</span>
            </div>
          ))}
          {locked && anonymous ? (
            <div className="frosted-lock-overlay">
              <span className="frosted-lock-icon" aria-hidden>
                🔒
              </span>
              <span>Create an account to unlock</span>
            </div>
          ) : null}
        </div>
        {anonymous && isPrimary ? (
          <button
            type="button"
            className="btn-primary trade-plan-cta"
            onClick={onUnlock}
          >
            See Full Action Plan →
          </button>
        ) : null}
        {anonymous && locked ? (
          <button type="button" className="btn-secondary trade-plan-cta-locked" onClick={onUnlock}>
            🔒 Unlock full plan
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function ResultsPageClient() {
  const router = useRouter();
  const { matches, user, openAuth, bootstrapped } = useCareer();

  useEffect(() => {
    if (!bootstrapped) return;
    if (!matches) {
      router.replace("/navigator/quiz");
    }
  }, [bootstrapped, matches, router]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      document.querySelectorAll(".readiness-fill").forEach((bar) => {
        const w = bar.getAttribute("data-width");
        if (w) (bar as HTMLElement).style.width = `${w}%`;
      });
    }, 100);
    return () => clearTimeout(t);
  }, [matches]);

  const anonymous = !user;
  const enriched = useMemo(() => (matches ? enrichMatchesWithJobs(matches) : null), [matches]);

  if (!bootstrapped || !matches || !enriched) {
    return (
      <div className="nav-page-results nv-animate-in">
        <div className="results-wrap">
          <p style={{ textAlign: "center" }}>Loading…</p>
        </div>
      </div>
    );
  }

  const topMatch = enriched.matches[0];

  return (
    <div className="nav-page-results nv-animate-in">
      <div className="results-wrap">
        <div className="results-header">
          <h2>Your Career Matches</h2>
          <p>Based on your answers</p>
        </div>
        {enriched.matches.map((m, i) => (
          <TradeCard
            key={m.trade}
            match={m}
            anonymous={anonymous}
            locked={anonymous && i > 0}
            onUnlock={() => openAuth("signup")}
          />
        ))}
        {anonymous ? (
          <div className="results-unlock">
            <h3>Your Action Plan is Ready</h3>
            <p className="results-unlock-lead">Create an account to unlock your full roadmap.</p>
            <div className="results-blur-preview" aria-hidden>
              <div className="results-blur-row">
                <span className="results-blur-step">1</span>
                <span>{topMatch.emoji} {topMatch.trade} — first steps</span>
              </div>
              <div className="results-blur-row">
                <span className="results-blur-step">2</span>
                <span>Training & certification path</span>
              </div>
              <div className="results-blur-row">
                <span className="results-blur-step">3</span>
                <span>Apply to New Jersey programs</span>
              </div>
            </div>
            <ResultsUnlockForm />
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/navigator/dashboard" style={{ color: "var(--lime)", fontWeight: 600 }}>
              View your dashboard →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
