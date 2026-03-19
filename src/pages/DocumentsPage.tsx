import {
  checklistSteps,
  getAttachedVisibleItemCount,
  getVisibleChecklistItemCount,
  getVisibleItems,
} from '../data/checklist'
import type { AttachmentMap, FormData } from '../types'

interface DocumentsPageProps {
  data: FormData
  attachedFiles: AttachmentMap
  onAttachFile: (itemId: string, file: File | null) => void
  onBack: () => void
  onNext: () => void
}

export default function DocumentsPage({
  data,
  attachedFiles,
  onAttachFile,
  onBack,
  onNext,
}: DocumentsPageProps) {
  const totalItems = getVisibleChecklistItemCount(data)
  const attachedCount = getAttachedVisibleItemCount(attachedFiles, data)
  const progress =
    totalItems === 0 ? 0 : Math.round((attachedCount / totalItems) * 100)

  return (
    <main className="min-h-full bg-[#f0efe9]">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <section className="rounded-3xl bg-[#1a2236] p-7 text-white">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
                Document uploads
              </p>
              <h1
                className="text-3xl text-[#f0f4ff]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Upload supporting files separately from the checklist.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5a7090]">
                The checklist is now for planning and completion only. This page
                is the file workspace, grouped by the same evidence stages.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <p
                className="text-4xl text-[#c9972a]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {attachedCount}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#5a7090]">
                files attached
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-white p-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-[#1a2236]">
              Upload progress
            </span>
            <div className="h-2 min-w-[220px] flex-1 rounded-full bg-[#e8e6e0]">
              <div
                className="h-2 rounded-full bg-[#34d399] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-[#059669]">
              {attachedCount}/{totalItems}
            </span>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          {checklistSteps.map((step) => {
            const items = getVisibleItems(step, data)

            return (
              <div
                key={step.id}
                className="rounded-2xl border border-[#e4e2dc] bg-white p-5"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2236] text-[11px] font-bold text-white">
                    {step.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1a2236]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#7d8ea4]">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-[#f0efe9] bg-[#fafaf8] px-4 py-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-[#1a2236]">
                            {item.text}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#9aa5b4]">
                            {item.required ? 'Required upload' : 'Optional upload'}
                          </p>
                        </div>

                        {attachedFiles[item.id] && (
                          <span className="rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-semibold text-[#059669]">
                            File attached
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <input
                          type="file"
                          onChange={(event) =>
                            onAttachFile(item.id, event.target.files?.[0] ?? null)
                          }
                          className="block w-full max-w-[420px] text-xs text-[#6b7d99] file:mr-4 file:rounded-md file:border-0 file:bg-[#1a2236] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#2a3850]"
                        />

                        {attachedFiles[item.id] && (
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-[#d8d6d0] px-5 py-3 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
          >
            Back to checklist
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md bg-[#1a2236] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
          >
            Continue to experts
          </button>
        </div>
      </div>
    </main>
  )
}
