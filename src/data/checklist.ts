import type { ChecklistStep, FormData } from '../types'

export const checklistSteps: ChecklistStep[] = [
  {
    id: 'eligibility',
    number: 1,
    title: 'Eligibility assessment',
    description:
      'Confirm that your background aligns with the core 482 visa expectations for chef and cook roles.',
    warning: {
      condition: (data: FormData) =>
        data.yearsOfExperience === 'less_than_1' ||
        data.yearsOfExperience === '1_to_2',
      message:
        'Your work history may sit below the usual two-year threshold. Check this carefully before spending money on the next stage.',
    },
    items: [
      {
        id: 'e1',
        text: 'Confirm your nominated occupation is Chef or Cook under the correct ANZSCO code.',
        required: true,
      },
      {
        id: 'e2',
        text: 'Confirm you have at least two years of recent, relevant, full-time equivalent experience.',
        required: true,
      },
      {
        id: 'e3',
        text: 'Check that your employer role, duties, and salary align with the nominated occupation.',
        required: true,
      },
      {
        id: 'e4',
        text: 'Prepare a short timeline of your career history to help with later evidence matching.',
        required: false,
      },
    ],
  },
  {
    id: 'skills',
    number: 2,
    title: 'Skills and RPL',
    description:
      'Gather the evidence used for TRA, RPL, or any skills assessment pathway connected to your occupation.',
    warning: {
      condition: (data: FormData) => data.hasRPL === false,
      message:
        'You have not completed RPL or a skills assessment yet. This can become a timing bottleneck, so plan for it early.',
    },
    items: [
      {
        id: 'r1',
        text: 'Upload your TRA or skills assessment outcome letter.',
        required: true,
        showWhen: (data: FormData) => data.hasRPL === true,
      },
      {
        id: 'r2',
        text: 'Start the TRA or RPL process and note the expected completion timeframe.',
        required: true,
        showWhen: (data: FormData) => data.hasRPL === false,
      },
      {
        id: 'r3',
        text: 'Collect employment reference letters on company letterhead, signed and dated.',
        required: true,
      },
      {
        id: 'r4',
        text: 'Gather payslips, bank records, or tax evidence that matches each reference period.',
        required: true,
      },
      {
        id: 'r5',
        text: 'Prepare certificates, diplomas, apprenticeship records, or trade training documents.',
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
        text: 'Upload your current IELTS, PTE, TOEFL, OET, or Cambridge result.',
        required: true,
        showWhen: (data: FormData) => data.hasEnglishTest === true,
      },
      {
        id: 'eng2',
        text: 'Book an approved English test and keep the booking confirmation.',
        required: true,
        showWhen: (data: FormData) => data.hasEnglishTest === false,
      },
      {
        id: 'eng3',
        text: 'Check that the result will still be valid at the time of lodgement.',
        required: true,
      },
      {
        id: 'eng4',
        text: 'Save the official score report as a clean PDF for upload.',
        required: true,
      },
    ],
  },
  {
    id: 'personal',
    number: 4,
    title: 'Personal documents',
    description:
      'These are the standard identity, character, and civil documents most applicants need.',
    items: [
      {
        id: 'p1',
        text: 'Passport biodata page with enough remaining validity.',
        required: true,
      },
      {
        id: 'p2',
        text: 'Birth certificate and certified English translation if needed.',
        required: true,
      },
      {
        id: 'p3',
        text: 'Police clearances for relevant countries of residence.',
        required: true,
      },
      {
        id: 'p4',
        text: 'Health examination reference or completed medical records.',
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
    title: 'Sponsor documents',
    description:
      'Your employer side needs to be organised too, especially sponsorship approval and nomination evidence.',
    warning: {
      condition: (data: FormData) => data.hasSponsor === false,
      message:
        'A 482 visa cannot progress without a sponsoring employer. If you do not have one yet, treat this as the main blocker.',
    },
    items: [
      {
        id: 's1',
        text: 'Sponsor approval or confirmation that the employer can obtain SBS approval.',
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
        text: 'ABN, ASIC, venue details, or other business documents that support the nomination.',
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
