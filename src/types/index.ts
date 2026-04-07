export type Page =
  | 'start'
  | 'input'
  | 'review'
  | 'result'
  | 'documents'
  | 'sponsor'

export type ExperienceLevel = 'less_than_1' | '1_to_2' | '2_to_3' | 'more_than_3'

export type JobPositionCode =
  | 'chef'
  | 'cook'
  | 'sous_chef'
  | 'kitchen_manager'
  | 'commis'
  | 'other'

export type CurrentLocation = 'australia' | 'offshore'

export type DegreeLevel = 'none' | 'trade' | 'higher'

export interface FormData {
  jobPosition: JobPositionCode | ''
  jobPositionOther: string
  totalWorkExperienceYears: string
  workExperienceLast5Years: string
  nationality: string
  currentLocation: CurrentLocation | ''
  degreeLevel: DegreeLevel | ''

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

export interface ContextualNotice {
  id: string
  title: string
  message: string
  variant: 'info' | 'warning'
}
