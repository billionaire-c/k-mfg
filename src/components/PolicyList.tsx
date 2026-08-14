import type {
  PolicyAgencyGroup,
  PolicySample,
  PolicyStatus,
} from '../data/policySamples'

type PolicyListProps = {
  items: PolicySample[]
}

export const policyStatusClass: Record<PolicyStatus, string> = {
  모집중:
    'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  예정:
    'border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  마감:
    'border-stone-300 bg-stone-100 text-stone-500 dark:border-stone-600 dark:bg-stone-900/50 dark:text-stone-400',
}

export const policyAgencyClass: Record<PolicyAgencyGroup, string> = {
  중기부:
    'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200',
  산업부:
    'border-teal-300 bg-teal-50 text-teal-900 dark:border-teal-700 dark:bg-teal-950/40 dark:text-teal-200',
}

const tagTone = (tag: string) => {
  if (tag === '중기부' || tag === '산업부') {
    return policyAgencyClass[tag]
  }
  if (
    tag.includes('AI') ||
    tag.includes('M.AX') ||
    tag.includes('AX') ||
    tag.includes('제조AI')
  ) {
    return 'border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200'
  }
  if (tag.includes('스마트') || tag.includes('자율')) {
    return 'border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
  }
  if (tag.includes('R&D') || tag.includes('정부형')) {
    return 'border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-700 dark:bg-orange-950/40 dark:text-orange-200'
  }
  return 'border-line bg-surface text-ink-muted'
}

export function PolicyList({ items }: PolicyListProps) {
  if (items.length === 0) {
    return (
      <p className="border-y border-line py-10 text-[14px] text-ink-muted">
        해당 조건의 공고가 없습니다.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.id} id={item.id} className="py-7">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                'border px-2 py-0.5 text-[11px] font-medium tracking-[0.06em]',
                policyStatusClass[item.status],
              ].join(' ')}
            >
              {item.status}
            </span>
            <span
              className={[
                'border px-2 py-0.5 text-[11px] font-medium tracking-[0.04em]',
                policyAgencyClass[item.agencyGroup],
              ].join(' ')}
            >
              {item.agencyGroup}
            </span>
            {item.tags
              .filter((tag) => tag !== item.agencyGroup)
              .map((tag) => (
                <span
                  key={tag}
                  className={[
                    'border px-2 py-0.5 text-[11px] tracking-[0.02em]',
                    tagTone(tag),
                  ].join(' ')}
                >
                  #{tag}
                </span>
              ))}
          </div>

          <h2 className="mt-3 text-[16px] leading-snug font-semibold tracking-tight text-ink md:text-[17px]">
            {item.title}
          </h2>

          <p className="mt-2 text-[13px] text-ink-muted">
            {item.agency}
            <span className="text-ink-faint"> · {item.period}</span>
          </p>

          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
            {item.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-300"
            >
              공고·원문 보기 ↗
            </a>
            <span className="text-[12px] text-ink-faint">
              기준일 {item.updatedAt}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
