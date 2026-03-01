import { Activity, Clock, Calendar, Users, Globe, TrendingDown, GripVertical, Zap } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

const downData = [{ v: 60 }, { v: 50 }, { v: 45 }, { v: 30 }, { v: 35 }, { v: 25 }, { v: 20 }]

function MiniStat({ icon: Icon, label, value, change }) {
  return (
    <div className="p-3 rounded-xl bg-gray-50">
      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
        <Icon size={12} />
        <span className="text-[10px]">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
          <p className="text-[9px] text-gray-400">Compared to last week</p>
        </div>
        <div className="w-14 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={downData}>
              <defs>
                <linearGradient id={`pg-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#ef4444" strokeWidth={1.5} fill={`url(#pg-${label})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="badge-down"><TrendingDown size={10} /><span>{change}</span></div>
    </div>
  )
}

export default function ProductivityReportWidget({ dragHandleProps }) {
  return (
    <div className="">
      <div className="flex justify-between my-5 bg-white rounded-xl p-5 text-black border-2 border-gray-100 shadow-md">
        <div className='flex' >
    <Activity size={16} className="mr-3" />
        <span className='font-semibold' >Productivity Report</span>
        </div>
        <div className='flex' >
           <button className="flex items-center gap-1.5 text-xs font-medium bg-indigo-600 text-white px-3 py-1.5 rounded-xl hover:bg-indigo-700 transition-colors">
              <Zap size={11} /> Upgrade Plan
            </button>
             <div {...dragHandleProps} className="drag-handle">
              <GripVertical size={16} className="text-gray-400" />
            </div>
        </div>
        
      </div>
      <div className="card group">
          

      <div className="grid grid-cols-4 gap-3">
        <MiniStat icon={Clock} label="Hours Productivity" value="576 Hrs" change="15%" />
        <MiniStat icon={Calendar} label="Days Activity" value="267 Days" change="15%" />
        <MiniStat icon={Users} label="Users" value="3,836" change="15%" />
        <MiniStat icon={Globe} label="Web Activity" value="178 Activities" change="15%" />
      </div>
      </div>
    </div>
  )
}