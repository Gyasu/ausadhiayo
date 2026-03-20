import Field from '../ui/Field'
import RadioCard from '../ui/RadioCard'
import Divider from '../ui/Divider'
import { useLanguage } from '../../LanguageContext'

export default function DeliveryInfo({ formData, errors, onChange, today }) {
  const { t } = useLanguage()
  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <div className="form-grid">
      <div className="field full"><Divider label={t.deliveryAddress} /></div>
      <Field label={t.street} required full error={errors.street}>
        <input type="text" placeholder="123 Maple Street, Apt 4B" {...f('street')} />
      </Field>
      <Field label={t.city} required error={errors.city}>
        <input type="text" placeholder="San Francisco" {...f('city')} />
      </Field>
      <Field label={t.state} required error={errors.state}>
        <select {...f('state')}>
          <option value="">{t.selectState}</option>
          {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
          ].map(s => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label={t.zip} required error={errors.zip}>
        <input type="text" placeholder="94105" maxLength="10" {...f('zip')} />
      </Field>
      <Field label={t.delivInstructions} optional>
        <input type="text" placeholder="Leave at door, ring bell, etc." {...f('delivInstructions')} />
      </Field>
      <div className="field full"><Divider label={t.deliverySchedule} /></div>
      <div className="field full">
        <label>{t.delivFrequency} <span className="req">*</span></label>
        <div className="radio-group">
          <RadioCard name="frequency" id="freq1" value="Weekly" label={t.weekly} icon="📅"
            checked={formData.frequency === 'Weekly'} onChange={(v) => onChange('frequency', v)} />
          <RadioCard name="frequency" id="freq2" value="Bi-weekly" label={t.biweekly} icon="📆"
            checked={formData.frequency === 'Bi-weekly'} onChange={(v) => onChange('frequency', v)} />
          <RadioCard name="frequency" id="freq3" value="Monthly" label={t.monthly} icon="🗓️"
            checked={formData.frequency === 'Monthly'} onChange={(v) => onChange('frequency', v)} />
        </div>
      </div>
      <Field label={t.delivDay}>
        <select {...f('delivDay')}>
          <option value="">{t.noPreference}</option>
          <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
          <option>Thursday</option><option>Friday</option><option>Saturday</option>
        </select>
      </Field>
      <Field label={t.delivTime}>
        <select {...f('delivTime')}>
          <option value="">{t.noPreference}</option>
          <option>{t.morning}</option>
          <option>{t.afternoon}</option>
          <option>{t.evening}</option>
        </select>
      </Field>
      <Field label={t.firstDelivery} required full hint={t.delivHint} error={errors.firstDelivery}>
        <input type="date" min={today} {...f('firstDelivery')} />
      </Field>
    </div>
  )
}
