import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContentPhotoStrip } from '../components/ContentPhotoStrip'
import { OpcUaApplyFlow } from '../components/OpcUaApplyFlow'
import { SmartFactoryStandardMap } from '../components/SmartFactoryStandardMap'
import { StandardsFlow } from '../components/StandardsFlow'
import { StandardsMindMap } from '../components/StandardsMindMap'
import { contentPhotoStrips } from '../data/contentPhotoStrips'
import {
  getStandard,
  standardCategories,
  standardSamples,
  standardsMeta,
  standardsMindMap,
  type StandardCategory,
} from '../data/standardsSamples'

const branchToCategory: Record<string, StandardCategory> = {
  quality: '품질',
  auto: '자동차',
  env: '환경·안전',
  sec: '정보보안',
  privacy: '개인정보',
}

export function StandardsPage() {
  const [branchId, setBranchId] = useState<string | null>(null)
  const [category, setCategory] = useState<StandardCategory | '전체'>('전체')

  const activeCategory = branchId
    ? (branchToCategory[branchId] ?? category)
    : category

  const items = useMemo(() => {
    if (activeCategory === '전체') return standardSamples
    return standardSamples.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const selectBranch = (id: string) => {
    setBranchId((prev) => (prev === id ? null : id))
    const cat = branchToCategory[id]
    if (cat) setCategory(cat)
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Standards
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {standardsMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {standardsMeta.subtitle}
      </p>

      <ContentPhotoStrip
        className="mt-8"
        photos={contentPhotoStrips.standards}
      />

      <section className="mt-10">
        <StandardsMindMap
          activeBranchId={branchId}
          onSelectBranch={selectBranch}
        />
      </section>

      <section className="mt-8">
        <SmartFactoryStandardMap />
      </section>

      <section className="mt-8">
        <OpcUaApplyFlow />
      </section>

      <section className="mt-8">
        <StandardsFlow />
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              인증 카드
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              {activeCategory === '전체'
                ? '전체 보기'
                : `${activeCategory} · ${standardsMindMap.branches.find((b) => branchToCategory[b.id] === activeCategory)?.label ?? ''}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              label="전체"
              active={activeCategory === '전체' && !branchId}
              onClick={() => {
                setBranchId(null)
                setCategory('전체')
              }}
            />
            {standardCategories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => {
                  setCategory(cat)
                  const branch = Object.entries(branchToCategory).find(
                    ([, v]) => v === cat,
                  )?.[0]
                  setBranchId(branch ?? null)
                }}
              />
            ))}
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} id={item.id} className="scroll-mt-24 py-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-line bg-surface px-2 py-0.5 text-[11px] tracking-[0.04em] text-ink-muted">
                  {item.category}
                </span>
                <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                  {item.code}
                </h3>
              </div>
              <p className="mt-1 text-[14px] text-ink-muted">{item.name}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                {item.summary}
              </p>
              <dl className="mt-4 grid gap-3 text-[13px] sm:grid-cols-2">
                <div>
                  <dt className="text-ink-faint">누가 보나</dt>
                  <dd className="mt-0.5 text-ink-muted">{item.who}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">왜 중요한가</dt>
                  <dd className="mt-0.5 text-ink-muted">{item.why}</dd>
                </div>
              </dl>
              {item.related.length > 0 ? (
                <p className="mt-3 text-[12px] text-ink-faint">
                  함께 보기{' '}
                  {item.related.map((id, index) => {
                    const related = getStandard(id)
                    if (!related) return null
                    return (
                      <span key={id}>
                        {index > 0 ? ' · ' : ''}
                        <a
                          href={`#${related.id}`}
                          className="text-ink-muted transition-colors hover:text-accent"
                        >
                          {related.code}
                        </a>
                      </span>
                    )
                  })}
                </p>
              ) : null}
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-[13px] text-ink-muted transition-colors hover:text-accent"
                >
                  공식·참고 보기 »
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[12px] leading-relaxed text-ink-faint">
          {standardsMeta.disclaimer}
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-[14px] font-semibold text-ink">이어서 보기</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-[13px]">
          <li>
            <Link to="/ot-security" className="text-ink-muted hover:text-accent">
              OT 보안 »
            </Link>
          </li>
          <li>
            <Link to="/check" className="text-ink-muted hover:text-accent">
              성숙도 체크 »
            </Link>
          </li>
          <li>
            <Link to="/glossary" className="text-ink-muted hover:text-accent">
              용어·해설 »
            </Link>
          </li>
          <li>
            <Link to="/policy" className="text-ink-muted hover:text-accent">
              지원사업 »
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'border px-2 py-1 text-[11px] transition-colors',
        active
          ? 'border-accent bg-accent text-paper'
          : 'border-line text-ink-muted hover:text-ink',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
