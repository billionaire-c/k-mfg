export type PolicyStatus = '모집중' | '예정' | '마감'
export type PolicyAgencyGroup = '중기부' | '산업부'

export type PolicySample = {
  id: string
  title: string
  agency: string
  agencyGroup: PolicyAgencyGroup
  period: string
  /** YYYY-MM-DD */
  startDate: string
  /** YYYY-MM-DD */
  endDate: string
  status: PolicyStatus
  summary: string
  url: string
  tags: string[]
  updatedAt: string
}

/** 기준일(로컬)로 접수 상태를 계산. 수동 status와 어긋나면 UI에서 이를 우선. */
export function resolvePolicyStatus(
  item: Pick<PolicySample, 'startDate' | 'endDate'>,
  today = new Date(),
): PolicyStatus {
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  const iso = `${y}-${m}-${d}`
  if (iso < item.startDate) return '예정'
  if (iso > item.endDate) return '마감'
  return '모집중'
}

/**
 * 정책·지원사업 — 최신·관심 공고가 배열 앞쪽.
 * 중기부: smart-factory.kr 모집·사업공고 기준 큐레이션
 * 산업부 등: 기업마당(bizinfo) 확인분
 * updatedAt: 2026.08.19
 */
export const policySamples: PolicySample[] = [
  {
    id: 'pol-mss-ai-solution-contest-2nd-2026',
    title: '제2회 제조AI 솔루션 공모전 공고',
    agency: '중소벤처기업부 · 중소기업기술정보진흥원',
    agencyGroup: '중기부',
    period: '2026.07.21 ~ 2026.08.21',
    startDate: '2026-07-21',
    endDate: '2026-08-21',
    status: '모집중',
    summary:
      '제조현장에 바로 쓸 수 있는 AI 솔루션을 발굴하는 공급기업 대상 공모전입니다. 스마트제조·스마트서비스 공급기업 Pool 등록 및 역량진단 참여가 필수이며, 스타트업·글로벌 트랙으로 스마트공장 사업관리시스템에서 접수합니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000124558',
    tags: ['제조AI', '공모전', '공급기업', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-keit-ai-factory-rd-2nd-2026',
    title: '2026년 2차 기계장비산업기술개발사업(AI팩토리) 신규지원 대상과제',
    agency: '산업통상부 · 한국산업기술기획평가원',
    agencyGroup: '산업부',
    period: '2026.08.19 ~ 2026.09.09',
    startDate: '2026-08-19',
    endDate: '2026-09-09',
    status: '모집중',
    summary:
      '기계장비·제조기반 생산시스템·제조장비 실증 등 AI 팩토리 관련 R&D 과제를 지원합니다. 범부처통합연구지원시스템(IRIS)으로 온라인 접수합니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000125307',
    tags: ['AI팩토리', 'R&D', '산업부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-motie-kaist-ai-guide-2026',
    title: '2026년 제조AI 기술지도 프로그램 참가기업 모집 (제조AI 솔루션 개발 지원센터)',
    agency: '산업통상부 · KAIST',
    agencyGroup: '산업부',
    period: '2026.08.04 ~ 2026.08.31',
    startDate: '2026-08-04',
    endDate: '2026-08-31',
    status: '모집중',
    summary:
      '제조 공정에 AI 도입을 희망하는 중소·중견·스타트업을 대상으로 KAIST·제조AI 전문가와 1:1 기술지도를 제공합니다. 구글 폼으로 접수합니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000125322',
    tags: ['제조AI', '기술지도', '산업부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-autonomous-factory-2nd-2026',
    title: '2026년 2차 자율형공장 구축 지원사업',
    agency: '중소벤처기업부 · 중소기업기술정보진흥원',
    agencyGroup: '중기부',
    period: '2026.04.27 ~ 2026.06.16',
    startDate: '2026-04-27',
    endDate: '2026-06-16',
    status: '마감',
    summary:
      'AI·DT·AAS 등 선도기술을 적용한 자율형공장 기획·구축을 지원합니다. 도입기업 단독 또는 도입–공급–기획 컨소시엄으로 신청하며, 접수는 스마트공장 사업관리시스템에서 진행했습니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000120990',
    tags: ['자율형공장', '스마트공장', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-rnd-spread-sf-2nd-2026',
    title: '2026년 2차 R&D성과확산 스마트공장 구축 지원사업',
    agency: '중소벤처기업부 · 중소기업기술정보진흥원',
    agencyGroup: '중기부',
    period: '2026.04.27 ~ 2026.06.16',
    startDate: '2026-04-27',
    endDate: '2026-06-16',
    status: '마감',
    summary:
      '국가 R&D 성과를 제조현장에 적용해 스마트공장을 구축하는 도입·공급 컨소시엄을 지원합니다. 스마트공장 사업관리시스템으로 접수했습니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000120993',
    tags: ['스마트공장', 'R&D확산', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-posco-ai-track-2026',
    title: '2026년 대·중소 상생형(AI트랙) 스마트공장 — 포스코형 도입기업 모집',
    agency: '중소벤처기업부 · 중소기업중앙회 · 포스코',
    agencyGroup: '중기부',
    period: '2026.05.20 ~ 2026.06.19',
    startDate: '2026-05-20',
    endDate: '2026-06-19',
    status: '마감',
    summary:
      '포스코·정부가 구축비를 분담하는 대중소 상생형(AI트랙)입니다. 철 스크랩 분류·물동량 모니터링 등 AI 검수·시스템 구축을 포함한 도입기업을 모집했습니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000122622',
    tags: ['상생형', 'AI트랙', '스마트공장', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-jumpup-sf-2026',
    title: '2026년 도약(Jump-Up) 프로그램 연계 스마트공장 구축 지원사업',
    agency: '중소벤처기업부 · 스마트제조혁신추진단',
    agencyGroup: '중기부',
    period: '2026.04.15 ~ 2026.04.30',
    startDate: '2026-04-15',
    endDate: '2026-04-30',
    status: '마감',
    summary:
      '도약 프로그램 선정 중소 제조기업의 스마트공장 고도화를 지원합니다. 최대 5억 원·9개월, 접수는 스마트공장 사업관리시스템에서 진행했습니다.',
    url: 'https://www.smart-factory.kr/usr/bg/ba/ma/bsnsPbancDtl?pbancId=2026-N-0066&pbancSn=1',
    tags: ['도약연계', '스마트공장', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-samsung-ai-track-2026',
    title: '2026년 대·중소상생형(AI 트랙) 스마트공장 — 삼성형 도입기업 모집',
    agency: '중소벤처기업부 · 중소기업중앙회 · 삼성전자',
    agencyGroup: '중기부',
    period: '2026.04.06 ~ 2026.05.08',
    startDate: '2026-04-06',
    endDate: '2026-05-08',
    status: '마감',
    summary:
      '삼성전자와 정부가 협업하는 대중소 상생형(AI트랙) 도입기업 모집입니다. 중간1 이상 목표의 AI 기반 스마트공장 구축을 지원했습니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000120218',
    tags: ['상생형', 'AI트랙', '스마트공장', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-ai-specialized-sf-2026',
    title: '2026년 제조AI특화 스마트공장 구축지원사업',
    agency: '중소벤처기업부 · 스마트제조혁신추진단',
    agencyGroup: '중기부',
    period: '2026.03.19 ~ 2026.04.20',
    startDate: '2026-03-19',
    endDate: '2026-04-20',
    status: '마감',
    summary:
      '스마트공장 구축·수준확인 이력이 있는 제조기업의 AI공장 구축(최대 2억) 또는 데이터 수집·검증(최대 0.5억)을 지원합니다. 접수는 스마트공장 사업관리시스템입니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000120109',
    tags: ['제조AI특화', 'AI트랙', '스마트공장', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-ax-sprint-2026',
    title: '제조분야 AI 응용제품 신속 상용화 지원사업(AX-Sprint)',
    agency: '중소벤처기업부 · 스마트제조혁신추진단',
    agencyGroup: '중기부',
    period: '2026.03.23 ~ 2026.04.20',
    startDate: '2026-03-23',
    endDate: '2026-04-20',
    status: '마감',
    summary:
      '산업안전·공정·경영 등에 바로 쓸 수 있는 AI 응용제품 상용화를 지원합니다. 도입·공급기업 컨소시엄 중심으로 모집되었으며, 공고·접수는 스마트공장 사업관리시스템을 참고하세요.',
    url: 'https://www.smart-factory.kr/usr/bg/ra/ma/rcrtPbanc',
    tags: ['AX-Sprint', '제조AI', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-motie-ai-factory-lead-2026',
    title: '2026년 AI 팩토리 선도사업 신규과제 (32개 · 약 527.5억)',
    agency: '산업통상부',
    agencyGroup: '산업부',
    period: '2026.04.30 ~ 2026.05.30',
    startDate: '2026-04-30',
    endDate: '2026-05-30',
    status: '마감',
    summary:
      '반도체·자동차·조선 등 주력산업 현장의 제조 AI 전환(M.AX)을 위한 선도과제입니다. 업종·공정 맞춤형 지원 유형으로 공모되었습니다.',
    url: 'https://www.yna.co.kr/view/AKR20260429053600003',
    tags: ['AI팩토리', 'M.AX', '산업부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-gov-smartfactory-2026',
    title: '2026년도 정부형 스마트공장 구축지원 사업',
    agency: '중소벤처기업부',
    agencyGroup: '중기부',
    period: '2025.12.08 ~ 2026.01.07',
    startDate: '2025-12-08',
    endDate: '2026-01-07',
    status: '마감',
    summary:
      '중소·중견 제조기업의 고도화 수준 스마트공장 구축을 지원하는 정부형 사업입니다. 회당 최대 2억 원, 목표수준별 총 2.5억 원 내 지원 구조이며 접수는 스마트공장 사업관리시스템에서 진행했습니다.',
    url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?bcIdx=1063190&cbIdx=310&parentSeq=1063190',
    tags: ['스마트공장', '정부형', '중기부'],
    updatedAt: '2026.08.19',
  },
  {
    id: 'pol-mss-autonomous-factory-1st-2026',
    title: '2026년도 자율형공장 구축 지원사업 (1차)',
    agency: '중소벤처기업부 · 스마트제조혁신추진단',
    agencyGroup: '중기부',
    period: '2025.12.08 ~ 2026.01.07',
    startDate: '2025-12-08',
    endDate: '2026-01-07',
    status: '마감',
    summary:
      'AI·디지털트윈 기반 자율형공장 선도모델 구축을 위한 연초 1차 모집입니다. 중간1 이상 구축·수준확인 기업이 대상이며, 상세는 스마트공장 사업관리시스템 사업공고를 확인하세요.',
    url: 'https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=PBLN_000000000116480',
    tags: ['자율형공장', '스마트공장', '중기부'],
    updatedAt: '2026.08.19',
  },
]

export function policyCoversDate(item: PolicySample, isoDate: string) {
  return item.startDate <= isoDate && isoDate <= item.endDate
}

export function policyOverlapsMonth(
  item: PolicySample,
  year: number,
  monthIndex: number,
) {
  const monthStart = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`
  const lastDay = new Date(year, monthIndex + 1, 0).getDate()
  const monthEnd = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
  return item.startDate <= monthEnd && item.endDate >= monthStart
}
