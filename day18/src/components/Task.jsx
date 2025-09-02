import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Calendar, User, Edit2, Trash2, AlertCircle } from 'lucide-react'

const priorityColors = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
}

const labelColors = {
  bug: 'label-bug',
  feature: 'label-feature',
  improvement: 'label-improvement',
  task: 'label-task',
}

const Task = ({ task, index, onEdit, onDelete }) => {
  const priorityClass = priorityColors[task.priority] || 'border-l-4 border-gray-300'
  
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()
  
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card group ${priorityClass} ${
            snapshot.isDragging ? 'rotate-3 shadow-lg' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-gray-900 text-sm leading-tight">
              {task.content}
            </h3>
            <div className="flex space-x-1 ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit()
                }}
                className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                title="Edit task"
              >
                <Edit2 size={14} className="text-gray-500" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete task"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1 mb-3">
            {task.labels && task.labels.map((label, idx) => (
              <span
                key={idx}
                className={`label ${labelColors[label] || 'label-task'}`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              {task.assignee && (
                <div className="flex items-center space-x-1">
                  <User size={12} />
                  <span>{task.assignee}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {isOverdue && (
                <AlertCircle size={12} className="text-red-500" title="Overdue" />
              )}
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-500' : ''}`}>
                  <Calendar size={12} />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task
