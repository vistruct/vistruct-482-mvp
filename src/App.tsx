import { useState } from 'react'
import type { Page, FormData } from './types'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StartPage from './pages/StartPage'
import InputPage from './pages/InputPage'
import ReviewPage from './pages/ReviewPage'
import ResultPage from './pages/ResultPage'
import SponsorPage from './pages/SponsorPage'
import {
  getCheckedVisibleItemCount,
  getVisibleChecklistItemCount,
} from './data/checklist'

const INITIAL_FORM: FormData = {
  yearsOfExperience: '',
  hasEnglishTest: null,
  hasSponsor: null,
  hasRPL: null,
}

export default function App() {
  const [page, setPage] = useState<Page>('start')
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [attachedFiles, setAttachedFiles] = useState<Record<string, File | null>>({})

  const handleReset = () => {
    setFormData(INITIAL_FORM)
    setCheckedItems({})
    setAttachedFiles({})
    setPage('start')
  }

  const answeredQuestions = [
    formData.yearsOfExperience !== '',
    formData.hasEnglishTest !== null,
    formData.hasSponsor !== null,
    formData.hasRPL !== null,
  ].filter(Boolean).length

  const isFormComplete = answeredQuestions === 4
  const totalVisibleItems = getVisibleChecklistItemCount(formData)
  const checkedVisibleItems = getCheckedVisibleItemCount(checkedItems, formData)
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
            isFormComplete={isFormComplete}
            checkedItems={checkedVisibleItems}
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
                onAttachFile={(itemId, file) =>
                  setAttachedFiles((current) => ({
                    ...current,
                    [itemId]: file,
                  }))
                }
                onEditProfile={() => setPage('input')}
                onViewReview={() => setPage('review')}
                onReset={handleReset}
                onConnectExpert={() => setPage('sponsor')}
              />
            )}

            {page === 'sponsor' && (
              <SponsorPage
                onBack={() => setPage('result')}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
