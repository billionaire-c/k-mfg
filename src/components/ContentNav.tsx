import { Link } from 'react-router-dom'

type NavItem = {
  id: string
  title: string
}

type ContentNavProps = {
  listHref: string
  listLabel: string
  prev: NavItem | null
  next: NavItem | null
  /** 카드뉴스: 윗글=더 최신, 아랫글=더 이전 */
  detailBase: string
}

export function ContentNav({
  listHref,
  listLabel,
  prev,
  next,
  detailBase,
}: ContentNavProps) {
  return (
    <nav
      aria-label="글 이동"
      className="mt-10 border-t border-line pt-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to={listHref}
          className="text-[13px] font-medium text-ink-muted transition-colors hover:text-accent"
        >
          ← 목록보기
        </Link>
        <p className="text-[11px] text-ink-faint">{listLabel}</p>
      </div>

      <ul className="mt-4 divide-y divide-line border-y border-line">
        <li className="py-3">
          {prev ? (
            <Link
              to={`${detailBase}/${prev.id}`}
              className="group flex flex-col gap-0.5 transition-colors"
            >
              <span className="text-[11px] tracking-[0.06em] text-ink-faint">
                윗글
              </span>
              <span className="text-[14px] font-medium text-ink group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <p className="text-[13px] text-ink-faint">윗글이 없습니다.</p>
          )}
        </li>
        <li className="py-3">
          {next ? (
            <Link
              to={`${detailBase}/${next.id}`}
              className="group flex flex-col gap-0.5 transition-colors"
            >
              <span className="text-[11px] tracking-[0.06em] text-ink-faint">
                아랫글
              </span>
              <span className="text-[14px] font-medium text-ink group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <p className="text-[13px] text-ink-faint">아랫글이 없습니다.</p>
          )}
        </li>
      </ul>
    </nav>
  )
}
