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

export default function NavButtons({ currentStep, onBack, onNext }) {
  const isLast = currentStep === 5

  return (
    <div className="form-nav">
      {currentStep > 1 ? (
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft />
          {isLast ? 'Edit' : 'Back'}
        </button>
      ) : (
        <span className="progress-text">Step 1 of 5</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentStep > 1 && <span className="progress-text">Step {currentStep} of 5</span>}
        <button className={`btn ${isLast ? 'btn-success' : 'btn-primary'}`} onClick={onNext}>
          {isLast ? (
            <><CheckIcon /> Confirm Subscription</>
          ) : currentStep === 4 ? (
            <>Review Order <ArrowRight /></>
          ) : (
            <>Continue <ArrowRight /></>
          )}
        </button>
      </div>
    </div>
  )
}
