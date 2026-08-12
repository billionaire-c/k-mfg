import { CardNewsGrid } from '../components/CardNewsGrid'
import { cardNewsSamples } from '../data/cardNewsSamples'

export function CardNewsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-16">
      <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-[#939393] uppercase">
        Card News
      </p>
      <h1 className="mb-3 text-2xl font-normal tracking-tight text-[#030303] md:text-3xl">
        카드뉴스
      </h1>
      <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-[#676f7b]">
        스마트공장·제조 AI 관련 이슈를 자체 요약으로 정리합니다. 원문은 출처
        링크에서 확인할 수 있습니다.
      </p>

      <CardNewsGrid items={cardNewsSamples} />
    </div>
  )
}
