import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { to: '/', label: '소개', end: true },
  { to: '/card-news', label: '카드뉴스' },
  { to: '/insights', label: '인사이트' },
  { to: '/youtube', label: '유튜브' },
  { to: '/map', label: '지도' },
  { to: '/guestbook', label: '방명록' },
  { to: '/search', label: '찾기' },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 md:px-6">
        <NavLink to="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo />
        </NavLink>

        <div className="flex items-center gap-3 md:gap-4">
          <nav aria-label="주 메뉴">
            <ul className="flex flex-wrap items-center justify-end gap-x-3.5 gap-y-1 text-[13px] text-ink-muted md:gap-x-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={'end' in item ? item.end : false}
                    className={({ isActive }) =>
                      [
                        'transition-colors hover:text-ink',
                        isActive ? 'font-medium text-ink' : '',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
