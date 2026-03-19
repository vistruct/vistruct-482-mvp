interface StartPageProps {
  onStart: () => void
  onViewSponsors: () => void
}

const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Answer four quick questions',
    body: 'Tell us about your experience, English evidence, sponsor status, and RPL progress.',
  },
  {
    number: '02',
    title: 'Review your risk points',
    body: 'We flag the areas that may need extra time, documents, or specialist support.',
  },
  {
    number: '03',
    title: 'Work through your checklist',
    body: 'Track each document item in one place and move to sponsor support when you are ready.',
  },
]

const PROBLEMS = [
  {
    title: 'No sponsor yet',
    body: 'See the checklist first, then use the expert page as your next action instead of guessing where to begin.',
  },
  {
    title: 'RPL still pending',
    body: 'We surface that early so you can treat skills evidence as a priority rather than a last-minute surprise.',
  },
  {
    title: 'English test uncertainty',
    body: 'The flow makes it obvious whether you need to upload a result now or book one first.',
  },
  {
    title: 'Document sprawl',
    body: 'Instead of scattered notes, you get one structured preparation path for the main 482 evidence groups.',
  },
]

const STATS = [
  { value: '4', label: 'questions to answer' },
  { value: '5', label: 'document stages' },
  { value: '1', label: 'clear checklist flow' },
  { value: '0', label: 'login required' },
]

export default function StartPage({
  onStart,
  onViewSponsors,
}: StartPageProps) {
  return (
    <main className="bg-[#f0efe9]">
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
              This MVP turns a few profile answers into a cleaner preparation
              flow for chef and cook applicants. It is designed to help you see
              what is ready, what is missing, and what may need expert support.
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

      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
          How it works
        </p>
        <h2
          className="mt-3 text-4xl text-[#1a2236]"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
        >
          A simpler prep flow for a complex visa.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6b7d99]">
          The reference design leaned into structured cards, dense summaries,
          and a calm dashboard feel. This version brings that same visual tone
          into the React app while keeping the existing flow intact.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.number}
              className="relative rounded-2xl border border-[#e4e2dc] bg-white p-6"
            >
              <span
                className="absolute right-5 top-4 text-5xl text-[#ede9e0]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {item.number}
              </span>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5f4f0] text-lg text-[#1a2236]">
                +
              </div>
              <p className="text-sm font-semibold text-[#1a2236]">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6b7d99]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1a2236] px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
            What this solves
          </p>
          <h2
            className="mt-3 text-4xl text-[#f0f4ff]"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Better visibility before the paperwork gets heavy.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PROBLEMS.map((problem) => (
              <div
                key={problem.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm font-semibold text-[#c8d8ee]">
                  {problem.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5a7090]">
                  {problem.body}
                </p>
                <p className="mt-4 text-xs font-semibold text-[#c9972a]">
                  Included in this flow
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e6e0] bg-[#fafaf8] px-6 py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p
                className="text-4xl text-[#1a2236]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#9aa5b4]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 text-center lg:px-12">
        <h2
          className="text-4xl text-[#1a2236]"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
        >
          Ready to get organised?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6b7d99]">
          Start with the checklist if you want a fast self-guided overview, or
          jump to the expert directory if sponsorship is your main blocker.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onStart}
            className="rounded-md bg-[#1a2236] px-9 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
          >
            Get my checklist
          </button>
          <button
            type="button"
            onClick={onViewSponsors}
            className="rounded-md border border-[#c9972a] px-6 py-3.5 text-sm font-semibold text-[#c9972a] transition hover:bg-[#c9972a] hover:text-white"
          >
            Browse sponsor help
          </button>
        </div>

        <p className="mt-8 rounded-xl bg-[#f5f4f0] px-5 py-4 text-xs leading-6 text-[#9aa5b4]">
          Vistruct is an informational product and not migration advice. Always
          verify your circumstances with a registered migration professional.
        </p>
      </section>
    </main>
  )
}
