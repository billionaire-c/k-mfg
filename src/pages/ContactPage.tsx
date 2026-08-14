import { useCallback, useEffect, useState, type FormEvent } from 'react'
import {
  deleteContactMessage,
  fetchContactMessages,
  submitContactMessage,
  updateContactMessage,
  type ContactMessage,
} from '../lib/contactApi'
import { isSupabaseConfigured } from '../lib/supabase'

const CATEGORIES = ['협업', '강의/콘텐츠', '제보', '기타'] as const
const MAX_LEN = 2000

export function ContactPage() {
  const [items, setItems] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('협업')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editMessage, setEditMessage] = useState('')
  const [editPassword, setEditPassword] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchContactMessages(false)
      setItems(data)
    } catch {
      setError('목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setDone('')
    if (!name.trim() || !message.trim() || !password.trim()) {
      setError('이름, 메시지, 비밀번호를 입력해 주세요.')
      return
    }
    try {
      await submitContactMessage({
        name,
        organization,
        category,
        message,
        password,
      })
      setName('')
      setOrganization('')
      setMessage('')
      setPassword('')
      setDone('등록되었습니다. 비밀번호는 수정·삭제에 필요합니다.')
      await reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : '등록에 실패했습니다.')
    }
  }

  const onUpdate = async (id: string) => {
    setError('')
    try {
      await updateContactMessage(id, editPassword, editMessage)
      setEditingId(null)
      setEditPassword('')
      setDone('수정되었습니다.')
      await reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : '수정에 실패했습니다.')
    }
  }

  const onDelete = async (id: string) => {
    const pw = window.prompt('삭제를 위해 작성 시 비밀번호를 입력해 주세요.')
    if (pw == null) return
    setError('')
    try {
      await deleteContactMessage(id, pw)
      setDone('삭제되었습니다.')
      await reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : '삭제에 실패했습니다.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Contact
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        문의·협업
      </h1>
      <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        강의·콘텐츠 협업·제보 등을 남겨 주세요. 이메일 대신 이 게시판에 글이 쌓이며,
        작성 시 비밀번호로 본인 글만 수정·삭제할 수 있습니다.
      </p>

      {!isSupabaseConfigured ? (
        <p className="mb-6 border border-amber-300 bg-amber-50 px-3 py-2 text-[13px] text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
          현재는 이 브라우저(localStorage)에 저장됩니다. 기기·브라우저를 넘어 공유하려면
          Supabase에 `contact_schema.sql`을 실행해 주세요.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mb-12 space-y-4 border-y border-line py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">이름 *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">소속</span>
            <input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              maxLength={80}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-[12px] text-ink-faint">유형</span>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as (typeof CATEGORIES)[number])
            }
            className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink md:w-56"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[12px] text-ink-faint">내용 *</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
            rows={5}
            className="w-full resize-y border border-line bg-paper px-3 py-2.5 text-[14px] leading-relaxed text-ink outline-none focus:border-ink"
          />
          <span className="mt-1 block text-[12px] text-ink-faint">
            {message.length}/{MAX_LEN}
          </span>
        </label>

        <label className="block md:w-56">
          <span className="mb-2 block text-[12px] text-ink-faint">
            작성자 비밀번호 * (4자 이상)
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="border border-ink bg-ink px-4 py-2 text-[13px] font-medium text-paper hover:opacity-90"
          >
            남기기
          </button>
        </div>

        {error ? (
          <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
        ) : null}
        {done ? <p className="text-[13px] text-teal-700 dark:text-teal-300">{done}</p> : null}
      </form>

      {loading ? (
        <p className="text-[14px] text-ink-faint">불러오는 중…</p>
      ) : items.length === 0 ? (
        <p className="text-[14px] text-ink-muted">아직 문의가 없습니다.</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="py-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-teal-300 bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-900 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-200">
                  {item.category}
                </span>
                <span className="text-[14px] font-medium text-ink">{item.name}</span>
                {item.organization ? (
                  <span className="text-[13px] text-ink-faint">
                    · {item.organization}
                  </span>
                ) : null}
                <time className="ml-auto text-[12px] text-ink-faint">
                  {new Date(item.createdAt).toLocaleString('ko-KR')}
                </time>
              </div>

              {editingId === item.id ? (
                <div className="mt-3 space-y-3">
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value.slice(0, MAX_LEN))}
                    rows={4}
                    className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink"
                  />
                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="비밀번호"
                    className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink md:w-56"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void onUpdate(item.id)}
                      className="border border-ink bg-ink px-3 py-1.5 text-[13px] text-paper"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="border border-line px-3 py-1.5 text-[13px] text-ink-muted"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-ink-muted">
                    {item.message}
                  </p>
                  <div className="mt-3 flex gap-3 text-[12px]">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(item.id)
                        setEditMessage(item.message)
                        setEditPassword('')
                      }}
                      className="text-ink-faint hover:text-ink"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(item.id)}
                      className="text-ink-faint hover:text-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
