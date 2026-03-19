interface SponsorFooterActionsProps {
  onBack: () => void
  onReset: () => void
}

export function SponsorFooterActions({ onBack, onReset }: SponsorFooterActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onBack}
        className="rounded-md border border-[#d8d6d0] px-5 py-3 text-sm font-medium text-[#6b7d99] transition hover:border-[#a0aec0] hover:text-[#1a2236]"
      >
        Back to documents
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-md bg-[#1a2236] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3850]"
      >
        Start over
      </button>
    </div>
  )
}

