import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main${sidebarOpen ? '' : ' main--expanded'}`}>
        <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        {children}
      </div>
    </div>
  )
}
