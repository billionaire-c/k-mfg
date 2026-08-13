import { useState } from 'react'
import { site } from '../data/placeholders'

const items = [
  {
    label: 'YouTube',
    href: site.links.youtube,
    ready: true,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: site.links.instagram,
    ready: false,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: site.links.email,
    ready: false,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="m4.5 7.5 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const

type SocialLinksProps = {
  className?: string
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  const [toast, setToast] = useState<string | null>(null)

  const showSoon = (label: string) => {
    setToast(`${label} 준비중입니다.`)
    window.setTimeout(() => setToast(null), 1600)
  }

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-muted">
        {items.map((item) => (
          <li key={item.label} className="relative">
            {item.ready ? (
              <a
                href={item.href}
                className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-accent hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ) : (
              <button
                type="button"
                title="준비중입니다."
                onClick={() => showSoon(item.label)}
                onMouseEnter={() => setToast(`${item.label} 준비중입니다.`)}
                onMouseLeave={() => setToast(null)}
                className="group inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
              >
                {item.icon}
                <span>{item.label}</span>
                <span className="pointer-events-none absolute top-full left-0 z-10 mt-1 hidden whitespace-nowrap rounded bg-ink px-2 py-1 text-[11px] text-paper group-hover:block">
                  준비중입니다.
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>
      {toast ? (
        <p className="mt-2 text-[12px] text-ink-faint md:hidden" aria-live="polite">
          {toast}
        </p>
      ) : null}
    </div>
  )
}
