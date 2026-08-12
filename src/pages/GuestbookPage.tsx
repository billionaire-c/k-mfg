import { useState, type FormEvent } from 'react'
import { useContent } from '../context/ContentContext'

const MAX_LEN = 500

export function GuestbookPage() {
  const { visibleGuestbook, addGuestbook } = useContent()
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setDone('')

    if (!nickname.trim() || !message.trim()) {
      setError('닉네임과 메시지를 모두 입력해 주세요.')
      return
    }
    if (message.trim().length > MAX_LEN) {
      setError(`메시지는 ${MAX_LEN}자까지 작성할 수 있습니다.`)
      return
    }

    try {
      await addGuestbook(nickname, message)
      setNickname('')
      setMessage('')
      setDone('방명록이 등록되었습니다. 감사합니다!')
    } catch {
      setError('등록에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Guestbook
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        방명록
      </h1>
      <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        다녀가신 흔적, 짧은 감상, 추천하고 싶은 콘텐츠 — 무엇이든 환영합니다.
      </p>

      <form onSubmit={onSubmit} className="mb-14 space-y-4 border-y border-line py-8">
        <div className="grid gap-4 md:grid-cols-[160px_1fr]">
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">닉네임</span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={40}
              placeholder="닉네임"
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">메시지</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
              rows={4}
              placeholder="생각을 남겨 주세요."
              className="w-full resize-y border border-line bg-paper px-3 py-2.5 text-[14px] leading-relaxed text-ink outline-none transition focus:border-accent"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] text-ink-faint">
            {message.length}/{MAX_LEN}
          </p>
          <button
            type="submit"
            className="border border-ink bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-90 dark:border-ink dark:bg-ink dark:text-paper"
          >
            남기기
          </button>
        </div>

        {error ? <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p> : null}
        {done ? <p className="text-[13px] text-accent">{done}</p> : null}
      </form>

      {visibleGuestbook.length === 0 ? (
        <p className="text-[14px] text-ink-muted">
          아직 기록이 없습니다. 첫 번째 기록을 남겨 주세요.
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {visibleGuestbook.map((entry) => (
            <li key={entry.id} className="py-6">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <p className="text-[14px] font-medium text-ink">{entry.nickname}</p>
                <time className="text-[12px] text-ink-faint">
                  {new Date(entry.createdAt).toLocaleString('ko-KR')}
                </time>
              </div>
              <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink-muted">
                {entry.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
