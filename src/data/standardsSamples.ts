/**
 * 제조업 표준·인증 안내 — MVP 큐레이션.
 * 공식 표준 본문이 아니라 현장 이해용 요약입니다.
 */

export type StandardCategory =
  | '품질'
  | '자동차'
  | '환경·안전'
  | '정보보안'
  | '개인정보'

export type StandardItem = {
  id: string
  code: string
  name: string
  category: StandardCategory
  summary: string
  who: string
  why: string
  related: string[]
  /** 공식/참고 링크 */
  url?: string
}

export const standardCategories: StandardCategory[] = [
  '품질',
  '자동차',
  '환경·안전',
  '정보보안',
  '개인정보',
]

export const standardsMeta = {
  title: '표준·인증',
  subtitle:
    '공장에서 자주 마주치는 ISO·IATF·보안·개인정보 인증을 한눈에 정리합니다.',
  disclaimer:
    '안내용 요약입니다. 인증 범위·요구사항은 최신 표준 원문과 인증기관 가이드를 확인하세요.',
}

/** 마인드맵 중심 → 가지 */
export const standardsMindMap = {
  center: '제조 표준·인증',
  branches: [
    {
      id: 'quality',
      label: '품질',
      tone: 'teal',
      items: ['ISO 9001', 'ISO 9001 → 문서·프로세스'],
    },
    {
      id: 'auto',
      label: '자동차',
      tone: 'amber',
      items: ['IATF 16949', '고객 CSR·APQP'],
    },
    {
      id: 'env',
      label: '환경·안전',
      tone: 'emerald',
      items: ['ISO 14001', 'ISO 45001'],
    },
    {
      id: 'sec',
      label: '정보보안',
      tone: 'sky',
      items: ['ISO 27001', 'ISMS'],
    },
    {
      id: 'privacy',
      label: '개인정보',
      tone: 'rose',
      items: ['ISO 27701', 'ISMS-P', '개인정보보호법'],
    },
  ],
} as const

export type FlowNode =
  | {
      type: 'question'
      id: string
      text: string
      yes: string
      no: string
    }
  | {
      type: 'result'
      id: string
      title: string
      standardIds: string[]
      note: string
    }

/** 간단 의사결정 플로우 */
export const standardsFlow: Record<string, FlowNode> = {
  start: {
    type: 'question',
    id: 'start',
    text: '주요 고객이 자동차 OEM·Tier인가요?',
    yes: 'auto',
    no: 'privacy',
  },
  auto: {
    type: 'result',
    id: 'auto',
    title: '자동차 공급망 경로',
    standardIds: ['iatf-16949', 'iso-9001', 'iso-14001'],
    note: 'IATF 16949가 축이고, 그 아래 ISO 9001·고객 CSR·APQP/PPAP이 붙습니다.',
  },
  privacy: {
    type: 'question',
    id: 'privacy',
    text: '고객·임직원 개인정보를 시스템으로 다루나요?',
    yes: 'privacy-result',
    no: 'security',
  },
  'privacy-result': {
    type: 'result',
    id: 'privacy-result',
    title: '개인정보·보안 경로',
    standardIds: ['isms-p', 'iso-27701', 'iso-27001'],
    note: '국내 공공·대기업 거래에서는 ISMS-P 요구가 흔하고, ISO 27701은 27001 위에 얹는 형태입니다.',
  },
  security: {
    type: 'question',
    id: 'security',
    text: '도면·공정·거래 데이터를 외부망·클라우드와 연동하나요?',
    yes: 'security-result',
    no: 'base',
  },
  'security-result': {
    type: 'result',
    id: 'security-result',
    title: '정보보안 경로',
    standardIds: ['iso-27001', 'isms'],
    note: '스마트공장·원격 모니터링이 늘수록 27001/ISMS가 품질 인증 다음 과제로 올라옵니다.',
  },
  base: {
    type: 'result',
    id: 'base',
    title: '기본 경영시스템 경로',
    standardIds: ['iso-9001', 'iso-14001', 'iso-45001'],
    note: '먼저 품질(9001)로 프로세스 뼈대를 잡고, 필요에 따라 환경·안전으로 확장하는 경우가 많습니다.',
  },
}

