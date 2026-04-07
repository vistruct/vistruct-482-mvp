import type { ChecklistStep, ContextualNotice, FormData } from '../types'

export const checklistSteps: ChecklistStep[] = [
  {
    id: 'eligibility',
    number: 1,
    title: 'Occupation and eligibility',
    description:
      'Start with the core Department-style checks before you spend time gathering every document.',
    warning: {
      condition: (data: FormData) => {
        const last5 = parseFloat(
          data.workExperienceLast5Years.trim().replace(',', '.')
        )
        const total = parseFloat(
          data.totalWorkExperienceYears.trim().replace(',', '.')
        )
        const last5Weak =
          data.workExperienceLast5Years.trim() !== '' &&
          !Number.isNaN(last5) &&
          last5 < 2
        const totalWeak =
          data.totalWorkExperienceYears.trim() !== '' &&
          !Number.isNaN(total) &&
          total < 2
        return (
          data.yearsOfExperience === 'less_than_1' ||
          data.yearsOfExperience === '1_to_2' ||
          last5Weak ||
          totalWeak
        )
      },
      message:
        'Your work history may sit below the usual two-year threshold. Check this carefully before spending money on the next stage.',
    },
    items: [
      {
        id: 'e1',
        text: 'Confirm the nominated occupation is Chef or Cook under the correct ANZSCO classification.',
        required: true,
      },
      {
        id: 'e2',
        text: 'Confirm at least two years of recent, relevant, full-time equivalent work experience.',
        required: true,
      },
      {
        id: 'e3',
        text: 'Check that the proposed role, salary, and duties align with the nominated occupation.',
        required: true,
      },
      {
        id: 'e4',
        text: 'Prepare a simple work history timeline to help match your later evidence.',
        required: false,
      },
    ],
  },
  {
    id: 'skills',
    number: 2,
    title: 'Skills evidence, qualification, or RPL',
    description:
      'Group education, qualification, and RPL-style evidence together so your skills story is easier to review.',
    warning: {
      condition: (data: FormData) => data.hasRPL === false,
      message:
        'You have not completed RPL or a skills assessment yet. This can become a timing bottleneck, so plan for it early.',
    },
    items: [
      {
        id: 'r1',
        text: 'TRA or skills assessment outcome letter.',
        required: true,
        showWhen: (data: FormData) => data.hasRPL === true,
      },
      {
        id: 'r2',
        text: 'TRA or RPL application reference and expected completion timeframe.',
        required: true,
        showWhen: (data: FormData) => data.hasRPL === false,
      },
      {
        id: 'r3',
        text: 'Employment reference letters on company letterhead, signed and dated.',
        required: true,
      },
      {
        id: 'r4',
        text: 'Payslips, tax, or bank evidence that matches the claimed work periods.',
        required: true,
      },
      {
        id: 'r5',
        text: 'Qualification certificates, academic transcripts, or apprenticeship records.',
        required: true,
      },
      {
        id: 'r6',
        text: 'Course syllabus, trade training letters, or curriculum evidence if requested.',
        required: false,
      },
    ],
  },
  {
    id: 'english',
    number: 3,
    title: 'English requirement',
    description:
      'Make sure your English evidence is valid, recent, and appropriate for the visa stream.',
    warning: {
      condition: (data: FormData) => data.hasEnglishTest === false,
      message:
        'No current English result is recorded. Booking a test early reduces delays once your sponsor is ready.',
    },
    items: [
      {
        id: 'eng1',
        text: 'Approved English test result: IELTS, PTE, TOEFL, OET, or Cambridge.',
        required: true,
        showWhen: (data: FormData) => data.hasEnglishTest === true,
      },
      {
        id: 'eng2',
        text: 'Approved English test booking confirmation if the result is not ready yet.',
        required: true,
        showWhen: (data: FormData) => data.hasEnglishTest === false,
      },
      {
        id: 'eng3',
        text: 'Check that the result will still be valid on the planned lodgement date.',
        required: true,
      },
      {
        id: 'eng4',
        text: 'Official score report or candidate report issued by the test provider.',
        required: true,
      },
    ],
  },
  {
    id: 'personal',
    number: 4,
    title: 'Identity, health, and character',
    description:
      'These are the usual primary applicant documents often requested for identity, character, and health checks.',
    items: [
      {
        id: 'p1',
        text: 'Current passport biodata page.',
        required: true,
      },
      {
        id: 'p2',
        text: 'Birth certificate and certified translation if needed.',
        required: true,
      },
      {
        id: 'p3',
        text: 'Police clearance certificates for relevant countries of residence.',
        required: true,
      },
      {
        id: 'p4',
        text: 'Health examination referral or completed medical evidence if already issued.',
        required: true,
      },
      {
        id: 'p5',
        text: 'Marriage certificate or legal name-change evidence where applicable.',
        required: false,
      },
    ],
  },
  {
    id: 'sponsor',
    number: 5,
    title: 'Sponsor and nomination evidence',
    description:
      'Keep the employer-side evidence together so sponsorship and nomination readiness are easy to check.',
    warning: {
      condition: (data: FormData) => data.hasSponsor === false,
      message:
        'A 482 visa cannot progress without a sponsoring employer. If you do not have one yet, treat this as the main blocker.',
    },
    items: [
      {
        id: 's1',
        text: 'Sponsor approval or evidence that the employer can obtain SBS approval.',
        required: true,
      },
      {
        id: 's2',
        text: 'Draft or signed employment contract covering salary, duties, and hours.',
        required: true,
      },
      {
        id: 's3',
        text: 'Position description and nomination-ready role summary.',
        required: true,
      },
      {
        id: 's4',
        text: 'Labour market testing evidence if required for the nomination.',
        required: true,
      },
      {
        id: 's5',
        text: 'ABN, ASIC, venue details, or other business documents supporting the nomination.',
        required: false,
      },
    ],
  },
]

export function getVisibleItems(step: ChecklistStep, data: FormData) {
  return step.items.filter((item) => (item.showWhen ? item.showWhen(data) : true))
}

export function getChecklistWarnings(data: FormData) {
  return checklistSteps.flatMap((step) =>
    step.warning && step.warning.condition(data)
      ? [{ stepId: step.id, title: step.title, message: step.warning.message }]
      : []
  )
}

export function getContextualNotices(data: FormData): ContextualNotice[] {
  if (data.currentLocation === 'offshore') {
    return [
      {
        id: 'offshore',
        title: 'Applying from outside Australia',
        variant: 'info',
        message:
          'Many 482 pathways still work for offshore applicants, but timing, sponsorship, and evidence requirements can differ. Use this screen as a planning guide only and confirm details with your employer or a registered migration agent.',
      },
    ]
  }
  return []
}

export function getVisibleChecklistItemCount(data: FormData) {
  return checklistSteps.reduce(
    (total, step) => total + getVisibleItems(step, data).length,
    0
  )
}

export function getCheckedVisibleItemCount(
  checkedItems: Record<string, boolean>,
  data: FormData
) {
  return checklistSteps.reduce(
    (total, step) =>
      total +
      getVisibleItems(step, data).filter((item) => checkedItems[item.id]).length,
    0
  )
}

export function getAttachedVisibleItemCount(
  attachedFiles: Record<string, File | null>,
  data: FormData
) {
  return checklistSteps.reduce(
    (total, step) =>
      total +
      getVisibleItems(step, data).filter((item) => !!attachedFiles[item.id]).length,
    0
  )
}
