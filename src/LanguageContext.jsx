import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [langChosen, setLangChosen] = useState(() => !!localStorage.getItem('lang'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function chooseLang(choice) {
    setLang(choice)
    localStorage.setItem('lang', choice)
    setLangChosen(true)
  }

  function toggleLanguage() {
    setLang(prev => prev === 'en' ? 'ne' : 'en')
  }

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, theme, toggleTheme, langChosen, chooseLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
