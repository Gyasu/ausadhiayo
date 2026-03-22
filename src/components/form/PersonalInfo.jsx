import Field from '../ui/Field'
import { useLanguage } from '../../LanguageContext'

export default function PersonalInfo({ formData, errors, onChange, today }) {
  const { t } = useLanguage()
  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <div className="form-grid">
      <Field label={t.firstName} required error={errors.firstName}>
        <input type="text" id="firstName" placeholder="Jane" {...f('firstName')} />
      </Field>
      <Field label={t.lastName} required error={errors.lastName}>
        <input type="text" id="lastName" placeholder="Smith" {...f('lastName')} />
      </Field>
      <Field label={t.dob} required error={errors.dob}>
        <input type="date" id="dob" max={today} {...f('dob')} />
      </Field>
      <Field label={t.phone} required error={errors.phone}>
        <input type="tel" id="phone" placeholder="98XXXXXXXX" maxLength="10" {...f('phone')} />
      </Field>
      <Field label={t.email} required full error={errors.email}>
        <input type="email" id="email" placeholder="jane.smith@email.com" {...f('email')} />
      </Field>
    </div>
  )
}
