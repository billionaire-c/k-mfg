import { Link } from 'react-router-dom'
import { site } from '../data/placeholders'
import { Logo } from './Logo'

const footerLinks = [
  {
    label: 'YOUTUBE',
    href: site.links.youtube,
    kind: 'external' as const,
  },
  {
    label: 'INSTAGRAM',
    href: '',
    kind: 'soon' as const,
  },
  {
    label: 'RSS',
    href: '/rss.xml',
    kind: 'external' as const,
  },
  {
    label: '사이트맵',
    href: '/sitemap',
    kind: 'route' as const,
  },
  {
    label: '오너 로그인',
    href: '/admin/login',
    kind: 'route' as const,
  },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-transparent bg-footer text-footer-muted dark:border-t-footer-line">
      <div className="mx-auto max-w-3xl px-5 pt-3 pb-10 md:px-6 md:pt-4 md:pb-12">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Logo inverted className="-mt-1 h-[5.4rem] md:h-[6.3rem]" />

            <nav aria-label="푸터 링크">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.12em] text-footer-muted uppercase md:justify-end">
                {footerLinks.map((link) => (
                  <li key={link.label} className="relative">
                    {link.kind === 'soon' ? (
                      <button
                        type="button"
                        title="준비중입니다."
                        onClick={(e) => {
                          e.preventDefault()
                          window.alert('준비중입니다.')
                        }}
                        className="group transition-colors hover:text-white"
                      >
                        {link.label}
                        <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[10px] tracking-normal text-black normal-case group-hover:block">
                          준비중입니다.
                        </span>
                      </button>
                    ) : link.kind === 'route' ? (
                      <Link
                        to={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="transition-colors hover:text-white"
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="max-w-xs text-[13px] leading-relaxed text-footer-muted">
            {site.tagline}
          </p>
        </div>

        <div className="mt-10 border-t border-footer-line pt-6 text-center text-[12px] text-footer-muted">
          {new Date().getFullYear()} © {site.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
