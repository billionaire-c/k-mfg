import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  caseIndustries,
  caseSamples,
  casesMeta,
  type CaseIndustry,
} from '../data/caseSamples'

export function CasesPage() {
  const [params] = useSearchParams()
  const initial = params.get('industry')
  const [industry, setIndustry] = useState<CaseIndustry | '전체'>(() => {
    if (
      initial &&
      caseIndustries.includes(initial as CaseIndustry | '전체')
    ) {
      return initial as CaseIndustry | '전체'
    }
    return '전체'
  })

  const items = useMemo(() => {
    if (industry === '전체') return caseSamples
    return caseSamples.filter((item) => item.industry === industry)
  }, [industry])

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Cases
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {casesMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {casesMeta.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {caseIndustries.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setIndustry(item)}
            className={[
              'border px-2.5 py-1 text-[12px] transition-colors',
              industry === item
                ? 'border-accent bg-accent text-paper'
                : 'border-line text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            {item}
          </button>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.id} id={item.id} className="scroll-mt-24 py-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-teal-300 bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-900 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-200">
                {item.industry}
              </span>
              <span className="text-[12px] text-ink-faint">{item.companyType}</span>
              <span className="text-[12px] text-ink-faint">· {item.date}</span>
            </div>

            <h2 className="mt-3 text-[17px] leading-snug font-semibold tracking-tight text-ink md:text-[18px]">
              {item.title}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              {item.summary}
            </p>

            <dl className="mt-5 grid gap-4 text-[13px] sm:grid-cols-2">
              <div>
                <dt className="text-ink-faint">과제</dt>
                <dd className="mt-1 text-ink-muted">{item.challenge}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">접근</dt>
                <dd className="mt-1 text-ink-muted">{item.approach}</dd>
              </div>
            </dl>

            <ul className="mt-5 flex flex-wrap gap-2">
              {item.outcomes.map((outcome) => (
                <li
                  key={outcome.label}
                  className="border border-line bg-surface px-2.5 py-1.5 text-[12px]"
                >
                  <span className="text-ink-faint">{outcome.label} </span>
                  <span className="font-semibold tabular-nums text-ink">
                    {outcome.value}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 border-l-2 border-accent/70 pl-3 text-[13px] leading-relaxed text-ink">
              {item.lesson}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
              {item.related.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-ink-muted transition-colors hover:text-accent"
                >
                  {link.label} »
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[12px] leading-relaxed text-ink-faint">
        {casesMeta.disclaimer}
      </p>

      <div className="mt-10 flex flex-wrap gap-4 text-[13px]">
        <Link to="/roadmap" className="text-ink-muted hover:text-accent">
          구축 로드맵 »
        </Link>
        <Link to="/check" className="text-ink-muted hover:text-accent">
          성숙도 체크 »
        </Link>
      </div>
    </div>
  )
}
