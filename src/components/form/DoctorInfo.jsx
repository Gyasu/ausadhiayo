import Field from '../ui/Field'
import Divider from '../ui/Divider'
import { useLanguage } from '../../LanguageContext'

export default function DoctorInfo({ formData, errors, onChange }) {
  const { t } = useLanguage()
  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <div className="form-grid">
      <div className="field full"><Divider label={t.doctorSection} /></div>
      <Field label={t.docName} required error={errors.docName}>
        <input type="text" placeholder="Dr. Michael Chen" {...f('docName')} />
      </Field>
      <Field label={t.specialty} optional>
        <select {...f('docSpecialty')}>
          <option value="">{t.selectSpecialty}</option>
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
      <Field label={t.docPhone} required error={errors.docPhone}>
        <input type="tel" placeholder="(555) 000-0000" {...f('docPhone')} />
      </Field>
      <Field label={t.docFax} optional>
        <input type="tel" placeholder="(555) 000-0000" {...f('docFax')} />
      </Field>
      <Field label={t.clinicName} optional full>
        <input type="text" placeholder="e.g. Bay Area Medical Center" {...f('clinicName')} />
      </Field>
      <div className="field full"><Divider label={t.pharmacySection} /></div>
      <Field label={t.pharmName} optional full>
        <input type="text" placeholder="e.g. CVS Pharmacy, Walgreens, local pharmacy…" {...f('pharmName')} />
      </Field>
      <Field label={t.pharmPhone} optional>
        <input type="tel" placeholder="(555) 000-0000" {...f('pharmPhone')} />
      </Field>
      <Field label={t.rxNum} optional>
        <input type="text" placeholder="Prescription number" {...f('rxNum')} />
      </Field>
    </div>
  )
}
