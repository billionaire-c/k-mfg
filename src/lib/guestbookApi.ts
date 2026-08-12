import type { GuestbookEntry } from './types'
import { isSupabaseConfigured, supabase, type GuestbookRow } from './supabase'

function mapRow(row: GuestbookRow): GuestbookEntry {
  return {
    id: row.id,
    nickname: row.nickname,
    message: row.message,
    createdAt: row.created_at,
    hidden: row.hidden,
  }
}

export async function fetchGuestbook(includeHidden: boolean): Promise<GuestbookEntry[]> {
  if (!isSupabaseConfigured || !supabase) return []

  let query = supabase
    .from('guestbook_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (!includeHidden) {
    query = query.eq('hidden', false)
  }

  const { data, error } = await query
  if (error) throw error
  return (data as GuestbookRow[]).map(mapRow)
}

export async function insertGuestbook(
  nickname: string,
  message: string,
): Promise<GuestbookEntry> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase not configured')
  }

  const { data, error } = await supabase
    .from('guestbook_entries')
    .insert({ nickname, message })
    .select('*')
    .single()

  if (error) throw error
  return mapRow(data as GuestbookRow)
}

export async function setGuestbookHidden(id: string, hidden: boolean) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase not configured')
  }

  const { error } = await supabase
    .from('guestbook_entries')
    .update({ hidden })
    .eq('id', id)

  if (error) throw error
}

export async function removeGuestbook(id: string) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase not configured')
  }

  const { error } = await supabase.from('guestbook_entries').delete().eq('id', id)
  if (error) throw error
}
