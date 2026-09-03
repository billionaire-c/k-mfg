import { manufacturingAiFlow } from '../data/manufacturingAi'

/** 센서 → 데이터 → AI → 조치 흐름 (텍스트 페이지용 한 장) */
export function ManufacturingAiFlow() {
  const { steps, branches, caption } = manufacturingAiFlow

  return (
    <div className="border border-line bg-surface/40 px-3 py-5 md:px-5">
      <p className="text-center text-[12px] leading-relaxed text-ink-muted">
        {caption}
      </p>

      {/* 데스크톱: 가로 흐름 */}
      <div className="mt-5 hidden items-stretch md:flex">
        {steps.map((step, index) => (
          <div key={step.id} className="flex min-w-0 flex-1 items-stretch">
            <div
              className={[
                'flex w-full flex-col justify-center border px-3 py-3 text-center',
                step.id === 'ai'
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line bg-paper',
              ].join(' ')}
            >
              <p
                className={[
                  'text-[10px] font-medium tracking-[0.12em] uppercase',
                  step.id === 'ai' ? 'text-paper/70' : 'text-ink-faint',
                ].join(' ')}
              >
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-1 text-[14px] font-semibold">{step.label}</p>
              <p
                className={[
                  'mt-1 text-[11px] leading-snug',
                  step.id === 'ai' ? 'text-paper/80' : 'text-ink-faint',
                ].join(' ')}
              >
                {step.sub}
              </p>
            </div>
            {index < steps.length - 1 ? (
              <div
                className="flex w-6 shrink-0 items-center justify-center text-ink-faint"
                aria-hidden
              >
                →
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* 모바일: 세로 흐름 */}
      <div className="mt-5 flex flex-col items-center md:hidden">
        {steps.map((step, index) => (
          <div key={step.id} className="flex w-full max-w-xs flex-col items-center">
            <div
              className={[
                'w-full border px-3 py-3 text-center',
                step.id === 'ai'
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line bg-paper',
              ].join(' ')}
            >
              <p className="text-[14px] font-semibold">{step.label}</p>
              <p
                className={[
                  'mt-0.5 text-[11px]',
                  step.id === 'ai' ? 'text-paper/80' : 'text-ink-faint',
                ].join(' ')}
              >
                {step.sub}
              </p>
            </div>
            {index < steps.length - 1 ? (
              <span className="py-1.5 text-[11px] text-ink-faint" aria-hidden>
                ↓
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4">
        {branches.map((b) => (
          <div
            key={b.label}
            className="border border-line bg-paper px-2 py-2.5 text-center"
          >
            <p className="text-[12px] font-semibold text-ink">{b.label}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-ink-faint">
              {b.to}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
