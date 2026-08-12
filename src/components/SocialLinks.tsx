import { site } from '../data/placeholders'

const items = [
  {
    label: 'YouTube',
    href: site.links.youtube,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: site.links.instagram,
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
  return (
    <ul
      className={[
        'flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-muted',
        className,
      ].join(' ')}
    >
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-accent hover:underline"
            {...(item.href.startsWith('http')
              ? { target: '_blank', rel: 'noreferrer' }
              : {})}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
