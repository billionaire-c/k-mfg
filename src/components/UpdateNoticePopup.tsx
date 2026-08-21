import { useEffect, useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { updateNotice } from '../data/updateNotice'

const STORAGE_KEY = 'km-update-notice'
const SESSION_KEY = 'km-update-notice-session'
const DAY_MS = 24 * 60 * 60 * 1000

type StoredNotice = {
  id: string
  mode: 'snooze'
  until: number
}

function readSnooze(): StoredNotice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredNotice
  } catch {
    return null
  }
}

function isSnoozed(): boolean {
  const stored = readSnooze()
  if (!stored || stored.id !== updateNotice.id) return false
  return stored.mode === 'snooze' && Date.now() < stored.until
}

function isClosedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === updateNotice.id
  } catch {
    return false
  }
}

function shouldShow(): boolean {
  if (isSnoozed()) return false
  if (isClosedThisSession()) return false
  return true
}

export function UpdateNoticePopup() {
  const location = useLocation()
  const titleId = useId()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setOpen(false)
      return
    }
    setOpen(shouldShow())
  }, [location.pathname])

  function closeOnly() {
    try {
      sessionStorage.setItem(SESSION_KEY, updateNotice.id)
    } catch {
      // ignore
    }
    setOpen(false)
  }

  function snoozeOneDay() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          id: updateNotice.id,
          mode: 'snooze',
          until: Date.now() + DAY_MS,
        } satisfies StoredNotice),
      )
      sessionStorage.setItem(SESSION_KEY, updateNotice.id)
    } catch {
      // ignore
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-5 backdrop-blur-[2px]"
      role="presentation"
      onClick={closeOnly}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md border border-line bg-paper p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
          Update · {updateNotice.date}
        </p>
        <h2
          id={titleId}
          className="mt-2 text-lg font-semibold tracking-tight text-ink"
        >
          {updateNotice.greeting}
        </h2>
        <p className="mt-4 text-[13px] font-medium text-ink">이번 업데이트</p>
        <ul className="mt-2 space-y-2">
          {updateNotice.updates.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-[13px] leading-relaxed text-ink-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={closeOnly}
            className="flex-1 border border-line bg-paper px-4 py-2.5 text-[13px] font-medium text-ink transition hover:bg-surface"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={snoozeOneDay}
            className="flex-1 border border-ink bg-ink px-4 py-2.5 text-[13px] font-medium text-paper transition hover:opacity-90"
          >
            하루 동안 열지 않기
          </button>
        </div>
      </div>
    </div>
  )
}
