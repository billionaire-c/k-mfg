import { useMemo, useState } from 'react'
import {
  companyEarnings,
  earningsMeta,
  type CompanyEarnings,
  type EarningsQuarter,
} from '../data/earningsSamples'

function formatJo(value: number) {
  const abs = Math.abs(value)
  const digits = abs >= 10 ? 1 : abs >= 1 ? 2 : 3
  const text = abs.toFixed(digits).replace(/\.?0+$/, '')
  return value < 0 ? `-${text}` : text
}

function formatDeltaPct(value: number) {
  const sign = value >= 0 ? '+' : '-'
  return `${sign}${Math.abs(value).toFixed(0)}%`
}

function latest(company: CompanyEarnings): EarningsQuarter {
  return company.quarters[company.quarters.length - 1]
}

function priorYearSameQuarter(
  company: CompanyEarnings,
  cur: EarningsQuarter,
): EarningsQuarter | null {
  return (
    company.quarters.find((q) => {
      const rest = q.label.slice(2)
      const year = Number(q.label.slice(0, 2))
      return (
        rest === cur.label.slice(2) &&
        year === Number(cur.label.slice(0, 2)) - 1
      )
    }) ?? null
  )
}

function previousQuarter(company: CompanyEarnings): EarningsQuarter | null {
  if (company.quarters.length < 2) return null
  return company.quarters[company.quarters.length - 2] ?? null
}

