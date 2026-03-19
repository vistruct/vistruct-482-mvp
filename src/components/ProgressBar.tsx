type StepStatus = 'complete' | 'active' | 'pending'

interface ProgressBarProps {
  current: number // 1-based step number
  total: number
  labels: string[]
}

export default function ProgressBar({ current, total, labels }: ProgressBarProps) {
  const progressPercent = ((current - 1) / (total - 1)) * 100

  return (
    <nav aria-label="Progress" className="w-full max-w-lg mx-auto px-4 pt-6 pb-4">
      <div className="relative flex items-start justify-between">
        {/* Background track */}
        <div
          className="absolute top-4 left-0 right-0 h-px bg-white/10"
          aria-hidden="true"
        />
        {/* Progress fill */}
        <div
          className="absolute top-4 left-0 h-px bg-amber-brand transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
          aria-hidden="true"
        />

        {Array.from({ length: total }).map((_, i) => {
          const stepNum = i + 1
          let status: StepStatus = 'pending'
          if (stepNum < current) status = 'complete'
          else if (stepNum === current) status = 'active'

          return (
            <div key={stepNum} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                  status === 'complete'
                    ? 'bg-amber-brand text-navy'
                    : status === 'active'
                    ? 'bg-amber-brand text-navy ring-4 ring-amber-brand/25'
                    : 'bg-navy-800 border border-white/20 text-white/40',
                ].join(' ')}
                aria-current={status === 'active' ? 'step' : undefined}
              >
                {status === 'complete' ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="#0B1628"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={[
                  'text-xs font-sans hidden sm:block whitespace-nowrap',
                  status === 'active'
                    ? 'text-amber-brand'
                    : status === 'complete'
                    ? 'text-white/50'
                    : 'text-white/25',
                ].join(' ')}
              >
                {labels[i] ?? ''}
              </span>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
