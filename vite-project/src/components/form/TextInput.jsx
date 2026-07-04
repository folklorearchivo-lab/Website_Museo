function TextInput({ label, name, type = 'text', required = false, value, onChange, placeholder, disabled = false, error }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir">
        {label}
        {required && <span> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border bg-white/50 px-4 py-2.5 font-sans transition-colors ${disabled ? 'border-cafe-noir/10 text-cafe-noir/40 cursor-not-allowed' : error ? 'border-red-400 text-cafe-noir focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-400' : 'border-cafe-noir/30 text-cafe-noir placeholder:text-cafe-noir/60 focus:border-cafe-noir focus:outline-none focus:ring-1 focus:ring-cafe-noir'}`}
      />
      {error && (
        <p className="font-sans text-xs text-red-600">{error}</p>
      )}
    </label>
  )
}

export default TextInput
