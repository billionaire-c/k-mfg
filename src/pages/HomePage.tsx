import { Link } from 'react-router-dom'
import { CardNewsGrid } from '../components/CardNewsGrid'
import { InsightList } from '../components/InsightList'
import { SectionHeading } from '../components/SectionHeading'
import { SocialLinks } from '../components/SocialLinks'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { useContent } from '../context/ContentContext'
import { cardNewsSamples } from '../data/cardNewsSamples'
import { insightSamples } from '../data/insightSamples'
import { site } from '../data/placeholders'

export function HomePage() {
  const { getByKind } = useContent()
  const youtube = getByKind('youtube').slice(0, 2)

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
      </section>

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
    </div>
  )
}
