import Field from '../ui/Field'
import Divider from '../ui/Divider'

export default function DoctorInfo({ formData, errors, onChange }) {
  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <div className="form-grid">
      <div className="field full"><Divider label="Prescribing Doctor" /></div>
      <Field label="Doctor's Full Name" required error={errors.docName}>
        <input type="text" placeholder="Dr. Michael Chen" {...f('docName')} />
      </Field>
      <Field label="Specialty" optional>
        <select {...f('docSpecialty')}>
          <option value="">Select specialty…</option>
          <option>General Practitioner / Family Medicine</option>
          <option>Internal Medicine</option>
          <option>Cardiology</option>
          <option>Endocrinology</option>
          <option>Psychiatry / Mental Health</option>
          <option>Neurology</option>
          <option>Oncology</option>
          <option>Dermatology</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Doctor's Phone" required error={errors.docPhone}>
        <input type="tel" placeholder="(555) 000-0000" {...f('docPhone')} />
      </Field>
      <Field label="Doctor's Fax" optional>
        <input type="tel" placeholder="(555) 000-0000" {...f('docFax')} />
      </Field>
      <Field label="Clinic / Hospital Name" optional full>
        <input type="text" placeholder="e.g. Bay Area Medical Center" {...f('clinicName')} />
      </Field>
      <div className="field full"><Divider label="Current Pharmacy" /></div>
      <Field label="Pharmacy Name" optional full>
        <input type="text" placeholder="e.g. CVS Pharmacy, Walgreens, local pharmacy…" {...f('pharmName')} />
      </Field>
      <Field label="Pharmacy Phone" optional>
        <input type="tel" placeholder="(555) 000-0000" {...f('pharmPhone')} />
      </Field>
      <Field label="Rx Number" optional>
        <input type="text" placeholder="Prescription number" {...f('rxNum')} />
      </Field>
    </div>
  )
}
