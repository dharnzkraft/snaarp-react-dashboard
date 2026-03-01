import { Mail, GripVertical, BarChart2, TrendingUp, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { AreaChart, Area, XAxis, YAxis } from 'recharts'

const pieData = [
  { name: 'Sent', value: 3200, color: '#f59e0b' },
  { name: 'Received', value: 1800, color: '#6366f1' },
  { name: 'Unsent', value: 421, color: '#e2e8f0' },
]

const lineData = [
  { month: 'JAN', sent: 1000, received: 800, unsent: 100 },
  { month: 'FEB', sent: 2000, received: 1500, unsent: 200 },
  { month: 'MARCH', sent: 1500, received: 1200, unsent: 150 },
  { month: 'APR', sent: 3000, received: 2500, unsent: 300 },
  { month: 'MAY', sent: 2500, received: 2000, unsent: 250 },
  { month: 'JUN', sent: 4000, received: 3500, unsent: 400 },
  { month: 'JUL', sent: 3500, received: 3000, unsent: 350 },
  { month: 'AUG', sent: 2800, received: 2200, unsent: 280 },
  { month: 'SEP', sent: 2000, received: 1600, unsent: 200 },
  { month: 'OCT', sent: 2200, received: 1800, unsent: 220 },
  { month: 'NOV', sent: 2600, received: 2100, unsent: 260 },
  { month: 'DEC', sent: 3000, received: 2400, unsent: 300 },
]

export default function EmailChartWidget({ dragHandleProps }) {
  return (
    <div className="card group">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-indigo-500" />
              <h2 className="text-sm font-semibold text-gray-700">Email Chart</h2>
            </div>
            <div {...dragHandleProps} className="drag-handle">
              <GripVertical size={16} className="text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={38} outerRadius={58} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] text-gray-400 text-center leading-tight">Emails<br/>Chart</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              {pieData.map(({ name, color }) => (
                <div key={name} className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-gray-500">{name}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Emails Sent</p>
              <p className="text-lg font-bold text-gray-800">5,421</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-indigo-500" />
              <h2 className="text-sm font-semibold text-gray-700">Total Email</h2>
            </div>
            <div className="flex items-center gap-1">
              <BarChart2 size={13} className="text-indigo-400" />
              <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-0.5">
                Month <ChevronDown size={11} />
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="sent-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="recv-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
              <Area type="monotone" dataKey="sent" name="Sent" stroke="#f59e0b" strokeWidth={1.5} fill="url(#sent-g)" dot={false} />
              <Area type="monotone" dataKey="received" name="Received" stroke="#6366f1" strokeWidth={1.5} fill="url(#recv-g)" dot={false} />
              <Area type="monotone" dataKey="unsent" name="Unsent" stroke="#94a3b8" strokeWidth={1} fill="none" dot={false} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}