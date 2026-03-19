import { StartFinalCta } from '../components/start/StartFinalCta'
import { StartHero } from '../components/start/StartHero'
import { StartHowItWorks } from '../components/start/StartHowItWorks'
import { StartProblems } from '../components/start/StartProblems'
import { StartStats } from '../components/start/StartStats'

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
      <StartHero onStart={onStart} onViewSponsors={onViewSponsors} />
      <StartHowItWorks items={HOW_IT_WORKS} />
      <StartProblems problems={PROBLEMS} />
      <StartStats stats={STATS} />
      <StartFinalCta onStart={onStart} onViewSponsors={onViewSponsors} />
    </main>
  )
}
