-- K-Manufacturing: 방명록 테이블 + RLS
-- Supabase Dashboard → SQL Editor 에서 실행하세요.

create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 40),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create index if not exists guestbook_entries_created_at_idx
  on public.guestbook_entries (created_at desc);

alter table public.guestbook_entries enable row level security;

-- 방문자는 숨기지 않은 글만 조회
create policy "Public can read visible guestbook"
  on public.guestbook_entries
  for select
  to anon, authenticated
  using (hidden = false or auth.role() = 'authenticated');

-- 방문자는 글 작성 가능
create policy "Public can insert guestbook"
  on public.guestbook_entries
  for insert
  to anon, authenticated
  with check (true);

-- 관리자(로그인 사용자)만 수정/삭제
create policy "Authenticated can update guestbook"
  on public.guestbook_entries
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete guestbook"
  on public.guestbook_entries
  for delete
  to authenticated
  using (true);
