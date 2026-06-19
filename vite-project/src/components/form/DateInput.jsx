function DateInput({ label, name, required = false, value, onChange }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs uppercase tracking-wider text-secondary">
        {label}
        {required && <span className="text-tertiary"> *</span>}
      </span>
      <div className="relative">
        <input
          type="date"
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full border-0 border-b-2 border-cafe-noir/40 bg-transparent px-1 py-2 pr-7 font-sans text-cafe-noir transition-colors focus:outline-none focus:border-primary [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-7 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
        <svg
          className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 5.25h13.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5z"
          />
        </svg>
      </div>
    </label>
  )
}

export default DateInput
