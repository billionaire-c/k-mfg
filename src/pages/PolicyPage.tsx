import { useMemo, useState, type ReactNode } from 'react'
import {
  PolicyList,
  policyAgencyClass,
  policyStatusClass,
} from '../components/PolicyList'
import {
  policySamples,
  type PolicyAgencyGroup,
  type PolicyStatus,
} from '../data/policySamples'

const statusFilters: Array<'전체' | PolicyStatus> = [
  '전체',
  '모집중',
  '예정',
  '마감',
]

const agencyFilters: Array<'전체' | PolicyAgencyGroup> = [
  '전체',
  '중기부',
  '산업부',
]

const statusOrder: Record<PolicyStatus, number> = {
  모집중: 0,
  예정: 1,
  마감: 2,
}

export function PolicyPage() {
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('전체')
  const [agency, setAgency] = useState<(typeof agencyFilters)[number]>('전체')
  const [tag, setTag] = useState('전체')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    policySamples.forEach((item) => item.tags.forEach((t) => set.add(t)))
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))]
  }, [])

  const items = useMemo(() => {
    return policySamples
      .filter((item) => (status === '전체' ? true : item.status === status))
      .filter((item) =>
        agency === '전체' ? true : item.agencyGroup === agency,
      )
      .filter((item) => (tag === '전체' ? true : item.tags.includes(tag)))
      .slice()
      .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
  }, [status, agency, tag])

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Policy
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        정책·지원사업
      </h1>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        스마트공장·제조 AI 관련 정부·공공 지원사업을 모아 둡니다. 공고는 수동으로
        정리하며, 상태·일정은 원문 기준으로 확인해 주세요.
      </p>

      <div className="mb-8 space-y-4">
        <FilterRow label="상태">
          {statusFilters.map((key) => (
            <FilterChip
              key={key}
              active={status === key}
              onClick={() => setStatus(key)}
              tone={
                key === '전체' ? undefined : policyStatusClass[key as PolicyStatus]
              }
            >
              {key}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="기관">
          {agencyFilters.map((key) => (
            <FilterChip
              key={key}
              active={agency === key}
              onClick={() => setAgency(key)}
              tone={
                key === '전체'
                  ? undefined
                  : policyAgencyClass[key as PolicyAgencyGroup]
              }
            >
              {key}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="태그">
          {allTags.map((key) => (
            <FilterChip
              key={key}
              active={tag === key}
              onClick={() => setTag(key)}
            >
              {key === '전체' ? '전체' : `#${key}`}
            </FilterChip>
          ))}
        </FilterRow>
      </div>

      <p className="mb-3 text-[12px] text-ink-faint">
        {items.length.toLocaleString()}건 · 모집·예정 우선 정렬
      </p>

      <PolicyList items={items} />
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
  tone,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  tone?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'border px-3 py-1.5 text-[13px] transition-colors',
        active
          ? tone
            ? tone
            : 'border-ink bg-ink text-paper'
          : 'border-line bg-paper text-ink-muted hover:border-ink/40 hover:text-ink',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
