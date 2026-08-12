export type MetricTone = 'up' | 'down' | 'neutral' | 'warn'

export type SlideMetric = {
  label: string
  value: string
  tone?: MetricTone
  arrow?: 'up' | 'down' | 'right'
}

export type ChartBar = {
  label: string
  value: number
  display?: string
  tone?: MetricTone
}

export type CardSlide = {
  eyebrow?: string
  title: string
  body?: string
  highlight?: string
  image?: string
  /** 커버처럼 이미지가 주인공인 슬라이드 */
  layout?: 'cover' | 'split' | 'text'
  metrics?: SlideMetric[]
  bars?: ChartBar[]
}

export type CardNewsSample = {
  id: string
  title: string
  date: string
  summary: string
  topic: string
  cover: string
  sources: { name: string; url: string }[]
  slides: CardSlide[]
}

/** 자체 요약 카드뉴스 샘플 — 원문 링크 포함 */
export const cardNewsSamples: CardNewsSample[] = [
  {
    id: 'cn-ai-factory-max-2026',
    title: 'AI 팩토리, 생산성 +30% · 불량 −15%의 의미',
    date: '2026.08.12',
    summary:
      '산업부가 발표한 AI 팩토리 선도 사업 성과를 요약합니다. 숫자의 맥락과 2030 목표를 함께 정리했습니다.',
    topic: '스마트공장 · 정책',
    cover: '/card-news/cn-ai-factory-max-2026.png',
    sources: [
      {
        name: '연합뉴스',
        url: 'https://www.yna.co.kr/view/AKR20260804030700003',
      },
      {
        name: '매일경제',
        url: 'https://stock.mk.co.kr/news/view/1133747',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News 01',
        title: 'AI 팩토리,\n현장 숫자가\n나왔다',
        body: '스마트공장 · 제조 AI 전환 (M.AX)',
        image: '/card-news/slide-factory-line.png',
      },
      {
        layout: 'split',
        eyebrow: '핵심 지표',
        title: '현장 성과,\n숫자로 보면',
        body: '성과가 가시화된 42개 사업장 평균\n(산업통상자원부 발표 기준)',
        image: '/card-news/slide-quality-parts.png',
        metrics: [
          { label: '생산성', value: '+30.1%', tone: 'up', arrow: 'up' },
          { label: '불량률', value: '−15.5%', tone: 'down', arrow: 'down' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '규모',
        title: '지원 사업장\n약 170곳',
        body: '반도체·자동차·조선 등\n실제 제조 현장에서 AI 전환을 지원',
        image: '/card-news/slide-welding-robot.png',
        metrics: [
          { label: '선도 지원', value: '170+', tone: 'neutral', arrow: 'right' },
          { label: '성과 확인', value: '42곳', tone: 'neutral' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '비교 · 목표',
        title: '지금은 170곳,\n목표는 500곳',
        body: '2030년까지 AI 팩토리를 확대하고\n검증 모델을 중소·중견으로 확산',
        bars: [
          { label: '현재 지원', value: 170, display: '170곳', tone: 'neutral' },
          { label: '2030 목표', value: 500, display: '500곳', tone: 'up' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '현장 사례',
        title: '업종별로\n다른 개선',
        body: '부품 선별, 품질검사 시간 단축,\n용접·검사 자동화 등 공정별 성과',
        image: '/card-news/slide-data-panel.png',
        highlight: '※ 세부 수치는 원문에서 확인',
      },
      {
        layout: 'text',
        eyebrow: '한 줄 정리',
        title: '실험에서\n확산으로',
        body: '성과가 공개된 만큼,\n현장에 맞는 적용 설계가 다음 경쟁력',
        metrics: [
          { label: '방향', value: '확산', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
  {
    id: 'cn-physical-ai-gap-gg',
    title: '데이터는 모았는데… 피지컬 AI는 아직 12.5%',
    date: '2026.08.12',
    summary:
      '경기도 스마트공장 조사로 본 DX와 피지컬 AI 격차. MES·ERP는 늘었지만 공정 제어·최적화 연결은 초기 단계입니다.',
    topic: '스마트공장 · 현장',
    cover: '/card-news/cn-physical-ai-gap-gg.png',
    sources: [
      {
        name: '머니투데이',
        url: 'https://www.mt.co.kr/policy/2026/08/06/2026080609481797339',
      },
    ],
    slides: [
      {
        layout: 'cover',
        eyebrow: 'Card News 02',
        title: '스마트공장이\n막히는 지점',
        body: '데이터는 쌓였는데, 현장 AI는 아직',
        image: '/card-news/slide-control-room.png',
      },
      {
        layout: 'split',
        eyebrow: '조사 개요',
        title: '경기 제조기업\n200곳',
        body: '스마트공장 기초 단계 이상 기업\n디지털 전환은 상당수 진행 중',
        image: '/card-news/slide-factory-line.png',
        metrics: [
          { label: '조사 대상', value: '200곳', tone: 'neutral' },
          { label: 'DX 추진', value: '77.5%', tone: 'up', arrow: 'up' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '비교',
        title: '시스템은 있는데\n연결은 약하다',
        body: 'MES·ERP 도입률은 높지만\n피지컬 AI 적용은 초기 단계',
        bars: [
          { label: 'MES', value: 92.9, display: '92.9%', tone: 'up' },
          { label: 'ERP', value: 79.4, display: '79.4%', tone: 'neutral' },
          { label: '피지컬 AI', value: 12.5, display: '12.5%', tone: 'warn' },
        ],
        metrics: [
          { label: '격차', value: 'MES → AI', tone: 'warn', arrow: 'down' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '핵심 격차',
        title: '데이터는 모았는데\n쓰질 못한다',
        body: '대부분 단순 인식 기능에 머무름\n공정 최적화 연결은 극소수',
        image: '/card-news/slide-data-panel.png',
        metrics: [
          { label: '피지컬 AI', value: '12.5%', tone: 'warn', arrow: 'down' },
          { label: '최적화 연결', value: '1.5%', tone: 'warn', arrow: 'down' },
        ],
      },
      {
        layout: 'text',
        eyebrow: '장애 요인',
        title: '비용 · 호환성\n신뢰성',
        body: '초기 투자비와 설비 교체 부담이 크고\n기술 안정성·회수 기간 요구가 높음',
        bars: [
          { label: '초기 투자 부담', value: 69.7, display: '69.7%', tone: 'warn' },
          { label: '설비 교체 부담', value: 50.3, display: '50.3%', tone: 'warn' },
          { label: '기술 신뢰성 중시', value: 49.0, display: '49.0%', tone: 'neutral' },
        ],
      },
      {
        layout: 'split',
        eyebrow: '시사점',
        title: '다음 과제는\n‘연결’',
        body: '시스템 도입을 넘어\n데이터·설비·AI를 한 흐름으로',
        image: '/card-news/slide-quality-parts.png',
        metrics: [
          { label: '다음 단계', value: '연결', tone: 'up', arrow: 'right' },
        ],
      },
    ],
  },
]

export function getCardNewsSample(id: string) {
  return cardNewsSamples.find((item) => item.id === id)
}
