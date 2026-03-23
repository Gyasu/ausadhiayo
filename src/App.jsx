import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth, db } from './firebase'
import { useAuth } from './AuthContext'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Form from './components/form/Form'
import Confirmation from './components/Confirmation'
import TrackOrder from './components/TrackOrder'
import AuthScreen from './components/AuthScreen'
import ThemeToggle from './components/ThemeToggle'
import LanguageModal from './components/LanguageModal'
import SplashScreen from './components/SplashScreen'

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyqexiq4Q1VKyEQHhrA7vMwlk636-xMdqfMigupqoDLT1b5ji6lxIGghKHxwkawo-XU/exec'

export default function App() {
  const user = useAuth()
  const [showSplash, setShowSplash] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [confirmationRef, setConfirmationRef] = useState('')
  const [showTracking, setShowTracking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedProfile, setSavedProfile] = useState(null)

  // Load saved profile from Firestore when user logs in
  useEffect(() => {
    if (!user) return
    getDoc(doc(db, 'patients', user.uid)).then((snap) => {
      if (snap.exists()) setSavedProfile(snap.data())
    })
  }, [user])

  async function handleSubmit(formData, medications, prescriptionImage, selectedPlan) {
    setIsSubmitting(true)
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

    const planLabels = {
      '6month': '6-Month Plan (Rs. 1,500)',
      '1year': '1-Year Plan (Rs. 2,000)',
    }

    const payload = {
      ref,
      ...formData,
      medications: medications
        .filter(m => m.name.trim())
        .map(m => `${m.name}${m.dose ? ' ' + m.dose : ''}${m.freq ? ' (' + m.freq + ')' : ''}`)
        .join(', '),
      subscriptionPlan: planLabels[selectedPlan] || selectedPlan,
      ...(imageBase64 && { prescriptionImage: imageBase64, prescriptionImageName: imageName }),
    }

    // Save to Google Sheets
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    }).catch(err => console.error('Failed to save to Google Sheets:', err))

    // Save profile to Firestore for next login
    if (user) {
      await setDoc(doc(db, 'patients', user.uid), {
        ...formData,
        medications,
        updatedAt: new Date().toISOString(),
      })
      setSavedProfile({ ...formData, medications })
    }

    await new Promise(r => setTimeout(r, 1200))

    setConfirmationRef(ref)
    setIsSubmitting(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleReset() {
    setSubmitted(false)
    setConfirmationRef('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (showSplash) return <SplashScreen onDone={() => setShowSplash(false)} />

  // Still checking auth state
  if (user === undefined) return null

  return (
    <>
      <LanguageModal />
      <Header
        onTrackOrder={() => { setShowTracking(true); setSubmitted(false) }}
        onHome={() => { setShowTracking(false); setSubmitted(false) }}
        user={user}
        onSignOut={() => signOut(auth)}
      />
      {!showTracking && !user && <Banner />}
      {!showTracking && user && !submitted && <Banner />}
      {showTracking ? (
        <main id="mainForm">
          <TrackOrder sheetsUrl={SHEETS_URL} />
        </main>
      ) : user === null ? (
        <AuthScreen />
      ) : !submitted ? (
        <main id="mainForm">
          <Form onSubmit={handleSubmit} isSubmitting={isSubmitting} savedProfile={savedProfile} />
        </main>
      ) : (
        <Confirmation confirmationRef={confirmationRef} onReset={handleReset} />
      )}
      <Footer />
      <ThemeToggle />
    </>
  )
}