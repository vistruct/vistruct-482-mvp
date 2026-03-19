import { SponsorPartnerCard, type Partner } from './SponsorPartnerCard'

interface SponsorPartnerGridProps {
  partners: Partner[]
}

export function SponsorPartnerGrid({ partners }: SponsorPartnerGridProps) {
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2">
      {partners.map((partner) => (
        <SponsorPartnerCard key={partner.name} partner={partner} />
      ))}
    </section>
  )
}

