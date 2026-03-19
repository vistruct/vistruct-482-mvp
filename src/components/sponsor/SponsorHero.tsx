interface SponsorHeroProps {
  totalPartners: number
}

export function SponsorHero({ totalPartners }: SponsorHeroProps) {
  return (
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
            board than a simple form. This page now follows that direction with
            filters, listing cards, and a clearer sponsor-versus-agent
            explanation.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {['MARA aligned', 'Sponsor aware', 'Chef pathway focus'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#c8d8ee]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <p
            className="text-4xl text-[#c9972a]"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            {totalPartners}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#5a7090]">
            listed partners
          </p>
        </div>
      </div>
    </section>
  )
}

