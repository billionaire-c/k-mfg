export type ContentPhoto = {
  src: string
  alt: string
  caption: string
}

/**
 * 설명형 페이지 상단 사진.
 * 규칙: 사이트 전역에서 같은 src를 두 번 쓰지 않음. 맞는 자산이 없으면 해당 페이지는 비움.
 */
export const contentPhotoStrips = {
  /** 공정 · 품질 · 예지 */
  manufacturingAi: [
    {
      src: '/card-news/slide-factory-line.png',
      alt: '자동화 공정 라인',
      caption: '공정',
    },
    {
      src: '/card-news/slide-quality-parts.png',
      alt: '정밀 품질 측정',
      caption: '품질',
    },
    {
      src: '/card-news/slide-data-panel.png',
      alt: '설비·공정 데이터 모니터',
      caption: '예지·이상',
    },
  ],
  smartFactory: [
    {
      src: '/card-news/cn-mss-ai-smartfactory-2026.png',
      alt: '스마트공장·AI 정책 카드',
      caption: '스마트공장',
    },
    {
      src: '/card-news/cn-ai-factory-max-2026.png',
      alt: 'AI 팩토리 M.AX',
      caption: 'AI 팩토리',
    },
  ],
  otSecurity: [
    {
      src: '/card-news/cn-ot-cyber-resilience-2026.png',
      alt: 'OT 사이버 레질리언스',
      caption: 'OT 보안',
    },
    {
      src: '/card-news/cn-modbus-ot-zone-2026.png',
      alt: 'Modbus OT 구역',
      caption: '구역 · 프로토콜',
    },
    {
      src: '/card-news/cn-ot-talent-gap-2026.png',
      alt: 'OT 인력·역량',
      caption: '인력 · 운영',
    },
  ],
  standards: [
    {
      src: '/card-news/cn-iso-security-ot-2026.png',
      alt: 'ISO·보안 표준',
      caption: '표준 · 인증',
    },
  ],
  /** 식품 HACCP 전용 사진 없음 → 스트립 미사용 */
  smartHaccp: [] as ContentPhoto[],
  referenceModel: [
    {
      src: '/card-news/slide-welding-robot.png',
      alt: '업종 공정 로봇 용접',
      caption: '업종 · 공정',
    },
  ],
  smartNumbers: [
    {
      src: '/card-news/cn-physical-ai-gap-gg.png',
      alt: '피지컬 AI·제조 격차',
      caption: '현황 · 격차',
    },
  ],
  industries: [
    {
      src: '/card-news/cn-hyundai-q2-ops-2026.png',
      alt: '제조 운영 현장',
      caption: '제조업',
    },
    {
      src: '/card-news/slide-control-room.png',
      alt: '제조 관제실',
      caption: '운영',
    },
  ],
} as const satisfies Record<string, readonly ContentPhoto[]>
