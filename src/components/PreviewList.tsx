import { Link } from 'react-router-dom'
import type { PreviewItem } from '../data/placeholders'

type PreviewListProps = {
  items: PreviewItem[]
  toBase: string
}

export function PreviewList({ items, toBase }: PreviewListProps) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={`${toBase}#${item.id}`}
            className="group block py-5 transition-colors hover:bg-surface/60"
          >
            <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <h3 className="text-[15px] font-medium tracking-tight text-ink transition-colors group-hover:text-accent md:text-base">
                {item.title}
              </h3>
              <time className="shrink-0 text-[12px] text-ink-faint">{item.date}</time>
            </div>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink-muted">
              {item.summary}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
