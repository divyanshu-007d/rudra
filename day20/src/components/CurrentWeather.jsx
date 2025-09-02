import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Thermometer, Droplets, Wind, Eye, Sun, Gauge } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'
import { useLocation } from '../context/LocationContext'

const CurrentWeather = () => {
  const { currentWeather, loading, error } = useWeather()
  const { currentLocation, getCurrentLocation } = useLocation()

  useEffect(() => {
    if (!currentLocation) {
      getCurrentLocation().catch(console.error)
    }
  }, [currentLocation, getCurrentLocation])

  if (loading) {
    return (
      <div className="glass-card p-6 h-96">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="h-32 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
            <div className="h-16 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-6 h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold mb-2">Weather data unavailable</p>
          <p className="text-white/70">{error}</p>
        </div>
      </div>
    )
  }

  if (!currentWeather) {
    return (
      <div className="glass-card p-6 h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-white/50" />
          <p className="text-lg font-semibold mb-2">No location selected</p>
          <p className="text-white/70">Enable location or search for a city</p>
        </div>
      </div>
    )
  }

  const weatherDetails = [
    { label: 'Feels like', value: `${currentWeather.feelsLike}°`, icon: Thermometer },
    { label: 'Humidity', value: `${currentWeather.humidity}%`, icon: Droplets },
    { label: 'Wind', value: `${currentWeather.windSpeed} km/h`, icon: Wind },
    { label: 'Visibility', value: `${currentWeather.visibility} km`, icon: Eye },
    { label: 'Pressure', value: `${currentWeather.pressure} hPa`, icon: Gauge },
    { label: 'UV Index', value: currentWeather.uvIndex, icon: Sun }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      {/* Current Weather Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-white">
          <MapPin className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{currentWeather.location}</h2>
        </div>
        <div className="text-white/70 text-sm">
          Now • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">{currentWeather.icon}</div>
        <div className="text-6xl font-light text-white mb-2">
          {currentWeather.temperature}°
        </div>
        <div className="text-xl text-white/80 mb-4">
          {currentWeather.condition}
        </div>
        
        {/* Sunrise/Sunset */}
        <div className="flex justify-center space-x-8 text-white/70">
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4" />
            <span className="text-sm">Sunrise {currentWeather.sunrise}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4" />
            <span className="text-sm">Sunset {currentWeather.sunset}</span>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {weatherDetails.map(({ label, value, icon: Icon }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 rounded-lg p-4 text-center"
          >
            <Icon className="w-6 h-6 text-white/60 mx-auto mb-2" />
            <div className="text-lg font-semibold text-white">{value}</div>
            <div className="text-xs text-white/60">{label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CurrentWeather
