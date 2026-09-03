import { useState } from 'react'
import { ContentPhotoStrip } from '../components/ContentPhotoStrip'
import { contentPhotoStrips } from '../data/contentPhotoStrips'
import {
  industryClassifyMeta,
  ksicIntro,
  ksicManufacturingMids,
  rootIndustryIntro,
  rootTechGroups,
} from '../data/industryClassifySamples'

type TabId = 'ksic' | 'root'

export function IndustryClassifyPage() {
  const [tab, setTab] = useState<TabId>('root')

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Industry
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {industryClassifyMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {industryClassifyMeta.subtitle}
      </p>

      <ContentPhotoStrip
        className="mt-8"
        photos={contentPhotoStrips.industries}
      />

      <div
        role="tablist"
        aria-label="분류 구분"
        className="mt-8 flex border border-line"
      >
        {(
          [
            { id: 'root' as const, label: '뿌리산업', hint: industryClassifyMeta.rootAsOf },
            { id: 'ksic' as const, label: 'KSIC 11차', hint: industryClassifyMeta.ksicAsOf },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={[
              'flex-1 px-3 py-2.5 text-left transition-colors',
              tab === item.id
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            <span className="block text-[13px] font-medium">{item.label}</span>
            <span
              className={[
                'mt-0.5 block text-[11px]',
                tab === item.id ? 'text-paper/70' : 'text-ink-faint',
              ].join(' ')}
            >
              {item.hint}
            </span>
          </button>
        ))}
      </div>

      {tab === 'root' ? <RootSection /> : <KsicSection />}
    </div>
  )
}

const rootGroupTone: Record<string, string> = {
  base: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/35',
  material:
    'border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-950/35',
  smart: 'border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/35',
}

function RootSection() {
  return (
    <div className="mt-10 space-y-12">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {rootIndustryIntro.headline}
        </h2>
        <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
          {rootIndustryIntro.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          14대 뿌리기술
        </h2>
        <p className="mt-2 text-[13px] text-ink-muted">
          기반 6 · 소재다원화 4 · 지능화 4. 출처:{' '}
          <a
            href="https://www.kpic.re.kr/html/?pmode=main"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            국가뿌리산업진흥센터
          </a>
        </p>

        <div className="mt-6 space-y-8">
          {rootTechGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-[15px] font-semibold text-ink">
                {group.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                {group.description}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className={[
                      'border px-3 py-3',
                      rootGroupTone[group.id] ?? 'border-line bg-surface',
                    ].join(' ')}
                  >
                    <p className="text-[14px] font-medium text-ink">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-ink-muted">
                      {item.blurb}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {rootIndustryIntro.lawTitle}
        </h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {rootIndustryIntro.laws.map((law) => (
            <li key={law.name} className="py-4">
              <a
                href={law.url}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] font-medium text-ink transition-colors hover:text-accent"
              >
                {law.name} ↗
              </a>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {law.note}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function KsicSection() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {ksicIntro.headline}
        </h2>
        <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
          {ksicIntro.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          {ksicIntro.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink-muted transition-colors hover:text-accent"
              >
                {link.name} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          대분류 C · 중분류 목록
        </h2>
        <p className="mt-2 text-[13px] text-ink-muted">
          코드 10~34 · {industryClassifyMeta.ksicAsOf}
        </p>
        <ul className="mt-5 grid gap-x-6 gap-y-0 border-y border-line sm:grid-cols-2">
          {ksicManufacturingMids.map((item) => (
            <li
              key={item.code}
              className="flex items-baseline gap-3 border-b border-line py-2.5"
            >
              <span className="w-8 shrink-0 text-[12px] tabular-nums text-ink-faint">
                {item.code}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-ink">{item.name}</p>
                <p className="mt-0.5 text-[12px] text-ink-muted">{item.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
