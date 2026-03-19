export default function Header() {
  return (
    <header>
      <a className="logo" href="#">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
        </div>
        <span className="logo-name">Medi<span>Route</span></span>
      </a>
      <div className="header-badge">HIPAA Compliant</div>
    </header>
  )
}
