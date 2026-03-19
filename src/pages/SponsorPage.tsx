import { useState } from 'react'
import { SponsorExplainer } from '../components/sponsor/SponsorExplainer'
import { SponsorFilterBar, type PartnerType } from '../components/sponsor/SponsorFilterBar'
import { SponsorFooterActions } from '../components/sponsor/SponsorFooterActions'
import { SponsorHero } from '../components/sponsor/SponsorHero'
import { SponsorPartnerGrid } from '../components/sponsor/SponsorPartnerGrid'
import type { Partner } from '../components/sponsor/SponsorPartnerCard'

interface SponsorPageProps {
  onBack: () => void
  onReset: () => void
}

const PARTNERS: Partner[] = [
  {
    name: 'ANS - Australian Network Services',
    role: 'Registered migration agency',
    type: 'agent',
    description:
      'Focuses on hospitality sponsorship cases and end-to-end 482 preparation support.',
    tags: ['MARA', '482 sponsorship', 'Case strategy'],
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
        <SponsorHero totalPartners={PARTNERS.length} />
        <SponsorFilterBar filter={filter} onChange={setFilter} />
        <SponsorPartnerGrid partners={filteredPartners} />
        <SponsorExplainer />
        <SponsorFooterActions onBack={onBack} onReset={onReset} />
      </div>
    </main>
  )
}
