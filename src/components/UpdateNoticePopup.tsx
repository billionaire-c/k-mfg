import { useEffect, useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { updateNotice } from '../data/updateNotice'

const STORAGE_KEY = 'km-update-notice-seen'

export function UpdateNoticePopup() {
  const location = useLocation()
  const titleId = useId()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setOpen(false)
      return
    }

    try {
      const seen = localStorage.getItem(STORAGE_KEY)
      setOpen(seen !== updateNotice.id)
    } catch {
      setOpen(true)
    }
  }, [location.pathname])

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, updateNotice.id)
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
      onClick={dismiss}
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
        <button
          type="button"
          onClick={dismiss}
          className="mt-6 w-full border border-ink bg-ink px-4 py-2.5 text-[13px] font-medium text-paper transition hover:opacity-90"
        >
          확인
        </button>
      </div>
    </div>
  )
}
