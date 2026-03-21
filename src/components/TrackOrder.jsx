import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

const STATUSES = ['Pending', 'Verified', 'Dispatched', 'Delivered']

const STATUS_ICONS = [
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
]

export default function TrackOrder({ sheetsUrl }) {
  const { t } = useLanguage()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  async function handleTrack() {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const res = await fetch(`${sheetsUrl}?ref=${encodeURIComponent(input.trim())}`)
      const json = await res.json()
      if (json.found) {
        setOrder(json)
      } else {
        setError(t.trackNotFound)
      }
    } catch {
      setError(t.trackError)
    } finally {
      setLoading(false)
    }
  }

  const statusIndex = order ? STATUSES.indexOf(order.status) : -1
  const statusLabels = [t.statusPending, t.statusVerified, t.statusDispatched, t.statusDelivered]

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <div className="card-header-top">
          <div className="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <h2>{t.trackTitle}</h2>
        </div>
        <p>{t.trackDesc}</p>
      </div>

      <div className="card-body">
        <div className="track-input-row">
          <input
            type="text"
            placeholder={t.trackPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={handleTrack} disabled={loading}>
            {loading ? '...' : t.trackBtn}
          </button>
        </div>

        {error && (
          <div className="track-error">{error}</div>
        )}

        {order && (
          <div className="track-result">
            <div className="track-info">
              <div className="track-info-item">
                <span className="ri-label">{t.trackName}</span>
                <span className="ri-value">{order.firstName} {order.lastName}</span>
              </div>
              <div className="track-info-item">
                <span className="ri-label">{t.trackMeds}</span>
                <span className="ri-value">{order.medications}</span>
              </div>
              {order.firstDelivery && (
                <div className="track-info-item">
                  <span className="ri-label">{t.trackDelivery}</span>
                  <span className="ri-value">{order.firstDelivery}</span>
                </div>
              )}
            </div>

            <div className="track-stepper">
              {STATUSES.map((s, i) => (
                <div key={s} className={`track-step ${i <= statusIndex ? 'active' : ''} ${i === statusIndex ? 'current' : ''}`}>
                  <div className="track-step-icon">{STATUS_ICONS[i]}</div>
                  <div className="track-step-label">{statusLabels[i]}</div>
                  {i < STATUSES.length - 1 && <div className={`track-step-line ${i < statusIndex ? 'active' : ''}`} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
