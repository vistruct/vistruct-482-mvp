import type { PartnerType } from './SponsorFilterBar'

export interface Partner {
  name: string
  role: string
  type: Exclude<PartnerType, 'all'>
  description: string
  tags: string[]
}

interface SponsorPartnerCardProps {
  partner: Partner
}

export function SponsorPartnerCard({ partner }: SponsorPartnerCardProps) {
  return (
    <article className="rounded-2xl border border-[#e4e2dc] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-[#1a2236]">{partner.name}</p>
          <p className="mt-1 text-sm text-[#7d8ea4]">{partner.role}</p>
        </div>
        <span
          className={[
            'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]',
            partner.type === 'agent'
              ? 'bg-[#f0f4ff] text-[#35507a]'
              : 'bg-[#fef3dc] text-[#b07a10]',
          ].join(' ')}
        >
          {partner.type}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {partner.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#f5f4f0] px-3 py-1 text-xs text-[#6b7d99]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm leading-7 text-[#5a6a80]">
        {partner.description}
      </p>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          className="rounded-md border border-[#d8d6d0] px-4 py-2 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
        >
          View profile
        </button>
        <button
          type="button"
          className="rounded-md border border-[#c9972a] px-4 py-2 text-sm font-semibold text-[#c9972a] transition hover:bg-[#c9972a] hover:text-white"
        >
          Contact
        </button>
      </div>
    </article>
  )
}

