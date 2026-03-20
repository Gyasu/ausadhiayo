import Field from '../ui/Field'
import Divider from '../ui/Divider'
import { useLanguage } from '../../LanguageContext'

export default function Medications({ medications, formData, errors, onChange, onAddMed, onRemoveMed, onUpdateMed }) {
  const { t } = useLanguage()
  return (
    <>
      <div className="med-list">
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
    </>
  )
}
