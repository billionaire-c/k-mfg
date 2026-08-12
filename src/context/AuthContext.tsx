import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isOwnerAuthed, OWNER_PASSWORD, setOwnerAuthed } from '../lib/storage'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type AuthContextValue = {
  isOwner: boolean
  usesSupabaseAuth: boolean
  login: (input: { password: string; email?: string }) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOwner, setIsOwner] = useState(() =>
    isSupabaseConfigured ? false : isOwnerAuthed(),
  )

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setIsOwner(Boolean(data.session))
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsOwner(Boolean(session))
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isOwner,
      usesSupabaseAuth: isSupabaseConfigured,
      login: async ({ password, email }) => {
        if (isSupabaseConfigured && supabase) {
          if (!email?.trim()) return false
          const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })
          if (error) return false
          setIsOwner(true)
          return true
        }

        const ok = password === OWNER_PASSWORD
        if (ok) {
          setOwnerAuthed(true)
          setIsOwner(true)
        }
        return ok
      },
      logout: async () => {
        if (isSupabaseConfigured && supabase) {
          await supabase.auth.signOut()
        }
        setOwnerAuthed(false)
        setIsOwner(false)
      },
    }),
    [isOwner],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
