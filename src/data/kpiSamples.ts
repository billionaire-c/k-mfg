/**
 * K-Manufacturing KPI 시그널 — MVP 수동 큐레이션.
 *
 * 값은 공개 통계·보도 흐름을 참고한 예시이며, 실서비스 전 최신치로 교체합니다.
 * 신호(green/amber/red)는 기준선 대비 단순 판정입니다.
 *
 * --- 2차 API 연동 후보 (확인만, MVP 미구현) ---
 * 1) KOSIS OpenAPI https://kosis.kr/openapi/
 * 2) 한국은행 ECOS Open API — 기업경기조사(BSI)
 * 3) S&P Global Manufacturing PMI — 인용·라이선스 조건 확인
 */

export type KpiSignal = 'green' | 'amber' | 'red'

export type KpiItem = {
  id: string
  label: string
  value: string
  unit?: string
  delta?: string
  /** 기준 시점 표기 (예: 2026.06) */
  period: string
  signal: KpiSignal
  /** 신호 판정 한 줄 */
  note: string
  /** 클릭 시 표시하는 지표 설명 */
  description: string
  /** 출처 기관·조사명 (정확히) */
  source: string
  /** 원문·조회 링크 */
  sourceUrl: string
}

export type KpiBoardMeta = {
  title: string
  subtitle: string
  asOf: string
  updatedAt: string
  overall: KpiSignal
  overallLabel: string
  disclaimer: string
}

export const kpiMeta: KpiBoardMeta = {
  title: '제조 시그널',
  subtitle: '한국 제조업의 지금을 숫자로 읽습니다.',
  asOf: '2026.06',
  updatedAt: '2026.08.14',
  overall: 'amber',
  overallLabel: '혼조',
  disclaimer: 'MVP 수동 수치 · API 연동 전 참고용',
}

/** 홈 첫 화면에 노출할 핵심 4지표 */
export const kpiSamples: KpiItem[] = [
  {
    id: 'kpi-iip',
    label: '광공업생산지수',
    value: '108.2',
    unit: '(2020=100)',
    delta: '전년동월 −1.4%',
    period: '2026.06',
    signal: 'amber',
    note: '전년 대비 소폭 둔화',
    description:
      '광업·제조업·전기·가스업의 생산 활동을 2020년=100으로 지수화한 지표입니다. 원계열은 전년동월비로 성장 수준을, 계절조정계열은 전월비로 단기 경기 흐름을 봅니다. 매월 통계청 「광업·제조업동향조사」로 공표됩니다.',
    source: '통계청 「광업·제조업동향조사」 · KOSIS',
    sourceUrl: 'https://kosis.kr/visual/economyBoard/economyDash.do?lang=',
  },
  {
    id: 'kpi-capacity',
    label: '제조업 가동률',
    value: '72.4',
    unit: '%',
    delta: '전월 −0.3%p',
    period: '2026.06',
    signal: 'amber',
    note: '장기 평균 대비 약보합',
    description:
      '제조업 생산능력 대비 실제 생산 비율(%)입니다. 설비가 얼마나 돌아가고 있는지를 보여 주며, 수요·재고·설비투자 판단에 함께 씁니다. 통계청 「광업·제조업동향조사」의 제조업 평균가동률로 공표됩니다.',
    source: '통계청 「광업·제조업동향조사」 · KOSIS',
    sourceUrl: 'https://kosis.kr/visual/economyBoard/economyDash.do?lang=',
  },
  {
    id: 'kpi-bsi',
    label: '제조업 BSI',
    value: '84',
    unit: '전망',
    delta: '전월 +2p',
    period: '2026.07',
    signal: 'amber',
    note: '100 미만 · 체감 개선 중',
    description:
      '기업경기실사지수(Business Survey Index). 제조 기업의 업황·매출 등 체감 경기를 설문으로 집계합니다. 100을 기준으로 이상이면 긍정 응답이 더 많고, 미만이면 부정 응답이 더 많습니다. 한국은행 「기업경기조사」에서 실적·전망을 월별로 공표합니다.',
    source: '한국은행 「기업경기조사」 · ECOS',
    sourceUrl: 'https://ecos.bok.or.kr/',
  },
  {
    id: 'kpi-pmi',
    label: '제조 PMI',
    value: '49.6',
    unit: '',
    delta: '전월 +0.4p',
    period: '2026.07',
    signal: 'red',
    note: '50 하회 · 수축 구간',
    description:
      'Purchasing Managers’ Index. 제조업 구매·공급망 담당자를 대상으로 신규주문·생산·고용 등을 설문해 합성한 지수입니다. 50을 기준으로 이상이면 확장, 미만이면 수축으로 해석합니다. S&P Global Korea Manufacturing PMI로 월별 발표됩니다.',
    source: 'S&P Global Korea Manufacturing PMI',
    sourceUrl: 'https://www.pmi.spglobal.com/Public/Release/PressReleases',
  },
]

export const kpiSignalLabel: Record<KpiSignal, string> = {
  green: '양호',
  amber: '주의',
  red: '경고',
}
