import { GripVertical, Users, ChevronDown, MapPin } from 'lucide-react'

const countries = [
  { name: 'United Kingdom', flag: '🇬🇧', pct: 78, color: '#6366f1' },
  { name: 'Nigeria', flag: '🇳🇬', pct: 67, color: '#10b981' },
  { name: 'UAE', flag: '🇦🇪', pct: 45, color: '#f59e0b' },
  { name: 'Canada', flag: '🇨🇦', pct: 59, color: '#ef4444' },
  { name: 'United States', flag: '🇺🇸', pct: 78, color: '#6366f1' },
]

function MapPlaceholder() {
  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden border border-blue-100">
      <svg viewBox="0 0 400 200" className="w-full h-full opacity-30">
        <path d="M 80 80 Q 120 60 160 80 Q 180 70 200 85 Q 220 75 250 80 Q 270 70 290 80 Q 310 90 320 80" stroke="#6366f1" strokeWidth="2" fill="none" />
        <path d="M 60 100 Q 100 90 130 100 Q 150 110 170 100" stroke="#6366f1" strokeWidth="2" fill="none" />
        <ellipse cx="150" cy="90" rx="40" ry="25" fill="#c7d2fe" />
        <ellipse cx="240" cy="85" rx="35" ry="20" fill="#a5b4fc" />
        <ellipse cx="310" cy="100" rx="25" ry="15" fill="#c7d2fe" />
        <ellipse cx="100" cy="110" rx="20" ry="12" fill="#a5b4fc" />
      </svg>
      {/* Map pins */}
      <div className="absolute top-4 left-1/4 flex flex-col items-center">
        <div className="w-5 h-5 bg-indigo-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
          <MapPin size={10} className="text-white" />
        </div>
        <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded mt-0.5 font-medium">Start Up</span>
      </div>
      <div className="absolute bottom-6 right-1/3 flex flex-col items-center">
        <div className="w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
          <MapPin size={10} className="text-white" />
        </div>
        <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded mt-0.5 font-medium">Summit</span>
      </div>
    </div>
  )
}

export default function ActiveUsersWidget({ dragHandleProps }) {
  return (
    <div className="card group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-700">Active Users</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-0.5 hover:bg-gray-50">
            Month <ChevronDown size={11} />
          </button>
          <div {...dragHandleProps} className="drag-handle">
            <GripVertical size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
       <div className="flex-1/2">
        <MapPlaceholder />
        </div>

        <div className="mt-3 space-y-2 flex-1/2">
          {countries.map(({ name, flag, pct, color }) => (
            <div key={name} className="flex items-center gap-2 border border-gray-200 rounded-md p-3">
              <span className="text-base w-5">{flag}</span>
              <span className="text-xs text-gray-600 w-36 truncate">{name}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}