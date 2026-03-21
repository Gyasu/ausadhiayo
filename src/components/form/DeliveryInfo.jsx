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
        <input type="text" placeholder="Thamel, Ward No. 26" {...f('street')} />
      </Field>
      <Field label={t.city} required error={errors.city}>
        <input type="text" placeholder="Kathmandu" {...f('city')} />
      </Field>
      <Field label={t.state} required error={errors.state}>
        <select {...f('state')}>
          <option value="">{t.selectState}</option>
          {[
            'Achham','Arghakhanchi','Baglung','Baitadi','Bajhang','Bajura','Banke','Bara',
            'Bardiya','Bhaktapur','Bhojpur','Chitwan','Dadeldhura','Dailekh','Dang','Darchula',
            'Dhading','Dhankuta','Dhanusa','Dolakha','Dolpa','Doti','Eastern Rukum','Gorkha',
            'Gulmi','Humla','Ilam','Jajarkot','Jhapa','Jumla','Kailali','Kalikot','Kanchanpur',
            'Kapilvastu','Kaski','Kathmandu','Kavrepalanchok','Khotang','Lalitpur','Lamjung',
            'Mahottari','Makwanpur','Manang','Morang','Mugu','Mustang','Myagdi','Nawalparasi East',
            'Nawalparasi West','Nuwakot','Okhaldhunga','Palpa','Panchthar','Parbat','Parsa',
            'Pyuthan','Ramechhap','Rasuwa','Rautahat','Rolpa','Rukum West','Rupandehi','Salyan',
            'Sankhuwasabha','Saptari','Sarlahi','Sindhuli','Sindhupalchok','Siraha','Solukhumbu',
            'Sunsari','Surkhet','Syangja','Tanahu','Taplejung','Tehrathum','Udayapur'
          ].map(d => <option key={d}>{d}</option>)}
        </select>
      </Field>
      <Field label={t.zip} required error={errors.zip}>
        <input type="text" placeholder="44600" maxLength="10" {...f('zip')} />
      </Field>
      <Field label={t.delivInstructions} optional>
        <input type="text" placeholder="Near the blue gate, call on arrival, etc." {...f('delivInstructions')} />
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
