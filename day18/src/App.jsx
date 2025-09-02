import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Board from './components/Board'
import Header from './components/Header'
import TaskModal from './components/TaskModal'
import { useSocket } from './hooks/useSocket'
import { generateId } from './utils/helpers'

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design system architecture', priority: 'high', labels: ['feature'], assignee: 'John Doe', dueDate: '2024-12-10' },
    'task-2': { id: 'task-2', content: 'Implement user authentication', priority: 'high', labels: ['feature'], assignee: 'Jane Smith', dueDate: '2024-12-15' },
    'task-3': { id: 'task-3', content: 'Create landing page', priority: 'medium', labels: ['task'], assignee: 'Mike Johnson', dueDate: '2024-12-20' },
    'task-4': { id: 'task-4', content: 'Fix responsive design issues', priority: 'medium', labels: ['bug'], assignee: 'Sarah Wilson', dueDate: '2024-12-12' },
    'task-5': { id: 'task-5', content: 'Add dark mode toggle', priority: 'low', labels: ['improvement'], assignee: 'Alex Brown', dueDate: '2024-12-25' },
    'task-6': { id: 'task-6', content: 'Optimize database queries', priority: 'high', labels: ['improvement'], assignee: 'Chris Davis', dueDate: '2024-12-18' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Review',
      taskIds: ['task-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: ['task-6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
}

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('taskboard-data')
    return savedData ? JSON.parse(savedData) : initialData
  })
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)

  const socket = useSocket()

  useEffect(() => {
    localStorage.setItem('taskboard-data', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    if (socket) {
      socket.on('taskUpdated', (updatedData) => {
        setData(updatedData)
      })

      return () => {
        socket.off('taskUpdated')
      }
    }
  }, [socket])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      }

      setData(newData)
      
      if (socket) {
        socket.emit('updateTasks', newData)
      }
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }

    setData(newData)
    
    if (socket) {
      socket.emit('updateTasks', newData)
    }
  }

  const addTask = (taskData) => {
    const newTaskId = generateId()
    const newTask = {
      id: newTaskId,
      content: taskData.content,
      priority: taskData.priority || 'medium',
      labels: taskData.labels || [],
      assignee: taskData.assignee || '',
      dueDate: taskData.dueDate || '',
      description: taskData.description || '',
    }

    const columnId = selectedColumn || 'column-1'
    const column = data.columns[columnId]
    const newTaskIds = [...column.taskIds, newTaskId]

    const newData = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    }

    setData(newData)
    
    if (socket) {
      socket.emit('updateTasks', newData)
    }
  }

  const updateTask = (taskId, taskData) => {
    const newData = {
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: {
          ...data.tasks[taskId],
          ...taskData,
        },
      },
    }

    setData(newData)
    
    if (socket) {
      socket.emit('updateTasks', newData)
    }
  }

  const deleteTask = (taskId) => {
    const newTasks = { ...data.tasks }
    delete newTasks[taskId]

    const newColumns = { ...data.columns }
    Object.keys(newColumns).forEach(columnId => {
      newColumns[columnId] = {
        ...newColumns[columnId],
        taskIds: newColumns[columnId].taskIds.filter(id => id !== taskId)
      }
    })

    const newData = {
      ...data,
      tasks: newTasks,
      columns: newColumns,
    }

    setData(newData)
    
    if (socket) {
      socket.emit('updateTasks', newData)
    }
  }

  const openTaskModal = (columnId = null, task = null) => {
    setSelectedColumn(columnId)
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const closeTaskModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
    setSelectedColumn(null)
  }

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
    } else {
      addTask(taskData)
    }
    closeTaskModal()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        data={data}
        onAddTask={() => openTaskModal()}
      />
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Board 
          data={data}
          onEditTask={(task) => openTaskModal(null, task)}
          onDeleteTask={deleteTask}
          onAddTask={(columnId) => openTaskModal(columnId)}
        />
      </DragDropContext>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onSubmit={handleTaskSubmit}
        task={editingTask}
        columns={data.columns}
      />
    </div>
  )
}

export default App
