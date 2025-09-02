import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WeatherHeader from './components/WeatherHeader'
import CurrentWeather from './components/CurrentWeather'
import WeatherMap from './components/WeatherMap'
import ForecastCards from './components/ForecastCards'
import WeatherChart from './components/WeatherChart'
import FavoriteLocations from './components/FavoriteLocations'
import { WeatherProvider } from './context/WeatherContext'
import { LocationProvider } from './context/LocationContext'

function App() {
  const [currentView, setCurrentView] = useState('overview')

  return (
    <LocationProvider>
      <WeatherProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
          <WeatherHeader currentView={currentView} setCurrentView={setCurrentView} />
          
          <main className="container mx-auto px-4 py-6">
            {currentView === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Current Weather */}
                <div className="lg:col-span-2">
                  <CurrentWeather />
                </div>
                
                {/* Favorite Locations */}
                <div>
                  <FavoriteLocations />
                </div>
                
                {/* Forecast Cards */}
                <div className="lg:col-span-3">
                  <ForecastCards />
                </div>
              </motion.div>
            )}
            
            {currentView === 'map' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="h-[calc(100vh-12rem)]"
              >
                <WeatherMap />
              </motion.div>
            )}
            
            {currentView === 'charts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <WeatherChart />
              </motion.div>
            )}
          </main>
        </div>
      </WeatherProvider>
    </LocationProvider>
  )
}

export default App
