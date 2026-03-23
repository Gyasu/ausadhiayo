import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useLanguage } from '../LanguageContext'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function MyPrescriptions({ uid }) {
  const { t } = useLanguage()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'patients', uid, 'submissions'), orderBy('submittedAt', 'desc'))
    getDocs(q).then((snap) => {
      setSubmissions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [uid])

  return (
    <main id="mainForm">
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <div className="card-header-top">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h2>{t.myPrescriptionsTitle}</h2>
          </div>
          <p>{t.myPrescriptionsDesc}</p>
        </div>

        <div className="card-body">
          {loading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading…</p>
          ) : submissions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.myPrescriptionsEmpty}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {submissions.map((s) => (
                <div key={s.id} className="rx-history-card">
                  <div className="rx-history-header">
                    <span className="rx-history-ref">{s.ref}</span>
                    <span className="rx-history-date">{formatDate(s.submittedAt)}</span>
                  </div>
                  <div className="rx-history-body">
                    <div className="rx-history-row">
                      <span className="ri-label">{t.myPrescriptionsMeds}</span>
                      <span className="ri-value">{s.medications}</span>
                    </div>
                    {s.firstDelivery && (
                      <div className="rx-history-row">
                        <span className="ri-label">{t.myPrescriptionsDelivery}</span>
                        <span className="ri-value">{formatDate(s.firstDelivery)}</span>
                      </div>
                    )}
                    {s.city && (
                      <div className="rx-history-row">
                        <span className="ri-label">{t.address}</span>
                        <span className="ri-value">{s.city}{s.state ? ', ' + s.state : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
