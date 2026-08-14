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

type StandardsMindMapProps = {
  activeBranchId: string | null
  onSelectBranch: (id: string) => void
}

export function StandardsMindMap({
  activeBranchId,
  onSelectBranch,
}: StandardsMindMapProps) {
  return (
    <div className="border border-line bg-surface/40 px-3 py-5 md:px-5 md:py-6">
      <p className="mb-4 text-center text-[11px] font-medium tracking-[0.12em] text-ink-faint uppercase">
        Mind map
      </p>

      {/* Desktop radial-ish layout */}
      <div className="hidden md:block">
        <div className="relative mx-auto grid max-w-2xl grid-cols-3 gap-4">
          {standardsMindMap.branches.slice(0, 2).map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              active={activeBranchId === branch.id}
              onSelect={() => onSelectBranch(branch.id)}
              className={branch.id === 'quality' ? 'col-start-1' : 'col-start-3'}
            />
          ))}

          <div className="col-span-3 flex justify-center py-2">
            <div className="border border-accent bg-accent px-4 py-3 text-center text-paper">
              <p className="text-[11px] tracking-[0.1em] uppercase opacity-80">
                Center
              </p>
              <p className="mt-1 text-[15px] font-semibold tracking-tight">
                {standardsMindMap.center}
              </p>
            </div>
          </div>

          {standardsMindMap.branches.slice(2).map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              active={activeBranchId === branch.id}
              onSelect={() => onSelectBranch(branch.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile stack */}
      <div className="space-y-2 md:hidden">
        <div className="border border-accent bg-accent px-4 py-3 text-center text-paper">
          <p className="text-[15px] font-semibold tracking-tight">
            {standardsMindMap.center}
          </p>
        </div>
        {standardsMindMap.branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            active={activeBranchId === branch.id}
            onSelect={() => onSelectBranch(branch.id)}
          />
        ))}
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
  className = '',
}: {
  branch: (typeof standardsMindMap.branches)[number]
  active: boolean
  onSelect: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'w-full border px-3 py-3 text-left transition-colors',
        toneClass[branch.tone] ?? 'border-line bg-surface',
        active ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper' : '',
        className,
      ].join(' ')}
    >
      <p className="text-[13px] font-semibold tracking-tight">{branch.label}</p>
      <ul className="mt-1.5 space-y-0.5 text-[11px] leading-snug opacity-80">
        {branch.items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </button>
  )
}
