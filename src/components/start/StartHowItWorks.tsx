interface HowItWorksItem {
  number: string
  title: string
  body: string
}

interface StartHowItWorksProps {
  items: HowItWorksItem[]
}

export function StartHowItWorks({ items }: StartHowItWorksProps) {
  return (
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
        The reference design leaned into structured cards, dense summaries, and
        a calm dashboard feel. This version brings that same visual tone into
        the React app while keeping the existing flow intact.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
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
            <p className="text-sm font-semibold text-[#1a2236]">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#6b7d99]">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

