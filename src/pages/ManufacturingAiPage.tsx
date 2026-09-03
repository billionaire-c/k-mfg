import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ManufacturingAiFlow } from '../components/ManufacturingAiFlow'
import {
  manufacturingAiAlso,
  manufacturingAiCategories,
  manufacturingAiFlow,
  manufacturingAiLinks,
  manufacturingAiMeta,
  type ManufacturingAiCategory,
  type ManufacturingAiCategoryId,
  type ManufacturingAiExample,
} from '../data/manufacturingAi'

export function ManufacturingAiPage() {
  const [tab, setTab] = useState<ManufacturingAiCategoryId>('process')
  const active =
    manufacturingAiCategories.find((c) => c.id === tab) ??
    manufacturingAiCategories[0]

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Manufacturing AI
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {manufacturingAiMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {manufacturingAiMeta.subtitle}
      </p>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
        {manufacturingAiMeta.disclaimer}
      </p>

      <figure className="mt-8 overflow-hidden border border-line">
        <img
          src="/card-news/slide-factory-line.png"
          alt="자동화 제조 라인"
          className="block h-auto w-full object-cover"
          style={{ aspectRatio: '16 / 9', objectPosition: 'center' }}
        />
        <figcaption className="border-t border-line px-3 py-2 text-[11px] text-ink-faint">
          제조 현장 이미지 · 카드뉴스 자산 재사용 (테스트)
        </figcaption>
      </figure>

      <section className="mt-10">
        <h2 className="text-[15px] font-semibold tracking-tight text-ink">
          {manufacturingAiFlow.title}
        </h2>
        <div className="mt-3">
          <ManufacturingAiFlow />
        </div>
        <p className="mt-2 text-[11px] text-ink-faint">
          참고 ·{' '}
          <a
            href={manufacturingAiFlow.source.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-accent hover:underline"
          >
            {manufacturingAiFlow.source.name}
          </a>
        </p>
      </section>

      <section className="mt-12">
        <div
          role="tablist"
          aria-label="제조 AI 영역"
          className="grid grid-cols-3 gap-2"
        >
          {manufacturingAiCategories.map((cat) => {
            const selected = cat.id === tab
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(cat.id)}
                className={[
                  'border px-2 py-3 text-center transition-colors',
                  selected
                    ? 'border-accent bg-accent text-paper'
                    : 'border-line bg-paper text-ink-muted hover:bg-surface hover:text-ink',
                ].join(' ')}
              >
                <span className="block text-[13px] font-semibold md:text-[14px]">
                  {cat.shortLabel}
                </span>
                <span
                  className={[
                    'mt-0.5 hidden text-[10px] leading-snug sm:block',
                    selected ? 'text-paper/75' : 'text-ink-faint',
                  ].join(' ')}
                >
                  {cat.label.split(' · ')[0]}
                </span>
              </button>
            )
          })}
        </div>

        <div role="tabpanel" className="mt-5">
          <CategoryPanel category={active} />
        </div>
      </section>

      <section className="mt-12">
        <div className="border border-line px-4 py-4 md:px-5">
          <h2 className="text-[15px] font-semibold text-ink">
            {manufacturingAiAlso.headline}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
            {manufacturingAiAlso.body}
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
            참고 ·{' '}
            {manufacturingAiAlso.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 ? ' · ' : null}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 hover:text-accent hover:underline"
                >
                  {s.name}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="mt-10 border border-line bg-surface/40 px-5 py-5">
        <h2 className="text-[15px] font-semibold text-ink">이어서 보기</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          {manufacturingAiLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-ink transition-colors hover:text-accent"
              >
                {link.label} »
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function CategoryPanel({ category }: { category: ManufacturingAiCategory }) {
  return (
    <div>
      <p className="text-[15px] font-semibold tracking-tight text-ink md:text-[16px]">
        {category.effect}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
        {category.body}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="border border-line px-3 py-3">
          <h3 className="text-[12px] font-semibold text-ink">쓰는 기술</h3>
          <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-ink-muted">
            {category.technologies.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line px-3 py-3">
          <h3 className="text-[12px] font-semibold text-ink">어디에</h3>
          <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-ink-muted">
            {category.where.map((w) => (
              <li key={w} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#53B6A9]" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-6 text-[12px] font-semibold tracking-tight text-ink">
        현장 숫자
      </h3>
      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {category.examples.map((ex) => (
          <li key={ex.title}>
            <StatCard example={ex} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatCard({ example }: { example: ManufacturingAiExample }) {
  return (
    <article className="flex h-full flex-col border border-line px-3 py-3.5">
      <p className="text-[10px] font-medium tracking-[0.08em] text-ink-faint uppercase">
        {example.industries}
      </p>
      <p className="mt-2 text-[1.65rem] leading-none font-semibold tracking-tight tabular-nums text-accent">
        {example.display}
        {example.unit ? (
          <span className="ml-0.5 text-[0.95rem] font-semibold">
            {example.unit}
          </span>
        ) : null}
      </p>
      <h4 className="mt-2 text-[13px] font-semibold leading-snug text-ink">
        {example.effect}
      </h4>
      <p className="mt-1.5 text-[12px] leading-snug text-ink-muted">
        {example.title}
      </p>
      <p className="mt-2 flex-1 text-[11px] leading-relaxed text-ink-faint">
        {example.body}
      </p>
      <p className="mt-3 text-[10px] text-ink-faint">
        <a
          href={example.source.url}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 hover:text-accent hover:underline"
        >
          {example.source.name}
        </a>
      </p>
    </article>
  )
}
