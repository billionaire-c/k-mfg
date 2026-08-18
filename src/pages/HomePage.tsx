import { Link } from 'react-router-dom'
import { CardNewsGrid } from '../components/CardNewsGrid'
import { FieldNoteList } from '../components/FieldNoteList'
import { GlossaryList } from '../components/GlossaryList'
import { InsightList } from '../components/InsightList'
import { KpiBoard } from '../components/KpiBoard'
import { PolicyList } from '../components/PolicyList'
import { SectionHeading } from '../components/SectionHeading'
import { SocialLinks } from '../components/SocialLinks'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { cardNewsSamples } from '../data/cardNewsSamples'
import { fieldNoteSamples } from '../data/fieldNoteSamples'
import { glossarySamples } from '../data/glossarySamples'
import { insightSamples } from '../data/insightSamples'
import { site } from '../data/placeholders'
import { policySamples } from '../data/policySamples'
import { youtubeSamples } from '../data/youtubeSamples'

export function HomePage() {
  const youtube = youtubeSamples.slice(0, 2)
  const policies = policySamples.slice(0, 3)
  const glossary = [...glossarySamples]
    .sort((a, b) => a.termKo.localeCompare(b.termKo, 'ko'))
    .slice(0, 4)

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
          <Link to="/sitemap" className="text-ink-muted transition-colors hover:text-accent">
            사이트맵
          </Link>
          에서 구조를 먼저 보세요.
        </p>
      </section>

      <KpiBoard />

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Card News"
          title="카드뉴스"
          moreHref="/card-news"
        />
        <CardNewsGrid items={cardNewsSamples.slice(0, 3)} />
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Field Notes"
          title="현장 노트"
          moreHref="/notes"
        />
        <FieldNoteList items={fieldNoteSamples.slice(0, 2)} />
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Insights"
          title="인사이트"
          moreHref="/insights"
        />
        <InsightList items={insightSamples.slice(0, 2)} />
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading eyebrow="YouTube" title="유튜브" moreHref="/youtube" />
        <div className="grid gap-6 md:grid-cols-2">
          {youtube.map((video) => (
            <YoutubeEmbed
              key={video.id}
              title={video.title}
              embedUrl={video.embedUrl}
            />
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/youtube"
            className="text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            유튜브 더보기 »
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading eyebrow="Map" title="제조 지도" moreHref="/map" />
        <p className="mb-2 inline-block border border-line px-2 py-1 text-[11px] tracking-[0.06em] text-ink-muted">
          공공데이터 기반
        </p>
        <p className="max-w-xl text-[14px] leading-relaxed text-ink-muted">
          스마트공장 공급기업과 전국 산업단지 현황을 같은 지도에서 탭으로
          나눠 볼 수 있습니다. 산단은 시도 단위로 포커스합니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link
            to="/map"
            className="text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            공급기업 »
          </Link>
          <Link
            to="/map?tab=parks"
            className="text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            산업단지 »
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Policy"
          title="정책·지원사업"
          moreHref="/policy"
        />
        <PolicyList items={policies} />
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Standards"
          title="표준·인증"
          moreHref="/standards"
        />
        <p className="max-w-xl text-[14px] leading-relaxed text-ink-muted">
          ISO·IATF·정보보안·개인정보 인증을 마인드맵과 플로우로 정리했습니다.
          우리 공장에 맞는 경로를 빠르게 찾아보세요.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-[12px]">
          {['ISO 9001', 'IATF 16949', 'ISO 27001', 'ISMS-P'].map((code) => (
            <li
              key={code}
              className="border border-line bg-surface px-2 py-1 text-ink-muted"
            >
              {code}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <Link
            to="/standards"
            className="text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            표준·인증 안내 »
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Cases"
          title="사례·벤치마크"
          moreHref="/cases"
        />
        <p className="max-w-xl text-[14px] leading-relaxed text-ink-muted">
          자동차·배터리·전자·일반제조에서 SMART공장·AX가 어떻게 작동했는지
          숫자와 교훈만 모았습니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link
            to="/cases"
            className="text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            사례 보기 »
          </Link>
          <Link
            to="/roadmap"
            className="text-[13px] text-ink-muted transition-colors hover:text-accent"
          >
            도입 로드맵 »
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <SectionHeading
          eyebrow="Glossary"
          title="용어·해설"
          moreHref="/glossary"
        />
        <GlossaryList items={glossary} />
      </section>
    </div>
  )
}
