import React from 'react'
import Column from './Column'

const Board = ({ data, onEditTask, onDeleteTask, onAddTask }) => {
  return (
    <div className="flex-1 p-6">
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onAddTask={onAddTask}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Board
