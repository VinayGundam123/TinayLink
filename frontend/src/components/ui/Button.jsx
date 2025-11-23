export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-600',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-600',
  }
  return (
    <button className={`${base} ${variants[variant]} disabled:opacity-50 ${className}`} {...props}>
      {children}
    </button>
  )
}
