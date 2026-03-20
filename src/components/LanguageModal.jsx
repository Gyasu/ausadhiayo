import { useLanguage } from '../LanguageContext'

export default function LanguageModal() {
  const { langChosen, chooseLang } = useLanguage()

  if (langChosen) return null

  return (
    <div className="lang-modal-overlay">
      <div className="lang-modal">
        <div className="lang-modal-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        <h2>Choose your language</h2>
        <p>भाषा छान्नुहोस्</p>
        <div className="lang-modal-options">
          <button className="lang-option" onClick={() => chooseLang('en')}>English</button>
          <button className="lang-option" onClick={() => chooseLang('ne')}>नेपाली</button>
        </div>
      </div>
    </div>
  )
}
