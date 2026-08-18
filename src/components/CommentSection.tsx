import { useEffect, useState, type FormEvent } from 'react'
import {
  addComment,
  getEngagement,
  type EngageComment,
  type EngageKind,
} from '../lib/engagement'

const MAX_LEN = 500

type CommentSectionProps = {
  kind: EngageKind
  id: string
  onCountChange?: (count: number) => void
}

export function CommentSection({
  kind,
  id,
  onCountChange,
}: CommentSectionProps) {
  const [comments, setComments] = useState<EngageComment[]>([])
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState('')

  useEffect(() => {
    const data = getEngagement(kind, id)
    setComments(data.comments)
    onCountChange?.(data.comments.length)
  }, [kind, id, onCountChange])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setDone('')
    if (!nickname.trim() || !message.trim()) {
      setError('닉네임과 댓글을 모두 입력해 주세요.')
      return
    }
    const data = addComment(kind, id, nickname, message)
    setComments(data.comments)
    onCountChange?.(data.comments.length)
    setNickname('')
    setMessage('')
    setDone('댓글이 등록되었습니다.')
  }

  return (
    <section className="mt-10 border-t border-line pt-8">
      <h2 className="text-[15px] font-semibold tracking-tight text-ink">
        댓글 {comments.length > 0 ? comments.length : ''}
      </h2>
      <p className="mt-1 text-[12px] text-ink-faint">
        이 기기에 저장되는 로컬 댓글입니다. (MVP)
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <div className="grid gap-3 md:grid-cols-[140px_1fr]">
          <label className="block">
            <span className="sr-only">닉네임</span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={40}
              placeholder="닉네임"
              className="w-full border border-line bg-paper px-3 py-2 text-[13px] text-ink outline-none transition focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="sr-only">댓글</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
              rows={3}
              placeholder="의견을 남겨 주세요."
              className="w-full resize-y border border-line bg-paper px-3 py-2 text-[13px] leading-relaxed text-ink outline-none transition focus:border-accent"
            />
          </label>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-ink-faint">
            {message.length}/{MAX_LEN}
          </p>
          <button
            type="submit"
            className="border border-ink bg-ink px-3 py-1.5 text-[12px] font-medium text-paper transition hover:opacity-90"
          >
            등록
          </button>
        </div>
        {error ? (
          <p className="text-[12px] text-red-600 dark:text-red-400">{error}</p>
        ) : null}
        {done ? <p className="text-[12px] text-accent">{done}</p> : null}
      </form>

      {comments.length === 0 ? (
        <p className="mt-6 text-[13px] text-ink-muted">아직 댓글이 없습니다.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {comments.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-medium text-ink">{item.nickname}</p>
                <time className="text-[11px] text-ink-faint">
                  {new Date(item.createdAt).toLocaleString('ko-KR')}
                </time>
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-relaxed text-ink-muted">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
