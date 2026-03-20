import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600)
    const doneTimer = setTimeout(() => onDone(), 2300)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [])

  return (
    <div className={`splash${fading ? ' splash-fade' : ''}`}>
      <div className="splash-text">
        <span className="splash-ausadhi">Ausadhi</span>
        <span className="splash-ayo"> Ayo</span>
      </div>
    </div>
  )
}
