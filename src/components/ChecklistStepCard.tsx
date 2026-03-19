import { useState } from 'react'
import type { ChecklistStep, FormData } from '../types'
import { getVisibleItems } from '../data/checklist'

interface ChecklistStepCardProps {
  step: ChecklistStep
  data: FormData
  checkedItems: Record<string, boolean>
  attachedFiles: Record<string, File | null>
  onToggleItem: (itemId: string) => void
  onAttachFile: (itemId: string, file: File | null) => void
}

export default function ChecklistStepCard({
  step,
  data,
  checkedItems,
  attachedFiles,
  onToggleItem,
  onAttachFile,
}: ChecklistStepCardProps) {
  const [isOpen, setIsOpen] = useState(step.number === 1)
  const visibleItems = getVisibleItems(step, data)
  const requiredItems = visibleItems.filter((item) => item.required)
  const optionalItems = visibleItems.filter((item) => !item.required)
  const completedRequired = requiredItems.filter(
    (item) => checkedItems[item.id]
  ).length
  const showWarning = step.warning?.condition(data) ?? false

  const status =
    completedRequired === 0
      ? 'pending'
      : completedRequired === requiredItems.length
      ? 'complete'
      : 'partial'

  const statusLabel =
    status === 'complete'
      ? 'Complete'
      : status === 'partial'
      ? `${completedRequired}/${requiredItems.length} complete`
      : 'Not started'

  return (
    <section
      className={[
        'overflow-hidden rounded-2xl border bg-white',
        isOpen ? 'border-[#d8d6d0]' : 'border-[#e4e2dc]',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-4 bg-[#fafaf8] px-5 py-4 text-left transition hover:bg-[#f5f4f0]"
      >
        <span
          className={[
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
            status === 'complete'
              ? 'bg-[#34d399] text-white'
              : 'bg-[#1a2236] text-white',
          ].join(' ')}
        >
          {status === 'complete' ? 'OK' : step.number}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-[#1a2236]">
            {step.title}
          </span>
          <span className="mt-1 block text-xs leading-5 text-[#9aa5b4]">
            {step.description}
          </span>
        </span>

        <span
          className={[
            'hidden rounded-full px-3 py-1 text-[10px] font-semibold sm:inline-flex',
            status === 'complete'
              ? 'bg-[#ecfdf5] text-[#059669]'
              : status === 'partial'
              ? 'bg-[#fef3dc] text-[#b07a10]'
              : 'bg-[#f0efe9] text-[#9aa5b4]',
          ].join(' ')}
        >
          {statusLabel}
        </span>

        <span
          className={[
            'text-xs text-[#c0c8d4] transition-transform',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden="true"
        >
          v
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-[#eceae4] px-5 py-4">
          {showWarning && step.warning && (
            <div className="mb-4 rounded-r-lg border border-[#fce4a0] border-l-4 border-l-[#f59e0b] bg-[#fffbf0] px-4 py-3">
              <p className="text-sm leading-6 text-[#92610a]">
                {step.warning.message}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {requiredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#f0efe9] px-4 py-3 transition hover:border-[#d8d6d0]"
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item.id]}
                    onChange={() => onToggleItem(item.id)}
                    className="mt-1 h-4 w-4 rounded border-[#d8d6d0] text-[#34d399] focus:ring-[#34d399]"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-[#1a2236]">
                      {item.text}
                    </span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.1em] text-[#9aa5b4]">
                      Required
                    </span>
                  </span>
                </label>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    onChange={(e) => onAttachFile(item.id, e.target.files?.[0] ?? null)}
                    className="block w-full max-w-[420px] text-xs text-[#6b7d99] file:mr-4 file:rounded-md file:border-0 file:bg-[#1a2236] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#2a3850]"
                  />
                  {attachedFiles[item.id] && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#1a2236]">
                        {attachedFiles[item.id]!.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAttachFile(item.id, null)}
                        className="text-xs font-semibold text-[#b91c1c] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {optionalItems.length > 0 && (
              <div className="pt-2">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
                  Recommended if relevant
                </p>
                <div className="space-y-3">
                  {optionalItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-[#f0efe9] bg-[#fafaf8] px-4 py-3 transition hover:border-[#d8d6d0]"
                    >
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={!!checkedItems[item.id]}
                          onChange={() => onToggleItem(item.id)}
                          className="mt-1 h-4 w-4 rounded border-[#d8d6d0] text-[#34d399] focus:ring-[#34d399]"
                        />
                        <span className="min-w-0 text-sm text-[#5a6a80]">
                          {item.text}
                        </span>
                      </label>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <input
                          type="file"
                          onChange={(e) =>
                            onAttachFile(item.id, e.target.files?.[0] ?? null)
                          }
                          className="block w-full max-w-[420px] text-xs text-[#6b7d99] file:mr-4 file:rounded-md file:border-0 file:bg-[#1a2236] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#2a3850]"
                        />
                        {attachedFiles[item.id] && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#1a2236]">
                              {attachedFiles[item.id]!.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => onAttachFile(item.id, null)}
                              className="text-xs font-semibold text-[#b91c1c] hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
