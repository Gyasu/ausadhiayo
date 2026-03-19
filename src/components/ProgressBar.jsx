const STEPS = ['Personal', 'Prescription', 'Doctor', 'Delivery', 'Review']

export default function ProgressBar({ currentStep, onStepClick }) {
  return (
    <div className="stepper">
      {STEPS.map((label, i) => {
        const num = i + 1
        const isDone = num < currentStep
        const isActive = num === currentStep
        const stepClass = `step ${isDone ? 'done' : isActive ? 'active' : 'inactive'}`

        return (
          <div key={num} style={{ display: 'contents' }}>
            <div className={stepClass} onClick={() => isDone && onStepClick(num)}>
              <div className="step-circle">
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : num}
              </div>
              <div className="step-label">{label}</div>
            </div>
            {num < 5 && (
              <div className={`step-connector${isDone ? ' done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
