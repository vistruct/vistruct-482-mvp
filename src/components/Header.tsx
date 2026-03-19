import type { Page } from '../types'

interface HeaderProps {
  currentPage: Page
  onLogoClick: () => void
  onNavigate: (page: Page) => void
}

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: 'start', label: 'Home' },
  { page: 'input', label: 'Profile' },
  { page: 'review', label: 'Review' },
  { page: 'result', label: 'Checklist' },
  { page: 'sponsor', label: 'Experts' },
]

export default function Header({
  currentPage,
  onLogoClick,
  onNavigate,
}: HeaderProps) {
  const ctaPage = currentPage === 'sponsor' ? 'result' : 'input'
  const ctaLabel =
    currentPage === 'sponsor' ? 'View checklist' : 'Start checklist'

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4e2dc] bg-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9972a]"
          aria-label="Vistruct home"
        >
          <span
            className="text-xl leading-none text-[#1a2236]"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Vistruct
            <span className="text-[#c9972a]">.</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.page === currentPage

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate(item.page)}
                className={[
                  'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-[#f5f4f0] text-[#1a2236]'
                    : 'text-[#6b7d99] hover:bg-[#f5f4f0] hover:text-[#1a2236]',
                ].join(' ')}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-[#e0ded8] bg-[#f0efe9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a8ca8] sm:inline-flex">
            482 visa tool
          </span>
          <button
            type="button"
            onClick={() => onNavigate(ctaPage)}
            className="rounded-md bg-[#1a2236] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2a3850]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </header>
  )
}
