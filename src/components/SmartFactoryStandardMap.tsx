import { useMemo, useState } from 'react'
import {
  smartFactoryMapCells,
  smartFactoryMapMeta,
  type ProcessAreaId,
  type TechFieldId,
} from '../data/smartFactoryStandardMap'

export function SmartFactoryStandardMap() {
  const [processId, setProcessId] = useState<ProcessAreaId>('collect')
  const [techId, setTechId] = useState<TechFieldId>('data')

  const standards = useMemo(
    () => smartFactoryMapCells[processId]?.[techId] ?? [],
    [processId, techId],
  )

  const process = smartFactoryMapMeta.processAreas.find((p) => p.id === processId)
  const tech = smartFactoryMapMeta.techFields.find((t) => t.id === techId)

  return (
    <div className="border border-line bg-surface/40 px-4 py-5 md:px-5">
      <p className="text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Standard map
      </p>
      <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink">
        {smartFactoryMapMeta.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
        {smartFactoryMapMeta.subtitle}
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[560px] w-full border-collapse text-left text-[11px] md:text-[12px]">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-surface/95 px-2 py-2 font-medium text-ink-faint">
                공정 \ 기술
              </th>
              {smartFactoryMapMeta.techFields.map((field) => (
                <th
                  key={field.id}
                  className="px-1.5 py-2 text-center font-medium text-ink-muted"
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {smartFactoryMapMeta.processAreas.map((area) => (
              <tr key={area.id} className="border-t border-line">
                <th className="sticky left-0 z-10 bg-paper px-2 py-2 text-left font-semibold text-ink">
                  {area.label}
                </th>
                {smartFactoryMapMeta.techFields.map((field) => {
                  const cell = smartFactoryMapCells[area.id]?.[field.id]
                  const active = processId === area.id && techId === field.id
                  const has = Boolean(cell?.length)
                  return (
                    <td key={field.id} className="p-1">
                      <button
                        type="button"
                        disabled={!has}
                        onClick={() => {
                          setProcessId(area.id)
                          setTechId(field.id)
                        }}
                        className={[
                          'flex h-10 w-full items-center justify-center border text-[11px] transition',
                          active
                            ? 'border-accent bg-accent text-paper'
                            : has
                              ? 'border-line bg-paper text-ink-muted hover:border-accent/50 hover:text-ink'
                              : 'cursor-default border-transparent bg-transparent text-ink-faint/40',
                        ].join(' ')}
                        aria-label={`${area.label} × ${field.label}`}
                      >
                        {has ? `★${cell![0].stars}` : '·'}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border border-accent/30 bg-accent/5 px-4 py-4">
        <p className="text-[12px] font-medium text-accent">
          {process?.label} × {tech?.label}
        </p>
        {standards.length === 0 ? (
          <p className="mt-2 text-[13px] text-ink-muted">
            이 교차점은 요약본에 대표 표준을 넣지 않았습니다. 원문 세부
            지도를 확인하세요.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {standards.map((item) => (
              <li key={item.code}>
                <p className="text-[14px] font-medium text-ink">
                  {item.code}
                  <span className="ml-2 text-[11px] font-normal text-ink-faint">
                    {'★'.repeat(item.stars)}
                  </span>
                </p>
                <p className="mt-0.5 text-[12px] text-ink-muted">{item.name}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
        {smartFactoryMapMeta.sourceNote}{' '}
        <a
          href={smartFactoryMapMeta.portalUrl}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 hover:text-accent hover:underline"
        >
          자료실 ↗
        </a>
      </p>
    </div>
  )
}
