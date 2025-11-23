import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client.js'
import Input from './ui/Input.jsx'
import Loader from './ui/Loader.jsx'
import Table from './ui/Table.jsx'
import DeleteModal from './DeleteModal.jsx'
import formatDate from '../utils/formatDate.js'

export default function LinkTable({ refreshKey, showToast, onChanged }) {
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState([])
  const [query, setQuery] = useState('')
  const [toDelete, setToDelete] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/api/links')
      setLinks(Array.isArray(data) ? data : [])
    } catch (err) {
      showToast({ message: 'Failed to load links', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [refreshKey])

  const filtered = useMemo(() => {
    const source = Array.isArray(links) ? links : []
    const q = query.trim().toLowerCase()
    if (!q) return source
    return source.filter(l => l.code.toLowerCase().includes(q) || (l.target_url||'').toLowerCase().includes(q))
  }, [links, query])

  async function onConfirmDelete() {
    if (!toDelete) return
    try {
      await api.delete(`/api/links/${encodeURIComponent(toDelete.code)}`)
      showToast({ message: 'Deleted', type: 'success' })
      setToDelete(null)
      onChanged?.()
    } catch (err) {
      showToast({ message: 'Failed to delete', type: 'error' })
    }
  }

  function shortUrl(code) {
    const base = (api.defaults.baseURL || '').replace(/\/$/, '')
    return `${base}/${code}`
  }

  function copyShort(code) {
    const short = shortUrl(code)
    if (!short) return
    navigator.clipboard.writeText(short)
    showToast({ message: 'Copied', type: 'success' })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Input placeholder="Search by code or URL" value={query} onChange={e=>setQuery(e.target.value)} className="max-w-sm" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="p-8 flex items-center gap-2 text-gray-600"><Loader /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-gray-500">No links yet.</div>
        ) : (
          <Table>
            <thead className="bg-gray-50/60">
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Short Code</th>
                <th className="px-4 py-3">Target URL</th>
                <th className="px-4 py-3">Total Clicks</th>
                <th className="px-4 py-3">Last Clicked</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.code} className="border-t border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <a href={shortUrl(l.code)} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">
                      {l.code}
                    </a>
                  </td>
                  <td className="px-4 py-3 max-w-lg">
                    <div className="truncate" title={l.target_url}>{l.target_url}</div>
                  </td>
                  <td className="px-4 py-3">{l.clicks ?? 0}</td>
                  <td className="px-4 py-3">{formatDate(l.last_clicked)}</td>
                  <td className="px-4 py-3">{formatDate(l.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/code/${encodeURIComponent(l.code)}`} className="text-sm text-gray-700 hover:text-gray-900">View</Link>
                      <button onClick={()=>copyShort(l.code)} className="text-sm text-gray-700 hover:text-gray-900">Copy</button>
                      <button onClick={()=>setToDelete(l)} className="text-sm text-red-600 hover:text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <DeleteModal open={!!toDelete} code={toDelete?.code} onClose={()=>setToDelete(null)} onConfirm={onConfirmDelete} />
    </div>
  )
}
