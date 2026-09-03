export type ContentPhoto = {
  src: string
  alt: string
  caption: string
}

/** 설명형 페이지용 2~3열 사진 스트립 (카드뉴스 자산 재사용) */
export const contentPhotoStrips = {
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
      src: '/card-news/slide-factory-line.png',
      alt: '스마트공장 자동화 라인',
      caption: '설비 · 라인',
    },
    {
      src: '/card-news/slide-data-panel.png',
      alt: '현장 데이터 모니터',
      caption: '데이터',
    },
    {
      src: '/card-news/slide-welding-robot.png',
      alt: '용접 로봇',
      caption: '자동화',
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
      src: '/card-news/slide-control-room.png',
      alt: '관제실 모니터',
      caption: '감시 · 대응',
    },
  ],
  standards: [
    {
      src: '/card-news/cn-iso-security-ot-2026.png',
      alt: 'ISO·보안 표준',
      caption: '표준 · 인증',
    },
    {
      src: '/card-news/slide-quality-parts.png',
      alt: '품질 측정',
      caption: '품질',
    },
    {
      src: '/card-news/slide-data-panel.png',
      alt: '데이터·상호운용',
      caption: '상호운용',
    },
  ],
  smartHaccp: [
    {
      src: '/card-news/slide-quality-parts.png',
      alt: '품질·위생 관리 측정',
      caption: '기록 · 관리',
    },
    {
      src: '/card-news/slide-data-panel.png',
      alt: '모니터링 패널',
      caption: '실시간 감시',
    },
    {
      src: '/card-news/slide-control-room.png',
      alt: '관제·모니터링',
      caption: '관제',
    },
  ],
  referenceModel: [
    {
      src: '/card-news/slide-welding-robot.png',
      alt: '업종별 공정 로봇',
      caption: '공정',
    },
    {
      src: '/card-news/slide-quality-parts.png',
      alt: '품질 검사',
      caption: '품질',
    },
    {
      src: '/card-news/slide-factory-line.png',
      alt: '제조 라인',
      caption: '라인',
    },
  ],
  smartNumbers: [
    {
      src: '/card-news/slide-factory-line.png',
      alt: '보급된 스마트공장 라인',
      caption: '보급',
    },
    {
      src: '/card-news/cn-mss-ai-smartfactory-2026.png',
      alt: '스마트공장·AI 정책',
      caption: '정책 · 지원',
    },
    {
      src: '/card-news/slide-data-panel.png',
      alt: '성과·지표 모니터',
      caption: '성과',
    },
  ],
  industries: [
    {
      src: '/card-news/slide-welding-robot.png',
      alt: '뿌리·제조 공정',
      caption: '뿌리 · 공정',
    },
    {
      src: '/card-news/slide-factory-line.png',
      alt: '제조업 라인',
      caption: '제조업',
    },
    {
      src: '/card-news/slide-quality-parts.png',
      alt: '정밀 부품',
      caption: '부품 · 품질',
    },
  ],
} as const satisfies Record<string, readonly ContentPhoto[]>
