import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import type { ContentKind } from '../lib/types'

const kindLabel: Record<ContentKind, string> = {
  'card-news': '카드뉴스',
  insight: '인사이트',
  youtube: '유튜브',
}

const kindPath: Record<ContentKind, string> = {
  'card-news': '/card-news',
  insight: '/insights',
  youtube: '/youtube',
}

export function SearchPage() {
  const { publishedContents } = useContent()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return publishedContents.filter((item) => {
      const haystack = `${item.title} ${item.summary} ${item.body ?? ''}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [publishedContents, query])

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Search
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        찾기
      </h1>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        카드뉴스, 인사이트, 유튜브 콘텐츠를 검색합니다. 메뉴 전체 구조가
        필요하면{' '}
        <Link to="/sitemap" className="text-ink transition-colors hover:text-accent">
          사이트맵
        </Link>
        을 보세요.
      </p>

      <label className="mb-10 block">
        <span className="sr-only">검색어</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full border-b border-line bg-transparent py-3 text-[16px] text-ink outline-none transition focus:border-accent"
          autoFocus
        />
      </label>

      {!query.trim() ? (
        <p className="text-[14px] text-ink-muted">검색어를 입력하면 결과가 표시됩니다.</p>
      ) : results.length === 0 ? (
        <p className="text-[14px] text-ink-muted">일치하는 결과가 없습니다.</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {results.map((item) => (
            <li key={item.id}>
              <Link
                to={`${kindPath[item.kind]}#${item.id}`}
                className="group block py-5 transition-colors hover:bg-surface/60"
              >
                <p className="mb-1 text-[11px] tracking-[0.12em] text-ink-faint uppercase">
                  {kindLabel[item.kind]}
                </p>
                <h2 className="text-[15px] font-medium text-ink transition-colors group-hover:text-accent">
                  {item.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  {item.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
