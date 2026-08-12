import { Link } from 'react-router-dom'
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
            <div className="aspect-[3/4] overflow-hidden border border-[#e7eaf0] bg-[#d0d4d4]">
              <img
                src={item.cover}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
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
        </li>
      ))}
    </ul>
  )
}
