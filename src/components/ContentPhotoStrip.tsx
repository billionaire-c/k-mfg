import type { ContentPhoto } from '../data/contentPhotoStrips'

type ContentPhotoStripProps = {
  photos: readonly ContentPhoto[]
  className?: string
}

/** 설명형 페이지 상단 — 2~3열 사진 (카드뉴스 자산) */
export function ContentPhotoStrip({
  photos,
  className = '',
}: ContentPhotoStripProps) {
  const count = photos.length
  const cols =
    count >= 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : count === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1'

  return (
    <div className={['grid gap-2', cols, className].filter(Boolean).join(' ')}>
      {photos.map((photo) => (
        <figure
          key={photo.src + photo.caption}
          className="overflow-hidden border border-line bg-surface/40"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="block h-36 w-full object-cover sm:h-40 md:h-44"
            loading="lazy"
          />
          <figcaption className="border-t border-line px-2.5 py-1.5 text-[11px] text-ink-faint">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
