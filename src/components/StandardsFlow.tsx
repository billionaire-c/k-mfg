import { useState } from 'react'
import {
  getStandard,
  standardsFlow,
  type FlowNode,
} from '../data/standardsSamples'

export function StandardsFlow() {
  const [nodeId, setNodeId] = useState('start')
  const [trail, setTrail] = useState<string[]>(['start'])
  const node = standardsFlow[nodeId] as FlowNode | undefined

  const go = (nextId: string) => {
    setNodeId(nextId)
    setTrail((prev) => [...prev, nextId])
  }

  const reset = () => {
    setNodeId('start')
    setTrail(['start'])
  }

  const back = () => {
    if (trail.length <= 1) return
    const nextTrail = trail.slice(0, -1)
    setTrail(nextTrail)
    setNodeId(nextTrail[nextTrail.length - 1] ?? 'start')
  }

  if (!node) return null

  return (
    <div className="border border-line bg-surface/40 px-4 py-5 md:px-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
            Flow chart
          </p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink">
            우리 공장에 맞는 인증 고르기
          </h3>
        </div>
        <div className="flex gap-3 text-[12px]">
          <button
            type="button"
            onClick={back}
            disabled={trail.length <= 1}
            className="text-ink-muted transition-colors hover:text-accent disabled:opacity-30"
          >
            뒤로
          </button>
          <button
            type="button"
            onClick={reset}
            className="text-ink-muted transition-colors hover:text-accent"
          >
            처음부터
          </button>
        </div>
      </div>

      {/* Trail as mini flow */}
      <ol className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-ink-faint">
        {trail.map((id, index) => {
          const step = standardsFlow[id]
          const label =
            step?.type === 'question'
              ? `Q${index + 1}`
              : step?.type === 'result'
                ? '결과'
                : id
          return (
            <li key={`${id}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden>→</span> : null}
              <span
                className={[
                  'border px-1.5 py-0.5',
                  id === nodeId
                    ? 'border-accent text-accent'
                    : 'border-line text-ink-faint',
                ].join(' ')}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="mt-5 border border-line bg-paper px-4 py-5">
        {node.type === 'question' ? (
          <>
            <p className="text-[11px] tracking-[0.08em] text-ink-faint uppercase">
              Question
            </p>
            <p className="mt-2 text-[16px] leading-snug font-semibold tracking-tight text-ink md:text-[17px]">
              {node.text}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => go(node.yes)}
                className="border border-accent bg-accent px-4 py-3 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
              >
                예 →
              </button>
              <button
                type="button"
                onClick={() => go(node.no)}
                className="border border-line px-4 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-surface"
              >
                아니오 →
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[11px] tracking-[0.08em] text-ink-faint uppercase">
              Result
            </p>
            <p className="mt-2 text-[16px] font-semibold tracking-tight text-ink md:text-[17px]">
              {node.title}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              {node.note}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {node.standardIds.map((id) => {
                const item = getStandard(id)
                if (!item) return null
                return (
                  <li key={id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-flex border border-line bg-surface px-2.5 py-1.5 text-[12px] text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {item.code}
                    </a>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
