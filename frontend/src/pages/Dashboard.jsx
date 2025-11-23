import { useState } from 'react'
import AddLinkForm from '../components/AddLinkForm.jsx'
import LinkTable from '../components/LinkTable.jsx'
import Card from '../components/ui/Card.jsx'
import Toast from '../components/ui/Toast.jsx'

export default function Dashboard() {
  const [toast, setToast] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)

  function showToast(t) { setToast({ message: t.message, type: t.type }) }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Create Short Link</h2>
        <p className="text-sm text-gray-600 mb-4">Generate a short URL. Optionally provide a custom code (6-8 alphanumeric).</p>
        <AddLinkForm showToast={showToast} onCreated={()=>setRefreshKey(k=>k+1)} />
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Links</h2>
      </div>
      <LinkTable refreshKey={refreshKey} showToast={showToast} onChanged={()=>setRefreshKey(k=>k+1)} />

      <Toast toast={toast} onHide={()=>setToast({})} />
    </div>
  )
}
