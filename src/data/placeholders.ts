export type PreviewItem = {
  id: string
  title: string
  date: string
  summary: string
}

export const site = {
  // 헤더·푸터에 보이는 사이트명
  name: 'K-Manufacturing',
  // 메인 About 큰 제목 — 줄바꿈은 \n 사용
  // 예: '안녕하세요 K-Manufacturing입니다.\n잘 부탁드립니다'
  headline: '안녕하세요.\nK-Manufacturing 입니다.\n잘 부탁드립니다.',
  tagline: '"한국 제조업에 관한 기록과 인사이트"',
  // 문장 사이 빈 줄(엔터)은 '' 로 넣습니다.
  aboutBody: [
    'K-Manufacturing은 한국 제조업의 흐름과 변화를 기록합니다.',
    '',
    '스마트팩토리, 제조 기술, 산업 트렌드까지 폭넓게 담아내며.',
    '실제 현장에서 얻은 경험과 인사이트를 공유합니다.',
    '',
    '제조업 혁신을 고민하는 모든 이들을 위한 공간입니다.',
  ],
  links: {
    youtube: 'https://youtube.com/@k_mfg_innovation?si=UOTacikzxhnSspdr',
    instagram: '',
    email: '',
  },
}

export const cardNewsPreview: PreviewItem[] = [
  {
    id: 'cn-aw2026-ax-ops',
    title: 'AW 2026이 보여준 전환: 설비 개선 → 운영 혁신',
    date: '2026.08.13',
    summary: 'Automation World 2026에서 드러난 제조 AX·운영 혁신 흐름 요약',
  },
  {
    id: 'cn-ai-factory-era-2026',
    title: '2026, AI 팩토리: 보여주는 공장에서 판단하는 공장으로',
    date: '2026.08.13',
    summary: '스마트공장과 AI 팩토리의 차이, 기대효과, 500개 목표 정리',
  },
  {
    id: 'cn-mobis-ai-sf-order-2026',
    title: '제조 AI 수주가 늘었다: 모비스 4.2억 스마트공장 계약',
    date: '2026.08.13',
    summary: '민간 제조 AI 수주 확대 신호 — 모비스–네오텍 계약 요약',
  },
  {
    id: 'cn-ai-factory-max-2026',
    title: 'AI 팩토리, 생산성 +30% · 불량 −15%의 의미',
    date: '2026.08.12',
    summary: '산업부 AI 팩토리 선도 사업 성과와 2030 목표 요약',
  },
  {
    id: 'cn-physical-ai-gap-gg',
    title: '데이터는 모았는데… 피지컬 AI는 아직 12.5%',
    date: '2026.08.12',
    summary: '경기 스마트공장 조사로 본 DX와 피지컬 AI 격차',
  },
  {
    id: 'cn-smart-mfg-special-class-2026',
    title: '스마트제조 공급기업, 이제 ‘특수분류’로 잡힌다',
    date: '2026.07.23',
    summary: '스마트제조기술산업 특수분류 제정 요약',
  },
]

export const insightsPreview: PreviewItem[] = [
  {
    id: 'in-i40-sdg-slr-2025',
    title: '지속가능발전목표 관점에서 본 인더스트리 4.0 기술',
    date: '2025',
    summary: 'I4.0·스마트제조 121편을 SDGs·장벽·촉진요인으로 정리한 리뷰',
  },
  {
    id: 'in-i40-ops-efficiency-2026',
    title: '인더스트리 4.0 기술이 운영 효율에 미치는 영향',
    date: '2026',
    summary: 'OA 논문 72편 기반 운영효율·도입 장벽 체계적 문헌고찰',
  },
  {
    id: 'in-iot-smart-factories-2023',
    title: '인더스트리 4.0 스마트공장에서의 IoT: 리뷰',
    date: '2023',
    summary: '예지보전·품질·에너지·공급망에서 IoT 활용을 정리한 리뷰',
  },
  {
    id: 'in-i40-automation-supervision-2024',
    title: '자동화·감시 시스템 관점에서 본 인더스트리 4.0 리뷰',
    date: '2024',
    summary: 'OT·IIoT 수렴과 분산형 아키텍처를 정리한 MDPI 리뷰',
  },
]

export const youtubePreview = [
  {
    id: 'yt-1',
    title: '유튜브 영상 제목 플레이스홀더 01',
    embedUrl: '',
  },
  {
    id: 'yt-2',
    title: '유튜브 영상 제목 플레이스홀더 02',
    embedUrl: '',
  },
]
