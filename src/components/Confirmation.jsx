import { useLanguage } from '../LanguageContext'

export default function Confirmation({ confirmationRef, onReset }) {
  const { t } = useLanguage()
  return (
    <div className="success-screen">
      <div className="card">
        <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <div className="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A9068" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: '.75rem', letterSpacing: '-0.02em' }}>
            {t.successTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '.95rem', lineHeight: '1.65', maxWidth: '400px', margin: '0 auto 1.5rem', fontWeight: 300 }}>
            {t.successDesc}
          </p>
          <div className="ref-box">
            <span className="ref-label">{t.confirmationNumber}</span>
            <span className="ref-number">{confirmationRef}</span>
          </div>
          <div className="success-steps">
            <div className="s-step"><div className="s-step-num">1</div>{t.successStep1}</div>
            <div className="s-step"><div className="s-step-num">2</div>{t.successStep2}</div>
            <div className="s-step"><div className="s-step-num">3</div>{t.successStep3}</div>
          </div>
          <button onClick={onReset} className="btn-secondary" style={{ marginTop: '2rem' }}>
            Make another entry
          </button>
        </div>
      </div>
    </div>
  )
}
