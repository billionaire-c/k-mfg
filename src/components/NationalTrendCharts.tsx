import { useMemo, useState } from 'react'
import type { IndustrialTrend } from '../types/industrialPark'

type ChartMetric = 'utilization' | 'production' | 'employment'

type Props = {
  trends: IndustrialTrend[]
  asOf: string
  onSelectTrend?: (trend: IndustrialTrend) => void
}

function fmtNum(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('ko-KR')
}

function fmtPct(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return '—'
  return `${n.toFixed(1)}%`
}

function fmtQoQ(n: number | null | undefined, unit: '%' | '%p' | '') {
  if (n == null || Number.isNaN(n)) return '—'
  const sign = n > 0 ? '+' : ''
  if (unit === '%p') return `${sign}${n.toFixed(1)}%p`
  if (unit === '%') return `${sign}${n.toFixed(1)}%`
  return `${sign}${n.toFixed(1)}`
}

function qoqTone(n: number | null | undefined) {
  if (n == null || Number.isNaN(n) || n === 0) return 'text-ink-faint'
  return n > 0
    ? 'text-emerald-700 dark:text-emerald-300'
    : 'text-rose-600 dark:text-rose-400'
}

export function NationalTrendCharts({ trends, asOf, onSelectTrend }: Props) {
  const [metric, setMetric] = useState<ChartMetric>('utilization')

  const rows = useMemo(() => {
    const list = [...trends].filter((t) => {
      if (metric === 'utilization') return t.utilization != null
      if (metric === 'production') return t.production != null
      return t.employment != null
    })
    list.sort((a, b) => {
      if (metric === 'utilization')
        return (b.utilization ?? 0) - (a.utilization ?? 0)
      if (metric === 'production')
        return (b.production ?? 0) - (a.production ?? 0)
      return (b.employment ?? 0) - (a.employment ?? 0)
    })
    return list.slice(0, 12)
  }, [trends, metric])

  const maxVal = useMemo(() => {
    if (!rows.length) return 1
    if (metric === 'utilization') return 100
    if (metric === 'production')
      return Math.max(...rows.map((r) => r.production ?? 0), 1)
    return Math.max(...rows.map((r) => r.employment ?? 0), 1)
  }, [rows, metric])

  const metricHelp =
    metric === 'utilization'
      ? '가동률(%) · 막대=당분기, 숫자는 전분기 대비 %p'
      : metric === 'production'
        ? '생산(억원) · 막대=당분기, 숫자는 전분기 대비 %'
        : '고용(명) · 막대=당분기, 숫자는 전분기 대비 %'

  return (
    <section className="mb-4 border border-line">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-3 py-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.08em] text-ink-faint">
            National Trend · {asOf}
          </p>
          <h2 className="mt-0.5 text-[16px] font-semibold text-ink">
            국가산단 동향
          </h2>
          <p className="mt-1 text-[12px] text-ink-muted">{metricHelp}</p>
        </div>
        <div className="flex border border-line">
          {(
            [
              { id: 'utilization' as const, label: '가동률' },
              { id: 'production' as const, label: '생산' },
              { id: 'employment' as const, label: '고용' },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMetric(opt.id)}
              className={[
                'px-2.5 py-1.5 text-[12px]',
                metric === opt.id
                  ? 'bg-ink text-paper'
                  : 'bg-paper text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((t) => {
          const value =
            metric === 'utilization'
              ? t.utilization
              : metric === 'production'
                ? t.production
                : t.employment
          const qoq =
            metric === 'utilization'
              ? t.utilizationQoQ
              : metric === 'production'
                ? t.productionQoQ
                : t.employmentQoQ
          const height = Math.max(
            6,
            Math.round(((value ?? 0) / maxVal) * 100),
          )
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onSelectTrend?.(t)}
              className="border-b border-line px-3 py-3 text-left transition-colors hover:bg-surface sm:border-r sm:odd:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-medium text-ink">{t.key}</p>
                <p className={['text-[12px] tabular-nums', qoqTone(qoq)].join(' ')}>
                  {fmtQoQ(
                    qoq,
                    metric === 'utilization' ? '%p' : metric === 'production' ? '%' : '%',
                  )}
                </p>
              </div>
              <div className="mt-3 flex h-16 items-end">
                <div
                  className="w-full max-w-[3.5rem] bg-accent/80"
                  style={{ height: `${height}%` }}
                  title={String(value ?? '')}
                />
              </div>
              <p className="mt-2 text-[14px] font-semibold tabular-nums text-ink">
                {metric === 'utilization'
                  ? fmtPct(value)
                  : metric === 'production'
                    ? `${fmtNum(value != null ? Math.round(value) : null)}억`
                    : `${fmtNum(value)}명`}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-faint">
                {t.sido ?? '시도 미상'} · QoQ
              </p>
            </button>
          )
        })}
      </div>
      {rows.length === 0 ? (
        <p className="px-3 py-4 text-[13px] text-ink-faint">
          국가산단 동향 데이터가 없습니다.
        </p>
      ) : null}
    </section>
  )
}
