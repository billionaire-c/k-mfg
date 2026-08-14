/**
 * 국내 시총 상위 제조사 분기 실적 — MVP 수동 큐레이션.
 * 단위는 조원(소수). 음수 영업이익은 적자.
 * 출처는 각사 IR·공시·공식 뉴스룸. 확인 후 최신치로 갱신.
 */

export type EarningsQuarter = {
  /** 예: 25.4Q, 26.1Q */
  label: string
  /** 매출 (조원) */
  revenue: number
  /** 영업이익 (조원), 적자는 음수 */
  operatingProfit: number
}

export type CompanyEarnings = {
  id: string
  name: string
  shortName: string
  sector: string
  quarters: EarningsQuarter[]
  source: string
  sourceUrl: string
}

export const earningsMeta = {
  title: '시총 TOP 제조 실적',
  subtitle: '분기 매출·영업이익 — 실적 발표 때 보는 숫자',
  asOf: '2026.2Q',
  updatedAt: '2026.08.14',
  unit: '조원',
  disclaimer:
    '최신 분기는 각사 IR·공시, 일부 과거 분기는 공시·보도 기준 반올림 · 참고용',
}

/** 사용자 지정 TOP5 (시가총액 관점의 대표 제조) */
export const companyEarnings: CompanyEarnings[] = [
  {
    id: '005930',
    name: '삼성전자',
    shortName: '삼성전자',
    sector: '반도체·완제품',
    quarters: [
      { label: '25.3Q', revenue: 86.1, operatingProfit: 9.2 },
      { label: '25.4Q', revenue: 93.9, operatingProfit: 20.0 },
      { label: '26.1Q', revenue: 133.9, operatingProfit: 57.2 },
      { label: '26.2Q', revenue: 171.5, operatingProfit: 89.5 },
    ],
    source: '삼성전자 실적발표 · Newsroom',
    sourceUrl:
      'https://news.samsung.com/kr/%ec%82%bc%ec%84%b1%ec%a0%84%ec%9e%90-2026%eb%85%84-2%eb%b6%84%ea%b8%b0-%ec%8b%a4%ec%a0%81-%eb%b0%9c%ed%91%9c',
  },
  {
    id: '000660',
    name: 'SK하이닉스',
    shortName: 'SK하이닉스',
    sector: '반도체',
    quarters: [
      { label: '25.3Q', revenue: 24.5, operatingProfit: 7.0 },
      { label: '25.4Q', revenue: 29.8, operatingProfit: 10.5 },
      { label: '26.1Q', revenue: 52.58, operatingProfit: 37.61 },
      { label: '26.2Q', revenue: 79.32, operatingProfit: 60.54 },
    ],
    source: 'SK하이닉스 경영실적 · Newsroom',
    sourceUrl: 'https://news.skhynix.co.kr/q2-2026-business-results/',
  },
  {
    id: '009150',
    name: '삼성전기',
    shortName: '삼성전기',
    sector: '전자부품',
    quarters: [
      { label: '25.3Q', revenue: 2.75, operatingProfit: 0.22 },
      { label: '25.4Q', revenue: 2.9, operatingProfit: 0.25 },
      { label: '26.1Q', revenue: 3.21, operatingProfit: 0.281 },
      { label: '26.2Q', revenue: 3.46, operatingProfit: 0.44 },
    ],
    source: '삼성전기 실적발표 (보도)',
    sourceUrl: 'https://www.businesspost.co.kr/BP?command=article_view&num=436904',
  },
  {
    id: '005380',
    name: '현대자동차',
    shortName: '현대차',
    sector: '자동차',
    quarters: [
      { label: '25.3Q', revenue: 43.0, operatingProfit: 3.5 },
      { label: '25.4Q', revenue: 46.0, operatingProfit: 3.2 },
      { label: '26.1Q', revenue: 45.95, operatingProfit: 2.51 },
      { label: '26.2Q', revenue: 49.22, operatingProfit: 2.85 },
    ],
    source: '현대자동차 경영실적 · 현대차그룹',
    sourceUrl:
      'https://www.hyundaimotorgroup.com/ko/news/hyundai-motor-company-2026-q2-earnings',
  },
  {
    id: '373220',
    name: 'LG에너지솔루션',
    shortName: 'LG엔솔',
    sector: '배터리',
    quarters: [
      { label: '25.3Q', revenue: 6.8, operatingProfit: 0.45 },
      { label: '25.4Q', revenue: 7.1, operatingProfit: 0.3 },
      { label: '26.1Q', revenue: 6.56, operatingProfit: -0.208 },
      { label: '26.2Q', revenue: 7.56, operatingProfit: 0.113 },
    ],
    source: 'LG에너지솔루션 실적발표',
    sourceUrl: 'https://www.newswire.co.kr/newsRead.php?no=1039662',
  },
]
