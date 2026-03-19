export default function RadioCard({ name, id, value, label, icon, checked, onChange }) {
  return (
    <div className="radio-card">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <label htmlFor={id}>
        <span className="icon">{icon}</span>
        {label}
      </label>
    </div>
  )
}
