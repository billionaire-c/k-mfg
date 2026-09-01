import { Link } from 'react-router-dom'
import type { RoadmapPhase } from '../data/roadmapSamples'

type RoadmapPhaseGraphProps = {
  phases: RoadmapPhase[]
  activeId: string
  onSelect: (id: string) => void
}

export function RoadmapPhaseGraph({
  phases,
  activeId,
  onSelect,
}: RoadmapPhaseGraphProps) {
  const active =
    phases.find((phase) => phase.id === activeId) ?? phases[0]

  return (
    <div className="mt-10">
      <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Phase flow
      </p>
      <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink">
        구축 단계 그래프
      </h3>

      <div className="mt-4 -mx-1 overflow-x-auto px-1 pb-1">
        <ol className="flex min-w-0 items-stretch gap-0">
          {phases.map((phase, index) => {
            const selected = phase.id === active.id
            return (
              <li key={phase.id} className="flex min-w-0 items-stretch">
                <button
                  type="button"
                  onClick={() => onSelect(phase.id)}
                  className={[
                    'flex w-[9.5rem] shrink-0 flex-col border px-3 py-3 text-left transition sm:w-[10.5rem]',
                    selected
                      ? 'border-accent bg-accent text-paper'
                      : 'border-line bg-paper text-ink-muted hover:border-ink/30 hover:text-ink',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-[10px] font-medium tracking-[0.14em] uppercase',
                      selected ? 'text-paper/75' : 'text-ink-faint',
                    ].join(' ')}
                  >
                    Phase {index + 1}
                  </span>
                  <span className="mt-1.5 text-[13px] font-semibold leading-snug">
                    {phase.graphLabel ?? shortTitle(phase.title)}
                  </span>
                  <span
                    className={[
                      'mt-1 text-[11px]',
                      selected ? 'text-paper/80' : 'text-ink-faint',
                    ].join(' ')}
                  >
                    {phase.weeks}
                  </span>
                </button>
                {index < phases.length - 1 ? (
                  <div
                    className="flex w-7 shrink-0 items-center justify-center text-ink-faint sm:w-9"
                    aria-hidden
                  >
                    <span className="text-[14px] leading-none">→</span>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-5 border border-line bg-ink/[0.03] px-4 py-5 md:px-5 dark:bg-ink/[0.06]">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
            Phase {phases.findIndex((p) => p.id === active.id) + 1}
          </p>
          <p className="text-[12px] text-ink-faint">{active.weeks}</p>
        </div>
        <h4 className="mt-2 text-[16px] font-semibold tracking-tight text-ink">
          {active.title}
        </h4>
        <p className="mt-1 text-[13px] text-ink-muted">초점 · {active.focus}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14px] text-ink-muted">
          {active.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        {active.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
            {active.links.map((link) => (
              <Link
                key={`${active.id}-${link.to}-${link.label}`}
                to={link.to}
                className="text-ink-muted transition-colors hover:text-accent"
              >
                {link.label} »
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function shortTitle(title: string): string {
  const cleaned = title.replace(/^\d+[–-]\d+주\s*·\s*/, '').trim()
  return cleaned.length > 18 ? `${cleaned.slice(0, 17)}…` : cleaned
}
