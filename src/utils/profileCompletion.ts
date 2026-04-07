import type { FormData } from '../types'

export const PROFILE_TOTAL_FIELDS = 10

function isJobComplete(data: FormData): boolean {
  if (data.jobPosition === '') return false
  if (data.jobPosition === 'other')
    return data.jobPositionOther.trim().length > 0
  return true
}

function isYearFieldComplete(value: string, max?: number): boolean {
  const trimmed = value.trim()
  if (trimmed === '') return false
  const n = parseFloat(trimmed.replace(',', '.'))
  if (Number.isNaN(n) || n < 0) return false
  if (max !== undefined && n > max) return false
  return true
}

export function countAnsweredProfileFields(data: FormData): number {
  let n = 0
  if (isJobComplete(data)) n++
  if (isYearFieldComplete(data.totalWorkExperienceYears)) n++
  if (isYearFieldComplete(data.workExperienceLast5Years, 5)) n++
  if (data.nationality.trim() !== '') n++
  if (data.currentLocation !== '') n++
  if (data.degreeLevel !== '') n++
  if (data.yearsOfExperience !== '') n++
  if (data.hasEnglishTest !== null) n++
  if (data.hasSponsor !== null) n++
  if (data.hasRPL !== null) n++
  return n
}

export function isProfileComplete(data: FormData): boolean {
  return countAnsweredProfileFields(data) === PROFILE_TOTAL_FIELDS
}
