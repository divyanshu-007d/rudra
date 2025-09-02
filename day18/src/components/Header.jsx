import React from 'react'
import { Plus, Users, BarChart3, Bell } from 'lucide-react'

const Header = ({ data, onAddTask }) => {
  const totalTasks = Object.keys(data.tasks).length
  const completedTasks = data.columns['column-4'].taskIds.length
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">TaskBoard</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <BarChart3 size={16} />
              <span>Progress: {progress}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{completedTasks}/{totalTasks} Tasks</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2">
            <Users size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">Team: 6 members</span>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={18} className="text-gray-600" />
          </button>
          
          <button
            onClick={onAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
