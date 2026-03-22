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

export default function OrderReview({ formData, medications, prescriptionImage }) {
  const { t } = useLanguage()
  const d = formData
  const meds = medications.filter(m => m.name.trim())

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

      <div className="review-section">
        <div className="review-section-title">{t.reviewDoctor}</div>
        <div className="review-grid">
          {d.docName && <ReviewItem label={t.doctor} value={d.docName} />}
          {d.clinicName && <ReviewItem label={t.clinic} value={d.clinicName} full />}
          {d.pharmName && <ReviewItem label={t.currentPharmacy} value={d.pharmName} />}
          {d.pharmPhone && <ReviewItem label={t.pharmPhone} value={d.pharmPhone} />}
        </div>
      </div>

      <div className="review-section">
        <div className="review-section-title">{t.reviewDelivery}</div>
        <div className="review-grid">
          <ReviewItem label={t.address} full value={`${d.street}, ${d.city}, ${d.state} ${d.zip}`} />
          <ReviewItem label={t.freq} value={d.frequency} />
          <ReviewItem label={t.firstDeliveryLabel} value={formatDate(d.firstDelivery)} />
          {d.delivDay && <ReviewItem label={t.preferredDay} value={d.delivDay} />}
          {d.delivTime && <ReviewItem label={t.timeWindow} value={d.delivTime} />}
        </div>
      </div>
    </>
  )
}