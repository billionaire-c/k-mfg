import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  fetchGuestbook,
  insertGuestbook,
  removeGuestbook,
  setGuestbookHidden,
} from '../lib/guestbookApi'
import {
  createId,
  formatDate,
  loadContent,
  saveContent,
} from '../lib/storage'
import { isSupabaseConfigured } from '../lib/supabase'
import type { ContentItem, ContentKind, GuestbookEntry } from '../lib/types'
import { useAuth } from './AuthContext'

type ContentContextValue = {
  contents: ContentItem[]
  guestbook: GuestbookEntry[]
  publishedContents: ContentItem[]
  visibleGuestbook: GuestbookEntry[]
  guestbookLoading: boolean
  addGuestbook: (nickname: string, message: string) => Promise<void>
  toggleGuestbookHidden: (id: string) => Promise<void>
  deleteGuestbook: (id: string) => Promise<void>
  upsertContent: (item: Omit<ContentItem, 'id'> & { id?: string }) => void
  deleteContent: (id: string) => void
  getByKind: (kind: ContentKind, publishedOnly?: boolean) => ContentItem[]
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const { isOwner } = useAuth()
  const [data, setData] = useState(() => loadContent())
  const [guestbookLoading, setGuestbookLoading] = useState(isSupabaseConfigured)

  const persist = (next: typeof data) => {
    setData(next)
    saveContent(next)
  }

  const refreshGuestbook = useCallback(async () => {
    if (!isSupabaseConfigured) return
    setGuestbookLoading(true)
    try {
      const rows = await fetchGuestbook(isOwner)
      setData((prev) => {
        const next = { ...prev, guestbook: rows }
        saveContent(next)
        return next
      })
    } catch (error) {
      console.error(error)
    } finally {
      setGuestbookLoading(false)
    }
  }, [isOwner])

  useEffect(() => {
    void refreshGuestbook()
  }, [refreshGuestbook])

  const value = useMemo<ContentContextValue>(() => {
    const publishedContents = data.contents.filter((item) => item.published)
    const visibleGuestbook = data.guestbook.filter((item) => !item.hidden)

    return {
      contents: data.contents,
      guestbook: data.guestbook,
      publishedContents,
      visibleGuestbook,
      guestbookLoading,
      addGuestbook: async (nickname, message) => {
        if (isSupabaseConfigured) {
          const entry = await insertGuestbook(nickname.trim(), message.trim())
          setData((prev) => {
            const next = { ...prev, guestbook: [entry, ...prev.guestbook] }
            saveContent(next)
            return next
          })
          return
        }

        const entry: GuestbookEntry = {
          id: createId('gb'),
          nickname: nickname.trim(),
          message: message.trim(),
          createdAt: new Date().toISOString(),
          hidden: false,
        }
        persist({
          ...data,
          guestbook: [entry, ...data.guestbook],
        })
      },
      toggleGuestbookHidden: async (id) => {
        const current = data.guestbook.find((item) => item.id === id)
        if (!current) return

        if (isSupabaseConfigured) {
          await setGuestbookHidden(id, !current.hidden)
          setData((prev) => {
            const next = {
              ...prev,
              guestbook: prev.guestbook.map((item) =>
                item.id === id ? { ...item, hidden: !item.hidden } : item,
              ),
            }
            saveContent(next)
            return next
          })
          return
        }

        persist({
          ...data,
          guestbook: data.guestbook.map((item) =>
            item.id === id ? { ...item, hidden: !item.hidden } : item,
          ),
        })
      },
      deleteGuestbook: async (id) => {
        if (isSupabaseConfigured) {
          await removeGuestbook(id)
          setData((prev) => {
            const next = {
              ...prev,
              guestbook: prev.guestbook.filter((item) => item.id !== id),
            }
            saveContent(next)
            return next
          })
          return
        }

        persist({
          ...data,
          guestbook: data.guestbook.filter((item) => item.id !== id),
        })
      },
      upsertContent: (item) => {
        if (item.id) {
          persist({
            ...data,
            contents: data.contents.map((current) =>
              current.id === item.id ? { ...current, ...item, id: item.id } : current,
            ),
          })
          return
        }
        const created: ContentItem = {
          ...item,
          id: createId(item.kind.slice(0, 2)),
          date: item.date || formatDate(),
        }
        persist({
          ...data,
          contents: [created, ...data.contents],
        })
      },
      deleteContent: (id) => {
        persist({
          ...data,
          contents: data.contents.filter((item) => item.id !== id),
        })
      },
      getByKind: (kind, publishedOnly = true) =>
        data.contents.filter(
          (item) => item.kind === kind && (!publishedOnly || item.published),
        ),
    }
  }, [data, guestbookLoading])

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
