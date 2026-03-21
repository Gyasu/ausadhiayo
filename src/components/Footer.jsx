import { useState } from 'react'
import { useLanguage } from '../LanguageContext'
import PolicyModal from './PolicyModal'

export default function Footer() {
  const { t } = useLanguage()
  const [activeModal, setActiveModal] = useState(null)

  return (
    <>
      <footer>
        <p>{t.copyright}</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('privacy') }}>{t.privacy}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('terms') }}>{t.terms}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('hipaa') }}>{t.hipaaNotice}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('contact') }}>{t.contact}</a>
        </div>
      </footer>
      {activeModal && <PolicyModal type={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  )
}
