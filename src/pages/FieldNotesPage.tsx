import { FieldNoteList } from '../components/FieldNoteList'
import { fieldNoteSamples } from '../data/fieldNoteSamples'

export function FieldNotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Field Notes
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        현장 노트
      </h1>
      <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        공장·전시·지원 현장에서 본 장면과 짧은 해석을 남깁니다. 논문 요약이나
        카드뉴스와는 다른, 경험 중심의 기록입니다.
      </p>

      <FieldNoteList items={fieldNoteSamples} />
    </div>
  )
}
