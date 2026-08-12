export type ContentKind = 'card-news' | 'insight' | 'youtube'

export type ContentItem = {
  id: string
  kind: ContentKind
  title: string
  date: string
  summary: string
  body?: string
  embedUrl?: string
  published: boolean
}

export type GuestbookEntry = {
  id: string
  nickname: string
  message: string
  createdAt: string
  hidden: boolean
}

export type SiteContent = {
  contents: ContentItem[]
  guestbook: GuestbookEntry[]
}
