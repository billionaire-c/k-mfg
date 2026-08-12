import type { InsightSample } from '../data/insightSamples'

type InsightListProps = {
  items: InsightSample[]
}

export function InsightList({ items }: InsightListProps) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.id} id={item.id} className="py-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-line px-2 py-0.5 text-[11px] tracking-[0.08em] text-ink-faint uppercase">
              Paper
            </span>
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-ink-faint">
                #{tag}
              </span>
            ))}
          </div>

          <h2 className="mt-3 text-[16px] leading-snug font-semibold tracking-tight text-ink md:text-[17px]">
            {item.titleKo ?? item.title}
          </h2>
          {item.titleKo ? (
            <p className="mt-1 text-[13px] leading-snug text-ink-muted">{item.title}</p>
          ) : null}

          <p className="mt-3 text-[13px] text-ink-muted">
            {item.authors}
            <span className="text-ink-faint"> · {item.year} · {item.venue}</span>
          </p>

          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
            {item.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-ink underline-offset-4 hover:underline"
            >
              원문 보기
              <span aria-hidden>↗</span>
            </a>
            <span className="text-ink-faint">DOI: {item.doi}</span>
            <span className="text-[12px] text-accent">{item.accessNote}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
