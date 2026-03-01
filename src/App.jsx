// import { Sidebar } from './components/Sidebar'
import Topbar from './components/Topbar'
import DashboardGrid from './components/DashboardGrid'
import Sidebar from './components/Sidebar'
import { Globe } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <Topbar />

      {/* Main Content */}
      <main className="ml-52 pt-10">
        <div className="p-2 ">
          
          <div className="flex my-5 bg-white rounded-xl p-5 text-black border-2 border-gray-100 shadow-md">
            <Globe size={16} className="mr-3" />
            <span className='font-semibold' >Cloud Network</span>
          </div>

          <DashboardGrid />
        </div>
      </main>
    </div>
  )
}