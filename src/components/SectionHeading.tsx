import { Link } from 'react-router-dom'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  moreHref?: string
  moreLabel?: string
}

export function SectionHeading({
  eyebrow,
  title,
  moreHref,
  moreLabel = '더보기 »',
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-1 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
          {eyebrow}
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {title}
        </h2>
      </div>
      {moreHref ? (
        <Link
          to={moreHref}
          className="shrink-0 text-[13px] text-ink-muted transition-colors hover:text-accent"
        >
          {moreLabel}
        </Link>
      ) : null}
    </div>
  )
}
