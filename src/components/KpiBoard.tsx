import { useId, useState } from 'react'
import {
  kpiMeta,
  kpiSamples,
  kpiSignalLabel,
  type KpiItem,
  type KpiSignal,
} from '../data/kpiSamples'

const signalDot: Record<KpiSignal, string> = {
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-rose-500',
}

const signalText: Record<KpiSignal, string> = {
  green: 'text-emerald-700 dark:text-emerald-300',
  amber: 'text-amber-700 dark:text-amber-300',
  red: 'text-rose-700 dark:text-rose-300',
}

export function KpiBoard() {
  const panelId = useId()
  const [openId, setOpenId] = useState<string | null>(null)
  const selected = kpiSamples.find((item) => item.id === openId) ?? null

  const toggle = (item: KpiItem) => {
    setOpenId((prev) => (prev === item.id ? null : item.id))
  }

  return (
    <section
      aria-labelledby="kpi-board-title"
      className="fade-up border-b border-line py-6 md:py-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
            Signal · {kpiMeta.asOf}
          </p>
          <h2
            id="kpi-board-title"
            className="text-xl font-semibold tracking-tight text-ink md:text-[1.35rem]"
          >
            {kpiMeta.title}
          </h2>
          <p className="mt-1 max-w-md text-[13px] leading-snug text-ink-muted md:text-[14px]">
            {kpiMeta.subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 border border-line bg-surface/70 px-2.5 py-1.5">
          <span
            className={['h-2 w-2 rounded-full', signalDot[kpiMeta.overall]].join(
              ' ',
            )}
            aria-hidden
          />
          <span
            className={[
              'text-[12px] font-medium tracking-wide',
              signalText[kpiMeta.overall],
            ].join(' ')}
          >
            종합 {kpiMeta.overallLabel}
          </span>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 border-y border-line md:grid-cols-4">
        {kpiSamples.map((item, index) => {
          const isOpen = openId === item.id
          const cellClass = [
            'py-4',
            index % 2 === 0 ? 'pr-3' : 'pl-3',
            'md:px-3',
            index % 2 === 1 ? 'border-l border-line' : '',
            index >= 2 ? 'border-t border-line md:border-t-0' : '',
            index > 0 ? 'md:border-l md:border-line' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li key={item.id} className={cellClass}>
              <button
                type="button"
                onClick={() => toggle(item)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={[
                  'w-full rounded-sm text-left transition-colors',
                  'hover:bg-surface/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  isOpen ? 'bg-surface/90' : '',
                ].join(' ')}
              >
                <div className="flex items-start gap-1.5">
                  <span
                    className={[
                      'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                      signalDot[item.signal],
                    ].join(' ')}
                    title={kpiSignalLabel[item.signal]}
                    aria-hidden
                  />
                  <span className="min-w-0 text-[13px] leading-snug font-semibold tracking-tight text-ink md:text-[14px]">
                    {item.label}
                  </span>
                </div>

                <p className="mt-2.5 flex items-baseline gap-1 pl-3">
                  <span className="text-[1.35rem] leading-none font-semibold tracking-tight text-ink tabular-nums md:text-[1.45rem]">
                    {item.value}
                  </span>
                  {item.unit ? (
                    <span className="text-[11px] text-ink-faint">{item.unit}</span>
                  ) : null}
                </p>

                {item.delta ? (
                  <p className="mt-1.5 pl-3 text-[11px] leading-snug text-ink-muted">
                    {item.delta}
                  </p>
                ) : null}

                <p className="mt-1 pl-3 text-[11px] leading-snug text-ink-faint">
                  {item.note}
                </p>
              </button>
            </li>
          )
        })}
      </ul>

      {selected ? (
        <div
          id={panelId}
          role="region"
          aria-label={`${selected.label} 설명`}
          className="mt-4 border border-line bg-surface/60 px-4 py-4 md:px-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={[
                  'h-2 w-2 shrink-0 rounded-full',
                  signalDot[selected.signal],
                ].join(' ')}
                aria-hidden
              />
              <h3 className="text-[15px] font-semibold tracking-tight text-ink">
                {selected.label}
              </h3>
              <span
                className={[
                  'text-[11px] font-medium',
                  signalText[selected.signal],
                ].join(' ')}
              >
                {kpiSignalLabel[selected.signal]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="shrink-0 text-[12px] text-ink-muted transition-colors hover:text-accent"
            >
              닫기
            </button>
          </div>

          <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
            {selected.description}
          </p>

          <dl className="mt-3 grid gap-1 text-[12px] text-ink-faint sm:grid-cols-2">
            <div>
              <dt className="inline text-ink-faint">기준 시점 </dt>
              <dd className="inline text-ink-muted">{selected.period}</dd>
            </div>
            <div className="min-w-0">
              <dt className="inline text-ink-faint">출처 </dt>
              <dd className="inline text-ink-muted">{selected.source}</dd>
            </div>
          </dl>

          <a
            href={selected.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            원문·통계 보기 »
          </a>
        </div>
      ) : (
        <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
          기준 {kpiMeta.asOf} · 갱신 {kpiMeta.updatedAt} · {kpiMeta.disclaimer}
          <span className="mx-1.5" aria-hidden>
            ·
          </span>
          지표를 누르면 설명·출처 링크가 열립니다
        </p>
      )}
    </section>
  )
}
