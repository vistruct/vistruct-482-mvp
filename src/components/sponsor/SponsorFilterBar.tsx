export type PartnerType = 'all' | 'agent' | 'sponsor'

interface SponsorFilterBarProps {
  filter: PartnerType
  onChange: (next: PartnerType) => void
}

export function SponsorFilterBar({ filter, onChange }: SponsorFilterBarProps) {
  return (
    <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-white p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-[#1a2236]">Filter by</span>
        {[
          { value: 'all', label: 'All' },
          { value: 'agent', label: 'Migration agents' },
          { value: 'sponsor', label: 'Approved sponsors' },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value as PartnerType)}
            className={[
              'rounded-md border px-4 py-2 text-sm font-medium transition',
              filter === option.value
                ? 'border-[#c9972a] bg-[#fef9ee] text-[#c9972a]'
                : 'border-[#d8d6d0] text-[#6b7d99] hover:border-[#c9972a] hover:text-[#1a2236]',
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}

