import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { GlossaryList } from '../components/GlossaryList'
import { glossarySamples } from '../data/glossarySamples'
import { glossaryIndexOf } from '../lib/glossaryIndex'

const HANGUL_INDEX = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const

const LATIN_INDEX = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const PAGE_SIZE = 20

export function GlossaryPage() {
  const [tag, setTag] = useState('전체')
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    glossarySamples.forEach((item) => item.tags.forEach((t) => set.add(t)))
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))]
  }, [])

  const baseItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    return glossarySamples
      .filter((item) => (tag === '전체' ? true : item.tags.includes(tag)))
      .filter((item) => {
        if (!q) return true
        return (
          item.term.toLowerCase().includes(q) ||
          item.termKo.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q)
        )
      })
      .slice()
      .sort((a, b) => a.termKo.localeCompare(b.termKo, 'ko'))
  }, [tag, query])

  const availableIndexes = useMemo(() => {
    const source =
      query.trim() || tag !== '전체'
        ? baseItems
        : glossarySamples.filter((item) =>
            tag === '전체' ? true : item.tags.includes(tag),
          )
    return new Set(source.map((item) => glossaryIndexOf(item.termKo)))
  }, [baseItems, query, tag])

  // 검색 중이 아니면 색인 1개만 표시. 초기값은 첫 사용 가능 색인.
  useEffect(() => {
    if (query.trim()) return
    if (activeIndex && availableIndexes.has(activeIndex)) return
    const ordered = [...HANGUL_INDEX, ...LATIN_INDEX].find((key) =>
      availableIndexes.has(key),
    )
    setActiveIndex(ordered ?? null)
  }, [availableIndexes, activeIndex, query])

  useEffect(() => {
    setPage(1)
  }, [tag, query, activeIndex])

  const filteredItems = useMemo(() => {
    const q = query.trim()
    if (q) return baseItems
    if (!activeIndex) return []
    return baseItems.filter(
      (item) => glossaryIndexOf(item.termKo) === activeIndex,
    )
  }, [baseItems, query, activeIndex])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filteredItems.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  const selectIndex = (key: string) => {
    if (!availableIndexes.has(key)) return
    setQuery('')
    setActiveIndex(key)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Glossary
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        용어·해설
      </h1>
      <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        스마트공장·제조 AI 용어집입니다. 색인을 고르면 해당 글자만 보여 주며, 한
        페이지에 {PAGE_SIZE}개씩 나눕니다.
      </p>

      <div className="mb-6 space-y-3 border border-line bg-surface/40 px-3 py-3 md:px-4">
        <IndexRow label="한글">
          {HANGUL_INDEX.map((key) => (
            <IndexButton
              key={key}
              label={key}
              enabled={availableIndexes.has(key)}
              active={!query.trim() && activeIndex === key}
              onClick={() => selectIndex(key)}
            />
          ))}
        </IndexRow>
        <IndexRow label="ABC">
          {LATIN_INDEX.map((key) => (
            <IndexButton
              key={key}
              label={key}
              enabled={availableIndexes.has(key)}
              active={!query.trim() && activeIndex === key}
              onClick={() => selectIndex(key)}
            />
          ))}
        </IndexRow>
      </div>

      <div className="mb-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
            검색
          </span>
          <input
            type="text"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="용어·설명 검색"
            className="box-border min-h-11 w-full appearance-none rounded border border-line bg-paper px-3 py-2.5 text-[16px] leading-normal text-ink outline-none focus:border-ink md:text-[14px]"
          />
        </label>

        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.1em] text-ink-faint uppercase">
            태그
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((key) => (
              <FilterChip
                key={key}
                active={tag === key}
                onClick={() => setTag(key)}
              >
                {key === '전체' ? '전체' : key}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[12px] text-ink-faint">
        <p>
          {query.trim()
            ? `검색 결과 ${filteredItems.length.toLocaleString()}개`
            : `색인 ${activeIndex ?? '-'} · ${filteredItems.length.toLocaleString()}개`}
          {filteredItems.length > 0
            ? ` · ${safePage}/${totalPages}페이지`
            : null}
        </p>
        <p>페이지당 {PAGE_SIZE}개</p>
      </div>

      <GlossaryList
        key={`${tag}-${query}-${activeIndex}-${safePage}`}
        items={pageItems}
        indexLabel={query.trim() ? null : activeIndex}
      />

      {filteredItems.length > PAGE_SIZE ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => {
              setPage((p) => Math.max(1, p - 1))
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="border border-line px-3 py-1.5 text-[13px] text-ink-muted transition-colors enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-40"
          >
            이전
          </button>
          <span className="px-2 text-[13px] text-ink">
            {safePage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1))
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="border border-line px-3 py-1.5 text-[13px] text-ink-muted transition-colors enabled:hover:border-ink enabled:hover:text-ink disabled:opacity-40"
          >
            다음
          </button>
        </div>
      ) : null}
    </div>
  )
}

function IndexRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-2 md:gap-3">
      <span className="w-8 shrink-0 pt-1 text-[11px] font-medium tracking-[0.08em] text-ink-faint">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  )
}

function IndexButton({
  label,
  enabled,
  active,
  onClick,
}: {
  label: string
  enabled: boolean
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={onClick}
      className={[
        'min-w-7 px-1.5 py-1 text-[12px] transition-colors md:min-w-8 md:text-[13px]',
        enabled
          ? active
            ? 'bg-ink font-medium text-paper'
            : 'text-ink hover:bg-ink/10'
          : 'cursor-default text-ink-faint/35',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'border px-3 py-1.5 text-[13px] transition-colors',
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-line bg-paper text-ink-muted hover:border-ink/40 hover:text-ink',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
