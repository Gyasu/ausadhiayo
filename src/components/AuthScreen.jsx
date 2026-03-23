import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useLanguage } from '../LanguageContext'

export default function AuthScreen() {
  const { t } = useLanguage()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')

    if (mode === 'register' && password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6 && mode !== 'reset') {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await sendPasswordResetEmail(auth, email)
        setInfo('Password reset email sent. Check your inbox.')
        setMode('login')
      }
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  function friendlyError(code) {
    switch (code) {
      case 'auth/user-not-found': return 'No account found with that email.'
      case 'auth/wrong-password': return 'Incorrect password.'
      case 'auth/email-already-in-use': return 'An account with this email already exists.'
      case 'auth/invalid-email': return 'Please enter a valid email address.'
      case 'auth/too-many-requests': return 'Too many attempts. Please try again later.'
      default: return 'Something went wrong. Please try again.'
    }
  }

  return (
    <main id="mainForm" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '2rem' }}>
      <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-header" style={{ paddingBottom: '0.5rem' }}>
          <div className="card-header-top">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9edd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2>{mode === 'login' ? t.authWelcome : mode === 'register' ? t.authCreate : t.authReset}</h2>
          </div>
          <p style={{ marginBottom: 0 }}>
            {mode === 'login' ? t.authLoginDesc : mode === 'register' ? t.authRegisterDesc : t.authResetDesc}
          </p>
        </div>

        <div className="card-body" style={{ paddingTop: '1rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="field">
              <label>{t.authEmail} <span className="req">*</span></label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {mode !== 'reset' && (
              <div className="field">
                <label>{t.authPassword} <span className="req">*</span></label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {mode === 'register' && (
              <div className="field">
                <label>{t.authConfirmPassword} <span className="req">*</span></label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            )}

            {error && <div className="track-error">{error}</div>}
            {info && <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>{info}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? '...' :
               mode === 'login' ? t.authSignIn :
               mode === 'register' ? t.authCreateAccount : t.authSendReset}
            </button>
          </form>

          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
            {mode === 'login' && (
              <>
                <button className="auth-link" onClick={() => { setMode('register'); setError('') }}>
                  {t.authNoAccount} <strong>{t.authRegisterLink}</strong>
                </button>
                <button className="auth-link" onClick={() => { setMode('reset'); setError('') }}>
                  {t.authForgotPassword}
                </button>
              </>
            )}
            {mode !== 'login' && (
              <button className="auth-link" onClick={() => { setMode('login'); setError('') }}>
                {t.authHaveAccount} <strong>{t.authSignIn}</strong>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
