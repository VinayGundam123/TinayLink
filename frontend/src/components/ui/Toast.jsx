import { useEffect } from 'react'

export default function Toast({ toast, onHide, className = '' }) {
  useEffect(() => {
    if (!toast?.message) return
    const t = setTimeout(onHide, toast.duration || 3000)
    return () => clearTimeout(t)
  }, [toast?.message])

  if (!toast?.message) return null

  const colors = toast.type === 'error' ? 'bg-red-600' : 'bg-primary-600'

  return (
    <div className={`fixed z-50 ${className || 'top-4 right-4'} pointer-events-none`}>
      <div className={`pointer-events-auto w-max rounded-lg ${colors} text-white shadow px-4 py-2`}>{toast.message}</div>
    </div>
  )
}
