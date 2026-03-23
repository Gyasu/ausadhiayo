import { useState } from 'react'
import { formatDate } from '../../utils/formatDate'
import { useLanguage } from '../../LanguageContext'

function ReviewItem({ label, value, full }) {
  return (
    <div className={`review-item${full ? ' full' : ''}`}>
      <div className="ri-label">{label}</div>
      <div className="ri-value">{value}</div>
    </div>
  )
}

const PLANS = [
  {
    id: '6month',
    label: '6-Month Plan',
    price: 'Rs. 1,500',
    duration: '6 months',
    badge: null,
    perks: ['Bi-monthly check-ins', 'Free delivery', 'Refill reminders'],
  },
  {
    id: '1year',
    label: '1-Year Plan',
    price: 'Rs. 2,000',
    duration: '12 months',
    badge: 'Best Value',
    perks: ['Priority support', 'Free delivery', 'Refill reminders', 'Annual health summary'],
  },
]

export default function OrderReview({ formData, medications, prescriptionImage, onPlanSelect }) {
  const { t } = useLanguage()
  const d = formData
  const meds = medications.filter(m => m.name.trim())
  const [selectedPlan, setSelectedPlan] = useState(null)

  function handlePlanSelect(planId) {
    setSelectedPlan(planId)
    onPlanSelect?.(planId)
  }

  return (
    <>
      <div className="review-section">
        <div className="review-section-title">{t.reviewPersonal}</div>
        <div className="review-grid">
          <ReviewItem label={t.fullName} value={`${d.firstName} ${d.lastName}`} />
          <ReviewItem label={t.dob} value={formatDate(d.dob)} />
          <ReviewItem label={t.phone} value={d.phone} />
          <ReviewItem label={t.email} value={d.email} />
        </div>
      </div>

      <div className="review-section">
        <div className="review-section-title">{t.reviewMedications}</div>
        <div className="review-grid">
          <div className="review-item full">
            <div className="ri-label">{t.prescriptions}</div>
            <div style={{ marginTop: '6px' }}>
              {meds.map((m, i) => (
                <span key={i} className="med-review-tag">
                  💊 {m.name}{m.dose ? ' · ' + m.dose : ''}{m.freq ? ' · ' + m.freq : ''}
                </span>
              ))}
            </div>
          </div>
          {d.allergies && <ReviewItem label={t.allergies} value={d.allergies} full />}
          {d.conditions && <ReviewItem label={t.conditionsLabel} value={d.conditions} full />}
          {prescriptionImage && (
            <div className="review-item full">
              <div className="ri-label">{t.rxImageLabel}</div>
              <div style={{ marginTop: '6px' }}>
                {prescriptionImage.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(prescriptionImage)} alt="Prescription" style={{ maxWidth: '180px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                ) : (
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📄 {prescriptionImage.name}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {(d.docName || d.clinicName || d.pharmName || d.pharmPhone) && (
        <div className="review-section">
          <div className="review-section-title">{t.reviewDoctor}</div>
          <div className="review-grid">
            {d.docName && <ReviewItem label={t.doctor} value={d.docName} />}
            {d.clinicName && <ReviewItem label={t.clinic} value={d.clinicName} full />}
            {d.pharmName && <ReviewItem label={t.currentPharmacy} value={d.pharmName} />}
            {d.pharmPhone && <ReviewItem label={t.pharmPhone} value={d.pharmPhone} />}
          </div>
        </div>
      )}

      <div className="review-section">
        <div className="review-section-title">{t.reviewDelivery}</div>
        <div className="review-grid">
          <ReviewItem label={t.address} full value={[d.street, d.city, d.state].filter(Boolean).join(', ')} />
          <ReviewItem label={t.freq} value={d.frequency} />
          <ReviewItem label={t.firstDeliveryLabel} value={formatDate(d.firstDelivery)} />
          {d.delivDay && <ReviewItem label={t.preferredDay} value={d.delivDay} />}
          {d.delivTime && <ReviewItem label={t.timeWindow} value={d.delivTime} />}
        </div>
      </div>

      {/* Subscription Plan Picker */}
      <div className="review-section">
        <div className="review-section-title">Choose Your Subscription Plan</div>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '12px' }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              style={{
                flex: 1,
                minWidth: '200px',
                border: selectedPlan === plan.id ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                borderRadius: '12px',
                padding: '18px',
                cursor: 'pointer',
                background: selectedPlan === plan.id ? 'var(--accent-soft, rgba(74,158,221,0.08))' : 'var(--surface)',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: '-11px', right: '14px',
                  background: 'var(--accent)', color: 'white',
                  fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px',
                  borderRadius: '20px', letterSpacing: '0.04em',
                }}>
                  {plan.badge}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{plan.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{plan.duration}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{plan.price}</div>
              </div>
              <ul style={{ marginTop: '12px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {plan.perks.map((perk, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
              {selectedPlan === plan.id && (
                <div style={{ marginTop: '12px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment info notice */}
        {selectedPlan && (
          <div style={{
            marginTop: '16px', padding: '14px 16px',
            background: 'var(--accent-soft, rgba(74,158,221,0.08))',
            border: '1px solid var(--accent)',
            borderRadius: '10px', fontSize: '0.87rem', color: 'var(--text)', lineHeight: '1.6',
          }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>📱 What happens next?</div>
            After you submit, we'll review your medications and send an <strong>eSewa payment link</strong> along with a personalized quote to <strong>{d.phone}</strong>. Once we confirm your payment, we'll send a confirmation text and begin your deliveries on <strong>{formatDate(d.firstDelivery)}</strong>.
          </div>
        )}

        {!selectedPlan && (
          <div style={{ marginTop: '10px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Please select a plan to continue.
          </div>
        )}
      </div>
    </>
  )
}