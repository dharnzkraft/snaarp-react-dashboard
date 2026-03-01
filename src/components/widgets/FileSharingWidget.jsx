import { GripVertical, Share2, ChevronDown, BarChart2, LineChart as LineChartIcon } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { month: 'JAN', public: 60, anyone: 40, within: 20 },
  { month: 'FEB', public: 75, anyone: 50, within: 30 },
  { month: 'MAR', public: 65, anyone: 35, within: 25 },
  { month: 'APR', public: 80, anyone: 55, within: 40 },
  { month: 'MAY', public: 95, anyone: 60, within: 45 },
  { month: 'JUN', public: 90, anyone: 70, within: 50 },
  { month: 'JUL', public: 85, anyone: 65, within: 38 },
  { month: 'AUG', public: 78, anyone: 58, within: 42 },
  { month: 'SEP', public: 70, anyone: 48, within: 35 },
  { month: 'OCT', public: 68, anyone: 45, within: 30 },
  { month: 'NOV', public: 72, anyone: 50, within: 32 },
  { month: 'DEC', public: 65, anyone: 42, within: 28 },
]

export default function FileSharingWidget({ dragHandleProps }) {
  return (
    <div className="card group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Share2 size={14} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-700">File Sharing</h2>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 size={14} className="text-indigo-400 cursor-pointer" />
          <LineChartIcon size={14} className="text-gray-300 cursor-pointer" />
          <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-0.5 hover:bg-gray-50">
            Month <ChevronDown size={11} />
          </button>
          <div {...dragHandleProps} className="drag-handle">
            <GripVertical size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mb-3">Keep track of files and how they're shared</p>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={8} barGap={2}>
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={25} />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          />
          <Bar dataKey="public" name="Public" fill="#4f46e5" radius={[3, 3, 0, 0]} />
          <Bar dataKey="anyone" name="Anyone with link" fill="#818cf8" radius={[3, 3, 0, 0]} />
          <Bar dataKey="within" name="Within Organisation" fill="#c7d2fe" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2">
        {[
          { color: '#4f46e5', label: 'Public' },
          { color: '#818cf8', label: 'Anyone with link' },
          { color: '#c7d2fe', label: 'Within Organisation' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}