import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

type NavLinkItem = {
  type: 'link'
  to: string
  label: string
  end?: boolean
}

type NavGroupItem = {
  type: 'group'
  label: string
  children: { to: string; label: string }[]
}

type NavItem = NavLinkItem | NavGroupItem

const navItems: NavItem[] = [
  { type: 'link', to: '/', label: '소개', end: true },
  { type: 'link', to: '/card-news', label: '카드뉴스' },
  { type: 'link', to: '/insights', label: '인사이트' },
  { type: 'link', to: '/youtube', label: '유튜브' },
  {
    type: 'group',
    label: '스마트 공장',
    children: [
      { to: '/map', label: '지도' },
      { to: '/policy', label: '지원사업' },
    ],
  },
  { type: 'link', to: '/glossary', label: '용어' },
  { type: 'link', to: '/guestbook', label: '방명록' },
  { type: 'link', to: '/search', label: '찾기' },
]

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
              {navItems.map((item) =>
                item.type === 'link' ? (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
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
                ) : (
                  <SmartFactoryMenu key={item.label} item={item} />
                ),
              )}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function SmartFactoryMenu({ item }: { item: NavGroupItem }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLLIElement>(null)
  const childActive = item.children.some((child) =>
    location.pathname.startsWith(child.to),
  )

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <li ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={[
          'inline-flex items-center gap-1 transition-colors hover:text-ink',
          childActive || open ? 'font-medium text-ink' : '',
        ].join(' ')}
      >
        {item.label}
        <span className="text-[10px] text-ink-faint" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open ? (
        <ul
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 min-w-[8.5rem] border border-line bg-paper py-1 shadow-sm"
        >
          {item.children.map((child) => (
            <li key={child.to} role="none">
              <NavLink
                role="menuitem"
                to={child.to}
                className={({ isActive }) =>
                  [
                    'block px-3 py-2 text-[13px] transition-colors hover:bg-surface hover:text-ink',
                    isActive ? 'font-medium text-ink' : 'text-ink-muted',
                  ].join(' ')
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
