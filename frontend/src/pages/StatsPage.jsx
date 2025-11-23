import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/client.js'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Loader from '../components/ui/Loader.jsx'
import Toast from '../components/ui/Toast.jsx'
import formatDate from '../utils/formatDate.js'

export default function StatsPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({})

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data } = await api.get(`/api/links/${encodeURIComponent(code)}`)
        setData(data)
      } catch {
        setToast({ message: 'Code not found', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [code])

  function copyShort() {
    const base = (api.defaults.baseURL || '').replace(/\/$/, '')
    const short = `${base}/${code}`
    if (short) {
      try { navigator.clipboard.writeText(short) } catch {}
      setToast({ message: 'Copied', type: 'success' })
    } else {
      setToast({ message: 'Nothing to copy', type: 'error' })
    }
  }

  if (loading) return <div className="p-8 text-gray-600"><Loader className="mr-2 inline-block" /> Loading...</div>
  if (!data) return <div className="p-8 text-gray-600">Not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={()=>navigate('/')}>Back to Dashboard</Button>
        <Toast toast={toast} onHide={()=>setToast({})} />
      </div>
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{code}</h2>
          <Button onClick={copyShort}>Copy Short URL</Button>
        </div>
        <div className="text-sm text-gray-700">
          <div className="flex items-center gap-2"><span className="w-32 text-gray-500">Target URL</span><a href={data.target_url} className="text-primary-600 hover:underline truncate" title={data.target_url}>{data.target_url}</a></div>
          <div className="flex items-center gap-2"><span className="w-32 text-gray-500">Total clicks</span><span>{data.clicks ?? 0}</span></div>
          <div className="flex items-center gap-2"><span className="w-32 text-gray-500">Last clicked</span><span>{formatDate(data.last_clicked)}</span></div>
          <div className="flex items-center gap-2"><span className="w-32 text-gray-500">Created at</span><span>{formatDate(data.created_at)}</span></div>
        </div>
      </Card>
    </div>
  )
}
