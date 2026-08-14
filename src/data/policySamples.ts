export type PolicyStatus = '모집중' | '예정' | '마감'
export type PolicyAgencyGroup = '중기부' | '산업부'

export type PolicySample = {
  id: string
  title: string
  agency: string
  agencyGroup: PolicyAgencyGroup
  period: string
  status: PolicyStatus
  summary: string
  url: string
  tags: string[]
  updatedAt: string
}

/**
 * 정책·지원사업 — 최신·관심 공고가 배열 앞쪽.
 * 수동 큐레이션. 상태(모집중/예정/마감)는 주기적으로 갱신.
 */
export const policySamples: PolicySample[] = [
  {
    id: 'pol-keit-ai-factory-rd-2nd-2026',
    title: '2026년 2차 기계장비산업기술개발사업(AI팩토리) 신규지원 과제',
    agency: '산업통상부 · 한국산업기술기획평가원',
    agencyGroup: '산업부',
    period: '2026.08.19 ~ 2026.09.09',
    status: '예정',
    summary:
      '기계장비·제조기반 생산시스템·제조장비 실증 등 AI 팩토리 관련 R&D 과제를 지원합니다. IRIS를 통해 온라인 접수합니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000125307',
    tags: ['AI팩토리', 'R&D', '산업부'],
    updatedAt: '2026.08.14',
  },
  {
    id: 'pol-motie-ai-factory-lead-2026',
    title: '2026년 AI 팩토리 선도사업 신규과제 (32개 · 약 527.5억)',
    agency: '산업통상부',
    agencyGroup: '산업부',
    period: '2026.04.30 ~ 2026.05.30',
    status: '마감',
    summary:
      '반도체·자동차·조선 등 주력산업 현장의 제조 AI 전환(M.AX)을 위한 선도과제입니다. 업종·공정 맞춤형 지원 유형으로 공모되었습니다.',
    url: 'https://www.yna.co.kr/view/AKR20260429053600003',
    tags: ['AI팩토리', 'M.AX', '산업부'],
    updatedAt: '2026.08.14',
  },
  {
    id: 'pol-mss-autonomous-factory-2nd-2026',
    title: '2026년 2차 자율형공장 구축 지원사업',
    agency: '중소벤처기업부 · 중소기업기술정보진흥원',
    agencyGroup: '중기부',
    period: '2026.04.27 ~ 2026.06.16',
    status: '마감',
    summary:
      'AI·DT·AAS 등 선도기술을 적용한 자율형공장 기획·구축을 지원합니다. 도입기업 단독 또는 도입–공급–기획 컨소시엄으로 신청합니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000120990',
    tags: ['자율형공장', '스마트공장', '중기부'],
    updatedAt: '2026.08.14',
  },
  {
    id: 'pol-mss-rnd-spread-sf-2nd-2026',
    title: '2026년 2차 R&D성과확산 스마트공장 구축 지원사업',
    agency: '중소벤처기업부 · 중소기업기술정보진흥원',
    agencyGroup: '중기부',
    period: '2026.04.27 ~ 2026.06.16',
    status: '마감',
    summary:
      '국가 R&D 성과를 제조현장에 적용해 스마트공장을 구축하는 도입·공급 컨소시엄을 지원합니다. 스마트공장 사업관리시스템으로 접수합니다.',
    url: 'https://www.bizinfo.go.kr/sii/siia/selectSIIA200Detail.do?pblancId=PBLN_000000000120993',
    tags: ['스마트공장', 'R&D확산', '중기부'],
    updatedAt: '2026.08.14',
  },
  {
    id: 'pol-mss-ax-sprint-2026',
    title: '제조분야 AI 응용제품 신속 상용화 지원사업(AX-Sprint)',
    agency: '중소벤처기업부 · 스마트제조혁신추진단',
    agencyGroup: '중기부',
    period: '2026.03.23 ~ 2026.04.20',
    status: '마감',
    summary:
      '제조 현장의 산업안전·공정·경영 등에 바로 쓸 수 있는 AI 응용제품 상용화를 지원합니다. 도입·공급기업 컨소시엄 중심으로 모집되었습니다.',
    url: 'https://www.smart-factory.kr',
    tags: ['AX-Sprint', '제조AI', '중기부'],
    updatedAt: '2026.08.14',
  },
  {
    id: 'pol-mss-gov-smartfactory-2026',
    title: '2026년도 정부형 스마트공장 구축지원 사업',
    agency: '중소벤처기업부',
    agencyGroup: '중기부',
    period: '2025.12.08 ~ 2026.01.07',
    status: '마감',
    summary:
      '중소·중견 제조기업의 고도화 수준 스마트공장 구축을 지원하는 정부형 사업입니다. 회당 최대 2억 원, 목표수준별 총 2.5억 원 내 지원 구조입니다.',
    url: 'https://www.mss.go.kr/site/smba/ex/bbs/View.do?bcIdx=1063190&cbIdx=310&parentSeq=1063190',
    tags: ['스마트공장', '정부형', '중기부'],
    updatedAt: '2026.08.14',
  },
]
