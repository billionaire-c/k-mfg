import { useTheme } from '../context/ThemeContext'
import { site } from '../data/placeholders'

type LogoProps = {
  className?: string
  /** 다크 배경(푸터 등)에서 항상 흰색으로 표시 */
  inverted?: boolean
}

export function Logo({ className = '', inverted = false }: LogoProps) {
  const { theme } = useTheme()
  const makeWhite = inverted || theme === 'dark'

  return (
    <img
      src="/logo.png"
      alt={site.name}
      className={[
        'block h-[4.5rem] w-auto object-contain md:h-[5rem]',
        makeWhite ? 'brightness-0 invert' : '',
        className,
      ].join(' ')}
    />
  )
}
