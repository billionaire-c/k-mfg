import { useEffect, useState } from 'react'

export type TocItem = {
  id: string
  label: string
}

type StickyTocProps = {
  items: TocItem[]
  /** sticky top offset (헤더 아래). 기본 3.25rem */
  topClass?: string
}

/**
 * 긴 가이드용 목차. 스크롤해도 위에 붙어 있고, 눌러서 해당 섹션으로 이동.
 */
export function StickyToc({
  items,
  topClass = 'top-[3.25rem]',
}: StickyTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0),
          )
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.25, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <nav
      aria-label="이 페이지 목차"
      className={[
        'sticky z-20 -mx-5 mb-2 border-y border-line bg-paper/95 px-5 py-2 backdrop-blur-sm md:-mx-6 md:px-6',
        topClass,
      ].join(' ')}
    >
      <p className="mb-1.5 text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        이 글에서
      </p>
      <ul className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(item.id)
                  if (!el) return
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(item.id)
                  history.replaceState(null, '', `#${item.id}`)
                }}
                className={[
                  'inline-block border px-2.5 py-1.5 text-[12px] transition-colors',
                  active
                    ? 'border-accent bg-accent text-paper'
                    : 'border-line bg-surface/60 text-ink-muted hover:border-accent/40 hover:text-ink',
                ].join(' ')}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
