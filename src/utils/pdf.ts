import {
  checklistSteps,
  getChecklistWarnings,
  getVisibleItems,
} from '../data/checklist'
import type { AttachmentMap, FormData } from '../types'

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function wrapText(value: string, width = 88) {
  const words = value.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > width) {
      if (current) lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }

  if (current) lines.push(current)
  return lines
}

export function downloadChecklistPdf(
  data: FormData,
  checkedItems: Record<string, boolean>,
  attachedFiles: AttachmentMap
) {
  const warnings = getChecklistWarnings(data)
  const profileLines = [
    'Vistruct 482 Checklist',
    `Generated: ${new Date().toLocaleDateString()}`,
    '',
    'Profile',
    `Experience: ${data.yearsOfExperience || 'Not answered'}`,
    `English: ${
      data.hasEnglishTest === null ? 'Not answered' : data.hasEnglishTest ? 'Yes' : 'No'
    }`,
    `Sponsor: ${
      data.hasSponsor === null ? 'Not answered' : data.hasSponsor ? 'Yes' : 'No'
    }`,
    `RPL or Skills: ${
      data.hasRPL === null ? 'Not answered' : data.hasRPL ? 'Yes' : 'No'
    }`,
    '',
  ]

  const warningLines =
    warnings.length === 0
      ? ['Warnings', 'None', '']
      : [
          'Warnings',
          ...warnings.flatMap((warning) => wrapText(`- ${warning.title}: ${warning.message}`)),
          '',
        ]

  const checklistLines = checklistSteps.flatMap((step) => {
    const items = getVisibleItems(step, data)

    return [
      `${step.number}. ${step.title}`,
      ...wrapText(step.description).map((line) => `   ${line}`),
      ...items.flatMap((item) => {
        const status = checkedItems[item.id] ? '[x]' : '[ ]'
        const attachment = attachedFiles[item.id]
          ? ` (file: ${attachedFiles[item.id]!.name})`
          : ''
        return wrapText(`${status} ${item.text}${attachment}`).map((line, index) =>
          index === 0 ? `   ${line}` : `     ${line}`
        )
      }),
      '',
    ]
  })

  const allLines = [...profileLines, ...warningLines, 'Checklist', ...checklistLines]
  const linesPerPage = 46
  const pages: string[][] = []

  for (let index = 0; index < allLines.length; index += linesPerPage) {
    pages.push(allLines.slice(index, index + linesPerPage))
  }

  const objectCount = 3 + pages.length * 2
  const fontObjectNumber = objectCount + 1
  const objects: string[] = []

  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  objects[2] = `<< /Type /Pages /Count ${pages.length} /Kids [${pages
    .map((_, index) => `${3 + index * 2} 0 R`)
    .join(' ')}] >>`

  pages.forEach((pageLines, index) => {
    const pageObjectNumber = 3 + index * 2
    const contentObjectNumber = pageObjectNumber + 1
    const content = [
      'BT',
      '/F1 12 Tf',
      '50 790 Td',
      ...pageLines.flatMap((line, lineIndex) => {
        const escaped = escapePdfText(line)
        return lineIndex === 0
          ? [`(${escaped}) Tj`]
          : ['0 -16 Td', `(${escaped}) Tj`]
      }),
      'ET',
    ].join('\n')

    objects[pageObjectNumber] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] ` +
      `/Resources << /Font << /F1 ${fontObjectNumber} 0 R >> >> ` +
      `/Contents ${contentObjectNumber} 0 R >>`
    objects[contentObjectNumber] =
      `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
  })

  objects[fontObjectNumber] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = [0]

  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = pdf.length
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`
  }

  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length}\n`
  pdf += '0000000000 65535 f \n'
  for (let index = 1; index < objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  }
  pdf +=
    `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

  const blob = new Blob([pdf], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `vistruct-482-checklist-${new Date().toISOString().slice(0, 10)}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
