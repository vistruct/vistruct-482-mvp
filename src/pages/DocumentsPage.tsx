import {
  checklistSteps,
  getVisibleChecklistItemCount,
  getVisibleItems,
} from '../data/checklist'
import LegalDisclaimer from '../components/LegalDisclaimer'
import type { FormData } from '../types'

interface DocumentsPageProps {
  data: FormData
  onBack: () => void
  onNext: () => void
}

export default function DocumentsPage({
  data,
  onBack,
  onNext,
}: DocumentsPageProps) {
  const totalItems = getVisibleChecklistItemCount(data)

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
                Login required for uploads
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5a7090]">
                To reduce privacy and compliance risk, file upload is disabled
                until a secure account flow exists. Use the checklist and PDF
                export to prepare files offline, or continue to experts when you
                are ready.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <p
                className="text-4xl text-[#c9972a]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                —
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#5a7090]">
                uploads in MVP
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#bfdbfe] border-l-4 border-l-[#3b82f6] bg-[#eff6ff] p-6">
          <p className="text-sm font-semibold text-[#1e40af]">
            Login required
          </p>
          <p className="mt-2 text-sm leading-7 text-[#1d4ed8]">
            Secure document upload and storage are planned for a future release.
            This page lists the same evidence groups as your checklist so you
            know what to gather—without sending files through this tool.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-white p-5">
          <LegalDisclaimer />
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

                <ul className="space-y-2 border-t border-[#f0efe9] pt-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-[#1a2236]"
                    >
                      <span>{item.text}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9aa5b4]">
                        {item.required ? 'Required' : 'Optional'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </section>

        <p className="mt-6 text-center text-xs text-[#9aa5b4]">
          {totalItems} checklist-linked items in your current profile (for
          reference only).
        </p>

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
