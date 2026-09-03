/**
 * 숫자로 보는 스마트 공장 — 공개 보도·실태조사 수치 요약.
 * 증감(Δ)을 앞에 두고, 그 숫자가 현장에서 무엇을 의미하는지 한 줄로 읽히게 정리.
 */

export type StatTone = 'up' | 'down' | 'neutral'

export type SmartStat = {
  id: string
  /** 화면 큰 숫자. 예: "+43.5", "−15.9", "19.5%" */
  display: string
  unit?: string
  tone: StatTone
  /** 증감/수치의 한 줄 의미 — 품질이 올랐다 */
  effect: string
  body: string
  tag: string
  source: { name: string; note?: string; url?: string }
}

export type YearSeriesPoint = {
  year: string
  value: number
  display?: string
}

export const smartNumbersMeta = {
  title: '숫자로 보는 스마트 공장',
  subtitle:
    '보도자료·실태조사·성과분석에서 뽑은 숫자입니다. 증감이 있으면 부호를 크게 두고, 그 숫자가 현장에서 무엇을 바꾸는지 짧게 읽습니다.',
  disclaimer:
    '표본·연도·지역이 다른 자료를 함께 둡니다. 공장별 실적과 다를 수 있으며, 안내용 요약입니다. 와닿지 않는 항목은 이후 정리할 수 있습니다.',
}

/**
 * 연도별 시계열 — 누적·신규 보급은 중기부 보도·국회 제출 자료 계열.
 * 도입률(%)의 연도별 공식 시계열은 공개되지 않아, 2024 실태조사 시점값만 카드로 둠.
 * 예산은 사업명·부처·범위가 해마다 달라 연도 비교에서 제외.
 */
export const smartFactoryYearCharts = {
  title: '2020년 이후, 숫자로 본 보급',
  lead: '정부가 스마트공장 보급을 밀어온 구간의 누적·신규 실적입니다.',
  note: '도입률은 연도별 시계열이 공개되지 않아 아래 카드(19.5%)로만 표기합니다. 예산은 사업명·부처·범위가 해마다 달라 연도 비교 차트에서 제외했습니다.',
  sources: [
    {
      name: '중기부 스마트공장 보급 실적·통합공고 (보도)',
      url: 'https://www.korea.kr/special/policyCurationView.do?newsId=148866604',
    },
    {
      name: '국회 제출 자료 인용 보도 (누적·신규 2023–24)',
      url: 'https://www.mbn.co.kr/news/politics/5134024',
    },
  ],
  cumulative: {
    title: '누적 보급 (개)',
    unit: '개',
    points: [
      { year: '2020', value: 19799, display: '1.98만' },
      { year: '2021', value: 25008, display: '2.50만' },
      { year: '2022', value: 30144, display: '3.01만' },
      { year: '2023', value: 32662, display: '3.27만' },
      { year: '2024', value: 35282, display: '3.53만' },
    ] satisfies YearSeriesPoint[],
  },
  annualNew: {
    title: '연도별 신규 보급 (개)',
    unit: '개',
    points: [
      { year: '2020', value: 7139, display: '7,139' },
      { year: '2021', value: 5209, display: '5,209' },
      { year: '2022', value: 5136, display: '5,136' },
      { year: '2023', value: 2518, display: '2,518' },
      { year: '2024', value: 2620, display: '2,620' },
    ] satisfies YearSeriesPoint[],
  },
}

