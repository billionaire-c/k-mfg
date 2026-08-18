import { Link } from 'react-router-dom'
import { EngagementBar } from './EngagementBar'
import type { FieldNoteSample } from '../data/fieldNoteSamples'

type FieldNoteListProps = {
  items: FieldNoteSample[]
}

export function FieldNoteList({ items }: FieldNoteListProps) {
  if (items.length === 0) {
    return (
      <p className="border-y border-line py-10 text-[14px] text-ink-muted">
        등록된 현장 노트가 없습니다.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.id} id={item.id} className="py-6">
          <Link
            to={`/notes/${item.id}`}
            className="group flex gap-4 transition-opacity hover:opacity-90 md:gap-5"
          >
            <div className="h-24 w-20 shrink-0 overflow-hidden border border-line bg-surface md:h-28 md:w-24">
              <img
                src={item.cover}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <div className="min-w-0 flex-1 py-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium tracking-[0.06em] text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
                  현장 노트
                </span>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line bg-surface px-2 py-0.5 text-[11px] text-ink-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h2 className="mt-2.5 text-[16px] leading-snug font-semibold tracking-tight text-ink md:text-[17px]">
                {item.title}
                <span className="ml-1 text-ink-muted" aria-hidden>
                  ↗
                </span>
              </h2>

              <p className="mt-1.5 text-[13px] text-ink-faint">{item.date}</p>

              <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink-muted">
                {item.summary}
              </p>
            </div>
          </Link>
          <div className="mt-3 md:pl-[6.5rem]">
            <EngagementBar
              kind="notes"
              id={item.id}
              title={item.title}
              summary={item.summary}
              compact
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
