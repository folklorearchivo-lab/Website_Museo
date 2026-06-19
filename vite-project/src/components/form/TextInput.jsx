function TextInput({ label, name, type = 'text', required = false, value, onChange, placeholder }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs uppercase tracking-wider text-secondary">
        {label}
        {required && <span className="text-tertiary"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-0 border-b-2 border-cafe-noir/40 bg-transparent px-1 py-2 font-sans text-cafe-noir placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors"
      />
    </label>
  )
}

export default TextInput
