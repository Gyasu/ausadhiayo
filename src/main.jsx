import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { LanguageProvider } from './LanguageContext'
import { AuthProvider } from './AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
)
