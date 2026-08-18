import { Link } from 'react-router-dom'
import { EngagementBar } from './EngagementBar'
import type { CardNewsSample } from '../data/cardNewsSamples'

type CardNewsGridProps = {
  items: CardNewsSample[]
}

export function CardNewsGrid({ items }: CardNewsGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/card-news/${item.id}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden border border-[#e7eaf0] bg-[#d0d4d4]">
              <img
                src={item.cover}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
              {item.issue ? (
                <span className="absolute top-0 left-0 z-10 min-w-[38%] bg-white px-2.5 py-2 text-[13px] leading-none font-semibold tracking-[0.02em] text-[#030303] md:min-w-[42%] md:px-3.5 md:py-2.5 md:text-[15px]">
                  {item.issue}
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-[15px] leading-snug font-semibold tracking-tight text-[#030303] group-hover:opacity-70 md:text-base">
              {item.title}
              <span className="ml-1 inline-block text-[#676f7b]" aria-hidden>
                ↗
              </span>
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#676f7b]">
              {item.summary}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.06em] text-[#939393]">
              {item.topic} · {item.date}
            </p>
          </Link>
          <EngagementBar
            kind="card-news"
            id={item.id}
            title={item.title}
            summary={item.summary}
            compact
          />
        </li>
      ))}
    </ul>
  )
}
