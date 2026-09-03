import { useEffect, useMemo, useState } from 'react'
import {
  smartHaccpIntro,
  type SmartHaccpCompany,
  type SmartHaccpData,
} from '../data/smartHaccpIntro'

const PAGE_SIZE = 30

export function SmartHaccpPage() {
  const [data, setData] = useState<SmartHaccpData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sido, setSido] = useState('전체')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch('/data/smart-haccp-food.json')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return (await res.json()) as SmartHaccpData
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '불러오기 실패')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const sidos = useMemo(() => {
    if (!data) return []
    const set = new Set<string>()
    for (const row of data.companies) {
      if (row.sido) set.add(row.sido)
    }
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))]
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    return data.companies.filter((row) => {
      if (sido !== '전체' && row.sido !== sido) return false
      if (!q) return true
      const hay = [
        row.company,
        row.businessItem,
        row.businessType,
        row.ccp,
        row.sgg,
        row.appointNo,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [data, sido, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageSafe = Math.min(page, totalPages)
  const pageRows = filtered.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE,
  )

  useEffect(() => {
    setPage(1)
  }, [sido, query])

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Smart HACCP
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {smartHaccpIntro.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {smartHaccpIntro.subtitle}
      </p>
      <p className="mt-3 text-[13px] text-ink-faint">
        소개 참고:{' '}
        <a
          href={smartHaccpIntro.portalUrl}
          target="_blank"
          rel="noreferrer"
          className="text-ink-muted underline-offset-2 hover:text-accent hover:underline"
        >
          {smartHaccpIntro.portalName} ↗
        </a>
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {smartHaccpIntro.whatIs.headline}
        </h2>
        <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
          {smartHaccpIntro.whatIs.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {smartHaccpIntro.corePoints.headline}
        </h2>
        <ul className="mt-4 space-y-2">
          {smartHaccpIntro.corePoints.items.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-[14px] leading-relaxed text-ink-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          인증업체 현황
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
          {smartHaccpIntro.listNote}
        </p>
        {data ? (
          <p className="mt-2 text-[12px] text-ink-faint">
            {data.meta.count.toLocaleString('ko-KR')}건 · 수집{' '}
            {formatFetchedAt(data.meta.fetchedAt)} ·{' '}
            <a
              href={data.meta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:text-accent hover:underline"
            >
              공공데이터 출처 ↗
            </a>
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block min-w-[8rem] text-[12px] text-ink-muted">
            시도
            <select
              value={sido}
              onChange={(e) => setSido(e.target.value)}
              className="mt-1 block w-full border border-line bg-paper px-3 py-2 text-[13px] text-ink"
            >
              {sidos.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="block min-w-0 flex-1 text-[12px] text-ink-muted">
            검색
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="업체명, 품목, CCP, 인증번호…"
              className="mt-1 block w-full border border-line bg-paper px-3 py-2 text-[13px] text-ink placeholder:text-ink-faint"
            />
          </label>
        </div>

        <p className="mt-3 text-[12px] text-ink-faint">
          {loading
            ? '불러오는 중…'
            : error
              ? `오류: ${error}`
              : `검색 결과 ${filtered.length.toLocaleString('ko-KR')}건`}
        </p>

        {!loading && !error ? (
          <>
            <div className="mt-4 border-y border-line">
              <div className="flex items-baseline justify-between gap-3 border-b border-line bg-surface/50 px-0 py-2.5 text-[11px] font-medium tracking-wide text-ink-faint">
                <span>업체명</span>
                <span className="shrink-0">인증번호</span>
              </div>
              <p className="border-b border-line py-1.5 text-[11px] text-ink-faint">
                지역 · 업종 · 품목 / CCP(중요관리점)
              </p>
              <ul className="divide-y divide-line">
                {pageRows.map((row) => (
                  <CompanyRow key={rowKey(row)} row={row} />
                ))}
                {pageRows.length === 0 ? (
                  <li className="py-8 text-center text-[13px] text-ink-muted">
                    조건에 맞는 업체가 없습니다.
                  </li>
                ) : null}
              </ul>
            </div>

            {totalPages > 1 ? (
              <div className="mt-5 flex items-center justify-between gap-3 text-[13px]">
                <button
                  type="button"
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="border border-line px-3 py-1.5 text-ink-muted transition enabled:hover:text-ink disabled:opacity-40"
                >
                  이전
                </button>
                <span className="tabular-nums text-ink-faint">
                  {pageSafe} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="border border-line px-3 py-1.5 text-ink-muted transition enabled:hover:text-ink disabled:opacity-40"
                >
                  다음
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  )
}

function CompanyRow({ row }: { row: SmartHaccpCompany }) {
  return (
    <li className="py-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-[14px] font-medium text-ink">{row.company}</p>
        <p className="text-[12px] tabular-nums text-ink-faint">
          {row.appointNo || '—'}
        </p>
      </div>
      <p className="mt-1 text-[12px] text-ink-muted">
        {[row.sido, row.sgg].filter(Boolean).join(' · ') || '지역 미상'}
        {row.businessType ? ` · ${row.businessType}` : ''}
        {row.businessItem ? ` · ${row.businessItem}` : ''}
      </p>
      {row.ccp ? (
        <p className="mt-1 text-[12px] leading-snug text-ink-faint">
          CCP(중요관리점): {row.ccp}
        </p>
      ) : null}
    </li>
  )
}

function rowKey(row: SmartHaccpCompany): string {
  return [row.appointNo, row.businessItem, row.year, row.company].join('|')
}

function formatFetchedAt(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
