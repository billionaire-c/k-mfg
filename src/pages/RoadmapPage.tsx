import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { maturityLevels } from '../data/maturityCheck'
import {
  getLevelMeta,
  getRoadmapPlan,
  loadMaturityResult,
  roadmapMeta,
} from '../data/roadmapSamples'

export function RoadmapPage() {
  const [params] = useSearchParams()
  const [levelId, setLevelId] = useState('L2')
  const [fromCheck, setFromCheck] = useState(false)
  const [scoreLabel, setScoreLabel] = useState<string | null>(null)

  useEffect(() => {
    const q = params.get('level')
    const stored = loadMaturityResult()
    if (q && maturityLevels.some((level) => level.id === q)) {
      setLevelId(q)
      setFromCheck(Boolean(stored && stored.levelId === q))
      if (stored && stored.levelId === q) {
        setScoreLabel(`${stored.score}/${stored.maxScore}점`)
      }
      return
    }
    if (stored) {
      setLevelId(stored.levelId)
      setFromCheck(true)
      setScoreLabel(`${stored.score}/${stored.maxScore}점`)
    }
  }, [params])

  const plan = useMemo(() => getRoadmapPlan(levelId), [levelId])
  const level = useMemo(() => getLevelMeta(levelId), [levelId])

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Roadmap
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {roadmapMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {roadmapMeta.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {maturityLevels.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setLevelId(item.id)
              setFromCheck(false)
              setScoreLabel(null)
            }}
            className={[
              'border px-2.5 py-1 text-[12px] transition-colors',
              levelId === item.id
                ? 'border-accent bg-accent text-paper'
                : 'border-line text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            {item.id}
          </button>
        ))}
      </div>

      <div className="mt-6 border border-teal-300 bg-teal-50/70 px-5 py-5 dark:border-teal-700 dark:bg-teal-950/30">
        <p className="text-[12px] font-medium tracking-[0.08em] text-teal-800 dark:text-teal-200">
          {level.id}
          {scoreLabel ? ` · 내 진단 ${scoreLabel}` : ''}
          {fromCheck ? ' · 저장된 결과' : ''}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-ink">{plan.headline}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
          {plan.summary}
        </p>
        <p className="mt-3 text-[13px] text-ink-muted">{level.title}</p>
        {!fromCheck ? (
          <p className="mt-3 text-[12px] text-ink-faint">
            정확한 단계는{' '}
            <Link to="/check" className="text-accent hover:underline">
              성숙도 체크
            </Link>
            후 이 페이지로 오면 자동 반영됩니다.
          </p>
        ) : null}
      </div>

      <ol className="mt-10 space-y-8">
        {plan.phases.map((phase, index) => (
          <li key={phase.id} className="relative border border-line px-4 py-5 md:px-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                Phase {index + 1}
              </p>
              <p className="text-[12px] text-ink-faint">{phase.weeks}</p>
            </div>
            <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-ink">
              {phase.title}
            </h3>
            <p className="mt-1 text-[13px] text-ink-muted">초점 · {phase.focus}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14px] text-ink-muted">
              {phase.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
              {phase.links.map((link) => (
                <Link
                  key={`${phase.id}-${link.to}`}
                  to={link.to}
                  className="text-ink-muted transition-colors hover:text-accent"
                >
                  {link.label} »
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-6 text-[13px]">
        <Link to={plan.casesHref} className="text-ink-muted hover:text-accent">
          관련 사례 보기 »
        </Link>
        <Link to="/check" className="text-ink-muted hover:text-accent">
          다시 진단 »
        </Link>
        <Link to="/standards" className="text-ink-muted hover:text-accent">
          표준·인증 »
        </Link>
      </div>
    </div>
  )
}
