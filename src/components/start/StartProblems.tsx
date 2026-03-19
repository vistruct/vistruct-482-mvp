interface ProblemItem {
  title: string
  body: string
}

interface StartProblemsProps {
  problems: ProblemItem[]
}

export function StartProblems({ problems }: StartProblemsProps) {
  return (
    <section className="bg-[#1a2236] px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
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
          {problems.map((problem) => (
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
  )
}

