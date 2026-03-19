export type Page =
  | 'start'
  | 'input'
  | 'review'
  | 'result'
  | 'documents'
  | 'sponsor'

export type ExperienceLevel = 'less_than_1' | '1_to_2' | '2_to_3' | 'more_than_3'

export interface FormData {
  yearsOfExperience: ExperienceLevel | ''
  hasEnglishTest: boolean | null
  hasSponsor: boolean | null
  hasRPL: boolean | null
}

export type AttachmentMap = Record<string, File | null>

export interface ChecklistItem {
  id: string
  text: string
  required: boolean
  /** When provided, item is only included if this returns true */
  showWhen?: (data: FormData) => boolean
}

export interface StepWarning {
  condition: (data: FormData) => boolean
  message: string
}

export interface ChecklistStep {
  id: string
  number: number
  title: string
  description: string
  items: ChecklistItem[]
  warning?: StepWarning
}
