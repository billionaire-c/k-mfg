import { Link } from 'react-router-dom'
import { CardNewsGrid } from '../components/CardNewsGrid'
import { FieldNoteList } from '../components/FieldNoteList'
import { KpiBoard } from '../components/KpiBoard'
import { SectionHeading } from '../components/SectionHeading'
import { SocialLinks } from '../components/SocialLinks'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { cardNewsSamples } from '../data/cardNewsSamples'
import { fieldNoteSamples } from '../data/fieldNoteSamples'
import { site } from '../data/placeholders'
import { youtubeSamples } from '../data/youtubeSamples'

const smartShortcuts = [
  {
    to: '/smart-factory',
    label: '스마트공장 소개',
    blurb: '정의 · 수준 단계',
  },
  {
    to: '/map',
    label: '제조 지도',
    blurb: '공급기업 · 산업단지',
  },
  {
    to: '/check',
    label: '성숙도 체크',
    blurb: '준비도 자가진단',
  },
  {
    to: '/cases',
    label: '사례·벤치마크',
    blurb: '숫자와 교훈',
  },
  {
    to: '/roadmap',
    label: '도입 로드맵',
    blurb: '12주 실행 순서',
  },
] as const

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-6">
      <section className="border-b border-line py-8 md:py-10 lg:py-11">
        <p className="fade-up mb-2 text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">
          About
        </p>
        <h1 className="fade-up fade-up-delay-1 whitespace-pre-line text-[1.65rem] leading-[1.15] font-semibold tracking-tight text-ink md:text-[1.85rem]">
          {site.headline}
        </h1>
        <p className="fade-up fade-up-delay-2 mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-muted md:text-base">
          {site.tagline}
        </p>
        <div className="fade-up fade-up-delay-3 mt-4 max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
          {site.aboutBody.map((line, index) =>
            line === '' ? (
              <div key={`spacer-${index}`} className="h-1.5" aria-hidden />
            ) : (
              <p key={`${index}-${line}`}>{line}</p>
            ),
          )}
        </div>

        <SocialLinks className="fade-up fade-up-delay-3 mt-5" />
        <p className="fade-up fade-up-delay-3 mt-4 text-[12px] text-ink-faint">
          메뉴가 낯설다면{' '}
          <Link
            to="/sitemap"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            사이트맵
          </Link>
          에서 구조를 먼저 보세요.
        </p>
      </section>

      <KpiBoard />

      <section className="border-b border-line py-8 md:py-10">
        <SectionHeading
          eyebrow="Highlights"
          title="최근 콘텐츠"
          moreHref="/card-news"
        />
        <CardNewsGrid items={cardNewsSamples.slice(0, 3)} />
        <div className="mt-8">
          <FieldNoteList items={fieldNoteSamples.slice(0, 1)} />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {youtubeSamples.slice(0, 2).map((video) => (
            <YoutubeEmbed
              key={video.id}
              title={video.title}
              embedUrl={video.embedUrl}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          <Link
            to="/card-news"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            카드뉴스 »
          </Link>
          <Link
            to="/notes"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            현장 노트 »
          </Link>
          <Link
            to="/insights"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            인사이트 »
          </Link>
          <Link
            to="/youtube"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            유튜브 »
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Smart Factory"
          title="스마트 공장 바로가기"
          moreHref="/check"
        />
        <p className="mb-5 max-w-xl text-[14px] leading-relaxed text-ink-muted">
          현황을 보고, 진단하고, 사례와 로드맵으로 이어가세요.
        </p>
        <ul className="grid gap-0 border-y border-line sm:grid-cols-2">
          {smartShortcuts.map((item, index) => {
            const lastRowStart =
              smartShortcuts.length - (smartShortcuts.length % 2 === 0 ? 2 : 1)
            return (
              <li
                key={item.to}
                className={[
                  'border-line',
                  index % 2 === 0 ? 'sm:border-r' : '',
                  index < lastRowStart ? 'border-b' : '',
                ].join(' ')}
              >
                <Link
                  to={item.to}
                  className="block px-4 py-4 transition-colors hover:bg-surface"
                >
                  <p className="text-[14px] font-medium text-ink">{item.label}</p>
                  <p className="mt-1 text-[12px] text-ink-muted">{item.blurb}</p>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          <Link
            to="/policy"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            지원사업 »
          </Link>
          <Link
            to="/standards"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            표준·인증 »
          </Link>
          <Link
            to="/map?tab=parks"
            className="text-ink-muted transition-colors hover:text-accent"
          >
            산업단지 »
          </Link>
        </div>
      </section>
    </div>
  )
}
