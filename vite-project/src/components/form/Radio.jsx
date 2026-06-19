function Radio({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 font-sans text-sm text-cafe-noir cursor-pointer select-none">
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full border border-secondary/50 bg-white/40 transition-colors peer-checked:border-primary" />
        <span className="relative h-2 w-2 scale-0 rounded-full bg-primary transition-transform duration-150 peer-checked:scale-100" />
      </span>
      {label}
    </label>
  )
}

export default Radio
