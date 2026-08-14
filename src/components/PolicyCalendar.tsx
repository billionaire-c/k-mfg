import { useMemo, useState } from 'react'
import {
  policyAgencyClass,
  policyStatusClass,
} from './PolicyList'
import {
  policyCoversDate,
  policyOverlapsMonth,
  type PolicySample,
} from '../data/policySamples'

type PolicyCalendarProps = {
  items: PolicySample[]
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

/** 지원건별 고정 색 (같은 id = 같은 색 바) */
const BAR_COLORS = [
  'bg-teal-500',
  'bg-sky-500',
  'bg-amber-500',
  'bg-orange-500',
  'bg-cyan-600',
  'bg-lime-600',
  'bg-rose-500',
  'bg-indigo-500',
]

const MAX_BARS = 3

function toIso(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function barColor(itemId: string, monthItems: PolicySample[]) {
  const idx = monthItems.findIndex((item) => item.id === itemId)
  return BAR_COLORS[(idx < 0 ? 0 : idx) % BAR_COLORS.length]
}

export function PolicyCalendar({ items }: PolicyCalendarProps) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [monthIndex, setMonthIndex] = useState(today.getMonth())
  const [selected, setSelected] = useState(
    toIso(today.getFullYear(), today.getMonth(), today.getDate()),
  )

  const monthItems = useMemo(
    () =>
      items
        .filter((item) => policyOverlapsMonth(item, year, monthIndex))
        .slice()
        .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [items, year, monthIndex],
  )

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const startWeekday = new Date(year, monthIndex, 1).getDay()
  const cells: Array<number | null> = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const selectedItems = monthItems.filter((item) =>
    policyCoversDate(item, selected),
  )

  const shiftMonth = (delta: number) => {
    const d = new Date(year, monthIndex + delta, 1)
    setYear(d.getFullYear())
    setMonthIndex(d.getMonth())
    setSelected(toIso(d.getFullYear(), d.getMonth(), 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="border border-line px-3 py-1.5 text-[13px] text-ink-muted hover:border-ink hover:text-ink"
        >
          이전
        </button>
        <h2 className="text-[17px] font-semibold tracking-tight text-ink">
          {year}년 {monthIndex + 1}월
        </h2>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="border border-line px-3 py-1.5 text-[13px] text-ink-muted hover:border-ink hover:text-ink"
        >
          다음
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[12px] text-ink-faint">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 font-medium">
            {d}
          </div>
        ))}
        {cells.map((day, index) => {
          if (!day) return <div key={`e-${index}`} className="min-h-[4.5rem]" />
          const iso = toIso(year, monthIndex, day)
          const dayItems = monthItems.filter((item) =>
            policyCoversDate(item, iso),
          )
          const visible = dayItems.slice(0, MAX_BARS)
          const extra = dayItems.length - visible.length
          const isSelected = selected === iso
          const isToday =
            iso ===
            toIso(today.getFullYear(), today.getMonth(), today.getDate())

          return (
            <button
              key={iso}
              type="button"
              onClick={() => setSelected(iso)}
              title={
                dayItems.length
                  ? dayItems.map((item) => item.title).join('\n')
                  : undefined
              }
              className={[
                'relative flex min-h-[4.5rem] flex-col border px-1 py-1 text-left transition-colors',
                isSelected
                  ? 'border-ink bg-surface'
                  : 'border-line bg-paper hover:border-ink/40',
                isToday && !isSelected ? 'ring-1 ring-teal-500/60' : '',
              ].join(' ')}
            >
              <span
                className={[
                  'text-[12px] font-medium',
                  isSelected ? 'text-ink' : 'text-ink-muted',
                ].join(' ')}
              >
                {day}
              </span>

              <div className="mt-1 flex flex-1 flex-col justify-end gap-0.5 pb-0.5">
                {visible.map((item) => (
                  <span
                    key={item.id}
                    className={[
                      'block h-1.5 w-full rounded-sm',
                      barColor(item.id, monthItems),
                      isSelected ? 'opacity-100' : 'opacity-90',
                    ].join(' ')}
                    aria-hidden
                  />
                ))}
                {extra > 0 ? (
                  <span className="text-[9px] leading-none text-ink-faint">
                    +{extra}
                  </span>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>

      {monthItems.length > 0 ? (
        <ul className="flex flex-col gap-2 border border-line px-3 py-3">
          <li className="text-[11px] font-medium tracking-[0.08em] text-ink-faint uppercase">
            이달 지원건 색상
          </li>
          {monthItems.map((item) => (
            <li key={item.id} className="flex items-start gap-2 text-[12px]">
              <span
                className={[
                  'mt-1 h-2 w-4 shrink-0 rounded-sm',
                  barColor(item.id, monthItems),
                ].join(' ')}
              />
              <span className="min-w-0 leading-snug text-ink-muted">
                <span className="font-medium text-ink">{item.title}</span>
                <span className="text-ink-faint"> · {item.period}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <div>
        <p className="mb-3 text-[12px] text-ink-faint">
          {selected.replaceAll('-', '.')} · {selectedItems.length}건
        </p>
        {selectedItems.length === 0 ? (
          <p className="border border-line px-4 py-6 text-[14px] text-ink-muted">
            이 날짜에 접수 기간이 겹치는 공고가 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-line border border-line">
            {selectedItems.map((item) => (
              <li key={item.id} className="px-4 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      'h-2.5 w-2.5 rounded-sm',
                      barColor(item.id, monthItems),
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'border px-2 py-0.5 text-[11px] font-medium',
                      policyStatusClass[item.status],
                    ].join(' ')}
                  >
                    {item.status}
                  </span>
                  <span
                    className={[
                      'border px-2 py-0.5 text-[11px] font-medium',
                      policyAgencyClass[item.agencyGroup],
                    ].join(' ')}
                  >
                    {item.agencyGroup}
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-[15px] font-semibold text-ink underline-offset-2 hover:underline"
                >
                  {item.title} ↗
                </a>
                <p className="mt-1 text-[13px] text-ink-muted">{item.period}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function PolicyTimeline({ items }: { items: PolicySample[] }) {
  const sorted = useMemo(
    () =>
      [...items].sort((a, b) =>
        a.startDate === b.startDate
          ? a.endDate.localeCompare(b.endDate)
          : a.startDate.localeCompare(b.startDate),
      ),
    [items],
  )

  if (sorted.length === 0) {
    return (
      <p className="border-y border-line py-10 text-[14px] text-ink-muted">
        표시할 일정이 없습니다.
      </p>
    )
  }

  return (
    <ol className="relative ml-3 space-y-0 border-l border-line">
      {sorted.map((item) => (
        <li key={item.id} className="relative pb-8 pl-6 last:pb-0">
          <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-teal-600 dark:bg-teal-400" />
          <div className="flex flex-wrap gap-2">
            <span
              className={[
                'border px-2 py-0.5 text-[11px] font-medium',
                policyStatusClass[item.status],
              ].join(' ')}
            >
              {item.status}
            </span>
            <span className="text-[12px] text-ink-faint">{item.period}</span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-[15px] font-semibold text-ink underline-offset-2 hover:underline"
          >
            {item.title} ↗
          </a>
          <p className="mt-1 text-[13px] text-ink-muted">{item.agency}</p>
        </li>
      ))}
    </ol>
  )
}
