import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { useContent } from '../context/ContentContext'

export function YoutubePage() {
  const { getByKind } = useContent()
  const youtubeList = getByKind('youtube')

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        YouTube
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        유튜브
      </h1>
      <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        개인 채널 영상을 이 페이지에서 바로 시청할 수 있도록 iframe으로 배치합니다.
        영상 URL은 추후 연결합니다.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {youtubeList.map((video) => (
          <YoutubeEmbed
            key={video.id}
            title={video.title}
            embedUrl={video.embedUrl}
          />
        ))}
      </div>
    </div>
  )
}
