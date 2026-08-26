import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  smartDomains,
  smartFactoryDefinition,
  smartFactoryIntroMeta,
  smartFactoryScope,
  smartLevelNote,
  smartLevels,
  smartRequirements,
  type SmartLevelId,
} from '../data/smartFactoryIntroSamples'

export function SmartFactoryIntroPage() {
  const [hovered, setHovered] = useState<SmartLevelId | null>(null)
  const [pinned, setPinned] = useState<SmartLevelId | null>('basic')
  const active = hovered ?? pinned ?? 'basic'
  const activeLevel = smartLevels.find((l) => l.id === active) ?? smartLevels[1]

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Smart Factory
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {smartFactoryIntroMeta.title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {smartFactoryIntroMeta.subtitle}
      </p>
      <p className="mt-3 text-[13px] text-ink-faint">
        참고:{' '}
        <a
          href={smartFactoryIntroMeta.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-ink-muted underline-offset-2 hover:text-accent hover:underline"
        >
          {smartFactoryIntroMeta.sourceName} ↗
        </a>
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {smartFactoryDefinition.headline}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
          {smartFactoryDefinition.body}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {smartFactoryScope.headline}
        </h2>
        <p className="mt-4 text-[15px] font-medium leading-relaxed text-ink">
          {smartFactoryScope.lead}
        </p>
        <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
          {smartFactoryScope.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {smartLevelNote.headline}
        </h2>
        <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
          {smartLevelNote.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <p className="mt-6 text-[12px] text-ink-faint">
          아래가 낮은 단계, 위로 갈수록 높은 수준입니다. 단계를 누르거나 올려
          두면 표와 설명이 함께 강조됩니다.
        </p>

        {/* 아래에서 위로: 저수준 → 고수준 */}
        <div
          className="mt-4 flex flex-col-reverse gap-0 border border-line"
          onMouseLeave={() => setHovered(null)}
        >
          {smartLevels.map((level, index) => {
            const isActive = active === level.id
            const isTop = index === smartLevels.length - 1
            return (
              <button
                key={level.id}
                type="button"
                onMouseEnter={() => setHovered(level.id)}
                onFocus={() => setHovered(level.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned(level.id)}
                className={[
                  'flex w-full items-center gap-3 border-line px-4 py-3 text-left transition-all duration-200',
                  isTop ? '' : 'border-t',
                  isActive
                    ? 'bg-accent text-paper'
                    : 'bg-paper text-ink-muted hover:bg-surface hover:text-ink',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-7 w-7 shrink-0 items-center justify-center text-[11px] font-semibold tabular-nums',
                    isActive
                      ? 'bg-paper/20 text-paper'
                      : 'bg-surface text-ink-faint',
                  ].join(' ')}
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold">
                    {level.label}
                  </span>
                  <span
                    className={[
                      'mt-0.5 block text-[12px] leading-snug',
                      isActive ? 'text-paper/80' : 'text-ink-faint',
                    ].join(' ')}
                  >
                    {level.highlight}
                  </span>
                </span>
                {isTop ? (
                  <span
                    className={[
                      'shrink-0 text-[11px]',
                      isActive ? 'text-paper/70' : 'text-ink-faint',
                    ].join(' ')}
                  >
                    ↑ 고수준
                  </span>
                ) : null}
                {index === 0 ? (
                  <span
                    className={[
                      'shrink-0 text-[11px]',
                      isActive ? 'text-paper/70' : 'text-ink-faint',
                    ].join(' ')}
                  >
                    저수준
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-4 border border-accent/40 bg-accent/5 px-4 py-4 transition-all duration-200">
          <p className="text-[12px] font-medium tracking-[0.08em] text-accent uppercase">
            {activeLevel.label}
          </p>
          <p className="mt-2 text-[15px] font-medium leading-relaxed text-ink">
            {activeLevel.highlight}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
            {activeLevel.summary}
          </p>
        </div>

        <div
          className="mt-6 overflow-x-auto border border-line"
          onMouseLeave={() => setHovered(null)}
        >
          <table className="min-w-[560px] w-full border-collapse text-left text-[12px] md:text-[13px]">
            <thead>
              <tr className="border-b border-line bg-surface/60">
                <th className="sticky left-0 z-10 bg-surface/95 px-3 py-2.5 font-medium text-ink-muted">
                  단계 ↑
                </th>
                {smartDomains.map((domain) => (
                  <th
                    key={domain.id}
                    className="px-2.5 py-2.5 font-medium text-ink-muted"
                  >
                    {domain.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 표도 위=고수준, 아래=저수준 */}
              {[...smartLevels].reverse().map((level) => {
                const isActive = active === level.id
                const dimmed = Boolean(hovered || pinned) && !isActive
                return (
                  <tr
                    key={level.id}
                    onMouseEnter={() => setHovered(level.id)}
                    onClick={() => setPinned(level.id)}
                    className={[
                      'cursor-pointer border-b border-line last:border-b-0 transition-all duration-200',
                      isActive ? 'bg-accent/12' : dimmed ? 'opacity-45' : '',
                    ].join(' ')}
                  >
                    <th
                      className={[
                        'sticky left-0 z-10 px-3 py-2.5 text-left font-semibold transition-colors',
                        isActive
                          ? 'bg-accent text-paper'
                          : 'bg-paper text-ink',
                      ].join(' ')}
                    >
                      {level.short}
                    </th>
                    {smartDomains.map((domain) => (
                      <td
                        key={`${level.id}-${domain.id}`}
                        className={[
                          'px-2.5 py-2.5 leading-snug transition-colors',
                          isActive
                            ? 'font-medium text-ink'
                            : 'text-ink-muted',
                        ].join(' ')}
                      >
                        {level.cells[domain.id]}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          5대 요건
        </h2>
        <p className="mt-2 text-[13px] text-ink-muted">
          스마트공장을 구성하고 수준별로 높여 갈 때 필요한 다섯 가지 조건입니다.
        </p>
        <ul className="mt-5 space-y-3">
          {smartRequirements.map((item, index) => (
            <li
              key={item.id}
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

      <section className="mt-12 border border-line bg-surface/40 px-5 py-5">
        <h2 className="text-[15px] font-semibold text-ink">다음으로</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
          우리 공장이 어느 단계에 가까운지 가늠해 보고, 지원·사례·로드맵으로
          이어가 보세요.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          <li>
            <Link to="/check" className="text-ink transition-colors hover:text-accent">
              성숙도 체크 »
            </Link>
          </li>
          <li>
            <Link to="/map" className="text-ink transition-colors hover:text-accent">
              지도 »
            </Link>
          </li>
          <li>
            <Link to="/policy" className="text-ink transition-colors hover:text-accent">
              지원사업 »
            </Link>
          </li>
          <li>
            <Link to="/roadmap" className="text-ink transition-colors hover:text-accent">
              도입 로드맵 »
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
