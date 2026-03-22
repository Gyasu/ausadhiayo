import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import NavButtons from './NavButtons'
import PersonalInfo from './PersonalInfo'
import Medications from './Medications'
import DeliveryInfo from './DeliveryInfo'
import OrderReview from './OrderReview'
import { validateStep } from '../../utils/validation'
import { useLanguage } from '../../LanguageContext'

const today = new Date().toISOString().split('T')[0]

const STEP_ICONS = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
]

const INITIAL_FORM = {
  firstName: '', lastName: '', dob: '', phone: '', email: '',
  allergies: '', conditions: '',
  docName: '', clinicName: '',
  pharmName: '', pharmPhone: '',
  street: '', city: '', state: '', zip: '', delivInstructions: '',
  frequency: 'Bi-weekly', delivDay: '', delivTime: '', firstDelivery: '',
}

export default function Form({ onSubmit, isSubmitting }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [medications, setMedications] = useState([{ id: 1, name: '', dose: '', freq: '' }])
  const [prescriptionImage, setPrescriptionImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [slideDir, setSlideDir] = useState('right')

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

  function scrollToForm() {
    document.getElementById('mainForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep, formData, medications)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setSlideDir('right')
    setCurrentStep(s => s + 1)
    scrollToForm()
  }

  function handleBack() {
    setErrors({})
    setSlideDir('left')
    setCurrentStep(s => s - 1)
    scrollToForm()
  }

  const { t } = useLanguage()

  const STEP_HEADERS = [
    { title: t.step1Title, desc: t.step1Desc },
    { title: t.step2Title, desc: t.step2Desc },
    { title: t.step3Title, desc: t.step3Desc },
    { title: t.step4Title, desc: t.step4Desc },
  ]

  const header = STEP_HEADERS[currentStep - 1]

  const stepContent = {
    1: <PersonalInfo formData={formData} errors={errors} onChange={updateField} today={today} />,
    2: <Medications medications={medications} formData={formData} errors={errors}
          onChange={updateField} onAddMed={addMed} onRemoveMed={removeMed} onUpdateMed={updateMed}
          prescriptionImage={prescriptionImage} onImageChange={setPrescriptionImage} />,
    3: <DeliveryInfo formData={formData} errors={errors} onChange={updateField} today={today} />,
    4: <OrderReview formData={formData} medications={medications} prescriptionImage={prescriptionImage} />,
  }

  return (
    <>
      <ProgressBar currentStep={currentStep} onStepClick={(n) => n < currentStep && setCurrentStep(n)} />
      <div className="card">
        <div className="card-header">
          <div className="card-header-top">
            <div className="card-icon">{STEP_ICONS[currentStep - 1]}</div>
            <h2>{header.title}</h2>
          </div>
          <p>{header.desc}</p>
        </div>
        <div className="card-body">
          <div key={currentStep} className={`step-slide step-slide-${slideDir}`}>
            {stepContent[currentStep]}
          </div>
        </div>
        <NavButtons
          currentStep={currentStep}
          onBack={handleBack}
          onNext={currentStep === 4 ? () => onSubmit(formData, medications, prescriptionImage) : handleNext}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  )
}