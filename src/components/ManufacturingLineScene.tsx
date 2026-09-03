/**
 * 제조 라인 장면 — 사진 대신 쓰는 1장짜리 SVG 비주얼.
 * 라이트/다크는 currentColor·CSS 변수로 맞춤.
 */
export function ManufacturingLineScene() {
  return (
    <figure className="overflow-hidden border border-line bg-surface/60">
      <svg
        viewBox="0 0 720 280"
        className="block h-auto w-full"
        role="img"
        aria-label="제조 라인 장면: 컨베이어, 설비, 비전 검사, 센서"
      >
        <defs>
          <linearGradient id="ml-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-surface)" />
            <stop offset="100%" stopColor="var(--color-paper)" />
          </linearGradient>
          <linearGradient id="ml-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-line)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-surface)" />
          </linearGradient>
        </defs>

        {/* 배경 */}
        <rect width="720" height="280" fill="url(#ml-sky)" />
        <rect y="200" width="720" height="80" fill="url(#ml-floor)" />

        {/* 먼 창 / 공장 벽 리듬 */}
        <g opacity="0.45" stroke="var(--color-line)" fill="none" strokeWidth="1.5">
          <rect x="40" y="36" width="72" height="48" />
          <rect x="128" y="36" width="72" height="48" />
          <rect x="520" y="36" width="72" height="48" />
          <rect x="608" y="36" width="72" height="48" />
        </g>

        {/* 천장 레일 */}
        <line
          x1="24"
          y1="28"
          x2="696"
          y2="28"
          stroke="var(--color-ink-faint)"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* —— 설비 1: 프레스/가공 —— */}
        <g transform="translate(70, 78)">
          <rect
            x="0"
            y="40"
            width="110"
            height="78"
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth="1.75"
            opacity="0.92"
          />
          <rect
            x="18"
            y="0"
            width="74"
            height="48"
            fill="var(--color-accent)"
            opacity="0.85"
          />
          <rect
            x="34"
            y="52"
            width="42"
            height="28"
            fill="none"
            stroke="var(--color-ink-muted)"
            strokeWidth="1.5"
          />
          {/* 상태 램프 */}
          <circle cx="92" cy="54" r="4" fill="#53B6A9" />
        </g>

        {/* —— 비전 게이트 —— */}
        <g transform="translate(250, 70)">
          <path
            d="M8 110 V20 H112 V110"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
          <rect
            x="28"
            y="8"
            width="64"
            height="18"
            fill="#53B6A9"
            opacity="0.9"
          />
          {/* 스캔 빔 */}
          <rect
            x="48"
            y="36"
            width="24"
            height="74"
            fill="#53B6A9"
            opacity="0.18"
          >
            <animate
              attributeName="opacity"
              values="0.12;0.28;0.12"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </rect>
          <text
            x="60"
            y="21"
            textAnchor="middle"
            fill="var(--color-paper)"
            fontSize="9"
            fontFamily="var(--font-sans)"
            fontWeight="600"
          >
            VISION
          </text>
        </g>

        {/* —— 설비 2: 제어/로봇 암 실루엣 —— */}
        <g transform="translate(430, 88)">
          <rect
            x="20"
            y="50"
            width="100"
            height="58"
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth="1.75"
          />
          <circle
            cx="70"
            cy="48"
            r="16"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
          />
          <line
            x1="70"
            y1="32"
            x2="70"
            y2="8"
            stroke="var(--color-accent)"
            strokeWidth="3"
          />
          <line
            x1="70"
            y1="8"
            x2="108"
            y2="24"
            stroke="var(--color-accent)"
            strokeWidth="3"
          />
          <circle cx="108" cy="24" r="6" fill="#6b8494" />
        </g>

        {/* —— 모니터 / AI 판정 —— */}
        <g transform="translate(580, 92)">
          <rect
            x="0"
            y="20"
            width="88"
            height="58"
            fill="var(--color-ink)"
            opacity="0.88"
          />
          <rect x="8" y="28" width="72" height="34" fill="#53B6A9" opacity="0.35" />
          <polyline
            points="14,52 28,44 40,48 54,36 70,40"
            fill="none"
            stroke="#53B6A9"
            strokeWidth="2"
          />
          <rect
            x="30"
            y="78"
            width="28"
            height="10"
            fill="var(--color-ink-faint)"
            opacity="0.5"
          />
        </g>

        {/* 컨베이어 */}
        <rect
          x="40"
          y="198"
          width="640"
          height="16"
          fill="var(--color-ink)"
          opacity="0.12"
        />
        <rect
          x="40"
          y="198"
          width="640"
          height="4"
          fill="var(--color-ink)"
          opacity="0.28"
        />
        {/* 롤러 점 */}
        {Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={56 + i * 40}
            cy={214}
            r="3"
            fill="var(--color-ink-faint)"
            opacity="0.55"
          />
        ))}

        {/* 워크피스 (움직이는 박스) */}
        <g>
          <rect width="36" height="22" y="176" fill="var(--color-accent)" opacity="0.75">
            <animate
              attributeName="x"
              values="90;250;430;560;90"
              keyTimes="0;0.28;0.55;0.78;1"
              dur="12s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* 센서 점 + 펄스 */}
        <g fill="#53B6A9">
          <circle cx="200" cy="168" r="3.5">
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="380" cy="160" r="3.5">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="520" cy="170" r="3.5">
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="2.1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* 바닥 라벨 (최소) */}
        <text
          x="125"
          y="248"
          textAnchor="middle"
          fill="var(--color-ink-faint)"
          fontSize="11"
          fontFamily="var(--font-sans)"
        >
          가공
        </text>
        <text
          x="310"
          y="248"
          textAnchor="middle"
          fill="var(--color-ink-faint)"
          fontSize="11"
          fontFamily="var(--font-sans)"
        >
          비전 검사
        </text>
        <text
          x="490"
          y="248"
          textAnchor="middle"
          fill="var(--color-ink-faint)"
          fontSize="11"
          fontFamily="var(--font-sans)"
        >
          설비 · 제어
        </text>
        <text
          x="624"
          y="248"
          textAnchor="middle"
          fill="var(--color-ink-faint)"
          fontSize="11"
          fontFamily="var(--font-sans)"
        >
          판정
        </text>
      </svg>
      <figcaption className="border-t border-line px-3 py-2 text-[11px] text-ink-faint">
        제조 라인 장면 (일러스트) — 가공 · 검사 · 제어 · 판정
      </figcaption>
    </figure>
  )
}
