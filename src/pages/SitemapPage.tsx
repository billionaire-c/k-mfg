import { Link } from 'react-router-dom'

type SitemapEntry = {
  to: string
  label: string
  blurb: string
}

type SitemapGroup = {
  title: string
  description: string
  entries: SitemapEntry[]
}

const sitemapGroups: SitemapGroup[] = [
  {
    title: '콘텐츠',
    description: '기록과 인사이트 — 읽고 보는 자료',
    entries: [
      {
        to: '/',
        label: '소개',
        blurb: '사이트 소개, 제조 시그널, 주요 콘텐츠 미리보기',
      },
      {
        to: '/card-news',
        label: '카드뉴스',
        blurb: '짧은 슬라이드로 보는 제조·정책 이슈',
      },
      {
        to: '/insights',
        label: '인사이트',
        blurb: '논문·리뷰 기반의 조금 더 긴 해설',
      },
      {
        to: '/notes',
        label: '현장 노트',
        blurb: '현장 관찰을 스케치와 함께 남긴 기록',
      },
      {
        to: '/youtube',
        label: '유튜브',
        blurb: '숏폼·영상으로 보는 제조 이야기',
      },
    ],
  },
  {
    title: '스마트 공장',
    description: '진단·탐색·실행을 돕는 도구형 메뉴',
    entries: [
      {
        to: '/map',
        label: '지도',
        blurb: '스마트공장 공급기업 위치를 지도에서 검색',
      },
      {
        to: '/policy',
        label: '지원사업',
        blurb: '중기부·산업부 등 정책·공고 큐레이션',
      },
      {
        to: '/standards',
        label: '표준·인증',
        blurb: 'ISO·IATF·보안·개인정보 인증 안내와 흐름도',
      },
      {
        to: '/check',
        label: '성숙도 체크',
        blurb: '스마트공장 준비도를 간단히 자가진단',
      },
    ],
  },
  {
    title: '참고·소통',
    description: '용어, 문의, 방명록, 검색',
    entries: [
      {
        to: '/glossary',
        label: '용어',
        blurb: '스마트제조·AX 관련 용어 해설',
      },
      {
        to: '/contact',
        label: '문의',
        blurb: '협업·취재·피드백 문의 게시판',
      },
      {
        to: '/guestbook',
        label: '방명록',
        blurb: '방문 기록과 짧은 메시지',
      },
      {
        to: '/search',
        label: '찾기',
        blurb: '사이트 안 콘텐츠를 키워드로 검색',
      },
      {
        to: '/sitemap',
        label: '사이트맵',
        blurb: '지금 보고 있는 메뉴 구조 안내',
      },
    ],
  },
]

export function SitemapPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Sitemap
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        사이트맵
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        K-Manufacturing 메뉴 구조를 간단히 안내합니다. 어디로 가야 할지
        모를 때 여기서 출발하세요.
      </p>

      <div className="mt-10 space-y-10">
        {sitemapGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {group.title}
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">{group.description}</p>

            <ul className="mt-4 divide-y divide-line border-y border-line">
              {group.entries.map((entry) => (
                <li key={entry.to} className="py-4">
                  <Link
                    to={entry.to}
                    className="group block transition-colors"
                  >
                    <span className="text-[15px] font-semibold tracking-tight text-ink group-hover:text-accent">
                      {entry.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-ink-muted">
                      {entry.blurb}
                    </span>
                    <span className="mt-1 block text-[12px] text-ink-faint">
                      {entry.to === '/' ? '/' : entry.to}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
