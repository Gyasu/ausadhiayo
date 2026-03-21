import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Form from './components/form/Form'
import Confirmation from './components/Confirmation'
import TrackOrder from './components/TrackOrder'
import ThemeToggle from './components/ThemeToggle'
import LanguageModal from './components/LanguageModal'
import SplashScreen from './components/SplashScreen'

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyqexiq4Q1VKyEQHhrA7vMwlk636-xMdqfMigupqoDLT1b5ji6lxIGghKHxwkawo-XU/exec'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [confirmationRef, setConfirmationRef] = useState('')
  const [showTracking, setShowTracking] = useState(false)

  async function handleSubmit(formData, medications, prescriptionImage) {
    const ref = 'MR-' + Date.now().toString(36).toUpperCase()

    let imageBase64 = null
    let imageName = null
    if (prescriptionImage) {
      const ext = prescriptionImage.name.split('.').pop()
      imageName = `${formData.firstName}_${formData.lastName}_prescription.${ext}`
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result.split(',')[1])
        reader.readAsDataURL(prescriptionImage)
      })
    }

    const payload = {
      ref,
      ...formData,
      medications: medications
        .filter(m => m.name.trim())
        .map(m => `${m.name}${m.dose ? ' ' + m.dose : ''}${m.freq ? ' (' + m.freq + ')' : ''}`)
        .join(', '),
      ...(imageBase64 && { prescriptionImage: imageBase64, prescriptionImageName: imageName }),
    }

    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    }).catch(err => console.error('Failed to save to Google Sheets:', err))

    setConfirmationRef(ref)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleReset() {
    setSubmitted(false)
    setConfirmationRef('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (showSplash) return <SplashScreen onDone={() => setShowSplash(false)} />

  return (
    <>
      <LanguageModal />
      <Header onTrackOrder={() => { setShowTracking(true); setSubmitted(false) }} onHome={() => { setShowTracking(false); setSubmitted(false) }} />
      {!showTracking && <Banner />}
      {showTracking ? (
        <main id="mainForm">
          <TrackOrder sheetsUrl={SHEETS_URL} />
        </main>
      ) : !submitted ? (
        <main id="mainForm">
          <Form onSubmit={handleSubmit} />
        </main>
      ) : (
        <Confirmation confirmationRef={confirmationRef} onReset={handleReset} />
      )}
      <Footer />
      <ThemeToggle />
    </>
  )
}
