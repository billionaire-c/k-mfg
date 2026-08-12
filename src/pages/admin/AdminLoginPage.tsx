import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function AdminLoginPage() {
  const { isOwner, login, usesSupabaseAuth } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isOwner) return <Navigate to="/admin" replace />

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const ok = await login({ password, email })
      if (!ok) {
        setError(
          usesSupabaseAuth
            ? '이메일 또는 비밀번호가 올바르지 않습니다.'
            : '비밀번호가 올바르지 않습니다.',
        )
        return
      }
      navigate('/admin', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 md:px-6">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Owner
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink">오너 로그인</h1>
      <p className="mb-8 text-[14px] leading-relaxed text-ink-muted">
        콘텐츠 등록과 방명록 관리를 위한 관리자 로그인입니다.
        {usesSupabaseAuth ? (
          <>
            <br />
            Supabase Auth 계정의 이메일/비밀번호를 입력하세요.
          </>
        ) : (
          <>
            <br />
            로컬 기본 비밀번호: <code className="text-ink">km-owner</code>
          </>
        )}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        {usesSupabaseAuth ? (
          <label className="block">
            <span className="mb-2 block text-[12px] text-ink-faint">이메일</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
              autoFocus
              required
            />
          </label>
        ) : null}
        <label className="block">
          <span className="mb-2 block text-[12px] text-ink-faint">비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line bg-paper px-3 py-2.5 text-[14px] outline-none focus:border-accent"
            autoFocus={!usesSupabaseAuth}
            required
          />
        </label>
        {error ? <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-ink bg-ink px-4 py-2.5 text-[13px] font-medium text-paper disabled:opacity-60"
        >
          {loading ? '로그인 중…' : '로그인'}
        </button>
      </form>
    </div>
  )
}
