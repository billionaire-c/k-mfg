import {
  cardNewsPreview,
  insightsPreview,
  youtubePreview,
} from '../data/placeholders'
import type { ContentItem, GuestbookEntry, SiteContent } from './types'

const STORAGE_KEY = 'km-site-content-v1'
const AUTH_KEY = 'km-owner-auth'
const THEME_KEY = 'km-theme'

export const OWNER_PASSWORD = import.meta.env.VITE_OWNER_PASSWORD || 'km-owner'

export function seedContent(): SiteContent {
  const contents: ContentItem[] = [
    ...cardNewsPreview.map((item) => ({
      ...item,
      kind: 'card-news' as const,
      published: true,
    })),
    ...insightsPreview.map((item) => ({
      ...item,
      kind: 'insight' as const,
      published: true,
    })),
    ...youtubePreview.map((item) => ({
      id: item.id,
      kind: 'youtube' as const,
      title: item.title,
      date: '2026.00.00',
      summary: '유튜브 영상 플레이스홀더',
      embedUrl: item.embedUrl,
      published: true,
    })),
  ]

  return { contents, guestbook: [] }
}

export function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedContent()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    return JSON.parse(raw) as SiteContent
  } catch {
    return seedContent()
  }
}

export function saveContent(data: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function isOwnerAuthed() {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function setOwnerAuthed(value: boolean) {
  if (value) sessionStorage.setItem(AUTH_KEY, '1')
  else sessionStorage.removeItem(AUTH_KEY)
}

export function loadTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function saveTheme(theme: 'light' | 'dark') {
  localStorage.setItem(THEME_KEY, theme)
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function formatDate(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

export type { ContentItem, GuestbookEntry, SiteContent }
