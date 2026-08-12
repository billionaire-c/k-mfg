export type InsightSample = {
  id: string
  title: string
  titleKo?: string
  authors: string
  year: string
  venue: string
  summary: string
  tags: string[]
  doi: string
  url: string
  accessNote: string
}

/** 인사이트 1단계 샘플 — 메타데이터 + 원문 링크 (자체 요약) */
export const insightSamples: InsightSample[] = [
  {
    id: 'in-iot-smart-factories-2023',
    title: 'Internet of things for smart factories in industry 4.0, a review',
    titleKo: '인더스트리 4.0 스마트공장에서의 IoT: 리뷰',
    authors: 'Mohsen Soori, Behrooz Arezoo, Roza Dastres',
    year: '2023',
    venue: 'Internet of Things and Cyber-Physical Systems',
    summary:
      '스마트공장에서 IoT가 예지보전, 자산추적, 재고·품질·공정 모니터링, 에너지 효율, 공급망 최적화에 어떻게 쓰이는지를 정리한 리뷰 논문입니다. 현장 적용 관점에서 IoT가 실시간 가시성과 공정 개선에 기여하는 지점을 한눈에 보기 좋습니다.',
    tags: ['스마트공장', 'IoT', 'Industry 4.0'],
    doi: '10.1016/j.iotcps.2023.04.006',
    url: 'https://doi.org/10.1016/j.iotcps.2023.04.006',
    accessNote: 'Open Access (CC BY)',
  },
  {
    id: 'in-i40-automation-supervision-2024',
    title:
      'Review of Industry 4.0 from the Perspective of Automation and Supervision Systems',
    titleKo: '자동화·감시 시스템 관점에서 본 인더스트리 4.0 리뷰',
    authors: 'Electronics (MDPI) Review Article',
    year: '2024',
    venue: 'Electronics, 13(4), 782',
    summary:
      'Industry 4.0의 정의·아키텍처·핵심 기술을 자동화·감시(supervision) 관점에서 정리한 리뷰입니다. 기존 OT 장비와 IIoT 설비의 수렴, 분산형 아키텍처 흐름을 이해하는 데 도움이 됩니다.',
    tags: ['스마트공장', '자동화', 'IIoT'],
    doi: '10.3390/electronics13040782',
    url: 'https://doi.org/10.3390/electronics13040782',
    accessNote: 'Open Access (MDPI)',
  },
]
