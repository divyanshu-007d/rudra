import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Plus } from 'lucide-react'
import Task from './Task'

const columnColors = {
  'column-1': 'bg-red-50 border-red-200',
  'column-2': 'bg-yellow-50 border-yellow-200',
  'column-3': 'bg-blue-50 border-blue-200',
  'column-4': 'bg-green-50 border-green-200',
}

const Column = ({ column, tasks, onEditTask, onDeleteTask, onAddTask }) => {
  const colorClass = columnColors[column.id] || 'bg-gray-50 border-gray-200'

  return (
    <div className={`column min-w-[280px] ${colorClass} border-2`}>
      <div className="column-header">
        <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
          <button
            onClick={() => onAddTask(column.id)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Add task"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-3 ${
              snapshot.isDraggingOver ? 'bg-blue-100 bg-opacity-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column
