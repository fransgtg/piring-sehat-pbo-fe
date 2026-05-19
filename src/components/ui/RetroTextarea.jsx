export default function RetroTextarea({
  label,
  id,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[12px]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="retro-input resize-y"
        {...props}
      />
    </div>
  )
}
