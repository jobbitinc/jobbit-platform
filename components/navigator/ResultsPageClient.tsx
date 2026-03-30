"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TradeMatch } from "@/lib/career/types";
import { enrichMatchesWithJobs } from "@/lib/job-dummy-data";
import { SampleJobsBlock } from "./SampleJobsBlock";
import { useCareer } from "./CareerContext";

function TradeCard({
  match,
  anonymous,
  onUnlock,
}: {
  match: TradeMatch;
  anonymous: boolean;
  onUnlock: () => void;
}) {
  const teaserSteps = match.actionPlan.slice(0, 2);
  const rankLabel =
    match.rank === 1 ? "🏆 Best Match" : match.rank === 2 ? "🥈 Strong Match" : "🥉 Good Match";

  return (
    <div className="trade-card">
      <div className="trade-card-header">
        <div>
          <div className="trade-card-rank">{rankLabel}</div>
          <div className="trade-card-name">
            {match.emoji} {match.trade}
          </div>
          <div className="trade-card-salary">
            Average salary: <strong>{match.salaryRange}/year</strong>
          </div>
        </div>
        <div className="readiness-badge">
          <span className="readiness-num">{match.matchScore}%</span>
          <span className="readiness-label">Match score</span>
          <div className="readiness-bar">
            <div className="readiness-fill" data-width={match.matchScore} style={{ width: 0 }} />
          </div>
        </div>
      </div>
      <div className="trade-card-body">
        <div className="trade-why-title">Why this fits you</div>
        <div className="trade-why">{match.whyMatch}</div>
        <div className="trade-why-title">Skills to build</div>
        <div className="skill-gaps">
          {match.skillGaps.map((g) => (
            <span className="skill-gap-tag" key={g}>
              ⚡ {g}
            </span>
          ))}
        </div>
        {match.sampleJobs?.length ? <SampleJobsBlock jobs={match.sampleJobs} /> : null}
      </div>
      <div className="action-teaser">
        <div className="trade-why-title" style={{ marginBottom: 12 }}>
          {anonymous ? "Your action plan — first steps" : "Your full action plan"}
        </div>
        <div className="action-preview">
          {(anonymous ? teaserSteps : match.actionPlan).map((s) => (
            <div className="action-preview-item" key={s.step}>
              <div className="step-dot">{s.step}</div>
              <span>{s.title}</span>
            </div>
          ))}
        </div>
        {anonymous ? (
          <div className="lock-banner">
            <div className="lock-text">
              <strong>
                🔒 {match.actionPlan.length - 2} more steps + full action plan
              </strong>
              <span>Create a free account to unlock your complete plan, track progress, and save your results.</span>
            </div>
            <button type="button" className="btn-primary" style={{ whiteSpace: "nowrap", fontSize: 14, padding: "10px 20px" }} onClick={onUnlock}>
              Unlock Free →
            </button>
          </div>
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

  if (!bootstrapped || !matches) {
    return (
      <div className="nav-page-results nv-animate-in">
        <div className="results-wrap">
          <p style={{ textAlign: "center" }}>Loading…</p>
        </div>
      </div>
    );
  }

  const anonymous = !user;
  const enriched = useMemo(() => enrichMatchesWithJobs(matches), [matches]);

  return (
    <div className="nav-page-results nv-animate-in">
      <div className="results-wrap">
        <div className="results-header">
          <div className="results-header-tag">✓ Match complete</div>
          <h2>Your top trade matches are in.</h2>
          <p>
            {anonymous ? (
              <>
                We found 3 careers that fit your profile. Create a free account to unlock your full 6-step plan and save progress — or browse sample openings below each match.
              </>
            ) : (
              <>
                You&apos;re signed in. View your full tracked plan on the{" "}
                <Link href="/navigator/dashboard" style={{ color: "var(--blue)", fontWeight: 600 }}>
                  dashboard
                </Link>
                .
              </>
            )}
          </p>
        </div>
        {enriched.matches.map((m) => (
          <TradeCard key={m.trade} match={m} anonymous={anonymous} onUnlock={() => openAuth("signup")} />
        ))}
      </div>
    </div>
  );
}
