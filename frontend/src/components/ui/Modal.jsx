import Button from './Button.jsx'

export default function Modal({ open, title, children, onClose, onConfirm, confirmText = 'Confirm', confirmVariant = 'primary' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="text-sm text-gray-700 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant={confirmVariant} onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  )
}
