import type { YearSeriesPoint } from '../data/smartFactoryNumbers'

type YearBarChartProps = {
  title: string
  unit: string
  points: YearSeriesPoint[]
  /** 막대 색 (라이트/다크 대비 포함) */
  barClass?: string
}

export function YearBarChart({
  title,
  unit,
  points,
  barClass = 'bg-[#4a5c50] dark:bg-[#9fc4b4]',
}: YearBarChartProps) {
  const max = Math.max(...points.map((p) => p.value), 1)

  return (
    <div className="border border-line bg-surface/50 px-3 py-4 md:px-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
        <span className="text-[11px] text-ink-faint">{unit}</span>
      </div>
      <div className="mt-4 flex gap-2 md:gap-2.5">
        {points.map((point) => {
          const height = Math.max(8, Math.round((point.value / max) * 100))
          return (
            <div
              key={point.year}
              className="flex min-w-0 flex-1 flex-col items-center"
            >
              <span className="text-[10px] font-semibold tabular-nums text-ink md:text-[11px]">
                {point.display ?? point.value}
              </span>
              <div className="mt-1.5 flex h-28 w-full items-end justify-center md:h-32">
                <div
                  className={['w-full max-w-[2.75rem]', barClass].join(' ')}
                  style={{ height: `${height}%` }}
                  title={`${point.year}: ${point.value}${unit ? ` ${unit}` : ''}`}
                />
              </div>
              <span className="mt-1.5 text-[11px] tabular-nums text-ink-faint">
                {point.year}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
