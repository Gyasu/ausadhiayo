import { useRef } from 'react'
import Field from '../ui/Field'
import Divider from '../ui/Divider'
import { useLanguage } from '../../LanguageContext'

export default function Medications({ medications, formData, errors, onChange, onAddMed, onRemoveMed, onUpdateMed, prescriptionImage, onImageChange }) {
  const { t } = useLanguage()
  const fileInputRef = useRef(null)

  function handleFile(file) {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return alert('File exceeds 5 MB limit.')
    onImageChange(file)
  }

  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <>
      {/* 1. Prescription Upload */}
      <div>
        <Divider label={t.rxImageLabel} />
        <div style={{ marginTop: '1rem' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {!prescriptionImage ? (
            <div
              className="rx-upload-zone"
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div className="rx-upload-text">{t.rxImageDrop}</div>
              <div className="rx-upload-hint">{t.rxImageFormats}</div>
            </div>
          ) : (
            <div className="rx-preview">
              {prescriptionImage.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(prescriptionImage)} alt="Prescription" className="rx-preview-img" />
              ) : (
                <div className="rx-preview-pdf">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span>{prescriptionImage.name}</span>
                </div>
              )}
              <div className="rx-preview-actions">
                <button type="button" className="rx-btn-change" onClick={() => fileInputRef.current.click()}>{t.rxImageChange}</button>
                <button type="button" className="rx-btn-remove" onClick={() => { onImageChange(null); fileInputRef.current.value = '' }}>{t.rxImageRemove}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Medication List */}
      <div style={{ marginTop: '1.25rem' }}>
        <Divider label={t.medicationName} />
        <div className="med-list" style={{ marginTop: '1rem' }}>
          {medications.map((med, index) => (
            <div className="med-row" key={med.id}>
              <Field label={t.medicationName} required>
                <input
                  type="text"
                  placeholder="e.g. Metformin, Lisinopril…"
                  value={med.name}
                  onChange={(e) => onUpdateMed(med.id, 'name', e.target.value)}
                />
              </Field>
              <Field label={t.dosage}>
                <input
                  type="text"
                  placeholder="e.g. 500mg"
                  value={med.dose}
                  onChange={(e) => onUpdateMed(med.id, 'dose', e.target.value)}
                />
              </Field>
              <Field label={t.frequency}>
                <select
                  value={med.freq}
                  onChange={(e) => onUpdateMed(med.id, 'freq', e.target.value)}
                >
                  <option value="">—</option>
                  <option>{t.freqOnce}</option>
                  <option>{t.freqTwice}</option>
                  <option>{t.freqThrice}</option>
                  <option>{t.freqAlt}</option>
                  <option>{t.freqWeekly}</option>
                  <option>{t.freqAsNeeded}</option>
                </select>
              </Field>
              {index > 0 ? (
                <button className="remove-btn" onClick={() => onRemoveMed(med.id)} title="Remove">✕</button>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>

        {errors._medications && (
          <span className="field-error visible" style={{ marginTop: '8px', display: 'block' }}>
            {errors._medications}
          </span>
        )}

        <button className="add-med-btn" onClick={onAddMed} style={{ marginTop: '10px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          {t.addMedication}
        </button>
      </div>

      {/* 3. Allergies & Conditions */}
      <div style={{ marginTop: '1.25rem' }}>
        <Divider label={t.allergiesSection} />
        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <Field label={t.allergiesLabel} optional full>
            <textarea
              id="allergies"
              placeholder={t.allergiesPlaceholder}
              value={formData.allergies}
              onChange={(e) => onChange('allergies', e.target.value)}
            />
          </Field>
          <Field label={t.conditionsLabel} optional full>
            <textarea
              id="conditions"
              placeholder={t.conditionsPlaceholder}
              value={formData.conditions}
              onChange={(e) => onChange('conditions', e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* 4. Doctor & Pharmacy Info */}
      <div style={{ marginTop: '1.25rem' }}>
        <Divider label={t.doctorSection} />
        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <Field label={t.docName} optional full>
            <input type="text" placeholder="Dr. Michael Chen" {...f('docName')} />
          </Field>
          <Field label={t.clinicName} optional full>
            <input type="text" placeholder="e.g. Bir Hospital, TUTH, local clinic…" {...f('clinicName')} />
          </Field>
        </div>
        <Divider label={t.pharmacySection} style={{ marginTop: '1rem' }} />
        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <Field label={t.pharmName} optional full>
            <input type="text" placeholder="e.g. Osan Pharmacy, local pharmacy…" {...f('pharmName')} />
          </Field>
          <Field label={t.pharmPhone} optional>
            <input type="tel" placeholder="98XXXXXXXX" maxLength="10" {...f('pharmPhone')} />
          </Field>
        </div>
      </div>
    </>
  )
}