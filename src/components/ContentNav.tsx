import { Link } from 'react-router-dom'

type NavItem = {
  id: string
  title: string
}

type ContentNavProps = {
  listHref: string
  listLabel: string
  currentTitle: string
  prev: NavItem | null
  next: NavItem | null
  /** 배열 앞=최신 → prev=이전글(더 최신), next=다음글(더 이전) */
  detailBase: string
}

export function ContentNav({
  listHref,
  listLabel,
  currentTitle,
  prev,
  next,
  detailBase,
}: ContentNavProps) {
  return (
    <nav aria-label="글 이동" className="mt-10 border-t border-line pt-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[14px] text-ink">
          <span className="text-ink-muted">'{listLabel}'</span>의 다른글
        </p>
        <Link
          to={listHref}
          className="text-[13px] text-ink-muted transition-colors hover:text-accent"
        >
          목록보기
        </Link>
      </div>

      <ul className="space-y-3 text-[14px]">
        <li className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 md:grid-cols-[5rem_1fr]">
          <span className="text-ink-muted">이전글</span>
          {prev ? (
            <Link
              to={`${detailBase}/${prev.id}`}
              className="min-w-0 truncate text-ink transition-colors hover:text-accent"
            >
              {prev.title}
            </Link>
          ) : (
            <span className="text-ink-faint">이전글이 없습니다.</span>
          )}
        </li>
        <li className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 md:grid-cols-[5rem_1fr]">
          <span className="text-ink-muted">현재글 :</span>
          <span className="min-w-0 truncate font-medium text-ink">
            {currentTitle}
          </span>
        </li>
        <li className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 md:grid-cols-[5rem_1fr]">
          <span className="text-ink-muted">다음글</span>
          {next ? (
            <Link
              to={`${detailBase}/${next.id}`}
              className="min-w-0 truncate text-ink transition-colors hover:text-accent"
            >
              {next.title}
            </Link>
          ) : (
            <span className="text-ink-faint">다음글이 없습니다.</span>
          )}
        </li>
      </ul>
    </nav>
  )
}
