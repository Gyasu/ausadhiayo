export default function Field({ label, required, optional, error, hint, full, children }) {
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label>
        {label}
        {required && <span className="req"> *</span>}
        {optional && <span className="opt"> (optional)</span>}
      </label>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error visible">{error}</span>}
    </div>
  )
}
