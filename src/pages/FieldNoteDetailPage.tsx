import { Link, Navigate, useParams } from 'react-router-dom'
import { FieldNoteRichText } from '../components/FieldNoteRichText'
import { getFieldNoteSample } from '../data/fieldNoteSamples'

export function FieldNoteDetailPage() {
  const { id = '' } = useParams()
  const note = getFieldNoteSample(id)

  if (!note) return <Navigate to="/notes" replace />

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <Link
        to="/notes"
        className="text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        ← 현장 노트
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium tracking-[0.06em] text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
          현장 노트
        </span>
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="border border-line bg-surface px-2 py-0.5 text-[11px] text-ink-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="mt-4 text-2xl leading-snug font-semibold tracking-tight text-ink md:text-3xl">
        {note.title}
      </h1>
      <p className="mt-3 text-[13px] text-ink-faint">{note.date}</p>

      <figure className="mt-8 overflow-hidden border border-line bg-surface">
        <img
          src={note.cover}
          alt=""
          className="aspect-[16/9] w-full object-cover"
        />
      </figure>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
        {note.body.map((block, index) => {
          if (block.type === 'p') {
            return (
              <p key={`p-${index}`}>
                <FieldNoteRichText text={block.text} />
              </p>
            )
          }

          return (
            <figure key={`img-${index}`} className="my-2">
              <div className="overflow-hidden border border-line bg-surface">
                <img
                  src={block.src}
                  alt={block.caption ?? ''}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              {block.caption ? (
                <figcaption className="mt-2.5 text-[13px] leading-relaxed text-ink-faint">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        })}
      </div>

      <aside className="mt-10 border border-amber-200/80 bg-amber-50/60 px-4 py-4 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-[11px] font-medium tracking-[0.1em] text-amber-800/80 uppercase dark:text-amber-200/80">
          한 줄 정리
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink md:text-[16px]">
          <FieldNoteRichText text={note.takeaway} />
        </p>
      </aside>

      {note.related && note.related.length > 0 ? (
        <div className="mt-10 border-t border-line pt-6">
          <p className="mb-3 text-[12px] text-ink-faint">관련 보기</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
            {note.related.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-teal-700 underline-offset-2 hover:underline dark:text-teal-300"
                >
                  {link.label} »
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
