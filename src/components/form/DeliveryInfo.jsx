import Field from '../ui/Field'
import RadioCard from '../ui/RadioCard'
import Divider from '../ui/Divider'

export default function DeliveryInfo({ formData, errors, onChange, today }) {
  const f = (key) => ({
    value: formData[key],
    onChange: (e) => onChange(key, e.target.value),
    className: errors[key] ? 'error' : '',
  })

  return (
    <div className="form-grid">
      <div className="field full"><Divider label="Delivery Address" /></div>
      <Field label="Street Address" required full error={errors.street}>
        <input type="text" placeholder="123 Maple Street, Apt 4B" {...f('street')} />
      </Field>
      <Field label="City" required error={errors.city}>
        <input type="text" placeholder="San Francisco" {...f('city')} />
      </Field>
      <Field label="State" required error={errors.state}>
        <select {...f('state')}>
          <option value="">Select state…</option>
          {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
          ].map(s => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="ZIP Code" required error={errors.zip}>
        <input type="text" placeholder="94105" maxLength="10" {...f('zip')} />
      </Field>
      <Field label="Delivery Instructions" optional>
        <input type="text" placeholder="Leave at door, ring bell, etc." {...f('delivInstructions')} />
      </Field>
      <div className="field full"><Divider label="Delivery Schedule" /></div>
      <div className="field full">
        <label>Delivery Frequency <span className="req">*</span></label>
        <div className="radio-group">
          <RadioCard name="frequency" id="freq1" value="Weekly" label="Weekly" icon="📅"
            checked={formData.frequency === 'Weekly'} onChange={(v) => onChange('frequency', v)} />
          <RadioCard name="frequency" id="freq2" value="Bi-weekly" label="Bi-weekly" icon="📆"
            checked={formData.frequency === 'Bi-weekly'} onChange={(v) => onChange('frequency', v)} />
          <RadioCard name="frequency" id="freq3" value="Monthly" label="Monthly" icon="🗓️"
            checked={formData.frequency === 'Monthly'} onChange={(v) => onChange('frequency', v)} />
        </div>
      </div>
      <Field label="Preferred Delivery Day">
        <select {...f('delivDay')}>
          <option value="">No preference</option>
          <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
          <option>Thursday</option><option>Friday</option><option>Saturday</option>
        </select>
      </Field>
      <Field label="Preferred Time Window">
        <select {...f('delivTime')}>
          <option value="">No preference</option>
          <option>Morning (8 AM – 12 PM)</option>
          <option>Afternoon (12 PM – 5 PM)</option>
          <option>Evening (5 PM – 8 PM)</option>
        </select>
      </Field>
      <Field label="First Delivery Date" required full
        hint="Deliveries begin within 2–3 business days of approval."
        error={errors.firstDelivery}>
        <input type="date" min={today} {...f('firstDelivery')} />
      </Field>
    </div>
  )
}
