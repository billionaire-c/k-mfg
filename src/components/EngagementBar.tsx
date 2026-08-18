import { useEffect, useState, type MouseEvent } from 'react'
import {
  getEngagement,
  recordView,
  shareContent,
  toggleLike,
  type EngageKind,
} from '../lib/engagement'

type EngagementBarProps = {
  kind: EngageKind
  id: string
  title: string
  summary: string
  /** 목록에서는 조회 기록하지 않음 */
  trackView?: boolean
  compact?: boolean
  /** 카드뉴스 상세처럼 항상 밝은 배경일 때 */
  onLight?: boolean
}

function formatCount(n: number) {
  return n.toLocaleString('ko-KR')
}

function ThumbUpIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        aria-hidden
        fill="currentColor"
      >
        <path d="M2 10.5c0-.83.67-1.5 1.5-1.5h3v8h-3A1.5 1.5 0 0 1 2 15.5v-5ZM21.65 10.2c.4-.4.6-.9.55-1.45-.1-1.05-1.05-1.85-2.15-1.85h-4.3l.65-3.1c.15-.7-.1-1.4-.65-1.85-.55-.45-1.3-.5-1.9-.15l-1.05.6c-.35.2-.6.5-.7.9L10.4 7H7.5v8.2l4.35 4.35c.4.4.9.6 1.45.55.55-.05 1.05-.35 1.35-.8l4.85-7.1c.25-.4.35-.85.25-1.3-.05-.2-.15-.4-.3-.55l-.8-.95Z" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M7 22V10M2 12v8a2 2 0 0 0 2 2h11.2a3 3 0 0 0 2.9-2.2l1.7-6.2A2 2 0 0 0 17.9 11H14V5.5A2.5 2.5 0 0 0 11.5 3h-.2c-.6 0-1.1.3-1.4.8L7 10" />
    </svg>
  )
}

export function EngagementBar({
  kind,
  id,
  title,
  summary,
  trackView = false,
  compact = false,
  onLight = false,
}: EngagementBarProps) {
  const [views, setViews] = useState(0)
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState(0)
  const [shareMsg, setShareMsg] = useState('')

  useEffect(() => {
    const data = trackView ? recordView(kind, id) : getEngagement(kind, id)
    setViews(data.views)
    setLikes(data.likes)
    setLiked(data.liked)
    setComments(data.comments.length)
  }, [kind, id, trackView])

  const onLike = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const data = toggleLike(kind, id)
    setLikes(data.likes)
    setLiked(data.liked)
  }

  const onShare = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${kind === 'card-news' ? `/card-news/${id}` : `/notes/${id}`}`
        : ''
    const result = await shareContent({
      title,
      text: summary,
      url,
    })
    if (result === 'copied') setShareMsg('링크 복사됨')
    else if (result === 'shared') setShareMsg('공유됨')
    else setShareMsg('')
    if (result !== 'failed') {
      window.setTimeout(() => setShareMsg(''), 1800)
    }
  }

  const muted = onLight ? 'text-[#939393]' : 'text-ink-faint'
  const accent = onLight ? 'text-[#2c4a3e]' : 'text-accent'
  const hover = onLight ? 'hover:text-[#2c4a3e]' : 'hover:text-accent'

  return (
    <div
      className={[
        'flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]',
        muted,
        compact ? '' : 'mt-3',
      ].join(' ')}
    >
      <span title="조회수">조회 {formatCount(views)}</span>
      <button
        type="button"
        onClick={onLike}
        className={[
          'inline-flex items-center gap-1 transition-colors',
          hover,
          liked ? `font-medium ${accent}` : '',
        ].join(' ')}
        aria-pressed={liked}
        aria-label={liked ? '좋아요 취소' : '좋아요'}
        title={liked ? '좋아요 취소' : '좋아요'}
      >
        <ThumbUpIcon filled={liked} />
        <span>{formatCount(likes)}</span>
      </button>
      {!compact ? (
        <span title="댓글">댓글 {formatCount(comments)}</span>
      ) : null}
      <button
        type="button"
        onClick={onShare}
        className={['transition-colors', hover].join(' ')}
      >
        공유
      </button>
      {shareMsg ? <span className={accent}>{shareMsg}</span> : null}
    </div>
  )
}
