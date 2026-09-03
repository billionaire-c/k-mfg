import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ContentPhotoStrip } from '../components/ContentPhotoStrip'
import { ModbusOtArchitecture } from '../components/ModbusOtArchitecture'
import { contentPhotoStrips } from '../data/contentPhotoStrips'
import {
  frameworks,
  legacyProtocols,
  modbusExample,
  otSecurityIntro,
  otSecurityLinks,
  otSecurityMeta,
  otVsIt,
  starterRoadmap,
  whyNeeded,
  workCategories,
  type WorkCategoryId,
} from '../data/otSecuritySamples'

function SectionStart({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <div className="border border-line bg-ink/[0.045] px-4 py-4 md:px-5 md:py-5 dark:bg-ink/[0.08]">
      <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  )
}

export function OtSecurityPage() {
  const [tab, setTab] = useState<WorkCategoryId>('arch')
  const active = workCategories.find((c) => c.id === tab) ?? workCategories[0]

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        OT Security
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {otSecurityMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {otSecurityMeta.subtitle}
      </p>
      <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
        {otSecurityMeta.disclaimer}
      </p>

      <ContentPhotoStrip
        className="mt-8"
        photos={contentPhotoStrips.otSecurity}
      />

      <section className="mt-12">
        <SectionStart title={otSecurityIntro.headline}>
          <div className="space-y-3 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
            {otSecurityIntro.paragraphs.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
        </SectionStart>
      </section>

      <section className="mt-12">
        <SectionStart title={otVsIt.headline} />
        <div className="mt-4 overflow-x-auto border border-line">
          <table className="min-w-[520px] w-full border-collapse text-left text-[12px] md:text-[13px]">
            <thead>
              <tr className="border-b border-line bg-surface/60">
                <th className="px-3 py-2.5 font-medium text-ink-faint">구분</th>
                <th className="px-3 py-2.5 font-medium text-ink-muted">IT</th>
                <th className="px-3 py-2.5 font-medium text-ink-muted">OT</th>
              </tr>
            </thead>
            <tbody>
              {otVsIt.rows.map((row) => (
                <tr key={row.aspect} className="border-b border-line last:border-b-0">
                  <th className="px-3 py-2.5 text-left font-semibold text-ink">
                    {row.aspect}
                  </th>
                  <td className="px-3 py-2.5 text-ink-muted">{row.it}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{row.ot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <SectionStart title={whyNeeded.headline} />
        <ul className="mt-5 space-y-3">
          {whyNeeded.items.map((item, index) => (
            <li
              key={item.title}
              className="border border-line bg-surface/40 px-4 py-4"
            >
              <p className="text-[12px] tabular-nums text-ink-faint">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 text-[15px] font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionStart title={legacyProtocols.headline}>
          <p className="text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
            {legacyProtocols.lead}
          </p>
        </SectionStart>
        <ul className="mt-4 space-y-2">
          {legacyProtocols.problems.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-[13px] leading-relaxed text-ink-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border border-accent/30 bg-accent/5 px-4 py-3 text-[13px] leading-relaxed text-ink-muted">
          {legacyProtocols.note}
        </p>
      </section>

      <section className="mt-12">
        <SectionStart title={frameworks.headline} />
        <ul className="mt-4 space-y-3">
          {frameworks.items.map((item) => (
            <li key={item.name} className="border-b border-line py-3 last:border-b-0">
              <p className="text-[14px] font-semibold text-ink">{item.name}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionStart title="무엇을 해야 하나">
          <p className="text-[13px] leading-relaxed text-ink-muted">
            하드웨어·솔루션·설계·운영을 나눠 보면, “장비만 사면 된다”는 오해를 줄일 수
            있습니다.
          </p>
        </SectionStart>

        <div
          role="tablist"
          aria-label="작업 구분"
          className="mt-5 flex flex-wrap border border-line"
        >
          {workCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={tab === cat.id}
              onClick={() => setTab(cat.id)}
              className={[
                'flex-1 min-w-[40%] px-3 py-2.5 text-left text-[13px] transition sm:min-w-0',
                tab === cat.id
                  ? 'bg-ink text-paper'
                  : 'bg-paper text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
          {active.summary}
        </p>
        <ul className="mt-4 space-y-3">
          {active.items.map((item) => (
            <li key={item.title} className="border border-line px-4 py-4">
              <p className="text-[11px] font-medium tracking-wide text-accent">
                {item.kind}
              </p>
              <h3 className="mt-1 text-[14px] font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionStart title={starterRoadmap.headline} />
        <ol className="mt-5 border border-line">
          {starterRoadmap.steps.map((step, index) => (
            <li
              key={step.title}
              className={[
                'flex gap-3 px-4 py-3.5',
                index === 0 ? '' : 'border-t border-line',
              ].join(' ')}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-surface text-[11px] font-semibold tabular-nums text-ink-faint">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <SectionStart title={modbusExample.headline}>
          <p className="text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
            {modbusExample.lead}
          </p>
        </SectionStart>
        <div className="mt-6">
          <ModbusOtArchitecture />
        </div>
        <ul className="mt-5 space-y-2">
          {modbusExample.notes.map((note) => (
            <li
              key={note}
              className="flex gap-2 text-[13px] leading-relaxed text-ink-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border border-line bg-surface/40 px-5 py-5">
        <h2 className="text-[15px] font-semibold text-ink">이어서 보기</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          {otSecurityLinks.map((link) => (
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
