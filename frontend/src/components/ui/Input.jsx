export default function Input({ className = '', ...props }) {
  return (
    <input className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 ${className}`} {...props} />
  )
}
