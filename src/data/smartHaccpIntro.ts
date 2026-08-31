/**
 * 스마트HACCP 소개 문구 —
 * 참고: https://www.haccp.or.kr/shp/shp/guest/shintrcn/shIntrcnIndex.do?action_type=INDEX_SHINTRCN
 */
export const smartHaccpIntro = {
  title: '스마트HACCP',
  subtitle:
    '식품 제조 현장의 HACCP을 디지털로 운영하는 체계와, 공공데이터로 공개된 인증업체 현황을 모았습니다.',
  portalName: '스마트HACCP 지원포털',
  portalUrl:
    'https://www.haccp.or.kr/shp/shp/guest/shintrcn/shIntrcnIndex.do?action_type=INDEX_SHINTRCN',
  whatIs: {
    headline: '스마트 HACCP이란?',
    paragraphs: [
      '스마트 HACCP이란, 식품제조 공장에 IoT 등 기술을 활용해 식품 안전 정보를 디지털화하고, 중요관리점 모니터링을 자동화하는 등 HACCP 관련 데이터 수집·관리·분석을 총망라한 디지털 기반 HACCP 종합 관리 시스템입니다.',
      '중요관리점(CCP) 자동 기록관리 시스템도 스마트 HACCP의 한 부분이며, 선행요건과 HACCP 관리 체계 전반을 디지털로 전환하는 것 역시 스마트 HACCP에 해당합니다.',
    ],
  },
  corePoints: {
    headline: '핵심: 중요관리점 모니터링 자동 기록관리',
    items: [
      'CCP 모니터링을 자동화하고 데이터 기록관리를 전산화하여 HACCP 기록의 신뢰성을 높입니다.',
      '실시간 모니터링과 전산 기록일지 자동 작성을 포함합니다.',
      '운영 기록을 자동화·전산화하면 분석·활용은 물론 생산·입출고 관리까지 확장할 수 있습니다.',
    ],
  },
  listNote:
    '아래 목록은 한국식품안전관리인증원 공공데이터(식품 스마트HACCP 인증업체)를 주기적으로 받아 정리한 현황입니다.',
}

export type SmartHaccpCompany = {
  appointNo: string
  licenseNo: string
  company: string
  ceoName: string
  sido: string
  sgg: string
  address: string
  ccp: string
  businessNm: string
  businessType: string
  businessItem: string
  appointYn: string
  year: string
}

export type SmartHaccpData = {
  meta: {
    title: string
    source: string
    sourceUrl: string
    endpoint: string
    fetchedAt: string
    count: number
    apiTotalCount: number | null
  }
  companies: SmartHaccpCompany[]
}
