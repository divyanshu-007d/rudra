import { v4 as uuidv4 } from 'uuid'

export const generateId = () => {
  return uuidv4()
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100'
    case 'medium':
      return 'text-yellow-600 bg-yellow-100'
    case 'low':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getLabelColor = (label) => {
  switch (label) {
    case 'bug':
      return 'bg-red-100 text-red-800'
    case 'feature':
      return 'bg-blue-100 text-blue-800'
    case 'improvement':
      return 'bg-purple-100 text-purple-800'
    case 'task':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const calculateProgress = (columns) => {
  const totalTasks = Object.values(columns).reduce(
    (acc, column) => acc + column.taskIds.length,
    0
  )
  const completedTasks = columns['column-4']?.taskIds.length || 0
  
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
}

export const getTasksByStatus = (data) => {
  return {
    todo: data.columns['column-1']?.taskIds.length || 0,
    inProgress: data.columns['column-2']?.taskIds.length || 0,
    review: data.columns['column-3']?.taskIds.length || 0,
    done: data.columns['column-4']?.taskIds.length || 0,
  }
}

export const getOverdueTasks = (tasks) => {
  return Object.values(tasks).filter(task => isOverdue(task.dueDate))
}

export const getTasksByPriority = (tasks) => {
  return Object.values(tasks).reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1
    return acc
  }, { high: 0, medium: 0, low: 0 })
}
