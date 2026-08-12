import { Link } from 'react-router-dom'
import { site } from '../data/placeholders'
import { Logo } from './Logo'

const footerLinks = [
  { label: 'YOUTUBE', href: site.links.youtube, external: true },
  { label: 'INSTAGRAM', href: site.links.instagram, external: true },
  { label: 'RSS', href: '/rss.xml', external: true },
  { label: '오너 로그인', href: '/admin/login', external: false },
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
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="transition-colors hover:text-white"
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
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
