import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Form from './components/form/Form'
import Confirmation from './components/Confirmation'
import ThemeToggle from './components/ThemeToggle'
import LanguageModal from './components/LanguageModal'

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx-XqxQVECJHVXeYrJP-kyAt-JFnHXfbqOSiS30331KZ5NA0gb5LRxqMG6XtTELkIrB/exec'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [confirmationRef, setConfirmationRef] = useState('')

  async function handleSubmit(formData, medications) {
    const ref = 'MR-' + Date.now().toString(36).toUpperCase()

    const payload = {
      ...formData,
      medications: medications
        .filter(m => m.name.trim())
        .map(m => `${m.name}${m.dose ? ' ' + m.dose : ''}${m.freq ? ' (' + m.freq + ')' : ''}`)
        .join(', '),
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

  return (
    <>
      <LanguageModal />
      <Header />
      <Banner />
      {!submitted ? (
        <main id="mainForm">
          <Form onSubmit={handleSubmit} />
        </main>
      ) : (
        <Confirmation confirmationRef={confirmationRef} />
      )}
      <Footer />
      <ThemeToggle />
    </>
  )
}
