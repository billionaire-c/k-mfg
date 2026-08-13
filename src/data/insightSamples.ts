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

/**
 * 인사이트 1단계 — 메타데이터 + 원문 링크 (자체 요약)
 * 최신 글이 배열 앞쪽. 매일 추가 시 기존 항목은 유지하고 앞에 push.
 */
export const insightSamples: InsightSample[] = [
  {
    id: 'in-i40-sdg-slr-2025',
    title:
      'Exploring industry 4.0 technologies for sustainable development goals: a systematic literature review',
    titleKo: '지속가능발전목표(SDGs) 관점에서 본 인더스트리 4.0 기술: 체계적 문헌고찰',
    authors: 'Pramod Kumar, Jaiprakash Bhamu, Jagdish Bhadu, Praveen Saraswat',
    year: '2025',
    venue: 'International Journal of Production Management and Engineering, 13(1), 27–44',
    summary:
      '2011–2022 기간 I4.0·스마트제조 연구 121편을 enabler·barrier·지속가능성 축으로 정리한 리뷰입니다. 중소기업의 자원 제약, Lean·Six Sigma와의 결합, 지속가능성과 I4.0 연결 연구의 공백을 파악하는 데 유용합니다.',
    tags: ['스마트공장', '지속가능성', 'Industry 4.0'],
    doi: '10.4995/ijpme.2025.21155',
    url: 'https://doi.org/10.4995/ijpme.2025.21155',
    accessNote: 'Open Access (CC BY-NC-ND 4.0)',
  },
  {
    id: 'in-i40-ops-efficiency-2026',
    title:
      'Transforming Manufacturing: A Systematic Literature Review of Industry 4.0 Technologies and Their Impact on Operational Efficiency',
    titleKo: '인더스트리 4.0 기술이 운영 효율에 미치는 영향: 체계적 문헌고찰',
    authors: 'Misheck Musaigwa, Vivence Kalitanyi',
    year: '2026',
    venue: 'International Journal of Applied Research in Business and Management, 7(1)',
    summary:
      'Scopus OA 논문 72편(2015–2024)을 바탕으로 I4.0이 생산계획·스마트공장·자원효율에 미치는 영향을 정리한 리뷰입니다. 자동화·실시간 데이터 교환의 중요성과 함께, 초기 투자비·보안·숙련인력 부족 등 도입 장벽을 함께 제시합니다.',
    tags: ['스마트공장', '운영효율', 'IIoT'],
    doi: '10.51137/wrp.ijarbm.486',
    url: 'https://doi.org/10.51137/wrp.ijarbm.486',
    accessNote: 'Open Access (Wohllebe & Ross)',
  },
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
