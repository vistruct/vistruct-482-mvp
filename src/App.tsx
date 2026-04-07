import { useState } from 'react'
import type { AttachmentMap, Page, FormData } from './types'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StartPage from './pages/StartPage'
import InputPage from './pages/InputPage'
import ReviewPage from './pages/ReviewPage'
import ResultPage from './pages/ResultPage'
import DocumentsPage from './pages/DocumentsPage'
import SponsorPage from './pages/SponsorPage'
import {
  getAttachedVisibleItemCount,
  getCheckedVisibleItemCount,
  getVisibleChecklistItemCount,
} from './data/checklist'
import {
  countAnsweredProfileFields,
  isProfileComplete,
  PROFILE_TOTAL_FIELDS,
} from './utils/profileCompletion'

const INITIAL_FORM: FormData = {
  jobPosition: '',
  jobPositionOther: '',
  totalWorkExperienceYears: '',
  workExperienceLast5Years: '',
  nationality: '',
  currentLocation: '',
  degreeLevel: '',
  yearsOfExperience: '',
  hasEnglishTest: null,
  hasSponsor: null,
  hasRPL: null,
}

export default function App() {
  const [page, setPage] = useState<Page>('start')
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [attachedFiles, setAttachedFiles] = useState<AttachmentMap>({})

  const handleReset = () => {
    setFormData(INITIAL_FORM)
    setCheckedItems({})
    setAttachedFiles({})
    setPage('start')
  }

  const answeredQuestions = countAnsweredProfileFields(formData)
  const isFormComplete = isProfileComplete(formData)
  const totalVisibleItems = getVisibleChecklistItemCount(formData)
  const checkedVisibleItems = getCheckedVisibleItemCount(checkedItems, formData)
  const attachedVisibleItems = getAttachedVisibleItemCount(attachedFiles, formData)
  const isStartPage = page === 'start'

  return (
    <div className="min-h-screen bg-[#f0efe9] text-[#1a2236]">
      <Header
        currentPage={page}
        onLogoClick={handleReset}
        onNavigate={setPage}
      />

      {isStartPage ? (
        <StartPage
          onStart={() => setPage('input')}
          onViewSponsors={() => setPage('sponsor')}
        />
      ) : (
        <div className="flex min-h-[calc(100vh-57px)]">
          <Sidebar
            page={page}
            onNavigate={setPage}
            answeredQuestions={answeredQuestions}
            profileTotalFields={PROFILE_TOTAL_FIELDS}
            isFormComplete={isFormComplete}
            checkedItems={checkedVisibleItems}
            attachedItems={attachedVisibleItems}
            totalItems={totalVisibleItems}
          />

          <div className="min-w-0 flex-1">
            {page === 'input' && (
              <InputPage
                data={formData}
                onChange={setFormData}
                onNext={() => setPage('review')}
                onBack={() => setPage('start')}
              />
            )}

            {page === 'review' && (
              <ReviewPage
                data={formData}
                checkedItems={checkedItems}
                onConfirm={() => setPage('result')}
                onBack={() => setPage('input')}
                onEdit={() => setPage('input')}
              />
            )}

            {page === 'result' && (
              <ResultPage
                data={formData}
                checkedItems={checkedItems}
                attachedFiles={attachedFiles}
                onToggleItem={(itemId) =>
                  setCheckedItems((current) => ({
                    ...current,
                    [itemId]: !current[itemId],
                  }))
                }
                onEditProfile={() => setPage('input')}
                onViewReview={() => setPage('review')}
                onGoToDocuments={() => setPage('documents')}
                onReset={handleReset}
              />
            )}

            {page === 'documents' && (
              <DocumentsPage
                data={formData}
                onBack={() => setPage('result')}
                onNext={() => setPage('sponsor')}
              />
            )}

            {page === 'sponsor' && (
              <SponsorPage
                onBack={() => setPage('documents')}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
