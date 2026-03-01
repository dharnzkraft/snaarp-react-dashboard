import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import CloudNetworkWidget from './widgets/CloudNetworkWidget'
import FileSharingWidget from './widgets/FileSharingWidget'
import ActiveUsersWidget from './widgets/ActiveUsersWidget'
import DeviceManagementWidget from './widgets/DeviceManagementWidget'
import ProductivityReportWidget from './widgets/ProductivityReportWidget'
import EmailChartWidget from './widgets/EmailChartWidget'


const WIDGET_COMPONENTS = {
  'cloud-network': CloudNetworkWidget,
  'file-sharing-active': null, 
  'device-management': DeviceManagementWidget,
  'productivity-report': ProductivityReportWidget,
  'email-chart': EmailChartWidget,
}

const INITIAL_WIDGET_ORDER = [
  'cloud-network',
  'file-sharing-active',
  'device-management',
  'productivity-report',
  'email-chart',
  'online-users',
]

export default function DashboardGrid() {
  const [widgetOrder, setWidgetOrder] = useState(INITIAL_WIDGET_ORDER)
  const [draggingId, setDraggingId] = useState(null)

  function handleDragEnd(result) {
    setDraggingId(null)
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    // @ts-ignore
    const newOrder = Array.from(widgetOrder)
    const [removed] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, removed)
    setWidgetOrder(newOrder)
  }

  function handleDragStart(start) {
    setDraggingId(start.draggableId)
  }

  function renderWidget(id, dragHandleProps) {
    // Two-column composite widgets
    if (id === 'file-sharing-active') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <FileSharingWidget dragHandleProps={dragHandleProps} />
          <ActiveUsersWidget dragHandleProps={null} />
        </div>
      )
    }

    const Component = WIDGET_COMPONENTS[id]
    if (!Component) return null
    return <Component dragHandleProps={dragHandleProps} />
  }

  return (
    <div>

      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="dashboard-grid">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-4 transition-all ${snapshot.isDraggingOver ? 'bg-indigo-50/30 rounded-2xl p-2 -m-2' : ''}`}
            >
              {widgetOrder.map((widgetId, index) => (
                <Draggable key={widgetId} draggableId={widgetId} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-shadow rounded-2xl ${
                        snapshot.isDragging
                          ? 'shadow-2xl ring-2 ring-indigo-300 ring-opacity-70 opacity-95'
                          : ''
                      }`}
                      style={provided.draggableProps.style}
                    >
                      {renderWidget(widgetId, provided.dragHandleProps)}
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
  )
}