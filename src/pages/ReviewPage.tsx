import type { FormData, ExperienceLevel } from '../types'
import LegalDisclaimer from '../components/LegalDisclaimer'
import {
  checklistSteps,
  getCheckedVisibleItemCount,
  getChecklistWarnings,
  getContextualNotices,
  getVisibleChecklistItemCount,
} from '../data/checklist'
import {
  formatCurrentLocation,
  formatDegreeLevel,
  formatJobPosition,
} from '../utils/profileLabels'

interface ReviewPageProps {
  data: FormData
  checkedItems: Record<string, boolean>
  onConfirm: () => void
  onBack: () => void
  onEdit: () => void
}

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  less_than_1: 'Under 1 year',
  '1_to_2': '1 to 2 years',
  '2_to_3': '2 to 3 years',
  more_than_3: '3+ years',
}

function yearHighlightTone(
  value: string,
  options?: { max?: number }
): 'default' | 'green' | 'amber' {
  const trimmed = value.trim()
  if (trimmed === '') return 'default'
  const n = parseFloat(trimmed.replace(',', '.'))
  if (Number.isNaN(n) || n < 0) return 'default'
  if (options?.max !== undefined && n > options.max) return 'amber'
  if (n < 2) return 'amber'
  return 'green'
}

interface ProfileCardProps {
  label: string
  value: string
  tone?: 'default' | 'green' | 'amber' | 'red'
}

function ProfileCard({ label, value, tone = 'default' }: ProfileCardProps) {
  const toneClass =
    tone === 'green'
      ? 'text-[#059669]'
      : tone === 'amber'
      ? 'text-[#c9972a]'
      : tone === 'red'
      ? 'text-[#e53e3e]'
      : 'text-[#1a2236]'

  return (
    <div className="rounded-xl bg-[#f8f7f3] p-4">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#9aa5b4]">
        {label}
      </p>
      <p className={`mt-1 text-sm font-semibold ${toneClass}`}>{value}</p>
    </div>
  )
}

export default function ReviewPage({
  data,
  checkedItems,
  onConfirm,
  onBack,
  onEdit,
}: ReviewPageProps) {
  const warnings = getChecklistWarnings(data)
  const notices = getContextualNotices(data)
  const totalDocuments = getVisibleChecklistItemCount(data)
  const completedDocuments = getCheckedVisibleItemCount(checkedItems, data)

  const profileRows = [
    {
      label: 'Job position',
      value: formatJobPosition(data),
      tone: 'default' as const,
    },
    {
      label: 'Total work experience',
      value:
        data.totalWorkExperienceYears.trim() === ''
          ? 'Not answered'
          : `${data.totalWorkExperienceYears.trim()} yrs`,
      tone: yearHighlightTone(data.totalWorkExperienceYears),
    },
    {
      label: 'Experience (last 5 years)',
      value:
        data.workExperienceLast5Years.trim() === ''
          ? 'Not answered'
          : `${data.workExperienceLast5Years.trim()} yrs`,
      tone: yearHighlightTone(data.workExperienceLast5Years, { max: 5 }),
    },
    {
      label: 'Nationality',
      value:
        data.nationality.trim() === '' ? 'Not answered' : data.nationality.trim(),
      tone: 'default' as const,
    },
    {
      label: 'Current location',
      value: formatCurrentLocation(data),
      tone:
        data.currentLocation === 'offshore'
          ? ('amber' as const)
          : ('default' as const),
    },
    {
      label: 'Qualification',
      value: formatDegreeLevel(data),
      tone: 'default' as const,
    },
    {
      label: 'Relevant chef / cook experience',
      value:
        data.yearsOfExperience === ''
          ? 'Not answered'
          : EXPERIENCE_LABELS[data.yearsOfExperience],
      tone:
        data.yearsOfExperience === 'less_than_1'
          ? ('red' as const)
          : data.yearsOfExperience === '1_to_2'
          ? ('amber' as const)
          : ('green' as const),
    },
    {
      label: 'English',
      value:
        data.hasEnglishTest === null
          ? 'Not answered'
          : data.hasEnglishTest
          ? 'Current result available'
          : 'Test still needed',
      tone:
        data.hasEnglishTest === true
          ? ('green' as const)
          : data.hasEnglishTest === false
          ? ('amber' as const)
          : ('default' as const),
    },
    {
      label: 'Sponsor',
      value:
        data.hasSponsor === null
          ? 'Not answered'
          : data.hasSponsor
          ? 'Sponsor available'
          : 'Sponsor not confirmed',
      tone:
        data.hasSponsor === true
          ? ('green' as const)
          : data.hasSponsor === false
          ? ('red' as const)
          : ('default' as const),
    },
    {
      label: 'RPL / Skills',
      value:
        data.hasRPL === null
          ? 'Not answered'
          : data.hasRPL
          ? 'Completed'
          : 'Still pending',
      tone:
        data.hasRPL === true
          ? ('green' as const)
          : data.hasRPL === false
          ? ('amber' as const)
          : ('default' as const),
    },
  ] as const

  return (
    <main className="min-h-full bg-[#f0efe9]">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <section className="rounded-3xl bg-[#1a2236] p-7 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
                Review summary
              </p>
              <h1
                className="text-3xl text-[#f0f4ff]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Confirm this screening profile before the checklist.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5a7090]">
                Warnings reflect your answers and common 482 preparation
                blockers. This is guidance only, not legal advice.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p
                  className="text-3xl text-[#c9972a]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  {warnings.length}
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#5a7090]">
                  warnings
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl text-[#c9972a]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  {checklistSteps.length}
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#5a7090]">
                  sections
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl text-[#c9972a]"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  {totalDocuments}
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#5a7090]">
                  doc items
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-white p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
                Profile
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#1a2236]">
                Candidate and eligibility answers
              </h2>
            </div>
            <button
              type="button"
              onClick={onEdit}
              className="rounded-md border border-[#d8d6d0] px-4 py-2 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
            >
              Edit answers
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {profileRows.map((row) => (
              <ProfileCard
                key={row.label}
                label={row.label}
                value={row.value}
                tone={row.tone}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
                Next steps
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#1a2236]">
                What the checklist covers next
              </h2>
            </div>
            <span className="rounded-full bg-[#f5f4f0] px-3 py-1 text-xs font-semibold text-[#7a8ca8]">
              {completedDocuments}/{totalDocuments} checklist items ticked
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {checklistSteps.map((step) => (
              <div
                key={step.id}
                className="rounded-xl border border-[#eceae4] bg-[#fafaf8] p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9aa5b4]">
                  Step {step.number}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#1a2236]">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#7d8ea4]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-[#6b7d99]">
            Secure document upload is not available without an account in this
            MVP. You can still use the checklist and PDF export on the next
            screen.
          </p>
        </section>

        {notices.length > 0 && (
          <section className="mt-6 space-y-3">
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
          <section className="mt-6 space-y-3">
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

        <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-[#fafaf8] p-5">
          <LegalDisclaimer prominent />
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-[#d8d6d0] px-5 py-3 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-[#1a2236] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
          >
            Generate checklist
          </button>
        </div>
      </div>
    </main>
  )
}
