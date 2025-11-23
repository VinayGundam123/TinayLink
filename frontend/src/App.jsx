import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import StatsPage from './pages/StatsPage.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
          <Route path="*" element={<div className="text-center text-gray-500">Not Found. <Link className="text-primary-600" to="/">Go Home</Link></div>} />
        </Routes>
      </main>
    </div>
  )
}
