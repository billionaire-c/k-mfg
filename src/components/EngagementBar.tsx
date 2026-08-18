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
        className={['transition-colors', hover, liked ? `font-medium ${accent}` : ''].join(
          ' ',
        )}
        aria-pressed={liked}
      >
        {liked ? '좋아요 ✓' : '좋아요'} {formatCount(likes)}
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
