function SelectInput({ label, name, required = false, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs uppercase tracking-wider text-secondary">
        {label}
        {required && <span className="text-tertiary"> *</span>}
      </span>
      <div className="relative">
        <select
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full appearance-none border-0 border-b-2 border-cafe-noir/40 bg-transparent px-1 py-2 pr-7 font-sans text-cafe-noir focus:outline-none focus:border-primary transition-colors"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </label>
  )
}

export default SelectInput
