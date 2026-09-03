import { Link } from 'react-router-dom'
import { ContentPhotoStrip } from '../components/ContentPhotoStrip'
import { YearBarChart } from '../components/YearBarChart'
import { contentPhotoStrips } from '../data/contentPhotoStrips'
import {
  smartFactoryYearCharts,
  smartNumberSections,
  smartNumbersLinks,
  smartNumbersMeta,
  type SmartStat,
  type StatTone,
} from '../data/smartFactoryNumbers'

function toneClass(tone: StatTone): string {
  if (tone === 'up') return 'text-accent'
  if (tone === 'down') return 'text-accent'
  return 'text-ink'
}

export function SmartFactoryNumbersPage() {
  const charts = smartFactoryYearCharts

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        In Numbers
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {smartNumbersMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {smartNumbersMeta.subtitle}
      </p>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
        {smartNumbersMeta.disclaimer}
      </p>

      <ContentPhotoStrip
        className="mt-8"
        photos={contentPhotoStrips.smartNumbers}
      />

      <section className="mt-12">
        <div className="border border-line bg-ink/[0.045] px-4 py-4 md:px-5 md:py-5 dark:bg-ink/[0.08]">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            {charts.title}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
            {charts.lead}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <YearBarChart
            title={charts.cumulative.title}
            unit={charts.cumulative.unit}
            points={charts.cumulative.points}
            barClass="bg-[#4a5c50] dark:bg-[#9fc4b4]"
          />
          <YearBarChart
            title={charts.annualNew.title}
            unit={charts.annualNew.unit}
            points={charts.annualNew.points}
            barClass="bg-[#53B6A9] dark:bg-[#6dd4c8]"
          />
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
          {charts.note}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
          출처 ·{' '}
          {charts.sources.map((source, index) => (
            <span key={source.name}>
              {index > 0 ? ' · ' : null}
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 hover:text-accent hover:underline"
                >
                  {source.name}
                </a>
              ) : (
                source.name
              )}
            </span>
          ))}
        </p>
      </section>

      {smartNumberSections.map((section) => (
        <section key={section.id} className="mt-12">
          <div className="border border-line bg-ink/[0.045] px-4 py-4 md:px-5 md:py-5 dark:bg-ink/[0.08]">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {section.title}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              {section.lead}
            </p>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item.id} className="min-w-0">
                <StatCard item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-12 border border-line bg-surface/40 px-5 py-5">
        <h2 className="text-[15px] font-semibold text-ink">이어서 보기</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          {smartNumbersLinks.map((link) => (
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

function StatCard({ item }: { item: SmartStat }) {
  return (
    <article className="flex h-full flex-col border border-line px-4 py-4 md:px-4 md:py-5">
      <p className="text-[11px] font-medium tracking-[0.08em] text-ink-faint uppercase">
        {item.tag}
      </p>
      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
        <p
          className={[
            'text-[2.25rem] leading-none font-semibold tracking-tight tabular-nums md:text-[2.6rem]',
            toneClass(item.tone),
          ].join(' ')}
        >
          {item.display}
          {item.unit ? (
            <span className="ml-0.5 text-[1.15rem] font-semibold md:text-[1.25rem]">
              {item.unit}
            </span>
          ) : null}
        </p>
      </div>
      <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-ink md:text-[16px]">
        {item.effect}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-muted">
        {item.body}
      </p>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
        출처 ·{' '}
        {item.source.url ? (
          <a
            href={item.source.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-accent hover:underline"
          >
            {item.source.name}
          </a>
        ) : (
          item.source.name
        )}
        {item.source.note ? ` · ${item.source.note}` : ''}
      </p>
    </article>
  )
}
