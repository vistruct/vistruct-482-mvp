export function StartIntroSections() {
  return (
    <section className="border-b border-[#e4e2dc] bg-[#faf9f6]">
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
              What is this
            </p>
            <p className="text-lg font-medium leading-8 text-[#1a2236]">
              A simple screening tool for 482 visa eligibility (for chefs and
              employers).
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9972a]">
              Who is this for
            </p>
            <ol className="list-inside list-decimal space-y-2 text-lg font-medium leading-8 text-[#1a2236]">
              <li>Employers (HR)</li>
              <li>Visa applicants (Chef)</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
