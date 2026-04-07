import type { FormData, JobPositionCode } from '../types'

const JOB_LABELS: Record<JobPositionCode, string> = {
  chef: 'Chef',
  cook: 'Cook',
  sous_chef: 'Sous chef',
  kitchen_manager: 'Kitchen manager',
  commis: 'Commis / apprentice cook',
  other: 'Other',
}

export function formatJobPosition(data: FormData): string {
  if (data.jobPosition === '') return 'Not answered'
  if (data.jobPosition === 'other') {
    const t = data.jobPositionOther.trim()
    return t ? `${JOB_LABELS.other}: ${t}` : 'Other (describe role)'
  }
  return JOB_LABELS[data.jobPosition]
}

export function formatCurrentLocation(data: FormData): string {
  if (data.currentLocation === '') return 'Not answered'
  return data.currentLocation === 'australia'
    ? 'Australia'
    : 'Offshore (outside Australia)'
}

export function formatDegreeLevel(data: FormData): string {
  if (data.degreeLevel === '') return 'Not answered'
  if (data.degreeLevel === 'none') return 'No formal qualification'
  if (data.degreeLevel === 'trade') return 'Trade / certificate'
  return 'Diploma, degree, or higher'
}
