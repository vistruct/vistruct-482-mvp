interface StartHeroProps {
  onStart: () => void
  onViewSponsors: () => void
}

export function StartHero({ onStart, onViewSponsors }: StartHeroProps) {
  return (
    <section className="border-b border-[#e4e2dc] bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-12">
        <div className="self-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fef3dc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c9972a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9972a]" />
            482 visa checklist for chefs
          </div>

          <h1
            className="max-w-2xl text-5xl leading-[1.04] tracking-[-0.03em] text-[#1a2236] sm:text-6xl"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Build your 482 visa
            <br />
            <em className="text-[#c9972a]">document checklist</em>
            <br />
            with less guesswork.
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#5a6a80]">
            This MVP turns a few profile answers into a cleaner preparation flow
            for chef and cook applicants. It is designed to help you see what is
            ready, what is missing, and what may need expert support.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="rounded-md bg-[#1a2236] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
            >
              Generate my checklist
            </button>
            <button
              type="button"
              onClick={onViewSponsors}
              className="rounded-md border border-[#c9972a] px-6 py-3.5 text-sm font-semibold text-[#c9972a] transition hover:bg-[#c9972a] hover:text-white"
            >
              Find a sponsor or agent
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#9aa5b4]">
            <span>No login required</span>
            <span className="h-1 w-1 rounded-full bg-[#d0cec8]" />
            <span>No payment wall</span>
            <span className="h-1 w-1 rounded-full bg-[#d0cec8]" />
            <span>Built for quick self-checks</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[#1a2236] p-7">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(201,151,42,0.12)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#4a6080]">
              Preparation flow
            </p>

            <div className="space-y-3">
              {[
                ['1', 'Profile answers', 'Experience, English, sponsor, RPL'],
                ['2', 'Read the warnings', 'Spot blockers before you commit'],
                ['3', 'Track evidence', 'Work through each document stage'],
                ['4', 'Share with an expert', 'Optional help when you need it'],
              ].map(([num, title, sub], index) => (
                <div
                  key={title}
                  className={[
                    'flex items-start gap-3 rounded-xl border p-4',
                    index === 1
                      ? 'border-[rgba(201,151,42,0.25)] bg-[rgba(201,151,42,0.10)]'
                      : 'border-white/10 bg-white/5',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                      index === 1
                        ? 'bg-[#c9972a] text-white'
                        : 'bg-[#253548] text-[#c8d8ee]',
                    ].join(' ')}
                  >
                    {num}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#f0f4ff]">
                      {title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#5a7090]">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

