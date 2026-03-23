import { useLanguage } from '../LanguageContext'

export default function Header({ onTrackOrder, onHome, onMyPrescriptions, user, onSignOut }) {
  const { lang, toggleLanguage, t } = useLanguage()

  return (
    <header>
      <a className="logo" href="#" onClick={(e) => { e.preventDefault(); onHome?.() }}>
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
        </div>
        <span className="logo-name">Ausadhi<span> Ayo</span></span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* <button className="track-order-btn" onClick={onTrackOrder}>{t.trackOrder}</button> */}
        <button className="lang-toggle" onClick={toggleLanguage}>
          {lang === 'en' ? '🇳🇵 नेपाली' : '🇬🇧 English'}
        </button>
        {user && (
          <>
            <button className="track-order-btn" onClick={onMyPrescriptions}>{t.myPrescriptions}</button>
            <span className="header-user">{user.email}</span>
            <button className="track-order-btn" onClick={onSignOut}>{t.authSignOut}</button>
          </>
        )}
        {!user && <div className="header-badge">{t.hipaa}</div>}
      </div>
    </header>
  )
}
