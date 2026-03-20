import { useLanguage } from '../LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      <p>{t.copyright}</p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="#">{t.privacy}</a>
        <a href="#">{t.terms}</a>
        <a href="#">{t.hipaaNotice}</a>
        <a href="#">{t.contact}</a>
      </div>
    </footer>
  )
}
