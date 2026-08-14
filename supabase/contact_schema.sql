-- 문의/협업 게시판 (작성자 비밀번호)
-- Supabase SQL Editor에서 실행하세요. pgcrypto 확장 필요.

create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  organization text not null default '' check (char_length(organization) <= 80),
  category text not null check (char_length(category) between 1 and 40),
  message text not null check (char_length(message) between 1 and 2000),
  password_hash text not null,
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- 해시 없는 공개 조회용 뷰
create or replace view public.contact_messages_public as
select id, name, organization, category, message, created_at, hidden
from public.contact_messages;

grant select on public.contact_messages_public to anon, authenticated;

-- 방문자는 숨기지 않은 글만 뷰로 조회 (뷰 + 정책 대체: 함수로 조회)
create or replace function public.list_contact_messages(include_hidden boolean default false)
returns table (
  id uuid,
  name text,
  organization text,
  category text,
  message text,
  created_at timestamptz,
  hidden boolean
)
language sql
security definer
set search_path = public
as $$
  select c.id, c.name, c.organization, c.category, c.message, c.created_at, c.hidden
  from public.contact_messages c
  where include_hidden = true or c.hidden = false
  order by c.created_at desc;
$$;

grant execute on function public.list_contact_messages(boolean) to anon, authenticated;

create or replace function public.submit_contact_message(
  p_name text,
  p_organization text,
  p_category text,
  p_message text,
  p_password text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.contact_messages;
begin
  if char_length(trim(p_password)) < 4 then
    raise exception 'password too short';
  end if;

  insert into public.contact_messages (
    name, organization, category, message, password_hash
  ) values (
    trim(p_name),
    coalesce(trim(p_organization), ''),
    trim(p_category),
    trim(p_message),
    crypt(p_password, gen_salt('bf'))
  )
  returning * into v_row;

  return json_build_object(
    'id', v_row.id,
    'name', v_row.name,
    'organization', v_row.organization,
    'category', v_row.category,
    'message', v_row.message,
    'created_at', v_row.created_at,
    'hidden', v_row.hidden
  );
end;
$$;

grant execute on function public.submit_contact_message(text, text, text, text, text) to anon, authenticated;

create or replace function public.update_contact_message(
  p_id uuid,
  p_password text,
  p_message text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.contact_messages;
begin
  select * into v_row from public.contact_messages where id = p_id;
  if not found then
    raise exception 'not found';
  end if;
  if v_row.password_hash <> crypt(p_password, v_row.password_hash) then
    raise exception 'invalid password';
  end if;

  update public.contact_messages
  set message = trim(p_message)
  where id = p_id
  returning * into v_row;

  return json_build_object(
    'id', v_row.id,
    'name', v_row.name,
    'organization', v_row.organization,
    'category', v_row.category,
    'message', v_row.message,
    'created_at', v_row.created_at,
    'hidden', v_row.hidden
  );
end;
$$;

grant execute on function public.update_contact_message(uuid, text, text) to anon, authenticated;

create or replace function public.delete_contact_message(
  p_id uuid,
  p_password text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hash text;
begin
  select password_hash into v_hash from public.contact_messages where id = p_id;
  if not found then
    raise exception 'not found';
  end if;
  if v_hash <> crypt(p_password, v_hash) then
    raise exception 'invalid password';
  end if;
  delete from public.contact_messages where id = p_id;
  return true;
end;
$$;

grant execute on function public.delete_contact_message(uuid, text) to anon, authenticated;

-- 관리자(로그인) 숨김 처리
create or replace function public.set_contact_hidden(p_id uuid, p_hidden boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() <> 'authenticated' then
    raise exception 'forbidden';
  end if;
  update public.contact_messages set hidden = p_hidden where id = p_id;
  return true;
end;
$$;

grant execute on function public.set_contact_hidden(uuid, boolean) to authenticated;

-- 테이블 직접 접근 차단(함수/뷰만 사용)
revoke all on public.contact_messages from anon;
revoke all on public.contact_messages from authenticated;
grant select, update, delete on public.contact_messages to authenticated;
