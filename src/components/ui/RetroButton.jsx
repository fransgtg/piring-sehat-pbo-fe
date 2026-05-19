export default function RetroButton({
  children,
  onClick,
  type = 'button',
  primary = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`retro-btn ${primary ? 'retro-btn-primary' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
