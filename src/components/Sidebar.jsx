import {
  LayoutDashboard, Building2, BarChart2, CreditCard,
  User, HardDrive, Settings, Monitor, FileText,
  Users, HeadphonesIcon, GripVertical
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Building2, label: 'Organization & Reg.' },
  { icon: BarChart2, label: 'Reporting' },
  { icon: CreditCard, label: 'Billing' },
  { icon: User, label: 'Account' },
  { icon: HardDrive, label: 'Storage' },
  { icon: Settings, label: 'Settings' },
  { icon: Monitor, label: 'Device Management' },
  { icon: FileText, label: 'Productivity Report' },
]

const bottomItems = [
  { icon: Users, label: 'User Panel' },
  { icon: HeadphonesIcon, label: 'Support' },
]

export default function Sidebar() {
  return (
    <aside className="w-52 min-h-screen bg-white border-r border-gray-100 flex flex-col py-4 fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <GripVertical size={14} className="text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">Snaarp</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
              active
                ? 'bg-indigo-50 text-indigo-600 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-100 my-3 mx-4" />

      {/* Bottom Nav */}
      <div className="px-2 space-y-0.5">
        {bottomItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* User */}
      <div className="px-3 mt-3">
        <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            C
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-800 truncate">Chidinma Snaarp</p>
            <p className="text-[10px] text-gray-400 truncate">chidinma@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}