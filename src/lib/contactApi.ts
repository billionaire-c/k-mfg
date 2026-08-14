import { isSupabaseConfigured, supabase } from './supabase'

export type ContactMessage = {
  id: string
  name: string
  organization: string
  category: string
  message: string
  createdAt: string
  hidden: boolean
}

type ContactRow = {
  id: string
  name: string
  organization: string
  category: string
  message: string
  created_at: string
  hidden: boolean
}

const STORAGE_KEY = 'kmfg-contact-v1'

type LocalContact = ContactMessage & { passwordHash: string }

async function sha256(input: string) {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function mapRow(row: ContactRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    organization: row.organization,
    category: row.category,
    message: row.message,
    createdAt: row.created_at,
    hidden: row.hidden,
  }
}

function readLocal(): LocalContact[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as LocalContact[]
  } catch {
    return []
  }
}

function writeLocal(items: LocalContact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function fetchContactMessages(
  includeHidden = false,
): Promise<ContactMessage[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.rpc('list_contact_messages', {
      include_hidden: includeHidden,
    })
    if (error) throw error
    return ((data as ContactRow[]) ?? []).map(mapRow)
  }

  return readLocal()
    .filter((item) => includeHidden || !item.hidden)
    .map(({ passwordHash: _h, ...rest }) => rest)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function submitContactMessage(input: {
  name: string
  organization: string
  category: string
  message: string
  password: string
}): Promise<ContactMessage> {
  if (input.password.trim().length < 4) {
    throw new Error('비밀번호는 4자 이상이어야 합니다.')
  }

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.rpc('submit_contact_message', {
      p_name: input.name,
      p_organization: input.organization,
      p_category: input.category,
      p_message: input.message,
      p_password: input.password,
    })
    if (error) throw error
    const row = data as ContactRow
    return mapRow(row)
  }

  const entry: LocalContact = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    organization: input.organization.trim(),
    category: input.category.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    hidden: false,
    passwordHash: await sha256(input.password),
  }
  writeLocal([entry, ...readLocal()])
  const { passwordHash: _h, ...publicEntry } = entry
  return publicEntry
}

export async function updateContactMessage(
  id: string,
  password: string,
  message: string,
): Promise<ContactMessage> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.rpc('update_contact_message', {
      p_id: id,
      p_password: password,
      p_message: message,
    })
    if (error) throw error
    return mapRow(data as ContactRow)
  }

  const items = readLocal()
  const idx = items.findIndex((item) => item.id === id)
  if (idx < 0) throw new Error('글을 찾을 수 없습니다.')
  const hash = await sha256(password)
  if (items[idx].passwordHash !== hash) throw new Error('비밀번호가 올바르지 않습니다.')
  items[idx] = { ...items[idx], message: message.trim() }
  writeLocal(items)
  const { passwordHash: _h, ...publicEntry } = items[idx]
  return publicEntry
}

export async function deleteContactMessage(id: string, password: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.rpc('delete_contact_message', {
      p_id: id,
      p_password: password,
    })
    if (error) throw error
    return
  }

  const items = readLocal()
  const target = items.find((item) => item.id === id)
  if (!target) throw new Error('글을 찾을 수 없습니다.')
  const hash = await sha256(password)
  if (target.passwordHash !== hash) throw new Error('비밀번호가 올바르지 않습니다.')
  writeLocal(items.filter((item) => item.id !== id))
}
