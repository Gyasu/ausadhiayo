const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

import { useLanguage } from '../../LanguageContext'

const Spinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="spin">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

export default function NavButtons({ currentStep, onBack, onNext, isSubmitting }) {
  const { t } = useLanguage()
  const isLast = currentStep === 5

  return (
    <div className="form-nav">
      {currentStep > 1 ? (
        <button className="btn btn-ghost" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft />
          {isLast ? t.edit : t.back}
        </button>
      ) : (
        <span className="progress-text">{t.step} 1 {t.of} 5</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentStep > 1 && <span className="progress-text">{t.step} {currentStep} {t.of} 5</span>}
        <button className={`btn ${isLast ? 'btn-success' : 'btn-primary'}`} onClick={onNext} disabled={isSubmitting}>
          {isLast && isSubmitting ? (
            <><Spinner /> Submitting…</>
          ) : isLast ? (
            <><CheckIcon /> {t.confirmSubscription}</>
          ) : currentStep === 4 ? (
            <>{t.reviewOrder} <ArrowRight /></>
          ) : (
            <>{t.continue} <ArrowRight /></>
          )}
        </button>
      </div>
    </div>
  )
}
