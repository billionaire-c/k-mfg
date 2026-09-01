import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  getIndustryLevel,
  getReferenceIndustry,
  refLevelLabels,
  refLevelToMaturity,
  referenceCommonAreas,
  referenceIndustries,
  referenceIndustryGroups,
  referenceModelMeta,
  referenceOverview,
  type RefLevelId,
} from '../data/referenceModelSamples'

export function ReferenceModelPage() {
  const [params] = useSearchParams()
  const initialIndustry =
    params.get('industry') &&
    referenceIndustries.some((i) => i.id === params.get('industry'))
      ? (params.get('industry') as string)
      : referenceIndustries[0].id
  const initialLevel = (
    refLevelLabels.some((l) => l.id === params.get('level'))
      ? params.get('level')
      : 'basic'
  ) as RefLevelId

  const [industryId, setIndustryId] = useState(initialIndustry)
  const [levelId, setLevelId] = useState<RefLevelId>(initialLevel)
  const [groupFilter, setGroupFilter] = useState<string | 'all'>('all')

  const industry = useMemo(
    () => getReferenceIndustry(industryId),
    [industryId],
  )
  const level = useMemo(
    () => getIndustryLevel(industry, levelId),
    [industry, levelId],
  )

  const filtered = useMemo(() => {
    if (groupFilter === 'all') return referenceIndustries
    return referenceIndustries.filter((i) => i.group === groupFilter)
  }, [groupFilter])

  const roadmapHref = `/roadmap?industry=${industry.id}&level=${refLevelToMaturity[levelId]}`

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Reference Model
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {referenceModelMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {referenceModelMeta.subtitle}
      </p>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
        {referenceModelMeta.disclaimer}
      </p>
      <p className="mt-2 text-[12px] text-ink-faint">
        출처 · {referenceModelMeta.sourceName} ({referenceModelMeta.sourceYear})
      </p>

      <section className="mt-12">
        <div className="border border-line bg-ink/[0.045] px-4 py-4 md:px-5 md:py-5 dark:bg-ink/[0.08]">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            참조모델이란?
          </h2>
          <div className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink-muted">
            <p>{referenceOverview.purpose}</p>
            <p>{referenceOverview.scope}</p>
            <p>{referenceOverview.levelWhy}</p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto border border-line">
          <table className="min-w-[560px] w-full border-collapse text-left text-[12px] md:text-[13px]">
            <thead>
              <tr className="border-b border-line bg-surface/60">
                <th className="px-3 py-2.5 font-medium text-ink-faint">수준</th>
                <th className="px-3 py-2.5 font-medium text-ink-muted">IoT 대상</th>
                <th className="px-3 py-2.5 font-medium text-ink-muted">의사결정</th>
                <th className="px-3 py-2.5 font-medium text-ink-muted">요지</th>
              </tr>
            </thead>
            <tbody>
              {referenceOverview.levelTable.map((row) => (
                <tr key={row.level} className="border-b border-line last:border-b-0">
                  <th className="px-3 py-2.5 text-left font-semibold text-ink">
                    {row.level}
                  </th>
                  <td className="px-3 py-2.5 text-ink-muted">{row.iot}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{row.decision}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <div className="border border-line bg-ink/[0.045] px-4 py-4 md:px-5 md:py-5 dark:bg-ink/[0.08]">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            공용 영역
          </h2>
          <p className="mt-2 text-[13px] text-ink-muted">
            업종 모델과 함께 보는 공통 축입니다. 전문 장은 요약만 담았습니다.
          </p>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {referenceCommonAreas.map((area) => (
            <li key={area.id} className="border border-line px-4 py-3">
              <p className="text-[14px] font-semibold text-ink">{area.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                {area.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="border border-line bg-ink/[0.045] px-4 py-4 md:px-5 md:py-5 dark:bg-ink/[0.08]">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            업종 선택
          </h2>
          <p className="mt-2 text-[13px] text-ink-muted">
            업종과 현재 수준을 고르면 요구사항·구성 포인트가 바뀝니다.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <FilterChip
            label="전체"
            active={groupFilter === 'all'}
            onClick={() => setGroupFilter('all')}
          />
          {referenceIndustryGroups.map((g) => (
            <FilterChip
              key={g.id}
              label={g.label}
              active={groupFilter === g.id}
              onClick={() => setGroupFilter(g.id)}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {filtered.map((item) => (
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

        <div className="mt-6 border border-line px-4 py-5 md:px-5">
          <p className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
            {referenceIndustryGroups.find((g) => g.id === industry.group)?.label}
          </p>
          <h3 className="mt-1 text-[18px] font-semibold text-ink">
            {industry.name}
          </h3>
          <p className="mt-2 text-[13px] text-ink-muted">
            표준 흐름 · {industry.process}
          </p>
          <ul className="mt-4 space-y-2">
            {industry.traits.map((t) => (
              <li
                key={t}
                className="flex gap-2 text-[13px] leading-relaxed text-ink-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          role="tablist"
          aria-label="참조모델 수준"
          className="mt-5 flex flex-wrap border border-line"
        >
          {refLevelLabels.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={levelId === tab.id}
              onClick={() => setLevelId(tab.id)}
              className={[
                'flex-1 min-w-[40%] px-3 py-2.5 text-left text-[13px] transition sm:min-w-0',
                levelId === tab.id
                  ? 'bg-ink text-paper'
                  : 'bg-paper text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              <span className="font-semibold">{tab.label}</span>
              <span
                className={[
                  'mt-0.5 block text-[11px]',
                  levelId === tab.id ? 'text-paper/75' : 'text-ink-faint',
                ].join(' ')}
              >
                {tab.short}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          <LevelList title="요구사항" items={level.requirements} />
          <LevelList title="구성 포인트" items={level.buildFocus} />
          <LevelList title="기대 효과" items={level.outcomes} />
        </div>

        <div className="mt-8 border border-accent/30 bg-accent/5 px-5 py-5">
          <p className="text-[13px] text-ink-muted">
            선택 · {industry.name} · {level.label} (성숙도{' '}
            {refLevelToMaturity[levelId]})
          </p>
          <Link
            to={roadmapHref}
            className="mt-3 inline-flex text-[14px] font-semibold text-accent hover:underline"
          >
            이 업종·수준으로 구축 로드맵 보기 »
          </Link>
        </div>
      </section>

      <section className="mt-12 border border-line bg-surface/40 px-5 py-5">
        <h2 className="text-[15px] font-semibold text-ink">이어서 보기</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          <li>
            <Link to="/smart-factory" className="text-ink hover:text-accent">
              스마트공장 소개 »
            </Link>
          </li>
          <li>
            <Link to="/check" className="text-ink hover:text-accent">
              성숙도 체크 »
            </Link>
          </li>
          <li>
            <Link to="/roadmap" className="text-ink hover:text-accent">
              구축 로드맵 »
            </Link>
          </li>
          <li>
            <Link to="/industries" className="text-ink hover:text-accent">
              제조업 구분 »
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'border px-2 py-1 text-[11px] transition-colors',
        active
          ? 'border-accent bg-accent text-paper'
          : 'border-line text-ink-muted hover:text-ink',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function LevelList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-line px-4 py-4">
      <h4 className="text-[14px] font-semibold text-ink">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-[13px] leading-relaxed text-ink-muted"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
