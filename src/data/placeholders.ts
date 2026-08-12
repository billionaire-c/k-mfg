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
    youtube: '#',
    instagram: '#',
    email: 'mailto:',
  },
}

export const cardNewsPreview: PreviewItem[] = [
  {
    id: 'cn-1',
    title: '카드뉴스 제목 플레이스홀더 01',
    date: '2026.00.00',
    summary: '제조·스마트팩토리 관련 카드뉴스 요약이 들어갑니다.',
  },
  {
    id: 'cn-2',
    title: '카드뉴스 제목 플레이스홀더 02',
    date: '2026.00.00',
    summary: '제조·스마트팩토리 관련 카드뉴스 요약이 들어갑니다.',
  },
  {
    id: 'cn-3',
    title: '카드뉴스 제목 플레이스홀더 03',
    date: '2026.00.00',
    summary: '제조·스마트팩토리 관련 카드뉴스 요약이 들어갑니다.',
  },
]

export const insightsPreview: PreviewItem[] = [
  {
    id: 'in-1',
    title: '인사이트 제목 플레이스홀더 01',
    date: '2026.00.00',
    summary: '도서·기고·논문 아카이브 요약이 들어갑니다.',
  },
  {
    id: 'in-2',
    title: '인사이트 제목 플레이스홀더 02',
    date: '2026.00.00',
    summary: '도서·기고·논문 아카이브 요약이 들어갑니다.',
  },
  {
    id: 'in-3',
    title: '인사이트 제목 플레이스홀더 03',
    date: '2026.00.00',
    summary: '도서·기고·논문 아카이브 요약이 들어갑니다.',
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
