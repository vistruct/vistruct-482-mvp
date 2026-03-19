import { useState } from 'react'

interface SponsorPageProps {
  onBack: () => void
  onReset: () => void
}

type PartnerType = 'all' | 'agent' | 'sponsor'

interface Partner {
  name: string
  role: string
  type: Exclude<PartnerType, 'all'>
  description: string
  tags: string[]
}

const PARTNERS: Partner[] = [
  {
    name: 'Harbour Lane Migration',
    role: 'Registered migration agency',
    type: 'agent',
    description:
      'Focuses on hospitality sponsorship cases and end-to-end 482 preparation support.',
    tags: ['MARA', 'Chef sponsorship', 'Case strategy'],
  },
  {
    name: 'Southern Flame Group',
    role: 'Approved hospitality sponsor',
    type: 'sponsor',
    description:
      'Restaurant group with multiple venues and experience sponsoring kitchen talent.',
    tags: ['SBS ready', 'Multi-site', 'Metro locations'],
  },
  {
    name: 'Apron Path Advisory',
    role: 'Migration advisory team',
    type: 'agent',
    description:
      'Helps applicants with evidence gaps, RPL sequencing, and nomination document review.',
    tags: ['MARA', 'RPL planning', 'Document audit'],
  },
  {
    name: 'Northside Dining Collective',
    role: 'Employer sponsor',
    type: 'sponsor',
    description:
      'Independent venue network recruiting chefs with structured onboarding support.',
    tags: ['Regional options', 'Hospitality', '482 pathway'],
  },
]

export default function SponsorPage({ onBack, onReset }: SponsorPageProps) {
  const [filter, setFilter] = useState<PartnerType>('all')

  const filteredPartners =
    filter === 'all'
      ? PARTNERS
      : PARTNERS.filter((partner) => partner.type === filter)

  return (
    <main className="min-h-full bg-[#f0efe9]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl bg-[#1a2236] px-7 py-8 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(201,151,42,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-[rgba(201,151,42,0.12)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
                Sponsor and agent directory
              </p>
              <h1
                className="mt-4 text-4xl text-[#f0f4ff]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Connect with the right support for your 482 next step.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5a7090]">
                The reference file treated this area more like a curated partner
                board than a simple form. This page now follows that direction
                with filters, listing cards, and a clearer sponsor-versus-agent
                explanation.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['MARA aligned', 'Sponsor aware', 'Chef pathway focus'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#c8d8ee]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p
                className="text-4xl text-[#c9972a]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {PARTNERS.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#5a7090]">
                listed partners
              </p>
            </div>
          </div>
        </section>

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
                onClick={() => setFilter(option.value as PartnerType)}
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

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {filteredPartners.map((partner) => (
            <article
              key={partner.name}
              className="rounded-2xl border border-[#e4e2dc] bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-[#1a2236]">
                    {partner.name}
                  </p>
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
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-[#e4e2dc] bg-white p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa5b4]">
            Sponsor vs agent
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-[#f8f7f3] p-5">
              <p className="text-sm font-semibold text-[#1a2236]">
                Approved sponsor
              </p>
              <p className="mt-2 text-sm leading-7 text-[#5a6a80]">
                An employer that can sponsor and nominate you for the role. They
                are connected to the job itself, not the visa advice.
              </p>
            </div>
            <div className="rounded-xl bg-[#f8f7f3] p-5">
              <p className="text-sm font-semibold text-[#1a2236]">
                Migration agent
              </p>
              <p className="mt-2 text-sm leading-7 text-[#5a6a80]">
                A registered professional who advises on eligibility, prepares
                documents, and manages the visa process. They do not employ you.
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-6 text-[#9aa5b4]">
            Partner listings are for demonstration and informational purposes
            only. Always independently verify credentials and sponsorship
            eligibility before proceeding.
          </p>
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
            onClick={onReset}
            className="rounded-md bg-[#1a2236] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
          >
            Start over
          </button>
        </div>
      </div>
    </main>
  )
}
