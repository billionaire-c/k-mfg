import { useMemo, useState } from 'react'
import type { IndustrialParkItem } from '../types/industrialPark'

type RankMetric = 'saleRate' | 'tenants' | 'operating'
type RankScope = 'sido' | 'park'

type Props = {
  parks: IndustrialParkItem[]
  parkTypeLabel: string
  onSelectSido?: (sido: string) => void
  onSelectPark?: (park: IndustrialParkItem) => void
}

function fmtNum(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('ko-KR')
}

function fmtPct(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return '—'
  return `${n.toFixed(1)}%`
}

function metricValue(park: IndustrialParkItem, metric: RankMetric) {
  if (metric === 'saleRate') return park.saleRate
  if (metric === 'tenants') return park.tenants
  return park.operating
}

type SidoAgg = {
  sido: string
  parks: number
  tenants: number
  operating: number
  saleRate: number | null
  soldArea: number
  saleTargetArea: number
}

function buildSidoAgg(parks: IndustrialParkItem[]): SidoAgg[] {
  const map = new Map<string, SidoAgg>()
  for (const p of parks) {
    let row = map.get(p.sido)
    if (!row) {
      row = {
        sido: p.sido,
        parks: 0,
        tenants: 0,
        operating: 0,
        saleRate: null,
        soldArea: 0,
        saleTargetArea: 0,
      }
      map.set(p.sido, row)
    }
    row.parks += 1
    row.tenants += p.tenants ?? 0
    row.operating += p.operating ?? 0
    if (p.soldArea != null) row.soldArea += p.soldArea
    if (p.saleTargetArea != null) row.saleTargetArea += p.saleTargetArea
  }
  for (const row of map.values()) {
    row.saleRate =
      row.saleTargetArea > 0
        ? (row.soldArea / row.saleTargetArea) * 100
        : null
  }
  return Array.from(map.values())
}

export function ParkRankingPanel({
  parks,
  parkTypeLabel,
  onSelectSido,
  onSelectPark,
}: Props) {
  const [metric, setMetric] = useState<RankMetric>('tenants')
  const [scope, setScope] = useState<RankScope>('sido')

  const sidoRows = useMemo(() => {
    const rows = buildSidoAgg(parks)
    return rows
      .filter((r) => {
        if (metric === 'saleRate') return r.saleRate != null
        if (metric === 'tenants') return r.tenants > 0
        return r.operating > 0
      })
      .sort((a, b) => {
        const av =
          metric === 'saleRate'
            ? (a.saleRate ?? -1)
            : metric === 'tenants'
              ? a.tenants
              : a.operating
        const bv =
          metric === 'saleRate'
            ? (b.saleRate ?? -1)
            : metric === 'tenants'
              ? b.tenants
              : b.operating
        return bv - av
      })
      .slice(0, 10)
  }, [parks, metric])

  const parkRows = useMemo(() => {
    return [...parks]
      .filter((p) => {
        const v = metricValue(p, metric)
        if (v == null) return false
        if (metric === 'saleRate') {
          // 분양대상이 거의 없는 단지의 100% 왜곡 완화
          return (p.saleTargetArea ?? 0) >= 50
        }
        return v > 0
      })
      .sort((a, b) => (metricValue(b, metric) ?? 0) - (metricValue(a, metric) ?? 0))
      .slice(0, 10)
  }, [parks, metric])

  const maxBar = useMemo(() => {
    if (scope === 'sido') {
      if (!sidoRows.length) return 1
      if (metric === 'saleRate') return 100
      return Math.max(
        ...sidoRows.map((r) =>
          metric === 'tenants' ? r.tenants : r.operating,
        ),
        1,
      )
    }
    if (!parkRows.length) return 1
    if (metric === 'saleRate') return 100
    return Math.max(
      ...parkRows.map((p) => metricValue(p, metric) ?? 0),
      1,
    )
  }, [scope, sidoRows, parkRows, metric])

  const metricLabel =
    metric === 'saleRate' ? '분양률' : metric === 'tenants' ? '입주' : '가동'

  return (
    <section className="mt-8 border border-line">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-3 py-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.08em] text-ink-faint">
            Ranking · {parkTypeLabel}
          </p>
          <h2 className="mt-0.5 text-[16px] font-semibold text-ink">
            분양률 · 입주/가동 랭킹
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex border border-line">
            {(
              [
                { id: 'sido' as const, label: '시도별' },
                { id: 'park' as const, label: '단지별' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setScope(opt.id)}
                className={[
                  'px-2.5 py-1.5 text-[12px]',
                  scope === opt.id
                    ? 'bg-ink text-paper'
                    : 'bg-paper text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex border border-line">
            {(
              [
                { id: 'tenants' as const, label: '입주' },
                { id: 'operating' as const, label: '가동' },
                { id: 'saleRate' as const, label: '분양률' },
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
      </div>

      <ol className="divide-y divide-line">
        {scope === 'sido'
          ? sidoRows.map((row, index) => {
              const value =
                metric === 'saleRate'
                  ? row.saleRate
                  : metric === 'tenants'
                    ? row.tenants
                    : row.operating
              const width = Math.max(
                4,
                Math.round(((value ?? 0) / maxBar) * 100),
              )
              return (
                <li key={row.sido}>
                  <button
                    type="button"
                    onClick={() => onSelectSido?.(row.sido)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-surface"
                  >
                    <span className="w-5 shrink-0 text-[12px] tabular-nums text-ink-faint">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-[13px] font-medium text-ink">
                          {row.sido}
                        </p>
                        <p className="shrink-0 text-[13px] tabular-nums text-ink">
                          {metric === 'saleRate'
                            ? fmtPct(value)
                            : fmtNum(value)}
                        </p>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full bg-surface">
                        <div
                          className="h-full bg-accent/80"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-ink-faint">
                        단지 {row.parks}곳 · 입주 {fmtNum(row.tenants)} · 가동{' '}
                        {fmtNum(row.operating)}
                      </p>
                    </div>
                  </button>
                </li>
              )
            })
          : parkRows.map((park, index) => {
              const value = metricValue(park, metric)
              const width = Math.max(
                4,
                Math.round(((value ?? 0) / maxBar) * 100),
              )
              return (
                <li key={park.id}>
                  <button
                    type="button"
                    onClick={() => onSelectPark?.(park)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-surface"
                  >
                    <span className="w-5 shrink-0 text-[12px] tabular-nums text-ink-faint">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-[13px] font-medium text-ink">
                          {park.name}
                        </p>
                        <p className="shrink-0 text-[13px] tabular-nums text-ink">
                          {metric === 'saleRate'
                            ? fmtPct(value)
                            : fmtNum(value)}
                        </p>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full bg-surface">
                        <div
                          className="h-full bg-accent/80"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-ink-faint">
                        {park.sido} {park.sigungu} · {park.type} · {metricLabel}
                      </p>
                    </div>
                  </button>
                </li>
              )
            })}
        {(scope === 'sido' ? sidoRows : parkRows).length === 0 ? (
          <li className="px-3 py-4 text-[13px] text-ink-faint">
            표시할 랭킹 데이터가 없습니다. 필터를 넓혀 보세요.
          </li>
        ) : null}
      </ol>
    </section>
  )
}
