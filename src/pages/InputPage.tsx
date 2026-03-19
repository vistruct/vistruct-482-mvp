import type { FormData, ExperienceLevel } from '../types'

interface InputPageProps {
  data: FormData
  onChange: (data: FormData) => void
  onNext: () => void
  onBack: () => void
}

const EXPERIENCE_OPTIONS: {
  value: ExperienceLevel
  label: string
  sub: string
}[] = [
  { value: 'less_than_1', label: 'Under 1 year', sub: 'Very early stage' },
  { value: '1_to_2', label: '1 to 2 years', sub: 'Close to the threshold' },
  { value: '2_to_3', label: '2 to 3 years', sub: 'Usually acceptable' },
  { value: 'more_than_3', label: '3+ years', sub: 'Strong experience base' },
]

interface YesNoFieldProps {
  label: string
  sub: string
  value: boolean | null
  onChange: (value: boolean) => void
}

function YesNoField({ label, sub, value, onChange }: YesNoFieldProps) {
  return (
    <div className="rounded-2xl border border-[#e4e2dc] bg-white p-6">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
        Question
      </p>
      <p className="text-base font-semibold text-[#1a2236]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[#7d8ea4]">{sub}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        {[
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ].map((option) => {
          const selected = value === option.value

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange(option.value)}
              className={[
                'min-w-[132px] rounded-md border px-5 py-3 text-sm font-medium transition',
                selected
                  ? 'border-[#c9972a] bg-[#fef9ee] text-[#c9972a]'
                  : 'border-[#d8d6d0] text-[#4a5568] hover:border-[#c9972a] hover:text-[#1a2236]',
              ].join(' ')}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function InputPage({
  data,
  onChange,
  onNext,
  onBack,
}: InputPageProps) {
  const answeredCount = [
    data.yearsOfExperience !== '',
    data.hasEnglishTest !== null,
    data.hasSponsor !== null,
    data.hasRPL !== null,
  ].filter(Boolean).length
  const progress = (answeredCount / 4) * 100
  const isComplete = answeredCount === 4

  return (
    <main className="min-h-full bg-[#f0efe9]">
      <div className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
            Your details
          </p>
          <h1
            className="text-4xl text-[#1a2236]"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Build your profile before the document work starts.
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#6b7d99]">
            Answer four quick questions and we will tailor the checklist layout
            to your current situation.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-[#e4e2dc] bg-white p-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-[#1a2236]">Profile progress</span>
            <span className="font-semibold text-[#c9972a]">
              {answeredCount}/4 answered
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[#e8e6e0]">
            <div
              className="h-1.5 rounded-full bg-[#c9972a] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#e4e2dc] bg-white p-6">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
              Question
            </p>
            <p className="text-base font-semibold text-[#1a2236]">
              How much relevant chef or cook experience do you have?
            </p>
            <p className="mt-1 text-sm leading-6 text-[#7d8ea4]">
              Use recent, paid, full-time equivalent experience as your guide.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {EXPERIENCE_OPTIONS.map((option) => {
                const selected = data.yearsOfExperience === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onChange({ ...data, yearsOfExperience: option.value })
                    }
                    className={[
                      'rounded-xl border p-4 text-left transition',
                      selected
                        ? 'border-[#c9972a] bg-[#fef9ee]'
                        : 'border-[#e4e2dc] bg-[#fafaf8] hover:border-[#c9972a]',
                    ].join(' ')}
                  >
                    <p
                      className={[
                        'text-sm font-semibold',
                        selected ? 'text-[#c9972a]' : 'text-[#1a2236]',
                      ].join(' ')}
                    >
                      {option.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#8b97a7]">
                      {option.sub}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <YesNoField
            label="Do you already have a current English test result?"
            sub="IELTS, PTE, TOEFL, OET, or Cambridge results should still be valid when you lodge."
            value={data.hasEnglishTest}
            onChange={(value) =>
              onChange({ ...data, hasEnglishTest: value })
            }
          />

          <YesNoField
            label="Do you already have an employer willing to sponsor you?"
            sub="This helps us highlight whether sponsor-side evidence is ready or still the main blocker."
            value={data.hasSponsor}
            onChange={(value) => onChange({ ...data, hasSponsor: value })}
          />

          <YesNoField
            label="Have you completed your RPL or skills assessment?"
            sub="If not, we will surface that earlier in the checklist because it often affects timing."
            value={data.hasRPL}
            onChange={(value) => onChange({ ...data, hasRPL: value })}
          />
        </div>

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
            onClick={onNext}
            disabled={!isComplete}
            className={[
              'min-w-[220px] rounded-md px-6 py-3 text-sm font-semibold transition',
              isComplete
                ? 'bg-[#1a2236] text-white hover:bg-[#2a3850]'
                : 'cursor-not-allowed bg-[#d9d5cc] text-[#8d8a82]',
            ].join(' ')}
          >
            Continue to review
          </button>
        </div>
      </div>
    </main>
  )
}
