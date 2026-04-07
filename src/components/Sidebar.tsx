import type { Page } from '../types'

interface SidebarProps {
  page: Page
  onNavigate: (page: Page) => void
  answeredQuestions: number
  profileTotalFields: number
  isFormComplete: boolean
  checkedItems: number
  attachedItems: number
  totalItems: number
}

const FLOW_ORDER: Page[] = ['input', 'review', 'result', 'documents', 'sponsor']

export default function Sidebar({
  page,
  onNavigate,
  answeredQuestions,
  profileTotalFields,
  isFormComplete,
  checkedItems,
  attachedItems,
  totalItems,
}: SidebarProps) {
  const currentIndex = FLOW_ORDER.indexOf(page)
  const checklistDone = totalItems > 0 && checkedItems === totalItems
  const progress =
    page === 'input'
      ? 20 +
        Math.round(
          (answeredQuestions / Math.max(profileTotalFields, 1)) * 15
        )
      : page === 'review'
      ? 50
      : page === 'result'
      ? 55 + Math.round((checkedItems / Math.max(totalItems, 1)) * 20)
      : page === 'documents'
      ? 82
      : 100

  const items = [
    {
      page: 'input' as const,
      label: 'Profile',
      meta: `${answeredQuestions}/${profileTotalFields} answered`,
      done: isFormComplete,
    },
    {
      page: 'review' as const,
      label: 'Review',
      meta: isFormComplete ? 'Ready to confirm' : 'Pending answers',
      done: currentIndex > 1,
    },
    {
      page: 'result' as const,
      label: 'Checklist',
      meta: `${checkedItems}/${totalItems} completed`,
      done: checklistDone,
    },
    {
      page: 'documents' as const,
      label: 'Documents',
      meta: 'Login required',
      done: false,
    },
    {
      page: 'sponsor' as const,
      label: 'Experts',
      meta: 'Optional next step',
      done: page === 'sponsor',
    },
  ]

  return (
    <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-60 shrink-0 border-r border-[#23354a] bg-[#1a2236] lg:flex lg:flex-col">
      <div className="px-5 pb-3 pt-7">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#3a4d65]">
          Workflow
        </p>
      </div>

      <nav className="space-y-1">
        {items.map((item, index) => {
          const isActive = page === item.page
          const isDone = item.done

          return (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={[
                'flex w-full items-center gap-3 border-l-[3px] px-5 py-3 text-left transition',
                isActive
                  ? 'border-[#c9972a] bg-[rgba(201,151,42,0.10)]'
                  : isDone
                  ? 'border-[#34d399] hover:bg-white/5'
                  : 'border-transparent hover:bg-white/5',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                  isActive
                    ? 'bg-[#c9972a] text-white'
                    : isDone
                    ? 'bg-[#34d399] text-white'
                    : 'bg-[#253548] text-[#6a7d95]',
                ].join(' ')}
              >
                {isDone && !isActive ? 'OK' : index + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={[
                    'block text-sm font-medium',
                    isActive
                      ? 'text-[#f0f4ff]'
                      : isDone
                      ? 'text-[#9ee3cc]'
                      : 'text-[#7a8eaa]',
                  ].join(' ')}
                >
                  {item.label}
                </span>
                <span className="block truncate text-[11px] text-[#506480]">
                  {item.meta}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-4 border-t border-white/5 px-5 py-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#3a4d65]">
          Checklist Status
        </p>
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#f0f4ff]">482 chef visa</p>
              <p className="text-[11px] text-[#6f86a7]">Guided preparation flow</p>
            </div>
            <span className="rounded-full border border-[#e0ded8] bg-[#f0efe9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7a8ca8]">
              MVP
            </span>
          </div>

          <div className="mb-2 flex items-center justify-between text-[11px] text-[#506480]">
            <span>Overall progress</span>
            <span className="font-semibold text-[#c9972a]">{progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-[#253548]">
            <div
              className="h-1 rounded-full bg-[#c9972a] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
            <div className="rounded-lg bg-[#253548] px-3 py-2">
              <p className="text-[#6f86a7]">Answers</p>
              <p className="mt-1 text-sm font-semibold text-white">
                {answeredQuestions}/{profileTotalFields}
              </p>
            </div>
            <div className="rounded-lg bg-[#253548] px-3 py-2">
              <p className="text-[#6f86a7]">Documents</p>
              <p className="mt-1 text-sm font-semibold text-white">
                {attachedItems}/{totalItems}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
