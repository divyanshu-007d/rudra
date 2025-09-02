import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

const WeatherChart = () => {
  // Mock hourly data for demonstration
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    temperature: Math.round(Math.random() * 25 + 10),
    precipitation: Math.round(Math.random() * 100)
  }))

  const maxTemp = Math.max(...hourlyData.map(d => d.temperature))
  const minTemp = Math.min(...hourlyData.map(d => d.temperature))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">24-Hour Forecast</h2>
      </div>

      {/* Temperature Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Temperature (°C)</h3>
        <div className="relative h-32 bg-white/5 rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            {hourlyData.slice(0, 12).map((data, index) => {
              const height = ((data.temperature - minTemp) / (maxTemp - minTemp)) * 100
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-white/70 mb-2">{data.temperature}°</div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.05 }}
                    className="w-3 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                    style={{ minHeight: '4px' }}
                  />
                  <div className="text-xs text-white/60 mt-2">
                    {data.hour.toString().padStart(2, '0')}:00
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Precipitation Chart */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Precipitation (%)</h3>
        <div className="relative h-32 bg-white/5 rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            {hourlyData.slice(0, 12).map((data, index) => {
              const height = data.precipitation
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-white/70 mb-2">{data.precipitation}%</div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.05 }}
                    className="w-3 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                    style={{ minHeight: '4px' }}
                  />
                  <div className="text-xs text-white/60 mt-2">
                    {data.hour.toString().padStart(2, '0')}:00
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded"></div>
          <span className="text-white/70">Temperature</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-t from-cyan-500 to-blue-500 rounded"></div>
          <span className="text-white/70">Precipitation</span>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherChart
