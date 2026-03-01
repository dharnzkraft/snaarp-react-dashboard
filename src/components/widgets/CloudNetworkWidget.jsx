import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Users, Layers, Upload, Building2, TrendingUp, TrendingDown, GripVertical, AlertCircle, Zap } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

const miniData = [
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 50 }, { v: 40 }, { v: 60 }, { v: 55 },
]

function StatCard({ icon: Icon, label, value, change, positive, dragHandleProps }) {
  return (
    <div className="card group flex flex-col gap-1 relative">
      <div
        {...dragHandleProps}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={13} className="text-gray-400" />
      </div>

      <div className="flex items-center gap-1.5 text-gray-500">
        <Icon size={13} />
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex items-end gap-3">
        <div>
          <p className="stat-value">{value}</p>
          <p className="stat-label">Compared to last week</p>
        </div>
        <div className="flex-1 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={miniData}>
              <defs>
                <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={positive ? '#10b981' : '#ef4444'} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={positive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={positive ? '#10b981' : '#ef4444'}
                strokeWidth={1.5}
                fill={`url(#grad-${label})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={positive ? 'badge-up' : 'badge-down'}>
        {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        <span>{change}</span>
      </div>
    </div>
  )
}

const INITIAL_CARDS = [
  { id: 'users', icon: Users, label: 'Users', value: '3,836', change: '15%', positive: false },
  { id: 'groups', icon: Layers, label: 'Groups', value: '316', change: '23%', positive: true },
  { id: 'uploads', icon: Upload, label: 'Uploads', value: '316', change: '23%', positive: true },
  { id: 'departments', icon: Building2, label: 'Departments', value: '316', change: '23%', positive: false },
]

const STORAGE_SEGMENTS = [
  { label: 'Files', color: '#6366f1', pct: 25 },
  { label: 'Folders', color: '#fbbf24', pct: 15 },
  { label: 'Videos', color: '#34d399', pct: 20 },
  { label: 'Apps', color: '#60a5fa', pct: 10 },
  { label: 'Audios', color: '#f472b6', pct: 5 },
  { label: 'Miscellaneous', color: '#94a3b8', pct: 5 },
  { label: 'Available Space', color: '#e2e8f0', pct: 20 },
]

function DonutChart() {
  const total = STORAGE_SEGMENTS.reduce((s, seg) => s + seg.pct, 0)
  let cumulative = 0
  const r = 40, cx = 50, cy = 50
  const toRad = (deg) => (deg * Math.PI) / 180

  const segments = STORAGE_SEGMENTS.map((seg) => {
    const startAngle = (cumulative / total) * 360 - 90
    cumulative += seg.pct
    const endAngle = (cumulative / total) * 360 - 90
    const x1 = cx + r * Math.cos(toRad(startAngle))
    const y1 = cy + r * Math.sin(toRad(startAngle))
    const x2 = cx + r * Math.cos(toRad(endAngle))
    const y2 = cy + r * Math.sin(toRad(endAngle))
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return { ...seg, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z` }
  })

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {segments.map((seg) => (
        <path key={seg.label} d={seg.d} fill={seg.color} opacity={0.85} />
      ))}
      <circle cx={cx} cy={cy} r={22} fill="white" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">80%</text>
      <text x={cx} y={cy + 7} textAnchor="middle" fontSize="6" fill="#94a3b8">Used</text>
    </svg>
  )
}

export default function CloudNetworkWidget({ dragHandleProps }) {
  const [cards, setCards] = useState(INITIAL_CARDS)

  function handleDragEnd(result) {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return
    // @ts-ignore
    const reordered = Array.from(cards)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    setCards(reordered)
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
       
        <div
          {...dragHandleProps}
          className="opacity-0 group-hover:opacity-40 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="cloud-stat-cards" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`grid grid-cols-2 gap-3 transition-all rounded-xl ${snapshot.isDraggingOver ? 'bg-indigo-50/50 p-1' : ''
                    }`}
                >
                  {cards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`rounded-2xl transition-all ${snapshot.isDragging
                            ? 'shadow-xl ring-2 ring-indigo-300/60 rotate-1 scale-105 z-50'
                            : ''
                            }`}
                          style={provided.draggableProps.style}
                        >
                          <StatCard
                            {...card}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Storage panel */}
        <div className="flex  gap-3 card group col-span-2">
          <div className='flex-1/3' >
            <div className="relative w-50 h-50 mx-auto">
              <DonutChart />
            </div>

          </div>
          <div className="flex-2/3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 text-[10px] text-yellow-700">
              <div className="flex items-center gap-1 font-medium mb-0.5">
                <AlertCircle size={10} />
                Note
              </div>
              You've almost reached your limit. You've used 80% of storage.
            </div>
            <div className='grid grid-cols-2 gap-x-2 gap-y-1 mt-5'>
              {STORAGE_SEGMENTS.filter(s => s.label !== 'Available Space').map((seg) => (
                <div key={seg.label} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-[9px] text-gray-500 truncate">{seg.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm inline-block flex-shrink-0 bg-slate-200" />
              <span className="text-[9px] text-gray-500">Available Space</span>
            </div>
            <button className="w-1/3 mt-5 py-3 text-xs font-medium bg-white text-indigo-700 border border-1 border-indigo-700 rounded-xl hover:bg-indigo-700 transition-colors flex items-end justify-center gap-1">
              <Zap size={11} />
              Upgrade Plan
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}