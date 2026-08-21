export type YoutubeSample = {
  id: string
  title: string
  date: string
  embedUrl: string
}

/**
 * 유튜브 샘플 — 최신 영상이 배열 앞쪽.
 * 매일 추가 시 기존 항목은 유지하고 앞에 push.
 */
export const youtubeSamples: YoutubeSample[] = [
  {
    id: 'yt-kict-tunnel-wall-2026',
    title: '터널은 어떻게 파면서 벽을 세울까 — 한국건설기술연구원',
    date: '2026.08.21',
    embedUrl: 'https://youtube.com/shorts/s-q0ctDZCC8',
  },
  {
    id: 'yt-sknexilis-copper-foil-2026',
    title: '배터리 속 구리 막은 어떻게 머리카락의 30분의 1이 됐을까 - SK넥실리스',
    date: '2026.08.21',
    embedUrl: 'https://youtube.com/shorts/UomIIayr6x8',
  },
  {
    id: 'yt-posco-sinter-fines-2026',
    title: '철광석을 왜 굽지 않고 가루째 넣을까 - 포스코',
    date: '2026.08.21',
    embedUrl: 'https://youtube.com/shorts/HOilvYE4DOE',
  },
  {
    id: 'yt-skhynix-us-listing-2026',
    title: '한국 기업은 왜 미국 증시에 갈까 - SK하이닉스',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/mbZMOmvadDY',
  },
  {
    id: 'yt-hanwha-ocean-weld-robot-2026',
    title: '용접 로봇은 어떻게 레일 없이 벽을 오를까 — 한화오션',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/ycxBgTzbkHk',
  },
  {
    id: 'yt-hanon-heat-pump-2026',
    title: '전기차는 왜 겨울에 열을 만들지 않고 옮길까 - 한온시스템',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/5Jrt6UURong',
  },
  {
    id: 'yt-domino-hangang-2026',
    title: '주소가 없는 한강 잔디밭으로 피자는 어떻게 올까 - 도미노피자',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/AlIc_mtnnZI',
  },
  {
    id: 'yt-geoga-bridge-2026',
    title: '바다에 다리를 못 놓아서 터널을 어떻게 만들었을까 - 거가대교',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/W7A4uFchfPo',
  },
  {
    id: 'yt-hanmi-tcg-2026',
    title: '칩을 12장 쌓았는데 왜 높이는 그대로일까 - 한미반도체',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/YVP1fmyxmjA',
  },
  {
    id: 'yt-lg-pouch-battery-2026',
    title: '파우치 배터리는 왜 말지 않고 쌓을까 - LG에너지솔루션',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/UhYZZrrfFp4',
  },
  {
    id: 'yt-hyundai-steel-press-2026',
    title: '프레스로 안 찍히는 강판은 어떻게 만들까 - 현대제철',
    date: '2026.08.13',
    embedUrl: 'https://youtube.com/shorts/PEWzNxx9Rgs',
  },
]
