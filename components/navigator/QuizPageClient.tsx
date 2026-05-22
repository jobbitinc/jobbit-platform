"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { quizQuestions } from "@/lib/quiz-data";
import { useCareer } from "./CareerContext";

export function QuizPageClient() {
  const { completeQuiz } = useCareer();
  const [step, setStep] = useState(0);
  const [slideDir, setSlideDir] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = quizQuestions[step];
  const total = quizQuestions.length;
  const isLast = step === total - 1;
  const selected = answers[q.id];

  const goToStep = useCallback((next: number, dir: "forward" | "back") => {
    setSlideDir(dir);
    setStep(next);
  }, []);

  const select = useCallback(
    (qid: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [qid]: value }));
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      if (step < total - 1) {
        advanceTimer.current = setTimeout(() => {
          goToStep(step + 1, "forward");
        }, 300);
      }
    },
    [goToStep, step, total],
  );

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const allAnswered = useMemo(
    () => quizQuestions.every((question) => Boolean(answers[question.id])),
    [answers],
  );

  const submitMatches = useCallback(async () => {
    if (!allAnswered) return;
    await completeQuiz(answers);
  }, [allAnswered, answers, completeQuiz]);

  const back = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (step > 0) goToStep(step - 1, "back");
  }, [goToStep, step]);

  const dots = useMemo(
    () =>
      Array.from({ length: total }, (_, i) => ({
        done: i < step,
        active: i === step,
      })),
    [step, total],
  );

  return (
    <div className="nav-page-quiz nv-animate-in">
      <div className="quiz-wrap">
        <div className="quiz-dots" aria-label="Quiz progress">
          {dots.map((d, i) => (
            <span
              key={i}
              className={`quiz-dot${d.done ? " done" : ""}${d.active ? " active" : ""}`}
              aria-current={d.active ? "step" : undefined}
            />
          ))}
        </div>
        <div key={step} className={`quiz-slide quiz-slide-${slideDir}`}>
          <div className="quiz-step-label">
            Question {String(step + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
          </div>
          <h2 className="quiz-q">{q.question}</h2>
          <p className="quiz-q-sub">{q.sub}</p>
          <div className="quiz-options">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`quiz-option${selected === opt.value ? " selected" : ""}`}
                onClick={() => select(q.id, opt.value)}
              >
                <div className="quiz-option-icon">{opt.icon}</div>
                <div className="quiz-option-text">
                  <strong>{opt.label}</strong>
                  <span>{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={`quiz-nav${isLast ? " quiz-nav-final" : ""}`}>
          {step > 0 ? (
            <button type="button" className="btn-secondary quiz-back-btn" onClick={back}>
              ← Back
            </button>
          ) : (
            <span className="quiz-nav-spacer" aria-hidden />
          )}
          {isLast ? (
            <button
              type="button"
              className="btn-primary quiz-final-cta"
              disabled={!allAnswered}
              onClick={() => void submitMatches()}
            >
              See My Matches →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
