import Field from '../ui/Field'
import Divider from '../ui/Divider'

export default function Medications({ medications, formData, errors, onChange, onAddMed, onRemoveMed, onUpdateMed }) {
  return (
    <>
      <div className="med-list">
        {medications.map((med, index) => (
          <div className="med-row" key={med.id}>
            <Field label="Medication Name" required>
              <input
                type="text"
                placeholder="e.g. Metformin, Lisinopril…"
                value={med.name}
                onChange={(e) => onUpdateMed(med.id, 'name', e.target.value)}
              />
            </Field>
            <Field label="Dosage">
              <input
                type="text"
                placeholder="e.g. 500mg"
                value={med.dose}
                onChange={(e) => onUpdateMed(med.id, 'dose', e.target.value)}
              />
            </Field>
            <Field label="Frequency">
              <select
                value={med.freq}
                onChange={(e) => onUpdateMed(med.id, 'freq', e.target.value)}
              >
                <option value="">—</option>
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>Every other day</option>
                <option>Weekly</option>
                <option>As needed</option>
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
        Add Another Medication
      </button>

      <div style={{ marginTop: '1.25rem' }}>
        <Divider label="Allergies & Conditions" />
        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <Field label="Known Drug Allergies" optional full>
            <textarea
              id="allergies"
              placeholder="e.g. Penicillin, Sulfa drugs, NSAIDs…"
              value={formData.allergies}
              onChange={(e) => onChange('allergies', e.target.value)}
            />
          </Field>
          <Field label="Current Medical Conditions" optional full>
            <textarea
              id="conditions"
              placeholder="e.g. Type 2 Diabetes, Hypertension, Asthma…"
              value={formData.conditions}
              onChange={(e) => onChange('conditions', e.target.value)}
            />
          </Field>
        </div>
      </div>
    </>
  )
}
