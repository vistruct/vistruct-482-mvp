interface LegalDisclaimerProps {
  className?: string
  /** Slightly larger text for landing/footer emphasis */
  prominent?: boolean
}

export default function LegalDisclaimer({
  className = '',
  prominent = false,
}: LegalDisclaimerProps) {
  const textClass = prominent
    ? 'text-sm leading-7 text-[#5a6a80]'
    : 'text-xs leading-6 text-[#6b7d99]'

  return (
    <p className={`${textClass} ${className}`}>
      This tool provides general guidance only and does not constitute migration
      advice. For official advice, please consult a{' '}
      <a
        href="https://www.mara.gov.au/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#1a2236] underline decoration-[#c9972a] underline-offset-2 hover:text-[#c9972a]"
      >
        registered migration agent (MARA)
      </a>
      .
    </p>
  )
}
