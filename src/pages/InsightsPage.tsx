import { InsightList } from '../components/InsightList'
import { insightSamples } from '../data/insightSamples'

export function InsightsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
        Insights
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        인사이트
      </h1>
      <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        스마트공장·제조 AI 관련 논문·자료를 소개합니다. 1단계는 메타데이터와
        원문 링크 중심이며, 요약은 자체 작성입니다.
      </p>

      <InsightList items={insightSamples} />
    </div>
  )
}
