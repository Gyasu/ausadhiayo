import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Form from './components/form/Form'
import Confirmation from './components/Confirmation'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [confirmationRef, setConfirmationRef] = useState('')

  function handleSubmit() {
    const ref = 'MR-' + Date.now().toString(36).toUpperCase()
    setConfirmationRef(ref)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
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
    </>
  )
}
