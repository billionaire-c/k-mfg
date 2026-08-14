import { standardsMindMap } from '../data/standardsSamples'

const toneClass: Record<string, string> = {
  teal: 'border-teal-300 bg-teal-50 text-teal-900 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-200',
  amber:
    'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200',
  emerald:
    'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
  sky: 'border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-200',
  rose: 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200',
}

const lineTone: Record<string, string> = {
  teal: 'stroke-teal-400 dark:stroke-teal-600',
  amber: 'stroke-amber-400 dark:stroke-amber-600',
  emerald: 'stroke-emerald-400 dark:stroke-emerald-600',
  sky: 'stroke-sky-400 dark:stroke-sky-600',
  rose: 'stroke-rose-400 dark:stroke-rose-600',
}

type StandardsMindMapProps = {
  activeBranchId: string | null
  onSelectBranch: (id: string) => void
}

export function StandardsMindMap({
  activeBranchId,
  onSelectBranch,
}: StandardsMindMapProps) {
  const branches = standardsMindMap.branches

  return (
    <div className="border border-line bg-surface/40 px-3 py-5 md:px-5 md:py-6">
      <p className="mb-4 text-center text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Mind map
      </p>

      {/* Desktop: center + SVG spokes + branch cards */}
      <div className="relative mx-auto hidden max-w-2xl md:block">
        <div className="flex justify-center">
          <div className="relative z-10 border border-accent bg-accent px-5 py-3.5 text-center text-paper shadow-sm">
            <p className="text-[11px] tracking-[0.1em] uppercase opacity-80">
              Center
            </p>
            <p className="mt-1 text-[15px] font-semibold tracking-tight">
              {standardsMindMap.center}
            </p>
          </div>
        </div>

        {/* Connector from center down to horizontal bus */}
        <svg
          className="pointer-events-none absolute top-[3.4rem] left-0 h-10 w-full overflow-visible"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="22"
            className="stroke-line"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="10"
            y1="22"
            x2="90"
            y2="22"
            className="stroke-line"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          {branches.map((branch, index) => {
            const x = 10 + (index * 80) / Math.max(branches.length - 1, 1)
            return (
              <line
                key={branch.id}
                x1={x}
                y1="22"
                x2={x}
                y2="40"
                className={lineTone[branch.tone] ?? 'stroke-line'}
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        <div className="mt-10 grid grid-cols-5 gap-2">
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              active={activeBranchId === branch.id}
              onSelect={() => onSelectBranch(branch.id)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Mobile / narrow: vertical tree with rails */}
      <div className="md:hidden">
        <div className="flex justify-center">
          <div className="border border-accent bg-accent px-4 py-3 text-center text-paper">
            <p className="text-[15px] font-semibold tracking-tight">
              {standardsMindMap.center}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-1 flex w-full max-w-sm flex-col items-stretch">
          <div className="mx-auto h-4 w-px bg-line" aria-hidden />
          <ul className="relative border-l border-line ml-4 pl-4">
            {branches.map((branch, index) => (
              <li key={branch.id} className="relative pb-3 last:pb-0">
                <span
                  className="absolute top-4 -left-4 h-px w-4 bg-line"
                  aria-hidden
                />
                {index === branches.length - 1 ? (
                  <span
                    className="absolute top-4 -left-px h-[calc(100%-1rem)] w-px bg-paper"
                    aria-hidden
                  />
                ) : null}
                <BranchCard
                  branch={branch}
                  active={activeBranchId === branch.id}
                  onSelect={() => onSelectBranch(branch.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-ink-faint">
        가지를 누르면 아래 목록이 해당 카테고리로 필터됩니다
      </p>
    </div>
  )
}

function BranchCard({
  branch,
  active,
  onSelect,
  compact = false,
}: {
  branch: (typeof standardsMindMap.branches)[number]
  active: boolean
  onSelect: () => void
  compact?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'w-full border text-left transition-colors',
        compact ? 'px-2 py-2.5' : 'px-3 py-3',
        toneClass[branch.tone] ?? 'border-line bg-surface',
        active ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper' : '',
      ].join(' ')}
    >
      <p
        className={[
          'font-semibold tracking-tight',
          compact ? 'text-[12px]' : 'text-[13px]',
        ].join(' ')}
      >
        {branch.label}
      </p>
      <ul
        className={[
          'mt-1 space-y-0.5 leading-snug opacity-80',
          compact ? 'text-[10px]' : 'text-[11px]',
        ].join(' ')}
      >
        {branch.items.map((item) => (
          <li key={item} className={compact ? 'truncate' : ''}>
            · {item}
          </li>
        ))}
      </ul>
    </button>
  )
}
