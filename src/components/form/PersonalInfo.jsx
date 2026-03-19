import Field from '../ui/Field'

export default function PersonalInfo({ formData, errors, onChange, today }) {
  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <div className="form-grid">
      <Field label="First Name" required error={errors.firstName}>
        <input type="text" id="firstName" placeholder="Jane" {...f('firstName')} />
      </Field>
      <Field label="Last Name" required error={errors.lastName}>
        <input type="text" id="lastName" placeholder="Smith" {...f('lastName')} />
      </Field>
      <Field label="Date of Birth" required error={errors.dob}>
        <input type="date" id="dob" max={today} {...f('dob')} />
      </Field>
      <Field label="Phone Number" required error={errors.phone}>
        <input type="tel" id="phone" placeholder="(555) 000-0000" {...f('phone')} />
      </Field>
      <Field label="Email Address" required full error={errors.email}>
        <input type="email" id="email" placeholder="jane.smith@email.com" {...f('email')} />
      </Field>
      <Field label="Insurance Provider" optional full>
        <input type="text" id="insurance" placeholder="e.g. Blue Cross Blue Shield, Aetna, Cigna…" {...f('insurance')} />
      </Field>
      <Field label="Member ID" optional>
        <input type="text" id="memberId" placeholder="Policy / Member ID" {...f('memberId')} />
      </Field>
      <Field label="Group Number" optional>
        <input type="text" id="groupNum" placeholder="Group number" {...f('groupNum')} />
      </Field>
    </div>
  )
}
