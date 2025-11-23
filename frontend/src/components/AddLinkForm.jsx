import { useState } from 'react'
import api from '../api/client.js'
import Input from './ui/Input.jsx'
import Button from './ui/Button.jsx'

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/

function isValidUrl(value) {
  try { const u = new URL(value); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false }
}

export default function AddLinkForm({ onCreated, showToast }) {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!isValidUrl(url)) e.url = 'Enter a valid URL'
    if (code && !CODE_REGEX.test(code)) e.code = 'Code must be 6-8 alphanumeric'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const body = code ? { url, code } : { url }
      const { data } = await api.post('/api/links', body)
      setUrl(''); setCode('')
      showToast({ message: 'Link created', type: 'success' })
      onCreated?.(data)
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to create link'
      showToast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Long URL</label>
        <Input placeholder="https://example.com" value={url} onChange={e=>setUrl(e.target.value)} />
        {errors.url && <div className="text-xs text-red-600 mt-1">{errors.url}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom code (optional)</label>
        <Input placeholder="6-8 letters or digits" value={code} onChange={e=>setCode(e.target.value)} />
        {errors.code && <div className="text-xs text-red-600 mt-1">{errors.code}</div>}
      </div>
      <div>
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
      </div>
    </form>
  )
}
