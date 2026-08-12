import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useContent } from '../../context/ContentContext'
import { formatDate } from '../../lib/storage'
import type { ContentKind } from '../../lib/types'
import { toYoutubeEmbedUrl } from '../../lib/youtube'

const kindOptions: { value: ContentKind; label: string }[] = [
  { value: 'card-news', label: '카드뉴스' },
  { value: 'insight', label: '인사이트' },
  { value: 'youtube', label: '유튜브' },
]

export function AdminPage() {
  const { isOwner, logout } = useAuth()
  const {
    contents,
    guestbook,
    upsertContent,
    deleteContent,
    toggleGuestbookHidden,
    deleteGuestbook,
  } = useContent()

  const [kind, setKind] = useState<ContentKind>('card-news')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')
  const [published, setPublished] = useState(true)
  const [message, setMessage] = useState('')

  const sortedGuestbook = useMemo(
    () =>
      [...guestbook].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      ),
    [guestbook],
  )

  if (!isOwner) return <Navigate to="/admin/login" replace />

  const resetForm = () => {
    setTitle('')
    setSummary('')
    setBody('')
    setEmbedUrl('')
    setPublished(true)
  }

  const onCreate = (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim() || !summary.trim()) {
      setMessage('제목과 요약을 입력해 주세요.')
      return
    }
    upsertContent({
      kind,
      title: title.trim(),
      summary: summary.trim(),
      body: body.trim(),
      embedUrl:
        kind === 'youtube' ? toYoutubeEmbedUrl(embedUrl) : embedUrl.trim(),
      date: formatDate(),
      published,
    })
    resetForm()
    setMessage('콘텐츠가 등록되었습니다.')
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
            Admin
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            관리자
          </h1>
          <p className="mt-2 text-[14px] text-ink-muted">
            콘텐츠 등록·수정 삭제와 방명록 관리 (로컬 저장, 1차 버전)
          </p>
        </div>
        <div className="flex gap-3 text-[13px]">
          <Link to="/" className="text-ink-muted hover:text-ink">
            사이트로
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-ink-muted hover:text-ink"
          >
            로그아웃
          </button>
        </div>
      </div>

      {message ? <p className="mb-6 text-[13px] text-accent">{message}</p> : null}

      <section className="mb-16 border-y border-line py-8">
        <h2 className="mb-6 text-lg font-semibold text-ink">콘텐츠 등록</h2>
        <form onSubmit={onCreate} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">유형</span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as ContentKind)}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
            >
              {kindOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">요약</span>
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">본문 (선택)</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
            />
          </label>
          {kind === 'youtube' ? (
            <label className="block">
              <span className="mb-2 block text-[12px] text-ink-faint">
                YouTube URL
              </span>
              <input
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... 또는 공유 링크"
                className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
              />
              <p className="mt-1 text-[12px] text-ink-faint">
                일반 유튜브 주소를 붙여넣으면 로컬에서도 재생됩니다. 별도 호스팅 불필요.
              </p>
            </label>
          ) : null}
          <label className="flex items-center gap-2 text-[13px] text-ink-muted">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            즉시 공개
          </label>
          <button
            type="submit"
            className="border border-ink bg-ink px-4 py-2 text-[13px] font-medium text-paper"
          >
            등록
          </button>
        </form>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-lg font-semibold text-ink">콘텐츠 목록</h2>
        <ul className="divide-y divide-line border-y border-line">
          {contents.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 py-4">
              <div>
                <p className="text-[11px] tracking-[0.12em] text-ink-faint uppercase">
                  {kindOptions.find((k) => k.value === item.kind)?.label} ·{' '}
                  {item.published ? '공개' : '비공개'}
                </p>
                <p className="mt-1 text-[14px] font-medium text-ink">{item.title}</p>
                <p className="mt-1 text-[12px] text-ink-faint">{item.date}</p>
              </div>
              <div className="flex shrink-0 gap-3 text-[12px]">
                <button
                  type="button"
                  className="text-ink-muted hover:text-ink"
                  onClick={() =>
                    upsertContent({ ...item, published: !item.published })
                  }
                >
                  {item.published ? '비공개' : '공개'}
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:opacity-80 dark:text-red-400"
                  onClick={() => deleteContent(item.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-ink">방명록 관리</h2>
        {sortedGuestbook.length === 0 ? (
          <p className="text-[14px] text-ink-muted">등록된 방명록이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {sortedGuestbook.map((entry) => (
              <li key={entry.id} className="py-4">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[14px] font-medium text-ink">
                      {entry.nickname}
                      {entry.hidden ? (
                        <span className="ml-2 text-[11px] text-ink-faint">숨김</span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-[12px] text-ink-faint">
                      {new Date(entry.createdAt).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <div className="flex gap-3 text-[12px]">
                    <button
                      type="button"
                      className="text-ink-muted hover:text-ink"
                      onClick={() => void toggleGuestbookHidden(entry.id)}
                    >
                      {entry.hidden ? '표시' : '숨김'}
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:opacity-80 dark:text-red-400"
                      onClick={() => void deleteGuestbook(entry.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink-muted">
                  {entry.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
