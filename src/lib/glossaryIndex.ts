/** 용어집 색인 키: 한글 초성 또는 영문 A–Z */
export function glossaryIndexOf(text: string): string {
  const raw = text.trim()
  if (!raw) return '#'

  const first = raw[0]
  if (/[A-Za-z]/.test(first)) return first.toUpperCase()

  const code = first.charCodeAt(0)
  // Hangul syllables
  if (code >= 0xac00 && code <= 0xd7a3) {
    const choseong = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ]
    const base = choseong[Math.floor((code - 0xac00) / (21 * 28))]
    // 쌍자음은 기본 자음 색인으로 묶음
    const map: Record<string, string> = {
      ㄲ: 'ㄱ',
      ㄸ: 'ㄷ',
      ㅃ: 'ㅂ',
      ㅆ: 'ㅅ',
      ㅉ: 'ㅈ',
    }
    return map[base] ?? base
  }

  // Already a jamo
  if ('ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.includes(first)) {
    const map: Record<string, string> = {
      ㄲ: 'ㄱ',
      ㄸ: 'ㄷ',
      ㅃ: 'ㅂ',
      ㅆ: 'ㅅ',
      ㅉ: 'ㅈ',
    }
    return map[first] ?? first
  }

  return '#'
}
