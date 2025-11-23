import Modal from './ui/Modal.jsx'

export default function DeleteModal({ open, onClose, onConfirm, code }) {
  return (
    <Modal open={open} onClose={onClose} onConfirm={onConfirm} title="Delete link" confirmText="Delete" confirmVariant="danger">
      This will delete the link with code <span className="font-semibold">{code}</span>.
    </Modal>
  )
}
