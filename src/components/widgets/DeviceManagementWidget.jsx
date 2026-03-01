import { Monitor, Users, Mail, AppWindow, TrendingDown, TrendingUp, GripVertical, Zap, Globe, LayoutDashboard } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import DashboardGrid from '../DashboardGrid'

const upData = [{ v: 20 }, { v: 35 }, { v: 25 }, { v: 50 }, { v: 40 }, { v: 60 }, { v: 55 }]
const downData = [{ v: 60 }, { v: 50 }, { v: 45 }, { v: 30 }, { v: 35 }, { v: 25 }, { v: 20 }]

function MiniChart({ up }) {
  return (
    <div className="w-16 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={up ? upData : downData}>
          <defs>
            <linearGradient id={up ? 'ug' : 'dg'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={up ? '#10b981' : '#ef4444'} stopOpacity={0.2} />
              <stop offset="95%" stopColor={up ? '#10b981' : '#ef4444'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={up ? '#10b981' : '#ef4444'} strokeWidth={1.5} fill={`url(#${up ? 'ug' : 'dg'})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function StatBox({ icon: Icon, label, value, change, up }) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-1.5 text-gray-500">
        <Icon size={12} />
        <span className="text-[10px]">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
          <p className="text-[9px] text-gray-400">Compared to last week</p>
        </div>
        <MiniChart up={up} />
      </div>
      <div className={up ? 'badge-up' : 'badge-down'}>
        {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        <span>{change}</span>
      </div>
    </div>
  )
}

export default function DeviceManagementWidget({ dragHandleProps }) {
  return (
    <div >
      <div className="flex justify-between my-5 bg-white rounded-xl p-5 text-black border-2 border-gray-100 shadow-md">
        <div className='flex' >
    <LayoutDashboard size={16} className="mr-3" />
        <span className='font-semibold' >Device Management Dashboard</span>
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
      <div className="card group" >
       

        {/* Top stat boxes */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatBox icon={Monitor} label="Number Of Devices" value="3,836" change="15%" up={true} />
          <StatBox icon={Users} label="Users" value="3,836" change="15%" up={false} />
          <StatBox icon={Mail} label="Emails" value="316" change="23%" up={true} />
          <StatBox icon={AppWindow} label="Number of Apps" value="316" change="23%" up={false} />
        </div>

        {/* Sub-stats row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Devices */}
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-[10px] text-gray-400">Plugged</p>
                <p className="text-base font-semibold text-gray-800">1,923</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Unplugged</p>
                <p className="text-base font-semibold text-gray-800">1,913</p>
              </div>
            </div>
            <div className="flex gap-3 text-[9px] text-gray-500 flex-wrap">
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-sm" /> <span>Windows 1,403</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-700 rounded-sm" /> <span>Mac 632</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-400 rounded-sm" /> <span>Linux 1,801</span></div>
            </div>
          </div>

          {/* Users */}
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-[10px] text-gray-400">Active</p>
                <p className="text-base font-semibold text-emerald-600">592</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Offline</p>
                <p className="text-base font-semibold text-red-500">3,836</p>
              </div>
            </div>
            <div className="flex gap-3 text-[9px] text-gray-500 flex-wrap">
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-indigo-500 rounded-sm" /> <span>Orgs 1,403</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-pink-400 rounded-sm" /> <span>Depts 632</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-cyan-400 rounded-sm" /> <span>Groups 1,801</span></div>
            </div>
          </div>

          {/* Emails + Downloads */}
          <div className="flex flex-col gap-2">
            <div className="p-3 rounded-xl bg-gray-50 flex justify-between">
              <div>
                <p className="text-[10px] text-gray-400">Sent</p>
                <p className="text-base font-semibold text-gray-800">592</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Received</p>
                <p className="text-base font-semibold text-gray-800">3,836</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                <AppWindow size={11} />
                <span className="text-[10px]">Number of Downloads</span>
              </div>
              <p className="text-base font-semibold text-gray-800">316</p>
              <div className="badge-up mt-0.5"><TrendingUp size={10} /><span>20%</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}