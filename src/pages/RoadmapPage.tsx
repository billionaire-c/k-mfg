import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { RoadmapPhaseGraph } from '../components/RoadmapPhaseGraph'
import { maturityLevels } from '../data/maturityCheck'
import { getIndustryGraphPlan } from '../data/machineAssemblyRoadmap'
import {
  getLevelMeta,
  loadMaturityResult,
  referenceIndustries,
  roadmapMeta,
} from '../data/roadmapSamples'
import {
  maturityToRefLevel,
  refLevelLabels,
  referenceIndustryGroups,
} from '../data/referenceModelSamples'

export function RoadmapPage() {
  const [params] = useSearchParams()
  const [levelId, setLevelId] = useState('L2')
  const [industryId, setIndustryId] = useState('machine-assembly')
  const [fromCheck, setFromCheck] = useState(false)
  const [scoreLabel, setScoreLabel] = useState<string | null>(null)
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null)

  useEffect(() => {
    const qLevel = params.get('level')
    const qIndustry = params.get('industry')
    const stored = loadMaturityResult()

    if (
      qIndustry &&
      referenceIndustries.some((item) => item.id === qIndustry)
    ) {
      setIndustryId(qIndustry)
    }

    if (qLevel && maturityLevels.some((level) => level.id === qLevel)) {
      setLevelId(qLevel)
      setFromCheck(Boolean(stored && stored.levelId === qLevel))
      if (stored && stored.levelId === qLevel) {
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

  const plan = useMemo(
    () => getIndustryGraphPlan(industryId, levelId),
    [industryId, levelId],
  )

  useEffect(() => {
    setActivePhaseId(plan.phases[0]?.id ?? null)
  }, [plan])

  const level = useMemo(() => getLevelMeta(levelId), [levelId])
  const industry =
    referenceIndustries.find((item) => item.id === industryId) ??
    referenceIndustries[0]
  const refLevelLabel =
    refLevelLabels.find((item) => item.id === maturityToRefLevel[levelId])
      ?.label ?? '기초'

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
      <p className="mt-2 text-[12px] text-ink-faint">
        공장마다 현장이 다르므로 정답 설계가 아니라 참조용 일반 경로입니다. 업종을
        고르면 Phase 그래프가 바뀝니다.
      </p>

      <div className="mt-8">
        <p className="text-[12px] font-medium text-ink-faint">업종</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {referenceIndustries.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndustryId(item.id)}
              className={[
                'border px-2.5 py-1 text-[12px] transition-colors',
                industryId === item.id
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[12px] font-medium text-ink-faint">현재 수준 (성숙도)</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
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
      </div>

      <div className="mt-6 border border-teal-300 bg-teal-50/70 px-5 py-5 dark:border-teal-700 dark:bg-teal-950/30">
        <p className="text-[12px] font-medium tracking-[0.08em] text-teal-800 dark:text-teal-200">
          {industry.name} · {level.id} → 참조모델 {refLevelLabel}
          {scoreLabel ? ` · 내 진단 ${scoreLabel}` : ''}
          {fromCheck ? ' · 저장된 결과' : ''}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-ink">{plan.headline}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
          {plan.summary}
        </p>
        <p className="mt-3 text-[13px] text-ink-muted">
          {level.title} ·{' '}
          {
            referenceIndustryGroups.find((g) => g.id === industry.group)?.label
          }
        </p>
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

      {activePhaseId ? (
        <RoadmapPhaseGraph
          phases={plan.phases}
          activeId={activePhaseId}
          onSelect={setActivePhaseId}
        />
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-6 text-[13px]">
        <Link
          to={`/reference-model?industry=${industry.id}&level=${maturityToRefLevel[levelId]}`}
          className="text-ink-muted hover:text-accent"
        >
          업종별 참조모델 »
        </Link>
        <Link to={plan.casesHref} className="text-ink-muted hover:text-accent">
          관련 사례 보기 »
        </Link>
        <Link to="/policy" className="text-ink-muted hover:text-accent">
          지원사업 »
        </Link>
        <Link to="/ot-security" className="text-ink-muted hover:text-accent">
          OT 보안 »
        </Link>
        <Link to="/check" className="text-ink-muted hover:text-accent">
          다시 진단 »
        </Link>
      </div>
    </div>
  )
}