export const smartNumberSections: {
  id: string
  title: string
  lead: string
  items: SmartStat[]
}[] = [
  {
    id: 'effect',
    title: '도입하면 무엇이 바뀌나',
    lead: '중기부 스마트공장 보급사업 성과분석 — 도입 기업 평균 개선폭(Δ).',
    items: [
      {
        id: 'fx-quality',
        display: '+43.5',
        unit: '%',
        tone: 'up',
        effect: '품질이 올랐다',
        body: '불량·재작업이 줄고 고객이 체감하는 품질 지표가 개선된 평균 폭입니다. “설비 샀다”보다 “불량이 줄었다”가 먼저 읽혀야 합니다.',
        tag: '품질',
        source: {
          name: '중기부 스마트공장 보급사업 성과분석',
          note: '보도·기사 인용',
          url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=32229',
        },
      },
      {
        id: 'fx-productivity',
        display: '+30',
        unit: '%',
        tone: 'up',
        effect: '생산성이 올랐다',
        body: '같은 인력·시간으로 더 많이·더 안정적으로 돌린다는 신호입니다. 소규모 기업에서 개선폭이 더 크게 나타난 분석도 있습니다.',
        tag: '생산성',
        source: {
          name: '중기부 스마트공장 보급사업 성과분석',
          url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=32229',
        },
      },
      {
        id: 'fx-cost',
        display: '−15.9',
        unit: '%',
        tone: 'down',
        effect: '원가가 줄었다',
        body: '낭비·재작업·과잉재고가 줄면 원가 구조가 바뀝니다. 숫자 앞의 마이너스가 “비용 하락”을 뜻합니다.',
        tag: '원가',
        source: {
          name: '중기부 스마트공장 보급사업 성과분석',
          url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=32229',
        },
      },
      {
        id: 'fx-delivery',
        display: '+15.5',
        unit: '%',
        tone: 'up',
        effect: '납기 준수가 좋아졌다',
        body: '계획 대비 실적이 보이면 납기 약속을 지키기 쉬워집니다. 수주 신뢰와 직결되는 숫자입니다.',
        tag: '납기',
        source: {
          name: '중기부 스마트공장 보급사업 성과분석',
          url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=32229',
        },
      },
      {
        id: 'fx-sales',
        display: '+7.7',
        unit: '%',
        tone: 'up',
        effect: '매출이 늘었다',
        body: '공정 개선이 수주·출하로 이어진 평균 매출 증가입니다. 단기 영업이익보다 중기 경쟁력 지표로 읽는 편이 맞습니다.',
        tag: '매출',
        source: {
          name: '중기부 스마트공장 보급사업 성과분석',
          url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=32229',
        },
      },
      {
        id: 'fx-safety',
        display: '−18.3',
        unit: '%',
        tone: 'down',
        effect: '산업재해가 줄었다',
        body: '가시화·표준화가 현장 안전에도 영향을 준다는 신호입니다. 마이너스가 “재해 감소”입니다.',
        tag: '안전',
        source: {
          name: '중기부 스마트공장 보급사업 성과분석',
          url: 'https://www.industrynews.co.kr/news/articleView.html?idxno=32229',
        },
      },
    ],
  },
  {
    id: 'ai-robot',
    title: 'AI·로봇을 넣으면 무엇이 바뀌나',
    lead: '산업부 제조 AX(AI 팩토리)·중기부 자율형공장 사례, IFR 로봇 밀도 — 표본이 다르니 방향(Δ)으로 읽으세요.',
    items: [
      {
        id: 'ai-prod',
        display: '+30.1',
        unit: '%',
        tone: 'up',
        effect: 'AI 팩토리에서 생산성이 올랐다',
        body: '산업부가 AI 팩토리로 지원한 사업장 중 성과가 가시화된 42곳을 보면, 생산성이 평균 30.1% 높아졌습니다. (지원 170여 곳 중 조기 착수 과제 중심)',
        tag: '제조 AI·생산성',
        source: {
          name: '산업부 제조 AX / AI 팩토리 성과 (2026.08)',
          note: '연합뉴스 등 보도',
          url: 'https://www.yna.co.kr/view/AKR20260804030700003',
        },
      },
      {
        id: 'ai-defect',
        display: '−15.5',
        unit: '%',
        tone: 'down',
        effect: 'AI 팩토리에서 불량률이 줄었다',
        body: '같은 42개 사업장에서 불량률이 평균 15.5% 낮아졌습니다. 생산은 올리고 불량은 내리는 조합이 AX의 핵심 메시지입니다.',
        tag: '제조 AI·품질',
        source: {
          name: '산업부 제조 AX / AI 팩토리 성과 (2026.08)',
          url: 'https://www.yna.co.kr/view/AKR20260804030700003',
        },
      },
      {
        id: 'ai-inspect',
        display: '−90',
        unit: '%',
        tone: 'down',
        effect: '품질검사 시간이 크게 줄었다 (사례)',
        body: '전기차 배터리 무인 자율제조에 AI를 붙인 자동차 부품 현장에서, 품질검사 시간이 90% 단축된 사례입니다. 평균이 아니라 “이렇게까지 줄 수 있다”는 상한 신호로 읽으세요.',
        tag: '제조 AI·검사',
        source: {
          name: '산업부 AX 현장 사례 (아산성우하이텍 등)',
          note: '뉴시스·연합 보도',
          url: 'https://www.newsis.com/view/NISX20260804_0003735272',
        },
      },
      {
        id: 'ai-sme-defect',
        display: '10→6.5',
        unit: '%',
        tone: 'down',
        effect: '중소 자율형공장에서도 불량이 줄었다',
        body: '중기부 자율형공장 지원 사례에서 불량률이 10%에서 6.5%로 떨어졌고, 사이클타임은 54초→47초, 작업자 1명이 2대 관리로 생산성도 약 15% 올랐습니다.',
        tag: '자율형공장',
        source: {
          name: '중기부 자율형공장 구축 지원 사례 보도',
          url: 'https://v.daum.net/v/20250723111005083',
        },
      },
      {
        id: 'robot-density-delta',
        display: '+20',
        unit: '%',
        tone: 'up',
        effect: '한국 로봇 밀도가 한 해에 껑충 올랐다',
        body: 'IFR 기준 제조업 로봇 밀도(노동자 1만 명당 대수)가 2023년 1012대 → 2024년 1220대로 약 20% 늘었습니다. 자동화 투자가 실제로 쌓이고 있다는 신호입니다.',
        tag: '로봇·밀도',
        source: {
          name: 'IFR World Robotics 2025',
          note: '한겨레·로봇신문 등',
          url: 'https://www.hani.co.kr/arti/science/technology/1253402.html',
        },
      },
      {
        id: 'robot-density-rank',
        display: '1,220',
        unit: '대',
        tone: 'neutral',
        effect: '노동자 1만 명당 로봇, 세계 1위',
        body: '2024년 한국 로봇 밀도 1220대는 세계 1위 수준입니다. “로봇을 얼마나 쓰는가”의 국가 비교 지표이지, 개별 공장의 도입 효과를 보장하는 숫자는 아닙니다.',
        tag: '로봇·순위',
        source: {
          name: 'IFR World Robotics 2025',
          url: 'https://www.irobotnews.com/news/articleView.html?idxno=45775',
        },
      },
      {
        id: 'robot-wage',
        display: '+1.85',
        unit: '%',
        tone: 'up',
        effect: '로봇이 늘면 제조업 임금도 올랐다 (연구)',
        body: '로봇 노출도가 크게 높아질 때(근로자 1천 명당 약 6.6대 증가) 제조업 월급여가 약 1.85% 올랐다는 지역노동시장 분석입니다. 대체만 일어나는 게 아니라 생산성·고용 구조가 같이 움직입니다.',
        tag: '로봇·임금',
        source: {
          name: '한국노동연구원 — 로봇 도입과 지역노동시장',
          note: '연구 결과 요약',
          url: 'https://www.yna.co.kr/view/AKR20260124044800003',
        },
      },
    ],
  },
  {
    id: 'snapshot',
    title: '지금 현장은 어디쯤인가',
    lead: '중기부 「2024년 스마트제조혁신실태조사」(2025.04 발표) — 수준·확산 신호.',
    items: [
      {
        id: 'sn-adoption',
        display: '19.5',
        unit: '%',
        tone: 'neutral',
        effect: '아직 5곳 중 1곳만 도입',
        body: '공장 보유 중소·중견 약 16.3만 개사 중 도입률 19.5%(약 3.2만 개사). 중소만 보면 18.6%. “다 됐다”가 아니라 “진행 중”입니다.',
        tag: '도입률',
        source: {
          name: '2024 스마트제조혁신실태조사 (중기부)',
          url: 'https://korea.kr/briefing/pressReleaseView.do?newsId=156686561',
        },
      },
      {
        id: 'sn-basic',
        display: '75.5',
        unit: '%',
        tone: 'neutral',
        effect: '도입해도 기초에 머문 곳이 많다',
        body: '도입 기업의 75.5%가 기초 수준. 도입 선언과 고도화는 다릅니다. 다음 과제는 수준을 올리는 일입니다.',
        tag: '수준',
        source: {
          name: '2024 스마트제조혁신실태조사 (중기부)',
          url: 'https://korea.kr/briefing/pressReleaseView.do?newsId=156686561',
        },
      },
      {
        id: 'sn-partial',
        display: '99.8',
        unit: '%',
        tone: 'neutral',
        effect: '거의 전부 부분 도입',
        body: '전 라인을 한 번에 바꾸는 경우는 드뭅니다. 한 공정·한 라인부터가 현실적인 경로입니다.',
        tag: '범위',
        source: {
          name: '2024 스마트제조혁신실태조사 (중기부)',
          note: '기사 인용',
          url: 'https://www.mtnews.net/news/articleView.html?idxno=21609',
        },
      },
      {
        id: 'sn-ai',
        display: '0.1',
        unit: '%',
        tone: 'neutral',
        effect: '제조 AI는 이제 시작',
        body: '제조 AI 도입률 0.1%. DX 기반이 얕은 상태에서 AX 구호만 앞서는 현실의 숫자입니다.',
        tag: 'AI',
        source: {
          name: '2024 스마트제조혁신실태조사 (중기부)',
          note: '기사 인용',
          url: 'https://www.epnc.co.kr/news/articleView.html?idxno=315862',
        },
      },
      {
        id: 'sn-purpose',
        display: '56.5',
        unit: '%',
        tone: 'neutral',
        effect: '가장 많이 노리는 건 생산 효율',
        body: '스마트제조 추진 목적 1위가 생산 효율성(56.5%). 품질(37.1%)·비용(22.7%)이 뒤를 잇습니다.',
        tag: '목적',
        source: {
          name: '2024 스마트제조혁신실태조사 (중기부)',
          url: 'https://www.mtnews.net/news/articleView.html?idxno=21609',
        },
      },
      {
        id: 'sn-cost-sme',
        display: '7.5',
        unit: '억',
        tone: 'neutral',
        effect: '중소 평균 도입 비용',
        body: '도입 평균 비용 전체 11.3억, 중소 7.5억. “무료 지원”이 아니라 투자 결정이 필요한 규모입니다.',
        tag: '비용',
        source: {
          name: '2024 스마트제조혁신실태조사 (중기부)',
          url: 'https://www.mtnews.net/news/articleView.html?idxno=21609',
        },
      },
    ],
  },
  {
    id: 'regional',
    title: '지역에서도 같은 방향인가',
    lead: '경남 스마트공장 지원사업 성과(2022–2023 도입 439개사) — 전국 성과분석과 별도 표본.',
    items: [
      {
        id: 'gn-quality',
        display: '+44.3',
        unit: '%',
        tone: 'up',
        effect: '품질이 올랐다 (경남)',
        body: '경남 지원사업 도입 기업의 품질 개선폭. 전국 성과분석(+43.5)과 비슷한 방향입니다.',
        tag: '경남·품질',
        source: {
          name: '경남도 스마트공장 성과확산 보고 (2026.06)',
          url: 'http://www.enewstoday.co.kr/news/articleView.html?idxno=2439498',
        },
      },
      {
        id: 'gn-productivity',
        display: '+22.8',
        unit: '%',
        tone: 'up',
        effect: '생산성이 올랐다 (경남)',
        body: '같은 기간 경남 표본의 생산성 향상. 전국 평균(+30)과 숫자는 다르지만 “올랐다”는 방향은 같습니다.',
        tag: '경남·생산성',
        source: {
          name: '경남도 스마트공장 성과확산 보고 (2026.06)',
          url: 'http://www.enewstoday.co.kr/news/articleView.html?idxno=2439498',
        },
      },
      {
        id: 'gn-cost',
        display: '−32.5',
        unit: '%',
        tone: 'down',
        effect: '원가가 줄었다 (경남)',
        body: '경남 표본에서 원가 감소폭이 크게 잡힌 수치입니다. 전국 수치와 직접 비교보다 “절감 방향”으로 읽으세요.',
        tag: '경남·원가',
        source: {
          name: '경남도 스마트공장 성과확산 보고 (2026.06)',
          url: 'http://www.enewstoday.co.kr/news/articleView.html?idxno=2439498',
        },
      },
      {
        id: 'gn-delivery',
        display: '−17',
        unit: '%',
        tone: 'down',
        effect: '납기가 단축됐다 (경남)',
        body: '납기 시간·리드타임이 줄었다는 뜻의 마이너스입니다. (전국 성과분석의 “납기 준수 +%”와 지표 정의가 다릅니다.)',
        tag: '경남·납기',
        source: {
          name: '경남도 스마트공장 성과확산 보고 (2026.06)',
          url: 'http://www.enewstoday.co.kr/news/articleView.html?idxno=2439498',
        },
      },
    ],
  },
]

export const smartNumbersLinks = [
  { label: '제조에서 쓰는 AI', to: '/manufacturing-ai' },
  { label: '스마트공장 소개', to: '/smart-factory' },
  { label: '성숙도 체크', to: '/check' },
  { label: '구축 로드맵', to: '/roadmap' },
  { label: '지원사업', to: '/policy' },
]
