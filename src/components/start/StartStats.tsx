interface StatItem {
  value: string
  label: string
}

interface StartStatsProps {
  stats: StatItem[]
}

export function StartStats({ stats }: StartStatsProps) {
  return (
    <section className="border-y border-[#e8e6e0] bg-[#fafaf8] px-6 py-12 lg:px-12">
      <div className="mx-auto grid max-w-[1200px] gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
  )
}

