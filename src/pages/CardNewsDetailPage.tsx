import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BarChart, MetricRow } from '../components/CardSlideVisuals'
import { CommentSection } from '../components/CommentSection'
import { ContentNav } from '../components/ContentNav'
import { EngagementBar } from '../components/EngagementBar'
import {
  cardNewsSamples,
  getCardNewsSample,
} from '../data/cardNewsSamples'
import { getNeighbors } from '../lib/engagement'

export function CardNewsDetailPage() {
  const { id = '' } = useParams()
  const sample = getCardNewsSample(id)
  const [index, setIndex] = useState(0)
  const neighbors = getNeighbors(cardNewsSamples, id)

  useEffect(() => {
    setIndex(0)
    window.scrollTo(0, 0)
  }, [id])

  if (!sample) return <Navigate to="/card-news" replace />

  const total = sample.slides.length
  const slide = sample.slides[index]
  const isFirst = index === 0
  const isLast = index === total - 1
  const layout = slide.layout ?? (slide.image ? 'cover' : 'text')

  const goPrev = () => setIndex((v) => Math.max(0, v - 1))
  const goNext = () => setIndex((v) => Math.min(total - 1, v + 1))

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-white text-[#030303]">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 md:grid-cols-[1fr_280px] md:px-6 md:py-14">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 text-[13px] text-[#676f7b]">
            <Link to="/card-news" className="font-semibold text-[#1a1a1a] hover:opacity-70">
              ← 목록보기
            </Link>
            <span>
              {index + 1} / {total}
            </span>
          </div>

          <article
            className="relative flex h-[min(72vh,720px)] w-full flex-col overflow-hidden border border-[#e7eaf0] bg-white"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') goNext()
              if (e.key === 'ArrowLeft') goPrev()
            }}
            tabIndex={0}
          >
            <div className="min-h-0 flex-1 overflow-hidden">
              {layout === 'cover' && slide.image ? (
                <div className="relative h-full bg-white">
                  <img
                    src={slide.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                    {slide.eyebrow ? (
                      <p className="mb-2 text-[11px] tracking-[0.16em] text-white/70 uppercase">
                        {slide.eyebrow}
                      </p>
                    ) : null}
                    <h1 className="whitespace-pre-line text-[1.85rem] leading-[1.05] font-semibold tracking-tight md:text-[2.4rem]">
                      {slide.title}
                    </h1>
                    {slide.body ? (
                      <p className="mt-3 text-[14px] text-white/80">{slide.body}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {layout === 'split' ? (
                <div className="flex h-full flex-col">
                  {slide.image ? (
                    <div className="relative h-[42%] shrink-0 bg-[#d0d4d4]">
                      <img
                        src={slide.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="min-h-0 flex-1 overflow-auto p-6 md:p-8">
                    {slide.eyebrow ? (
                      <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-[#676f7b] uppercase">
                        {slide.eyebrow}
                      </p>
                    ) : null}
                    <h1 className="whitespace-pre-line text-[1.65rem] leading-[1.08] font-semibold tracking-tight md:text-[2rem]">
                      {slide.title}
                    </h1>
                    {slide.body ? (
                      <p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-[#676f7b] md:text-[14px]">
                        {slide.body}
                      </p>
                    ) : null}
                    {slide.metrics ? <MetricRow metrics={slide.metrics} /> : null}
                    {slide.bars ? <BarChart bars={slide.bars} /> : null}
                    {slide.highlight ? (
                      <p className="mt-4 border-t border-[#e7eaf0] pt-3 text-[12px] text-[#404040]">
                        {slide.highlight}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {layout === 'text' ? (
                <div className="h-full overflow-auto p-6 md:p-10">
                  {slide.eyebrow ? (
                    <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-[#676f7b] uppercase">
                      {slide.eyebrow}
                    </p>
                  ) : null}
                  <h1 className="whitespace-pre-line text-[1.85rem] leading-[1.05] font-semibold tracking-tight md:text-[2.35rem]">
                    {slide.title}
                  </h1>
                  {slide.body ? (
                    <p className="mt-4 whitespace-pre-line text-[14px] leading-relaxed text-[#676f7b]">
                      {slide.body}
                    </p>
                  ) : null}
                  {slide.metrics ? <MetricRow metrics={slide.metrics} /> : null}
                  {slide.bars ? <BarChart bars={slide.bars} /> : null}
                  {slide.highlight ? (
                    <p className="mt-5 border-t border-[#e7eaf0] pt-4 text-[12px] text-[#404040]">
                      {slide.highlight}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="flex h-16 shrink-0 items-center justify-between border-t border-[#e7eaf0] bg-white px-5">
              <p className="text-[11px] tracking-[0.14em] text-[#939393] uppercase">
                K-Manufacturing
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={isFirst}
                  className="h-10 rounded-full border border-[#030303] px-4 text-[13px] font-semibold disabled:opacity-30"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={isLast}
                  className="h-10 rounded-full bg-[#030303] px-4 text-[13px] font-semibold text-white disabled:opacity-30"
                >
                  다음
                </button>
              </div>
            </div>
          </article>

          <div className="mt-4 flex justify-center gap-1.5">
            {sample.slides.map((item, i) => (
              <button
                key={`${item.title}-${i}`}
                type="button"
                aria-label={`${i + 1}번째 슬라이드`}
                onClick={() => setIndex(i)}
                className={[
                  'h-1.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-[#030303]' : 'w-1.5 bg-[#c9ccd1]',
                ].join(' ')}
              />
            ))}
          </div>

          <div className="mt-6 border-t border-[#e7eaf0] pt-5">
            <EngagementBar
              kind="card-news"
              id={sample.id}
              title={sample.title}
              summary={sample.summary}
              trackView
              onLight
            />
          </div>

          <div className="text-[#030303] [&_.border-line]:border-[#e7eaf0] [&_.text-ink]:text-[#030303] [&_.text-ink-muted]:text-[#676f7b] [&_.text-ink-faint]:text-[#939393] [&_.bg-paper]:bg-white [&_.border-ink]:border-[#030303] [&_.bg-ink]:bg-[#030303] [&_.text-paper]:text-white [&_.text-accent]:text-[#2c4a3e]">
            <CommentSection kind="card-news" id={sample.id} />
            <ContentNav
              listHref="/card-news"
              listLabel="카드뉴스"
              currentTitle={sample.title}
              detailBase="/card-news"
              prev={neighbors.prev}
              next={neighbors.next}
            />
          </div>
        </div>

        <aside className="space-y-6 border-t border-[#e7eaf0] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div className="overflow-hidden border border-[#e7eaf0]">
            <img src={sample.cover} alt="" className="aspect-[3/4] w-full bg-white object-contain" />
          </div>
          <div>
            <p className="mb-2 text-[11px] tracking-[0.16em] text-[#939393] uppercase">
              {sample.topic}
            </p>
            <h2 className="text-xl leading-tight font-normal tracking-[-0.02em] text-[#030303]">
              {sample.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#676f7b]">
              {sample.summary}
            </p>
            <p className="mt-3 text-[12px] text-[#939393]">{sample.date}</p>
          </div>

          <div className="border-t border-[#e7eaf0] pt-5">
            <p className="mb-3 text-[12px] font-semibold tracking-[0.08em] text-[#1a1a1a] uppercase">
              Sources
            </p>
            <ul className="space-y-3">
              {sample.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#030303] underline-offset-4 hover:underline"
                  >
                    {source.name}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] leading-relaxed text-[#939393]">
              본 카드뉴스는 원문을 바탕으로 한 자체 요약이며, 사진·그래픽은 AI
              생성 이미지입니다. 상세 내용은 출처 링크에서 확인해 주세요.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
