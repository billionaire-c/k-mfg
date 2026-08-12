import { toYoutubeEmbedUrl } from '../lib/youtube'

type YoutubeEmbedProps = {
  title: string
  embedUrl?: string
}

export function YoutubeEmbed({ title, embedUrl }: YoutubeEmbedProps) {
  const src = embedUrl ? toYoutubeEmbedUrl(embedUrl) : ''

  return (
    <figure className="space-y-2.5">
      <div className="relative aspect-video overflow-hidden border border-line bg-surface">
        {src ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-faint">
            <span className="text-[11px] tracking-[0.12em] uppercase">YouTube</span>
            <span className="text-[13px]">영상 URL이 없습니다</span>
          </div>
        )}
      </div>
      <figcaption className="text-[13px] text-ink-muted">{title}</figcaption>
    </figure>
  )
}
