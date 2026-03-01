import { Search, Bell, Clipboard } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 fixed top-0 left-52 right-0 z-10">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for users, groups or settings"
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="relative bg-gray-200 p-2 rounded-xl">
          <Bell size={18} className="text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors" />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 bg-gray-200 p-3 rounded-xl transition-all">
         
          <div>
            <p className="text-xs font-medium text-gray-700">Agent Code: <span className='text-blue-400' >G385o2j37742y3b38</span></p>
            
          </div>
          <Clipboard size={13} className="text-gray-400" />
        </div>
      </div>
    </header>
  )
}