function DualBars({ quarters }: { quarters: EarningsQuarter[] }) {
  const maxRev = Math.max(...quarters.map((q) => q.revenue), 0.01)
  const maxOp = Math.max(
    ...quarters.map((q) => Math.abs(q.operatingProfit)),
    0.01,
  )

  return (
    <div className="mt-4">
      <div className="mb-2 flex flex-wrap items-center gap-3 text-[11px] text-ink-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2.5 bg-accent/80" aria-hidden />
          매출
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2 w-2.5 bg-teal-600/70 dark:bg-teal-400/70"
            aria-hidden
          />
          영업이익
        </span>
        <span>단위 {earningsMeta.unit}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 border-t border-line pt-3 md:gap-3">
        {quarters.map((q) => {
          const revH = Math.max(8, Math.round((q.revenue / maxRev) * 100))
          const opRatio = Math.abs(q.operatingProfit) / maxOp
          const opH = Math.max(
            q.operatingProfit === 0 ? 0 : 6,
            Math.round(opRatio * 100),
          )
          const loss = q.operatingProfit < 0

          return (
            <div key={q.label} className="min-w-0">
              <div className="flex h-28 items-end justify-center gap-1 md:h-32 md:gap-1.5">
                <div
                  className="w-3 bg-accent/80 md:w-3.5"
                  style={{ height: `${revH}%` }}
                  title={`매출 ${formatJo(q.revenue)}조`}
                />
                <div
                  className={[
                    'w-3 md:w-3.5',
                    loss
                      ? 'bg-rose-500/80'
                      : 'bg-teal-600/70 dark:bg-teal-400/70',
                  ].join(' ')}
                  style={{ height: `${opH}%` }}
                  title={`영업이익 ${formatJo(q.operatingProfit)}조`}
                />
              </div>
              <p className="mt-2 text-center text-[11px] tracking-wide text-ink-muted">
                {q.label}
              </p>
              <p className="mt-0.5 text-center text-[10px] tabular-nums text-ink-faint">
                {formatJo(q.revenue)}
              </p>
              <p
                className={[
                  'text-center text-[10px] tabular-nums',
                  loss ? 'text-rose-600 dark:text-rose-400' : 'text-ink-faint',
                ].join(' ')}
              >
                {formatJo(q.operatingProfit)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function EarningsBoard() {
  const [activeId, setActiveId] = useState(companyEarnings[0]?.id ?? '')
  const company =
    companyEarnings.find((item) => item.id === activeId) ?? companyEarnings[0]

  const cur = useMemo(() => latest(company), [company])
  const yearAgo = useMemo(
    () => priorYearSameQuarter(company, cur),
    [company, cur],
  )
  const qoq = useMemo(() => previousQuarter(company), [company])
  const compare = yearAgo ?? qoq
  const compareLabel = yearAgo ? '전년동기' : '전분기'

  const revDelta = compare
    ? ((cur.revenue - compare.revenue) / Math.abs(compare.revenue)) * 100
    : null
  const opDelta =
    compare && compare.operatingProfit !== 0
      ? ((cur.operatingProfit - compare.operatingProfit) /
          Math.abs(compare.operatingProfit)) *
        100
      : null

  return (
    <div className="mt-6 border-t border-line pt-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="mb-1 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
            Earnings · {earningsMeta.asOf}
          </p>
          <h3 className="text-[15px] font-semibold tracking-tight text-ink md:text-base">
            {earningsMeta.title}
          </h3>
          <p className="mt-0.5 text-[12px] text-ink-muted md:text-[13px]">
            {earningsMeta.subtitle}
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="기업 선택"
        className="mt-3 flex gap-1 overflow-x-auto pb-1"
      >
        {companyEarnings.map((item) => {
          const selected = item.id === company.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(item.id)}
              className={[
                'shrink-0 border px-2.5 py-1.5 text-[12px] transition-colors',
                selected
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line text-ink-muted hover:border-ink-faint hover:text-ink',
              ].join(' ')}
            >
              {item.shortName}
            </button>
          )
        })}
      </div>

      <div className="mt-4 border border-line bg-surface/50 px-3 py-4 md:px-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-[14px] font-semibold tracking-tight text-ink">
              {company.name}
              <span className="ml-2 text-[11px] font-normal text-ink-faint">
                {company.sector}
              </span>
            </p>
            <p className="mt-0.5 text-[11px] text-ink-faint">{cur.label} 연결</p>
          </div>
          <a
            href={company.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-ink-muted transition-colors hover:text-accent"
          >
            IR·원문 »
          </a>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-3">
          <div className="border-l-2 border-accent/70 pl-2.5">
            <dt className="text-[11px] text-ink-faint">매출</dt>
            <dd className="mt-0.5 text-[1.25rem] font-semibold tracking-tight text-ink tabular-nums">
              {formatJo(cur.revenue)}
              <span className="ml-1 text-[11px] font-normal text-ink-faint">
                {earningsMeta.unit}
              </span>
            </dd>
            {revDelta !== null ? (
              <p className="mt-0.5 text-[11px] text-ink-muted">
                {compareLabel} {formatDeltaPct(revDelta)}
              </p>
            ) : null}
          </div>
          <div
            className={[
              'border-l-2 pl-2.5',
              cur.operatingProfit < 0
                ? 'border-rose-500/70'
                : 'border-teal-600/70 dark:border-teal-400/70',
            ].join(' ')}
          >
            <dt className="text-[11px] text-ink-faint">영업이익</dt>
            <dd
              className={[
                'mt-0.5 text-[1.25rem] font-semibold tracking-tight tabular-nums',
                cur.operatingProfit < 0
                  ? 'text-rose-700 dark:text-rose-300'
                  : 'text-ink',
              ].join(' ')}
            >
              {formatJo(cur.operatingProfit)}
              <span className="ml-1 text-[11px] font-normal text-ink-faint">
                {earningsMeta.unit}
              </span>
            </dd>
            {opDelta !== null ? (
              <p className="mt-0.5 text-[11px] text-ink-muted">
                {compareLabel} {formatDeltaPct(opDelta)}
              </p>
            ) : (
              <p className="mt-0.5 text-[11px] text-ink-muted">
                {cur.operatingProfit < 0 ? '적자' : '흑자'}
              </p>
            )}
          </div>
        </dl>

        <DualBars quarters={company.quarters} />

        <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
          출처 {company.source} · {earningsMeta.disclaimer}
        </p>
      </div>
    </div>
  )
}
