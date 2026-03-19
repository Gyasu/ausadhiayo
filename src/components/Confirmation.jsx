export default function SuccessScreen({ confirmationRef }) {
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
            You're all set!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '.95rem', lineHeight: '1.65', maxWidth: '400px', margin: '0 auto 1.5rem', fontWeight: 300 }}>
            Your prescription delivery subscription has been received. Our team will verify your prescription within 24 hours and confirm your first delivery.
          </p>
          <div className="ref-box">
            <span className="ref-label">Confirmation Number</span>
            <span className="ref-number">{confirmationRef}</span>
          </div>
          <div className="success-steps">
            <div className="s-step"><div className="s-step-num">1</div>Prescription verification (24 hrs)</div>
            <div className="s-step"><div className="s-step-num">2</div>Insurance processing</div>
            <div className="s-step"><div className="s-step-num">3</div>First delivery dispatched</div>
          </div>
        </div>
      </div>
    </div>
  )
}
