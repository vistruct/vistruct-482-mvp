export function SponsorExplainer() {
  return (
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
          <p className="text-sm font-semibold text-[#1a2236]">Migration agent</p>
          <p className="mt-2 text-sm leading-7 text-[#5a6a80]">
            A registered professional who advises on eligibility, prepares
            documents, and manages the visa process. They do not employ you.
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-6 text-[#9aa5b4]">
        Partner listings are for demonstration and informational purposes only.
        Always independently verify credentials and sponsorship eligibility
        before proceeding.
      </p>
    </section>
  )
}

