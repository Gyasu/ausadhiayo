import { formatDate } from '../../utils/formatDate'

function ReviewItem({ label, value, full }) {
  return (
    <div className={`review-item${full ? ' full' : ''}`}>
      <div className="ri-label">{label}</div>
      <div className="ri-value">{value}</div>
    </div>
  )
}

export default function OrderReview({ formData, medications }) {
  const d = formData
  const meds = medications.filter(m => m.name.trim())

  return (
    <>
      <div className="review-section">
        <div className="review-section-title">Personal Information</div>
        <div className="review-grid">
          <ReviewItem label="Full Name" value={`${d.firstName} ${d.lastName}`} />
          <ReviewItem label="Date of Birth" value={formatDate(d.dob)} />
          <ReviewItem label="Phone" value={d.phone} />
          <ReviewItem label="Email" value={d.email} />
          {d.insurance && (
            <ReviewItem label="Insurance" full
              value={`${d.insurance}${d.memberId ? ' · Member #' + d.memberId : ''}`} />
          )}
        </div>
      </div>

      <div className="review-section">
        <div className="review-section-title">Medications</div>
        <div className="review-grid">
          <div className="review-item full">
            <div className="ri-label">Prescriptions</div>
            <div style={{ marginTop: '6px' }}>
              {meds.map((m, i) => (
                <span key={i} className="med-review-tag">
                  💊 {m.name}{m.dose ? ' · ' + m.dose : ''}{m.freq ? ' · ' + m.freq : ''}
                </span>
              ))}
            </div>
          </div>
          {d.allergies && <ReviewItem label="Allergies" value={d.allergies} full />}
        </div>
      </div>

      <div className="review-section">
        <div className="review-section-title">Doctor &amp; Pharmacy</div>
        <div className="review-grid">
          <ReviewItem label="Doctor" value={d.docName} />
          <ReviewItem label="Doctor's Phone" value={d.docPhone} />
          {d.clinicName && <ReviewItem label="Clinic" value={d.clinicName} full />}
          {d.pharmName && <ReviewItem label="Current Pharmacy" value={d.pharmName} />}
          {d.rxNum && <ReviewItem label="Rx Number" value={d.rxNum} />}
        </div>
      </div>

      <div className="review-section">
        <div className="review-section-title">Delivery</div>
        <div className="review-grid">
          <ReviewItem label="Address" full value={`${d.street}, ${d.city}, ${d.state} ${d.zip}`} />
          <ReviewItem label="Frequency" value={d.frequency} />
          <ReviewItem label="First Delivery" value={formatDate(d.firstDelivery)} />
          {d.delivDay && <ReviewItem label="Preferred Day" value={d.delivDay} />}
          {d.delivTime && <ReviewItem label="Time Window" value={d.delivTime} />}
        </div>
      </div>
    </>
  )
}
