/**
 * 업종별 스마트공장·AX 사례/벤치마크 — MVP 큐레이션.
 * 공개 보도·일반적 성과 패턴을 참고한 요약이며, 개별 공장 실명 검증용이 아닙니다.
 */

export type CaseIndustry = '자동차' | '배터리' | '전자' | '일반제조'

export type CaseSample = {
  id: string
  title: string
  industry: CaseIndustry
  companyType: string
  date: string
  summary: string
  challenge: string
  approach: string
  outcomes: { label: string; value: string }[]
  lesson: string
  related: { label: string; to: string }[]
  tags: string[]
}

export const caseIndustries: Array<CaseIndustry | '전체'> = [
  '전체',
  '자동차',
  '배터리',
  '전자',
  '일반제조',
]

export const casesMeta = {
  title: '사례·벤치마크',
  subtitle:
    '업종별로 스마트공장·AX가 어떻게 작동했는지, 숫자와 교훈만 짧게 모았습니다.',
  disclaimer:
    '공개 보도·업계 일반 패턴을 참고한 편집 요약입니다. 도입 전 자사 조건에 맞게 검증하세요.',
}

export const caseSamples: CaseSample[] = [
  {
    id: 'case-auto-vision-inline-2026',
    title: '용접 비드 비전검사: 불량 유출을 라인 끝에서 막다',
    industry: '자동차',
    companyType: 'Tier 1 · 차체/용접',
    date: '2026.08',
    summary:
      '사람 목시 검사 병목을 인라인 비전으로 옮기고, 불량 이미지를 주간 품질 회의 자료로 고정한 사례입니다.',
    challenge:
      '야간·잔업 시 목시 편차가 커지고, 고객 클레임이 ‘라인 끝’이 아니라 ‘출하 후’에 잡혔습니다.',
    approach:
      '핵심 용접 포인트 3곳에 비전을 붙이고, 불량 등급·조치 담당을 교대 인수인계 템플릿에 넣었습니다.',
    outcomes: [
      { label: '유출 불량', value: '↓ 42%' },
      { label: '검사 택트', value: '−1.2초' },
      { label: '조치 SLA', value: '30분' },
    ],
    lesson:
      '모델 정확도보다 ‘빨간 박스 → 누가 세우나’ 규칙이 먼저 성과를 만들었습니다.',
    related: [
      { label: '현장 노트 · 예지보전 PoC', to: '/notes/fn-pdm-poc-stuck-2026' },
      { label: '표준 · IATF', to: '/standards#iatf-16949' },
    ],
    tags: ['비전검사', '품질', 'IATF'],
  },
  {
    id: 'case-auto-andon-escalation-2026',
    title: '안돈 알람 200개: 줄인 건 센서가 아니라 등급표',
    industry: '자동차',
    companyType: '완성차 협력 · 조립',
    date: '2026.07',
    summary:
      '알람 폭주 라인에서 등급·에스컬레이션을 다시 짜 운영 소음을 줄인 벤치마크입니다.',
    challenge:
      '대시보드는 화려했지만 교대마다 ‘무시하는 알람’이 늘고, 진짜 정지가 묻혔습니다.',
    approach:
      '알람을 A/B/C로 재분류하고, A만 즉시 정지·B는 30분·C는 주간 리뷰로 분리했습니다.',
    outcomes: [
      { label: '유효 알람 비율', value: '18%→61%' },
      { label: '불필요 정지', value: '↓ 35%' },
      { label: '교대 인수 누락', value: '↓' },
    ],
    lesson: '스마트공장 피로의 핵심은 센서 수가 아니라 조치 설계입니다.',
    related: [
      { label: '현장 노트 · 데이터 습관', to: '/notes/fn-data-unused-2026' },
      { label: '성숙도 체크', to: '/check' },
    ],
    tags: ['안돈', '운영', '알람'],
  },
  {
    id: 'case-batt-ess-line-shift-2026',
    title: 'EV 라인을 ESS로: 캐파 전환이 먼저, MES는 다음',
    industry: '배터리',
    companyType: '셀/모듈 제조',
    date: '2026.08',
    summary:
      '제품 믹스 전환 시 KPI·작업지시를 같이 고쳐야 한다는 점을 보여 준 운영 사례입니다.',
    challenge:
      'ESS 주문이 늘었지만 MES 화면·품질 기준은 여전히 EV 중심이었습니다.',
    approach:
      '품번 체계·검사 항목·에너지 원단위를 ESS SKU 기준으로 분기하고, 주간 믹스 회의를 신설했습니다.',
    outcomes: [
      { label: 'ESS 출하 비중', value: '+14%p' },
      { label: '전환 로스', value: '↓ 9%' },
      { label: 'KPI 재정비', value: '6주' },
    ],
    lesson: '설비 전환만 하면 MES가 과거 제품을 최적화합니다.',
    related: [
      { label: '카드뉴스 · ESS', to: '/card-news/cn-ess-ai-datacenter-2026' },
      { label: '지원사업', to: '/policy' },
    ],
    tags: ['ESS', 'MES', '믹스'],
  },
  {
    id: 'case-batt-formation-energy-2026',
    title: '화성(formation) 전력: 원단위를 주간 KPI에 올린 공장',
    industry: '배터리',
    companyType: '중견 셀 공정',
    date: '2026.06',
    summary:
      '전력 고지서만 보던 공장에서 구역 원단위를 생산 KPI 옆에 나란히 둔 사례입니다.',
    challenge: '요금은 올랐는데 어느 방이 얼마를 쓰는지 월말에야 알았습니다.',
    approach:
      '분전반 구역 계측 → 주간 원단위 리포트 → 야간 공회전 점검을 운영 규칙에 포함했습니다.',
    outcomes: [
      { label: 'kWh/셀', value: '↓ 7%' },
      { label: '야간 공회전', value: '↓' },
      { label: '보고 주기', value: '월→주' },
    ],
    lesson: '완벽한 EMS보다 ‘생산량 옆 kWh’ 한 줄이 행동을 바꿉니다.',
    related: [
      { label: '현장 노트 · 에너지 KPI', to: '/notes/fn-energy-kpi-blind-2026' },
      { label: '용어', to: '/glossary' },
    ],
    tags: ['에너지', '원가', 'KPI'],
  },
  {
    id: 'case-elec-smt-trace-2026',
    title: 'SMT 트레이스: 로트 추적이 클레임 대응 시간을 줄이다',
    industry: '전자',
    companyType: 'EMS · 보드 실장',
    date: '2026.07',
    summary:
      '부품·보드·작업을 한 ID로 묶어 고객 품질 요청 대응을 단축한 벤치마크입니다.',
    challenge: '클레임 시 관련 로트·작업자를 찾는 데 반나절 이상 걸렸습니다.',
    approach:
      '피더·릴·보드 시리얼을 최소 스캔 포인트 4곳으로 연결하고, 출하 성적서에 링크를 붙였습니다.',
    outcomes: [
      { label: '추적 소요', value: '6h→40분' },
      { label: '재발 분석', value: '주 1회 정례' },
      { label: '고객 회신', value: '당일' },
    ],
    lesson: '추적은 IT 프로젝트가 아니라 클레임 SLA 프로젝트입니다.',
    related: [
      { label: '표준 · ISO 9001', to: '/standards#iso-9001' },
      { label: '현장 노트 · 기초', to: '/notes/fn-sme-before-ai-2026' },
    ],
    tags: ['트레이스', '품질', 'SMT'],
  },
  {
    id: 'case-elec-aoi-false-2026',
    title: 'AOI 과검: 모델보다 레시피·조명 표준이 이긴 주',
    industry: '전자',
    companyType: '모듈 조립',
    date: '2026.05',
    summary:
      'AI 재학습 요청이 쏟아지던 라인에서, 조명·레시피 락다운으로 과검을 줄인 사례입니다.',
    challenge: '과검으로 수동 재확인이 늘어 택트가 무너졌습니다.',
    approach:
      '모델 업데이트 동결 주간을 두고, 조명·각도·레시피 버전을 SOP에 고정한 뒤 오검 이미지를 분류했습니다.',
    outcomes: [
      { label: '과검률', value: '↓ 28%' },
      { label: '수동 재검', value: '↓ 33%' },
      { label: '모델 변경', value: '주 1회 제한' },
    ],
    lesson: '현장 AI 성과의 절반은 광학·레시피 표준에서 나옵니다.',
    related: [
      { label: '현장 노트 · 운영', to: '/notes/fn-ops-over-equipment-2026' },
      { label: '도입 로드맵', to: '/roadmap' },
    ],
    tags: ['AOI', 'AI', 'SOP'],
  },
  {
    id: 'case-gen-mes-owner-2026',
    title: '중소 MES: 구축보다 데이터 이관 조항이 협상 핵심',
    industry: '일반제조',
    companyType: '금속가공 중소',
    date: '2026.08',
    summary:
      '기능 데모는 통과했지만, 계약에 내보내기 포맷·종료 이관을 명시한 것이 잠금을 줄인 사례입니다.',
    challenge: '이전 시스템 데이터를 못 꺼내 이중 입력이 고착됐습니다.',
    approach:
      '킥오프 전 원천 데이터 목록·CSV/API·종료 시 이관 일정을 계약 첨부하고 분기 추출 리허설을 넣었습니다.',
    outcomes: [
      { label: '이중 입력', value: '↓' },
      { label: '추출 리허설', value: '분기 1회' },
      { label: '이관 리스크', value: '문서화' },
    ],
    lesson: '잠금은 화면이 아니라 ‘떠날 때 데이터’에서 생깁니다.',
    related: [
      { label: '현장 노트 · MES 소유권', to: '/notes/fn-vendor-lock-mes-2026' },
      { label: '공급기업 지도', to: '/map' },
    ],
    tags: ['MES', '계약', '데이터'],
  },
  {
    id: 'case-gen-shift-template-2026',
    title: '교대 템플릿 한 장: 야간 KPI가 주간을 따라잡다',
    industry: '일반제조',
    companyType: '사출·조립 중소',
    date: '2026.07',
    summary:
      '대시보드 고도화 대신 인수인계 네 칸으로 야간 편차를 줄인 현장 벤치마크입니다.',
    challenge: '주간 지표는 안정인데 야만 흔들렸습니다.',
    approach:
      '이상·조치·미결·담당 네 칸 템플릿을 교대 필수화하고, 미결만 아침 회의에 올렸습니다.',
    outcomes: [
      { label: '야간 편차', value: '↓ 22%' },
      { label: '미결 누적', value: '↓' },
      { label: '도입 기간', value: '2주' },
    ],
    lesson: '연속성은 센서가 아니라 교대 사이의 한 줄에서 시작됩니다.',
    related: [
      { label: '현장 노트 · 교대', to: '/notes/fn-shift-handover-2026' },
      { label: '성숙도 체크', to: '/check' },
    ],
    tags: ['교대', '운영', 'KPI'],
  },
]

export function getCaseSample(id: string) {
  return caseSamples.find((item) => item.id === id)
}
