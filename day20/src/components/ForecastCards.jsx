import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Thermometer, Droplets } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'

const ForecastCards = () => {
  const { forecast, loading } = useWeather()

  if (loading || !forecast.length) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">5-Day Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white/10 rounded-lg p-4 h-32"></div>
          ))}
        </div>
      </div>
    )
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">5-Day Forecast</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-all cursor-pointer"
          >
            <div className="text-white/70 text-sm font-medium mb-2">
              {index === 0 ? 'Today' : formatDate(day.date)}
            </div>
            
            <div className="text-3xl mb-3">{day.icon}</div>
            
            <div className="space-y-2">
              <div className="text-white">
                <span className="text-lg font-semibold">{day.temperature.max}°</span>
                <span className="text-white/60 text-sm ml-1">{day.temperature.min}°</span>
              </div>
              
              <div className="text-white/80 text-sm">{day.condition}</div>
              
              <div className="flex items-center justify-center space-x-4 text-white/60 text-xs">
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3" />
                  <span>{day.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.7 7.7l-4.7 4.7-4.7-4.7"></path>
                  </svg>
                  <span>{day.windSpeed}km/h</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ForecastCards
