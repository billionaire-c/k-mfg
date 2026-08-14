import type { ReactNode } from 'react'

/**
 * 현장 노트 본문 강조 문법
 * - **텍스트** : 볼드 (본문 대비 진한 잉크)
 * - ==텍스트== : 핵심 키워드 (색 + 약간 큰 글씨)
 * - ``텍스트`` : 용어·시스템명 (세미볼드 + 틸)
 */
export function FieldNoteRichText({ text }: { text: string }) {
  return <>{renderRichText(text)}</>
}

function renderRichText(input: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|==[^=]+==|``[^`]+``)/g
  const parts = input.split(pattern)

  return parts.map((part, index) => {
    if (!part) return null

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={index}
          className="font-semibold text-ink"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('==') && part.endsWith('==')) {
      return (
        <strong
          key={index}
          className="text-[1.05em] font-semibold tracking-tight text-teal-700 dark:text-teal-300 md:text-[1.08em]"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('``') && part.endsWith('``')) {
      return (
        <span
          key={index}
          className="font-medium text-amber-800 dark:text-amber-300"
        >
          {part.slice(2, -2)}
        </span>
      )
    }

    return <span key={index}>{part}</span>
  })
}
