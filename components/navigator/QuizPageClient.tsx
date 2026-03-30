"use client";

import { useCallback, useMemo, useState } from "react";
import { quizQuestions } from "@/lib/quiz-data";
import { useCareer } from "./CareerContext";

export function QuizPageClient() {
  const { completeQuiz } = useCareer();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = quizQuestions[step];
  const total = quizQuestions.length;
  const progress = useMemo(() => (step / total) * 100, [step, total]);
  const selected = answers[q.id];

  const select = useCallback((qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }, []);

  const next = useCallback(async () => {
    if (!selected) return;
    if (step < total - 1) {
      setStep((s) => s + 1);
      return;
    }
    await completeQuiz(answers);
  }, [answers, completeQuiz, selected, step, total]);

  const back = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  return (
    <div className="nav-page-quiz nv-animate-in">
      <div className="quiz-wrap">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-step-label">
          Question {step + 1} of {total}
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
        <div className="quiz-nav">
          {step > 0 ? (
            <button type="button" className="btn-secondary" onClick={back}>
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="btn-primary" disabled={!selected} onClick={() => void next()}>
            {step === total - 1 ? "Find My Matches →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
