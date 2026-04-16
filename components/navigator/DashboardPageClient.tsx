"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { enrichMatchesWithJobs } from "@/lib/job-dummy-data";
import { SampleJobsBlock } from "./SampleJobsBlock";
import { useCareer } from "./CareerContext";

export function DashboardPageClient() {
  const router = useRouter();
  const { user, matches, completedSteps, activeTradeTab, setActiveTradeTab, toggleStep, showToast, bootstrapped } =
    useCareer();

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
  const match = enriched.matches[activeTradeTab];
  const steps = match.actionPlan;
  const doneCount = steps.filter((_, i) => completedSteps[`${activeTradeTab}-${i}`]).length;

  return (
    <div className="nav-page-dashboard nv-animate-in">
      <div className="dashboard-wrap">
        <div className="dash-header">
          <div className="dash-greeting">WELCOME BACK</div>
          <div className="dash-title">Your Career Dashboard, {user.name} 👋</div>
          <div className="dash-sub">You matched to {enriched.matches.length} trades. Keep going — your career is one step at a time.</div>
          <div className="dash-stats">
            <div className="dash-stat">
              <span className="dash-stat-num">{completedCount}</span>
              <div className="dash-stat-label">Steps completed</div>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">{totalSteps - completedCount}</span>
              <div className="dash-stat-label">Steps remaining</div>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">{enriched.matches[0].matchScore}%</span>
              <div className="dash-stat-label">Top match score</div>
            </div>
          </div>
        </div>

        <div className="full-plan-section">
          <div className="trade-why-title" style={{ marginBottom: 14, fontSize: 12 }}>
            YOUR ACTION PLANS
          </div>
          <div className="plan-trade-tab">
            {enriched.matches.map((m, i) => (
              <button
                key={m.trade}
                type="button"
                className={`plan-tab${i === activeTradeTab ? " active" : ""}`}
                onClick={() => setActiveTradeTab(i)}
              >
                {m.emoji} {m.trade}
              </button>
            ))}
          </div>
          <div className="action-plan-card">
            <div className="apc-header">
              <div className="apc-header-left">
                <strong>
                  {match.emoji} {match.trade} Action Plan
                </strong>
                <span>
                  {match.salaryRange}/year · {match.matchScore}% match
                </span>
              </div>
              <div className="apc-progress">
                {doneCount}/{steps.length} done
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
                    <svg className="as-check-icon" viewBox="0 0 12 10" width="12" height="10" style={{ stroke: "white", strokeWidth: 2.5, fill: "none" }}>
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
      </div>
    </div>
  );
}
