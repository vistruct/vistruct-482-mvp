interface StartFinalCtaProps {
  onStart: () => void
  onViewSponsors: () => void
}

export function StartFinalCta({ onStart, onViewSponsors }: StartFinalCtaProps) {
  return (
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
  )
}

