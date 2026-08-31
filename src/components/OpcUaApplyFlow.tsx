import { useState } from 'react'
import { opcUaGuideMeta } from '../data/smartFactoryStandardMap'

export function OpcUaApplyFlow() {
  const [stepId, setStepId] = useState(opcUaGuideMeta.steps[0].id)
  const step =
    opcUaGuideMeta.steps.find((s) => s.id === stepId) ?? opcUaGuideMeta.steps[0]
  const stepIndex = opcUaGuideMeta.steps.findIndex((s) => s.id === step.id)

  return (
    <div className="border border-line bg-surface/40 px-4 py-5 md:px-5">
      <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Flow chart
      </p>
      <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink">
        {opcUaGuideMeta.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
        {opcUaGuideMeta.subtitle}
      </p>

      <ol className="mt-4 flex flex-col gap-0 border border-line">
        {opcUaGuideMeta.steps.map((item, index) => {
          const active = item.id === step.id
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setStepId(item.id)}
                className={[
                  'flex w-full items-start gap-3 border-line px-3 py-3 text-left transition',
                  index === 0 ? '' : 'border-t',
                  active
                    ? 'bg-accent text-paper'
                    : 'bg-paper text-ink-muted hover:bg-surface hover:text-ink',
                ].join(' ')}
              >
                <span
                  className={[
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-semibold tabular-nums',
                    active ? 'bg-paper/20 text-paper' : 'bg-surface text-ink-faint',
                  ].join(' ')}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold">
                    {item.title}
                  </span>
                  {active ? (
                    <span
                      className={[
                        'mt-1 block text-[12px] leading-relaxed',
                        active ? 'text-paper/85' : '',
                      ].join(' ')}
                    >
                      {item.body}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mt-3 flex items-center justify-between gap-2 text-[12px]">
        <button
          type="button"
          disabled={stepIndex <= 0}
          onClick={() =>
            setStepId(opcUaGuideMeta.steps[Math.max(0, stepIndex - 1)].id)
          }
          className="border border-line px-2.5 py-1 text-ink-muted enabled:hover:text-ink disabled:opacity-40"
        >
          이전
        </button>
        <span className="tabular-nums text-ink-faint">
          {stepIndex + 1} / {opcUaGuideMeta.steps.length}
        </span>
        <button
          type="button"
          disabled={stepIndex >= opcUaGuideMeta.steps.length - 1}
          onClick={() =>
            setStepId(
              opcUaGuideMeta.steps[
                Math.min(opcUaGuideMeta.steps.length - 1, stepIndex + 1)
              ].id,
            )
          }
          className="border border-line px-2.5 py-1 text-ink-muted enabled:hover:text-ink disabled:opacity-40"
        >
          다음
        </button>
      </div>

      <h4 className="mt-6 text-[13px] font-semibold text-ink">
        유스케이스 매트릭스
      </h4>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {opcUaGuideMeta.useCases.map((uc) => (
          <li
            key={uc.id}
            className="border border-line bg-paper px-3 py-3"
          >
            <p className="text-[13px] font-medium text-ink">{uc.title}</p>
            <p className="mt-1 text-[11px] text-accent">{uc.support}</p>
            <p className="mt-1.5 text-[12px] leading-snug text-ink-muted">
              {uc.tip}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
        {opcUaGuideMeta.sourceNote}
      </p>
    </div>
  )
}
