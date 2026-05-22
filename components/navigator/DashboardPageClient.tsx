"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enrichMatchesWithJobs } from "@/lib/job-dummy-data";
import {
  computeStreak,
  getRetention,
  markCelebrated,
  markReturnPromptShown,
  recordVisit,
  shouldShowReturnPrompt,
} from "@/lib/retention-storage";
import { SampleJobsBlock } from "./SampleJobsBlock";
import { MilestoneCelebration } from "./MilestoneCelebration";
import { RetentionBanner } from "./RetentionBanner";
import { useCareer } from "./CareerContext";

export function DashboardPageClient() {
  const router = useRouter();
  const { user, matches, completedSteps, activeTradeTab, setActiveTradeTab, toggleStep, showToast, bootstrapped } =
    useCareer();
  const [returnMsg, setReturnMsg] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [milestone, setMilestone] = useState<50 | 100 | null>(null);
  const prevPct = useRef(0);

  useEffect(() => {
    if (!bootstrapped) return;
    if (!user) {
      router.replace("/navigator/login?next=/navigator/dashboard");
    }
  }, [bootstrapped, user, router]);

  useEffect(() => {
    if (!bootstrapped) return;
    if (!matches && user) {
      router.replace("/navigator/quiz");
    }
  }, [bootstrapped, matches, router, user]);

  const enriched = useMemo(() => (matches ? enrichMatchesWithJobs(matches) : null), [matches]);

  useEffect(() => {
    if (!user?.id || !matches) return;
    const record = recordVisit(user.id);
    setStreak(computeStreak(record.visitDays));
    const prompt = shouldShowReturnPrompt(record, matches.matches[0]?.trade);
    if (prompt?.show) {
      setReturnMsg(prompt.message);
      markReturnPromptShown(user.id, prompt.day);
    }
  }, [user?.id, matches]);

  useEffect(() => {
    if (!user?.id || !enriched) return;
    const totalSteps = enriched.matches.reduce((sum, m) => sum + m.actionPlan.length, 0);
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    const pct = totalSteps > 0 ? completedCount / totalSteps : 0;
    const retention = getRetention(user.id);

    if (pct >= 0.5 && prevPct.current < 0.5 && retention && !retention.celebrated50) {
      setMilestone(50);
      markCelebrated(user.id, 50);
    }
    if (pct >= 1 && prevPct.current < 1 && retention && !retention.celebrated100) {
      setMilestone(100);
      markCelebrated(user.id, 100);
    }
    prevPct.current = pct;
  }, [completedSteps, enriched, user?.id]);

  if (!bootstrapped || !user || !matches || !enriched) {
    return (
      <div className="nav-page-dashboard nv-animate-in">
        <div className="dashboard-wrap">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  const totalSteps = enriched.matches.reduce((sum, m) => sum + m.actionPlan.length, 0);
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  const featured = enriched.matches[0];
  const match = enriched.matches[activeTradeTab];
  const steps = match.actionPlan;
  const doneCount = steps.filter((_, i) => completedSteps[`${activeTradeTab}-${i}`]).length;

  return (
    <div className="nav-page-dashboard nv-animate-in">
      <MilestoneCelebration
        open={milestone === 50}
        title="Halfway there. Keep going."
        subtitle="You have completed 50% of your action plan steps. Every checkbox gets you closer to your trade career."
        primaryLabel="Keep going"
        onPrimary={() => setMilestone(null)}
        onClose={() => setMilestone(null)}
      />
      <MilestoneCelebration
        open={milestone === 100}
        title="Plan complete!"
        subtitle={`You finished your ${match.trade} action plan. Ready to explore your #2 match?`}
        primaryLabel="Explore your #2 match →"
        onPrimary={() => {
          setActiveTradeTab(1);
          setMilestone(null);
        }}
        onClose={() => setMilestone(null)}
      />

      <div className="dashboard-wrap dash-phone-layout">
        {!bannerDismissed && (returnMsg || streak > 1) ? (
          <RetentionBanner
            message={returnMsg ?? "Keep building momentum on your career path."}
            streak={streak}
            onDismiss={() => setBannerDismissed(true)}
          />
        ) : null}

        <div className="dash-header">
          <div className="dash-greeting">Hey {user.name} 👋</div>
          <div className="dash-sub">Ready to build your future?</div>
          <div className="dash-path-label">
            <span>Your Path</span>
            <span>{progressPct}% complete</span>
          </div>
          <div className="dash-path-bar">
            <div className="dash-path-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="dash-featured-card">
          <div className="featured-tag">Recommended for you</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>
            {featured.emoji} {featured.trade}
          </div>
          <div style={{ fontSize: 13, color: "var(--lime)", marginTop: 6 }}>High demand · Great pay</div>
          <div style={{ fontSize: 14, color: "var(--text-3)", marginTop: 4 }}>
            {featured.salaryRange}/year · {featured.matchScore}% match
          </div>
        </div>

        <div>
          <div className="trade-why-title" style={{ marginBottom: 12, fontSize: 12 }}>
            TOP 3 CAREER MATCHES
          </div>
          {enriched.matches.map((m, i) => (
            <button
              key={m.trade}
              type="button"
              className={`dash-match-row${i === activeTradeTab ? " active" : ""}`}
              onClick={() => setActiveTradeTab(i)}
            >
              <span>
                <strong style={{ color: "#fff" }}>
                  {i + 1}. {m.emoji} {m.trade}
                </strong>
                <span style={{ display: "block", fontSize: 13, color: "var(--text-3)", marginTop: 2 }}>
                  {m.salaryRange}/year
                </span>
              </span>
              <span className="chevron">›</span>
            </button>
          ))}
        </div>

        <div className="full-plan-section">
          <div className="action-plan-card">
            <div className="apc-header">
              <div className="apc-header-left">
                <strong>
                  {match.emoji} {match.trade} Action Plan
                </strong>
                <span>
                  {match.salaryRange}/year · {doneCount}/{steps.length} steps done
                </span>
              </div>
            </div>
            {steps.map((s, i) => {
              const key = `${activeTradeTab}-${i}`;
              const done = completedSteps[key];
              return (
                <div
                  key={key}
                  role="button"
                  tabIndex={0}
                  className={`action-step${done ? " done" : ""}`}
                  onClick={() => {
                    const was = completedSteps[key];
                    toggleStep(key);
                    showToast(was ? "Step unchecked" : "✓ Step marked complete!");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleStep(key);
                    }
                  }}
                >
                  <div className="as-check">
                    <svg
                      className="as-check-icon"
                      viewBox="0 0 12 10"
                      width="12"
                      height="10"
                      style={{ stroke: "white", strokeWidth: 2.5, fill: "none" }}
                    >
                      <polyline points="1,5 4,8 11,1" />
                    </svg>
                  </div>
                  <div className="as-body">
                    <div className="as-title">{s.title}</div>
                    <div className="as-detail">{s.detail}</div>
                    <div className="as-meta">
                      <span className="as-tag time">⏱ {s.timeEstimate}</span>
                      <span className="as-tag cost">💰 {s.cost}</span>
                      <span className="as-tag priority">{s.priority}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {match.sampleJobs?.length ? (
            <div style={{ marginTop: 24 }}>
              <SampleJobsBlock jobs={match.sampleJobs} />
            </div>
          ) : null}
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-3)" }}>
          <Link href="/navigator/quiz" style={{ color: "var(--lime)" }}>
            Retake quiz →
          </Link>
        </p>
      </div>
    </div>
  );
}
