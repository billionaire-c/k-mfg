import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getMaturityLevel,
  maturityQuestions,
} from '../data/maturityCheck'
import { saveMaturityResult } from '../data/roadmapSamples'

export function MaturityPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const total = maturityQuestions.length
  const current = maturityQuestions[step]
  const answeredCount = Object.keys(answers).length

  const score = useMemo(
    () => Object.values(answers).reduce((sum, n) => sum + n, 0),
    [answers],
  )

  const level = getMaturityLevel(score)
  const maxScore = total * 3
  const progress = Math.round((answeredCount / total) * 100)

  useEffect(() => {
    if (submitted && answeredCount === total) {
      saveMaturityResult({
        levelId: level.id,
        score,
        maxScore,
        updatedAt: new Date().toISOString(),
      })
    }
  }, [submitted, answeredCount, total, level.id, score, maxScore])

  const selectChoice = (scoreValue: number) => {
    setAnswers((prev) => ({ ...prev, [current.id]: scoreValue }))
    if (step < total - 1) {
      setStep((s) => s + 1)
    } else {
      setSubmitted(true)
    }
  }

  const reset = () => {
    setAnswers({})
    setStep(0)
    setSubmitted(false)
  }

  if (submitted && answeredCount === total) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
        <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
          Maturity Check
        </p>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          진단 결과
        </h1>

        <div className="mt-8 border border-teal-300 bg-teal-50/70 px-5 py-6 dark:border-teal-700 dark:bg-teal-950/30">
          <p className="text-[12px] font-medium tracking-[0.08em] text-teal-800 dark:text-teal-200">
            {level.id} · {score}/{maxScore}점
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink">{level.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            {level.summary}
          </p>
          <div className="mt-5 h-2 overflow-hidden bg-white/70 dark:bg-black/20">
            <div
              className="h-full bg-teal-600 dark:bg-teal-400"
              style={{ width: `${Math.round((score / maxScore) * 100)}%` }}
            />
          </div>
        </div>

        <section className="mt-8 border border-line bg-surface/50 px-5 py-5">
          <h3 className="text-[14px] font-semibold text-ink">다음: 도입 로드맵</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
            진단 단계에 맞춘 12주 실행 순서와 표준·지원·사례 링크를 모아 두었습니다.
          </p>
          <Link
            to={`/roadmap?level=${level.id}`}
            className="mt-4 inline-flex border border-ink bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-90"
          >
            내 도입 로드맵 보기 »
          </Link>
        </section>

        <section className="mt-10">
          <h3 className="text-[14px] font-semibold text-ink">다음 액션</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] text-ink-muted">
            {level.nextSteps.map((stepText) => (
              <li key={stepText}>{stepText}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-[14px] font-semibold text-ink">이어서 보기</h3>
          <ul className="mt-3 flex flex-wrap gap-3 text-[13px]">
            <li>
              <Link
                to="/cases"
                className="text-teal-700 underline-offset-2 hover:underline dark:text-teal-300"
              >
                사례·벤치마크 »
              </Link>
            </li>
            {level.links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-teal-700 underline-offset-2 hover:underline dark:text-teal-300"
                >
                  {link.label} »
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          onClick={reset}
          className="mt-10 border border-ink px-4 py-2 text-[13px] font-medium text-ink hover:bg-ink hover:text-paper"
        >
          다시 진단하기
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Maturity Check
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        스마트공장 성숙도 체크
      </h1>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        12문항으로 가시화·표준·운영·AI 준비도를 가볍게 점검합니다. 결과는 도입
        로드맵·사례·지원으로 이어집니다.
      </p>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-[12px] text-ink-faint">
          <span>
            {step + 1} / {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden bg-surface">
          <div
            className="h-full bg-teal-600 transition-all dark:bg-teal-400"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="border border-line px-5 py-6 md:px-6">
        <p className="text-[11px] font-medium tracking-[0.08em] text-teal-700 dark:text-teal-300">
          {current.category}
        </p>
        <h2 className="mt-3 text-[17px] leading-snug font-semibold text-ink md:text-[18px]">
          {current.prompt}
        </h2>
        <div className="mt-6 space-y-2">
          {current.choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              onClick={() => selectChoice(choice.score)}
              className={[
                'block w-full border px-4 py-3 text-left text-[14px] transition-colors',
                answers[current.id] === choice.score
                  ? 'border-teal-700 bg-teal-50 text-ink dark:border-teal-400 dark:bg-teal-950/40'
                  : 'border-line text-ink-muted hover:border-ink hover:text-ink',
              ].join(' ')}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="border border-line px-3 py-1.5 text-[13px] text-ink-muted enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-40"
        >
          이전
        </button>
        {answers[current.id] !== undefined && step === total - 1 ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="border border-ink bg-ink px-4 py-1.5 text-[13px] font-medium text-paper"
          >
            결과 보기
          </button>
        ) : (
          <button
            type="button"
            disabled={answers[current.id] === undefined}
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            className="border border-line px-3 py-1.5 text-[13px] text-ink-muted enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-40"
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}
