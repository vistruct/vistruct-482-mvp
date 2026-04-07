import { StartFinalCta } from '../components/start/StartFinalCta'
import { StartHero } from '../components/start/StartHero'
import { StartHowItWorks } from '../components/start/StartHowItWorks'
import { StartIntroSections } from '../components/start/StartIntroSections'
import { StartProblems } from '../components/start/StartProblems'
import { StartStats } from '../components/start/StartStats'

interface StartPageProps {
  onStart: () => void
  onViewSponsors: () => void
}

const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Answer screening questions',
    body: 'Job role, nationality, location, years of experience, qualification, English, sponsor, and RPL progress.',
  },
  {
    number: '02',
    title: 'Review risk flags',
    body: 'We highlight experience gaps, missing English or sponsor, offshore context, and skills-assessment timing.',
  },
  {
    number: '03',
    title: 'Use the checklist',
    body: 'Track each evidence stage in one view. Export a PDF; uploads stay disabled until login exists.',
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
  { value: '10', label: 'screening fields' },
  { value: '5', label: 'document stages' },
  { value: '1', label: 'checklist flow' },
  { value: '0', label: 'uploads without login' },
]

export default function StartPage({
  onStart,
  onViewSponsors,
}: StartPageProps) {
  return (
    <main className="bg-[#f0efe9]">
      <StartIntroSections />
      <StartHero onStart={onStart} onViewSponsors={onViewSponsors} />
      <StartHowItWorks items={HOW_IT_WORKS} />
      <StartProblems problems={PROBLEMS} />
      <StartStats stats={STATS} />
      <StartFinalCta onStart={onStart} onViewSponsors={onViewSponsors} />
    </main>
  )
}
