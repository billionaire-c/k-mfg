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
