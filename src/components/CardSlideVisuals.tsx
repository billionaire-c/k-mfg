import type { ChartBar, MetricTone, SlideMetric } from '../data/cardNewsSamples'

const toneClass: Record<MetricTone, string> = {
  up: 'text-[#0f7a4c]',
  down: 'text-[#0f7a4c]',
  warn: 'text-[#c45c26]',
  neutral: 'text-[#1f4e6b]',
}

const barClass: Record<MetricTone, string> = {
  up: 'bg-[#0f7a4c]',
  down: 'bg-[#0f7a4c]',
  warn: 'bg-[#c45c26]',
  neutral: 'bg-[#1f4e6b]',
}

function Arrow({ dir }: { dir?: SlideMetric['arrow'] }) {
  if (!dir) return null
  const symbol = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'
  return <span className="ml-1 text-[0.85em] font-bold">{symbol}</span>
}

export function MetricRow({ metrics }: { metrics: SlideMetric[] }) {
  return (
    <div
      className={[
        'mt-6 grid gap-3',
        metrics.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
      ].join(' ')}
    >
      {metrics.map((metric) => {
        const tone = metric.tone ?? 'neutral'
        return (
          <div
            key={`${metric.label}-${metric.value}`}
            className="border border-[#e7eaf0] bg-[#fafafa] px-3 py-3"
          >
            <p className="text-[11px] tracking-[0.08em] text-[#939393] uppercase">
              {metric.label}
            </p>
            <p
              className={[
                'mt-1 text-[1.75rem] leading-none font-bold tracking-tight md:text-[2rem]',
                toneClass[tone],
              ].join(' ')}
            >
              {metric.value}
              <Arrow dir={metric.arrow} />
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function BarChart({ bars }: { bars: ChartBar[] }) {
  const max = Math.max(...bars.map((b) => b.value), 1)

  return (
    <div className="mt-6 space-y-3">
      {bars.map((bar) => {
        const tone = bar.tone ?? 'neutral'
        const width = Math.max(8, (bar.value / max) * 100)
        return (
          <div key={bar.label}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="text-[12px] text-[#676f7b]">{bar.label}</span>
              <span className={['text-[14px] font-bold', toneClass[tone]].join(' ')}>
                {bar.display ?? bar.value}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden bg-[#e7eaf0]">
              <div
                className={['h-full transition-all duration-500', barClass[tone]].join(' ')}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
