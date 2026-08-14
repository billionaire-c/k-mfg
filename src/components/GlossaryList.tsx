import { useState } from 'react'
import type { GlossarySample } from '../data/glossarySamples'

type GlossaryListProps = {
  items: GlossarySample[]
  /** 현재 색인 라벨 (검색 모드면 null) */
  indexLabel?: string | null
}

const tagClass = (tag: string) => {
  if (tag === 'AI') {
    return 'border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200'
  }
  if (tag === '시스템') {
    return 'border-teal-300 bg-teal-50 text-teal-900 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-200'
  }
  if (tag === '설비제어') {
    return 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200'
  }
  if (tag === '데이터') {
    return 'border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
  }
  if (tag === '물류') {
    return 'border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-700 dark:bg-orange-950/40 dark:text-orange-200'
  }
  if (tag === '품질') {
    return 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200'
  }
  return 'border-stone-300 bg-stone-100 text-stone-700 dark:border-stone-600 dark:bg-stone-900/50 dark:text-stone-300'
}

export function GlossaryList({ items, indexLabel = null }: GlossaryListProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <p className="border-y border-line py-10 text-[14px] text-ink-muted">
        표시할 용어가 없습니다. 색인·검색·태그를 바꿔 보세요.
      </p>
    )
  }

  return (
    <section>
      {indexLabel ? (
        <div className="mb-2 flex items-baseline gap-2 border-b border-line pb-2">
          <h2 className="text-[18px] font-semibold tracking-tight text-ink">
            {indexLabel}
          </h2>
          <span className="text-[12px] text-ink-faint">이 페이지</span>
        </div>
      ) : null}
      <ul className="divide-y divide-line border-b border-line">
        {items.map((item) => {
          const open = openId === item.id
          return (
            <li key={item.id} id={item.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:bg-surface/60"
                aria-expanded={open}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={[
                          'border px-2 py-0.5 text-[11px] font-medium tracking-[0.04em]',
                          tagClass(tag),
                        ].join(' ')}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2.5 text-[16px] leading-snug font-semibold tracking-tight text-ink md:text-[17px]">
                    {item.termKo}
                    <span className="ml-2 text-[13px] font-medium text-ink-muted">
                      {item.term}
                    </span>
                  </h3>
                  {open ? (
                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
                      {item.summary}
                    </p>
                  ) : (
                    <p className="mt-2 line-clamp-1 max-w-2xl text-[13px] text-ink-faint">
                      {item.summary}
                    </p>
                  )}
                </div>
                <span className="mt-1 shrink-0 text-[12px] text-ink-faint">
                  {open ? '접기' : '펼치기'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
