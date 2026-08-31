import { useState } from 'react'
import { Link } from 'react-router-dom'

type SitemapEntry = {
  to: string
  label: string
  blurb: string
}

type SitemapSubgroup = {
  id: string
  title: string
  description?: string
  entries: SitemapEntry[]
}

type SitemapGroup = {
  id: string
  title: string
  description: string
  entries?: SitemapEntry[]
  subgroups?: SitemapSubgroup[]
}

const sitemapGroups: SitemapGroup[] = [
  {
    id: 'about',
    title: '소개',
    description: '사이트 소개와 제조 시그널',
    entries: [
      {
        to: '/',
        label: '홈',
        blurb: '소개, 제조 시그널, 콘텐츠 하이라이트와 스마트 공장 바로가기',
      },
    ],
  },
  {
    id: 'content',
    title: '콘텐츠',
    description: '읽고 보는 기록',
    entries: [
      {
        to: '/card-news',
        label: '카드뉴스',
        blurb: '짧은 슬라이드로 보는 제조·정책 이슈',
      },
      {
        to: '/notes',
        label: '현장 노트',
        blurb: '현장 관찰을 스케치와 함께 남긴 기록',
      },
      {
        to: '/insights',
        label: '인사이트',
        blurb: '논문·리뷰 기반의 조금 더 긴 해설',
      },
      {
        to: '/youtube',
        label: '유튜브',
        blurb: '숏폼·영상으로 보는 제조 이야기',
      },
    ],
  },
  {
    id: 'smart',
    title: '스마트 공장',
    description: '진단·탐색·실행을 돕는 도구형 메뉴',
    subgroups: [
      {
        id: 'explore',
        title: '탐색',
        description: '현황·정책·기준·사례를 찾아보기',
        entries: [
          {
            to: '/smart-factory',
            label: '스마트공장 소개',
            blurb: '정의·적용 범위·수준 단계·5대 요건 안내',
          },
          {
            to: '/map',
            label: '지도',
            blurb: '공급기업·산업단지 현황을 탭으로 나눠 지도에서 검색',
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
            to: '/smart-haccp',
            label: '스마트HACCP',
            blurb: '소개와 식품 스마트HACCP 인증업체 현황',
          },
          {
            to: '/industries',
            label: '제조업 구분',
            blurb: 'KSIC 11차 제조업 중분류와 뿌리산업 14대 기술·법령 안내',
          },
          {
            to: '/cases',
            label: '사례·벤치마크',
            blurb: '업종별 스마트공장·AX 사례와 숫자·교훈',
          },
        ],
      },
      {
        id: 'act',
        title: '실행',
        description: '진단하고 다음 단계를 잡기',
        entries: [
          {
            to: '/check',
            label: '성숙도 체크',
            blurb: '스마트공장 준비도를 간단히 자가진단',
          },
          {
            to: '/roadmap',
            label: '도입 로드맵',
            blurb: '진단 결과에 맞춘 12주 실행 순서',
          },
        ],
      },
    ],
  },
  {
    id: 'talk',
    title: '소통',
    description: '협업·방문 기록',
    entries: [
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
    ],
  },
  {
    id: 'more',
    title: '더보기',
    description: '참고·검색·구조 안내',
    entries: [
      {
        to: '/glossary',
        label: '용어',
        blurb: '스마트제조·AX 관련 용어 해설',
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
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sitemapGroups.map((g) => [g.id, true])),
  )
  const [openSubgroups, setOpenSubgroups] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {}
      sitemapGroups.forEach((g) => {
        g.subgroups?.forEach((s) => {
          init[`${g.id}:${s.id}`] = true
        })
      })
      return init
    },
  )
  const [openLeaves, setOpenLeaves] = useState<Record<string, boolean>>({})

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSubgroup = (key: string) => {
    setOpenSubgroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleLeaf = (key: string) => {
    setOpenLeaves((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const expandAll = () => {
    setOpenGroups(Object.fromEntries(sitemapGroups.map((g) => [g.id, true])))
    const subs: Record<string, boolean> = {}
    sitemapGroups.forEach((g) => {
      g.subgroups?.forEach((s) => {
        subs[`${g.id}:${s.id}`] = true
      })
    })
    setOpenSubgroups(subs)
  }

  const collapseAll = () => {
    setOpenGroups(Object.fromEntries(sitemapGroups.map((g) => [g.id, false])))
    setOpenSubgroups({})
    setOpenLeaves({})
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Sitemap
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        사이트맵
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        헤더와 같은 메뉴 레벨로 정리했습니다. 그룹·하위 그룹·항목을 접거나 펼쳐
        보세요.
      </p>

      <div className="mt-4 flex gap-3 text-[12px]">
        <button
          type="button"
          onClick={expandAll}
          className="text-ink-muted transition-colors hover:text-accent"
        >
          모두 펼치기
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="text-ink-muted transition-colors hover:text-accent"
        >
          모두 접기
        </button>
      </div>

      <div className="mt-8 border border-line bg-surface/30 px-3 py-4 font-sans md:px-5 md:py-5">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <span
            className="inline-flex h-6 w-6 items-center justify-center border border-accent bg-accent text-[11px] text-paper"
            aria-hidden
          >
            ◆
          </span>
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-ink">
              K-Manufacturing
            </p>
            <p className="text-[12px] text-ink-faint">사이트 루트</p>
          </div>
        </div>

        <ul className="mt-1" role="tree" aria-label="사이트 메뉴 트리">
          {sitemapGroups.map((group, groupIndex) => {
            const open = openGroups[group.id] ?? false
            const isLastGroup = groupIndex === sitemapGroups.length - 1

            return (
              <li key={group.id} role="treeitem" aria-expanded={open}>
                <div className="flex">
                  <TreeRail last={isLastGroup} />
                  <div className="min-w-0 flex-1 py-1.5">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      className="flex w-full items-start gap-2 rounded-sm px-1 py-1.5 text-left transition-colors hover:bg-surface"
                      aria-expanded={open}
                    >
                      <span
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-line text-[10px] text-ink-muted"
                        aria-hidden
                      >
                        {open ? '−' : '+'}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-semibold tracking-tight text-ink">
                          {group.title}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-ink-faint">
                          {group.description}
                        </span>
                      </span>
                    </button>

                    {open ? (
                      <ul className="ml-2 border-l border-line pl-3" role="group">
                        {group.subgroups
                          ? group.subgroups.map((sub, subIndex) => {
                              const subKey = `${group.id}:${sub.id}`
                              const subOpen = openSubgroups[subKey] ?? false
                              const isLastSub =
                                subIndex === (group.subgroups?.length ?? 0) - 1
                              return (
                                <li
                                  key={subKey}
                                  role="treeitem"
                                  aria-expanded={subOpen}
                                  className="relative"
                                >
                                  <div
                                    className="absolute top-0 -left-3 h-4 w-3 border-b border-line"
                                    aria-hidden
                                  />
                                  <button
                                    type="button"
                                    onClick={() => toggleSubgroup(subKey)}
                                    className="flex w-full items-start gap-2 py-1.5 text-left transition-colors hover:bg-surface"
                                  >
                                    <span
                                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-line text-[10px] text-ink-muted"
                                      aria-hidden
                                    >
                                      {subOpen ? '−' : '+'}
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-[13px] font-semibold text-ink">
                                        {sub.title}
                                      </span>
                                      {sub.description ? (
                                        <span className="mt-0.5 block text-[11px] text-ink-faint">
                                          {sub.description}
                                        </span>
                                      ) : null}
                                    </span>
                                  </button>
                                  {subOpen ? (
                                    <ul
                                      className={[
                                        'ml-2 border-l border-line pl-3',
                                        isLastSub ? 'mb-1' : '',
                                      ].join(' ')}
                                      role="group"
                                    >
                                      {sub.entries.map((entry, entryIndex) => (
                                        <EntryLeaf
                                          key={`${subKey}:${entry.to}`}
                                          leafKey={`${subKey}:${entry.to}`}
                                          entry={entry}
                                          isLast={
                                            entryIndex ===
                                            sub.entries.length - 1
                                          }
                                          open={
                                            openLeaves[
                                              `${subKey}:${entry.to}`
                                            ] ?? false
                                          }
                                          onToggle={toggleLeaf}
                                        />
                                      ))}
                                    </ul>
                                  ) : null}
                                </li>
                              )
                            })
                          : (group.entries ?? []).map((entry, entryIndex) => (
                              <EntryLeaf
                                key={`${group.id}:${entry.to}`}
                                leafKey={`${group.id}:${entry.to}`}
                                entry={entry}
                                isLast={
                                  entryIndex === (group.entries?.length ?? 0) - 1
                                }
                                open={
                                  openLeaves[`${group.id}:${entry.to}`] ?? false
                                }
                                onToggle={toggleLeaf}
                              />
                            ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function EntryLeaf({
  leafKey,
  entry,
  isLast,
  open,
  onToggle,
}: {
  leafKey: string
  entry: SitemapEntry
  isLast: boolean
  open: boolean
  onToggle: (key: string) => void
}) {
  return (
    <li className="relative">
      <div
        className={[
          'absolute top-0 -left-3 h-4 w-3 border-b border-line',
          isLast ? '' : '',
        ].join(' ')}
        aria-hidden
      />
      <div className="flex items-start gap-1 py-1">
        <button
          type="button"
          onClick={() => onToggle(leafKey)}
          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-line text-[10px] text-ink-faint transition-colors hover:text-ink"
          aria-expanded={open}
          aria-label={`${entry.label} 설명 ${open ? '접기' : '펼치기'}`}
        >
          {open ? '−' : '+'}
        </button>
        <div className="min-w-0 flex-1">
          <Link
            to={entry.to}
            className="text-[13px] font-medium text-ink transition-colors hover:text-accent"
          >
            {entry.label}
            <span className="ml-2 text-[11px] font-normal text-ink-faint">
              {entry.to === '/' ? '/' : entry.to}
            </span>
          </Link>
          {open ? (
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
              {entry.blurb}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  )
}

function TreeRail({ last }: { last: boolean }) {
  return (
    <div className="relative mr-1 w-4 shrink-0" aria-hidden>
      <div
        className={[
          'absolute top-0 left-1/2 w-px -translate-x-1/2 bg-line',
          last ? 'h-4' : 'h-full',
        ].join(' ')}
      />
      <div className="absolute top-4 left-1/2 h-px w-1/2 bg-line" />
    </div>
  )
}
