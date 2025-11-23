import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          <span className="text-primary-600">Tiny</span>Link
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=> isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}>Dashboard</NavLink>
        </div>
      </nav>
    </header>
  )
}
