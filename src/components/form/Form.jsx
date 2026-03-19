import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import NavButtons from './NavButtons'
import PersonalInfo from './PersonalInfo'
import Medications from './Medications'
import DoctorInfo from './DoctorInfo'
import DeliveryInfo from './DeliveryInfo'
import OrderReview from './OrderReview'
import { validateStep } from '../../utils/validation'

const today = new Date().toISOString().split('T')[0]

const STEP_HEADERS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B6CA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    title: 'Personal Information',
    desc: 'We need your basic details to create your patient account.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B6CA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/></svg>,
    title: 'Prescription Details',
    desc: "Enter each medication you'd like delivered. You can add multiple.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B6CA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Doctor & Pharmacy Info',
    desc: 'Help us contact your prescribing physician and transfer your prescription.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B6CA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    title: 'Delivery Preferences',
    desc: 'Tell us where and when to bring your medications.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B6CA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: 'Review Your Subscription',
    desc: 'Please confirm everything looks correct before submitting.',
  },
]

const INITIAL_FORM = {
  firstName: '', lastName: '', dob: '', phone: '', email: '',
  insurance: '', memberId: '', groupNum: '',
  allergies: '', conditions: '',
  docName: '', docSpecialty: '', docPhone: '', docFax: '', clinicName: '',
  pharmName: '', pharmPhone: '', rxNum: '',
  street: '', city: '', state: '', zip: '', delivInstructions: '',
  frequency: 'Bi-weekly', delivDay: '', delivTime: '', firstDelivery: '',
}

export default function Form({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [medications, setMedications] = useState([{ id: 1, name: '', dose: '', freq: '' }])
  const [errors, setErrors] = useState({})

  function updateField(key, value) {
    setFormData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function addMed() {
    setMedications(prev => [...prev, { id: Date.now(), name: '', dose: '', freq: '' }])
  }

  function removeMed(id) {
    setMedications(prev => prev.filter(m => m.id !== id))
  }

  function updateMed(id, key, value) {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, [key]: value } : m))
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep, formData, medications)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setCurrentStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setErrors({})
    setCurrentStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const header = STEP_HEADERS[currentStep - 1]

  const stepContent = {
    1: <PersonalInfo formData={formData} errors={errors} onChange={updateField} today={today} />,
    2: <Medications medications={medications} formData={formData} errors={errors}
          onChange={updateField} onAddMed={addMed} onRemoveMed={removeMed} onUpdateMed={updateMed} />,
    3: <DoctorInfo formData={formData} errors={errors} onChange={updateField} />,
    4: <DeliveryInfo formData={formData} errors={errors} onChange={updateField} today={today} />,
    5: <OrderReview formData={formData} medications={medications} />,
  }

  return (
    <>
      <ProgressBar currentStep={currentStep} onStepClick={(n) => n < currentStep && setCurrentStep(n)} />
      <div className="card">
        <div className="card-header">
          <div className="card-header-top">
            <div className="card-icon">{header.icon}</div>
            <h2>{header.title}</h2>
          </div>
          <p>{header.desc}</p>
        </div>
        <div className="card-body">
          {stepContent[currentStep]}
        </div>
        <NavButtons
          currentStep={currentStep}
          onBack={handleBack}
          onNext={currentStep === 5 ? onSubmit : handleNext}
        />
      </div>
    </>
  )
}
