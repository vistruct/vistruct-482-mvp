import ChecklistStepCard from '../components/ChecklistStepCard'
import LegalDisclaimer from '../components/LegalDisclaimer'
import {
  checklistSteps,
  getCheckedVisibleItemCount,
  getChecklistWarnings,
  getContextualNotices,
  getVisibleChecklistItemCount,
} from '../data/checklist'
import { downloadChecklistPdf } from '../utils/pdf'
import {
  formatCurrentLocation,
  formatDegreeLevel,
  formatJobPosition,
} from '../utils/profileLabels'
import type { AttachmentMap, FormData, ExperienceLevel } from '../types'

interface ResultPageProps {
  data: FormData
  checkedItems: Record<string, boolean>
  attachedFiles: AttachmentMap
  onToggleItem: (itemId: string) => void
  onEditProfile: () => void
  onViewReview: () => void
  onGoToDocuments: () => void
  onReset: () => void
}

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  less_than_1: 'Under 1 year',
  '1_to_2': '1 to 2 years',
  '2_to_3': '2 to 3 years',
  more_than_3: '3+ years',
}

function summaryTone(
  key: 'experience' | 'english' | 'sponsor' | 'rpl',
  data: FormData
) {
  if (key === 'experience') {
    if (data.yearsOfExperience === 'less_than_1') return 'r'
    if (data.yearsOfExperience === '1_to_2') return 'a'
    return data.yearsOfExperience ? 'g' : 'a'
  }

  if (key === 'english') return data.hasEnglishTest === true ? 'g' : 'a'
  if (key === 'sponsor')
    return data.hasSponsor === true ? 'g' : data.hasSponsor === false ? 'r' : 'a'
  return data.hasRPL === true ? 'g' : 'a'
}

export default function ResultPage({
  data,
  checkedItems,
  attachedFiles,
  onToggleItem,
  onEditProfile,
  onViewReview,
  onGoToDocuments,
  onReset,
}: ResultPageProps) {
  const warnings = getChecklistWarnings(data)
  const notices = getContextualNotices(data)
  const totalVisibleItems = getVisibleChecklistItemCount(data)
  const checkedVisibleItems = getCheckedVisibleItemCount(checkedItems, data)
  const progress =
    totalVisibleItems === 0
      ? 0
      : Math.round((checkedVisibleItems / totalVisibleItems) * 100)

  const summaryItems = [
    {
      key: 'experience' as const,
      label: 'Experience',
      value:
        data.yearsOfExperience === ''
          ? 'Not answered'
          : EXPERIENCE_LABELS[data.yearsOfExperience],
    },
    {
      key: 'english' as const,
      label: 'English',
      value:
        data.hasEnglishTest === null
          ? 'Unknown'
          : data.hasEnglishTest
          ? 'Result ready'
          : 'Test needed',
    },
    {
      key: 'sponsor' as const,
      label: 'Sponsor',
      value:
        data.hasSponsor === null
          ? 'Unknown'
          : data.hasSponsor
          ? 'Sponsor ready'
          : 'Not confirmed',
    },
    {
      key: 'rpl' as const,
      label: 'RPL / Education',
      value:
        data.hasRPL === null ? 'Unknown' : data.hasRPL ? 'Completed' : 'Pending',
    },
  ]

  const screeningLines = [
    { label: 'Role', value: formatJobPosition(data) },
    {
      label: 'Total exp.',
      value:
        data.totalWorkExperienceYears.trim() === ''
          ? '—'
          : `${data.totalWorkExperienceYears.trim()} yrs`,
    },
    {
      label: 'Last 5 yrs',
      value:
        data.workExperienceLast5Years.trim() === ''
          ? '—'
          : `${data.workExperienceLast5Years.trim()} yrs`,
    },
    {
      label: 'Nationality',
      value: data.nationality.trim() || '—',
    },
    { label: 'Location', value: formatCurrentLocation(data) },
    { label: 'Qualification', value: formatDegreeLevel(data) },
  ]

  return (
    <main className="min-h-full bg-[#f0efe9]">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <div className="grid gap-6">
          <section className="rounded-2xl bg-[#1a2236] p-5 text-white">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7a8ca8]">
              Eligibility signals
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryItems.map((item) => {
                const tone = summaryTone(item.key, data)
                const toneClass =
                  tone === 'g'
                    ? 'bg-[#34d399]'
                    : tone === 'a'
                    ? 'bg-[#fbbf24]'
                    : 'bg-[#f87171]'

                return (
                  <div key={item.key} className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${toneClass}`} />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-[#7a8ca8]">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-[#e8f0ff]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e4e2dc] bg-white p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
              Screening profile
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {screeningLines.map((line) => (
                <div key={line.label} className="rounded-xl bg-[#f8f7f3] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#9aa5b4]">
                    {line.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1a2236]">
                    {line.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {notices.length > 0 && (
            <section className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="rounded-r-lg border border-[#bfdbfe] border-l-4 border-l-[#3b82f6] bg-[#eff6ff] px-5 py-4"
                >
                  <p className="text-sm font-semibold text-[#1e40af]">
                    {notice.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#1d4ed8]">
                    {notice.message}
                  </p>
                </div>
              ))}
            </section>
          )}

          {warnings.length > 0 && (
            <section className="space-y-3">
              {warnings.map((warning) => (
                <div
                  key={warning.stepId}
                  className="rounded-r-lg border border-[#fce4a0] border-l-4 border-l-[#f59e0b] bg-[#fffbf0] px-5 py-4"
                >
                  <p className="text-sm font-semibold text-[#92610a]">
                    {warning.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#b5800f]">
                    {warning.message}
                  </p>
                </div>
              ))}
            </section>
          )}

          <section className="rounded-2xl border border-[#e4e2dc] bg-white p-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-[#1a2236]">
                Checklist progress
              </span>
              <div className="h-2 min-w-[220px] flex-1 rounded-full bg-[#e8e6e0]">
                <div
                  className="h-2 rounded-full bg-[#34d399] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-[#059669]">
                {checkedVisibleItems}/{totalVisibleItems}
              </span>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e4e2dc] bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
                  Checklist only
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[#1a2236]">
                  Mark items here. File uploads require login (not available in
                  this MVP).
                </h2>
              </div>
              <button
                type="button"
                onClick={() => downloadChecklistPdf(data, checkedItems, attachedFiles)}
                className="rounded-md border border-[#1a2236] px-5 py-3 text-sm font-semibold text-[#1a2236] transition hover:bg-[#1a2236] hover:text-white"
              >
                Download PDF
              </button>
            </div>
          </section>

          <section className="space-y-4">
            {checklistSteps.map((step) => (
              <ChecklistStepCard
                key={step.id}
                step={step}
                data={data}
                checkedItems={checkedItems}
                onToggleItem={onToggleItem}
              />
            ))}
          </section>

          <section className="rounded-2xl border border-[#e4e2dc] bg-[#fafaf8] p-6">
            <LegalDisclaimer prominent />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onEditProfile}
                className="rounded-md border border-[#d8d6d0] px-5 py-3 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
              >
                Edit profile
              </button>
              <button
                type="button"
                onClick={onViewReview}
                className="rounded-md border border-[#d8d6d0] px-5 py-3 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
              >
                View review
              </button>
              <button
                type="button"
                onClick={onGoToDocuments}
                className="rounded-md bg-[#c9972a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b8841f]"
              >
                Document uploads
              </button>
              <button
                type="button"
                onClick={onReset}
                className="rounded-md bg-[#1a2236] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
              >
                Start over
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
