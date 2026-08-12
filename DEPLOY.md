# GitHub + Vercel + Supabase 배포 가이드

이 프로젝트(`Homepage`)는 상위 `claude_pjt` 저장소에서 gitignore 되어 있어 **별도 GitHub 저장소**로 배포합니다.

---

## 1) Supabase 설정

1. [supabase.com](https://supabase.com) → New project
2. **SQL Editor**에서 `supabase/schema.sql` 전체 실행
3. **Authentication → Users → Add user**  
   - 관리자용 이메일/비밀번호 생성 (오너 로그인에 사용)
4. **Project Settings → API**에서 복사
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` `public` key → `VITE_SUPABASE_ANON_KEY`

로컬 확인용 `.env` 예시:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

---

## 2) GitHub 저장소

PowerShell (`Homepage` 폴더에서):

```powershell
git init
git add .
git commit -m "Initial commit: K-Manufacturing homepage"
```

GitHub에서 새 저장소 생성 후 (예: `k-manufacturing`):

```powershell
git remote add origin https://github.com/YOUR_ID/k-manufacturing.git
git branch -M main
git push -u origin main
```

---

## 3) Vercel 배포

1. [vercel.com](https://vercel.com) → Add New Project → GitHub 저장소 연결
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. **Environment Variables** 추가
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy

`vercel.json`에 SPA 리다이렉트가 포함되어 있습니다.

---

## 4) 배포 후 확인

- 사이트 URL 접속
- `/guestbook` 글 작성 → Supabase Table Editor에 행이 생기는지 확인
- `/admin/login` → Supabase 사용자 이메일/비밀번호로 로그인
- 방명록 숨김/삭제 동작 확인

---

## 참고

- 카드뉴스·인사이트 샘플은 코드에 포함되어 빌드 시 함께 배포됩니다.
- 관리자 콘텐츠(localStorage)는 브라우저 로컬용입니다. 공용 DB 콘텐츠는 추후 Supabase 테이블로 확장하면 됩니다.
- 커스텀 도메인은 Vercel → Project → Settings → Domains 에서 연결합니다.
