# K-Manufacturing

한국 제조업 기술 아카이브 / 포트폴리오 사이트 (1차 구조)

배포(GitHub + Vercel + Supabase) 절차는 [DEPLOY.md](./DEPLOY.md)를 보세요.

## 스택

- React + Vite + TypeScript
- React Router
- Tailwind CSS
- Pretendard

## 실행

```bash
npm install
npm run dev
```

## 페이지

| 경로 | 메뉴 |
|------|------|
| `/` | 소개 (메인) |
| `/card-news` | 카드뉴스 |
| `/insights` | 인사이트 |
| `/youtube` | 유튜브 |
| `/guestbook` | 방명록 |
| `/search` | 찾기 |
| `/admin/login` | 오너 로그인 |
| `/admin` | 관리자 |

플레이스홀더 문구·링크는 `src/data/placeholders.ts`에서 수정합니다.

## 관리자

- 기본 비밀번호: `km-owner`
- 환경변수 `VITE_OWNER_PASSWORD`로 변경 가능
- 콘텐츠·방명록은 브라우저 localStorage에 저장 (1차 프로토타입)