export const standardSamples: StandardItem[] = [
  {
    id: 'iso-9001',
    code: 'ISO 9001',
    name: '품질경영시스템',
    category: '품질',
    summary:
      '고객 요구사항을 충족하기 위한 품질 프로세스의 국제 표준입니다. 대부분의 제조 인증의 출발점입니다.',
    who: '부품·완성품 제조, 사내 프로세스 정비가 필요한 공장',
    why: '거래 기본 조건, 부적합·시정조치·내부심사 체계의 공통 언어',
    related: ['iatf-16949', 'iso-14001'],
    url: 'https://www.iso.org/standard/62085.html',
  },
  {
    id: 'iatf-16949',
    code: 'IATF 16949',
    name: '자동차 품질경영시스템',
    category: '자동차',
    summary:
      'ISO 9001을 기반으로 자동차 산업 특화 요구(고객 특수요구, APQP, PPAP 등)를 더한 표준입니다.',
    who: '자동차 OEM·Tier 공급망에 납품하는 제조사',
    why: '완성차·1차 벤더 거래의 사실상 필수 티켓',
    related: ['iso-9001'],
    url: 'https://www.iatfglobaloversight.org/',
  },
  {
    id: 'iso-14001',
    code: 'ISO 14001',
    name: '환경경영시스템',
    category: '환경·안전',
    summary:
      '환경 영향 파악·법규 준수·지속적 개선을 위한 경영시스템 표준입니다.',
    who: '배출·폐기물·에너지 관리가 중요한 공장, ESG 요구를 받는 공급사',
    why: '대기업 ESG·녹색구매, 해외 바이어 실사에서 자주 요구',
    related: ['iso-9001', 'iso-45001'],
    url: 'https://www.iso.org/iso-14001-environmental-management.html',
  },
  {
    id: 'iso-45001',
    code: 'ISO 45001',
    name: '안전보건경영시스템',
    category: '환경·안전',
    summary:
      '근로자 안전·보건 리스크를 체계적으로 관리하기 위한 국제 표준입니다.',
    who: '중대재해처벌법·현장 안전관리가 민감한 제조 현장',
    why: '사고 예방과 원청·고객 안전 실사 대응',
    related: ['iso-14001'],
    url: 'https://www.iso.org/standard/63787.html',
  },
  {
    id: 'iso-27001',
    code: 'ISO 27001',
    name: '정보보안경영시스템',
    category: '정보보안',
    summary:
      '정보자산의 기밀성·무결성·가용성을 지키기 위한 ISMS 국제 표준입니다.',
    who: '스마트공장, 클라우드 MES, 도면·고객 데이터 연동 기업',
    why: 'OT/IT 연동·원격 관제 확대에 따른 보안 요구 대응',
    related: ['iso-27701', 'isms'],
    url: 'https://www.iso.org/standard/27001',
  },
  {
    id: 'isms',
    code: 'ISMS',
    name: '정보보호 관리체계 인증',
    category: '정보보안',
    summary:
      '국내 정보보호 관리체계 인증으로, 일정 규모 이상 서비스·인프라에 법적·거래상 요구될 수 있습니다.',
    who: '국내 대형 플랫폼·데이터센터·주요 정보통신서비스 관련 조직',
    why: '국내 규제·공공/대기업 거래에서의 정보보호 신뢰',
    related: ['iso-27001', 'isms-p'],
    url: 'https://isms.kisa.or.kr/',
  },
  {
    id: 'iso-27701',
    code: 'ISO 27701',
    name: '개인정보 관리 확장',
    category: '개인정보',
    summary:
      'ISO 27001을 확장해 개인정보 처리자·관리자 관점의 PIMS 요구를 담은 표준입니다.',
    who: '이미 27001을 갖추고 개인정보 보호를 국제 기준으로 보여줘야 하는 조직',
    why: '글로벌 고객의 개인정보·GDPR 관련 실사 대응',
    related: ['iso-27001', 'isms-p'],
    url: 'https://www.iso.org/standard/71670.html',
  },
  {
    id: 'isms-p',
    code: 'ISMS-P',
    name: '정보보호·개인정보보호 관리체계',
    category: '개인정보',
    summary:
      '국내 ISMS에 개인정보보호를 결합한 인증입니다. 개인정보 처리가 많은 서비스·제조 플랫폼에서 요구됩니다.',
    who: '고객·임직원 개인정보를 다루는 국내 사업자, B2B 포털·앱 운영 제조사',
    why: '개인정보보호법·국내 대기업/공공 거래 요구에 맞춘 실증',
    related: ['isms', 'iso-27701'],
    url: 'https://isms.kisa.or.kr/',
  },
]

export function getStandard(id: string) {
  return standardSamples.find((item) => item.id === id)
}
