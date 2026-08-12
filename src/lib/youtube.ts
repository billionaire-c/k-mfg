/** 일반 YouTube 주소를 embed URL로 변환합니다. */
export function toYoutubeEmbedUrl(input: string): string {
  const raw = input.trim()
  if (!raw) return ''

  if (raw.includes('/embed/')) return raw

  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const fromQuery = url.searchParams.get('v')
      if (fromQuery) return `https://www.youtube.com/embed/${fromQuery}`

      const parts = url.pathname.split('/').filter(Boolean)
      // /shorts/ID, /live/ID, /embed/ID
      if (parts[0] === 'shorts' || parts[0] === 'live' || parts[0] === 'embed') {
        const id = parts[1]
        return id ? `https://www.youtube.com/embed/${id}` : ''
      }
    }
  } catch {
    // URL이 아니면 아래에서 ID로 처리
  }

  // 영상 ID만 입력한 경우
  if (/^[\w-]{11}$/.test(raw)) {
    return `https://www.youtube.com/embed/${raw}`
  }

  return raw
}
