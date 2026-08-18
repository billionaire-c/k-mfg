export type EngageKind = 'card-news' | 'notes'

export type EngageComment = {
  id: string
  nickname: string
  message: string
  createdAt: string
}

type EngageBucket = {
  views: number
  likes: number
  liked: boolean
  comments: EngageComment[]
}

type EngageStore = Record<string, EngageBucket>

const STORAGE_KEY = 'km-engagement-v2'

function storageKey(kind: EngageKind, id: string) {
  return `${kind}:${id}`
}

function emptyBucket(): EngageBucket {
  return {
    views: 0,
    likes: 0,
    liked: false,
    comments: [],
  }
}

function readStore(): EngageStore {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as EngageStore
  } catch {
    return {}
  }
}

function writeStore(store: EngageStore) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function ensureBucket(store: EngageStore, key: string): EngageBucket {
  if (!store[key]) store[key] = emptyBucket()
  return store[key]
}

export function getEngagement(kind: EngageKind, id: string): EngageBucket {
  const key = storageKey(kind, id)
  const store = readStore()
  return { ...ensureBucket(store, key) }
}

export function recordView(kind: EngageKind, id: string): EngageBucket {
  const key = storageKey(kind, id)
  const store = readStore()
  const bucket = ensureBucket(store, key)
  const sessionFlag = `km-viewed:${key}`
  if (typeof window !== 'undefined' && !sessionStorage.getItem(sessionFlag)) {
    bucket.views += 1
    sessionStorage.setItem(sessionFlag, '1')
    writeStore(store)
  }
  return { ...bucket }
}

export function toggleLike(kind: EngageKind, id: string): EngageBucket {
  const key = storageKey(kind, id)
  const store = readStore()
  const bucket = ensureBucket(store, key)
  if (bucket.liked) {
    bucket.liked = false
    bucket.likes = Math.max(0, bucket.likes - 1)
  } else {
    bucket.liked = true
    bucket.likes += 1
  }
  writeStore(store)
  return { ...bucket }
}

export function addComment(
  kind: EngageKind,
  id: string,
  nickname: string,
  message: string,
): EngageBucket {
  const key = storageKey(kind, id)
  const store = readStore()
  const bucket = ensureBucket(store, key)
  bucket.comments = [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nickname: nickname.trim().slice(0, 40),
      message: message.trim().slice(0, 500),
      createdAt: new Date().toISOString(),
    },
    ...bucket.comments,
  ]
  writeStore(store)
  return { ...bucket }
}

export function getNeighbors<T extends { id: string }>(
  items: T[],
  id: string,
): { prev: T | null; next: T | null; index: number } {
  const index = items.findIndex((item) => item.id === id)
  if (index < 0) return { prev: null, next: null, index: -1 }
  return {
    index,
    // 최신 글이 배열 앞 → 윗글=더 최신(index-1), 아랫글=더 이전(index+1)
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  }
}

export async function shareContent(payload: {
  title: string
  text: string
  url: string
}): Promise<'shared' | 'copied' | 'failed'> {
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share(payload)
      return 'shared'
    }
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') return 'failed'
  }

  try {
    await navigator.clipboard.writeText(payload.url)
    return 'copied'
  } catch {
    return 'failed'
  }
}
