import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Trash2, Navigation } from 'lucide-react'
import { useLocation } from '../context/LocationContext'
import { useWeather } from '../context/WeatherContext'

const FavoriteLocations = () => {
  const { favorites, removeFromFavorites, setCurrentLocation } = useLocation()
  const { searchWeather } = useWeather()

  const handleLocationClick = async (location) => {
    setCurrentLocation(location)
    await searchWeather(location.lat, location.lon, location.name)
  }

  const handleRemoveFavorite = (e, id) => {
    e.stopPropagation()
    removeFromFavorites(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 h-fit"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Heart className="w-6 h-6 text-red-400" />
        <h2 className="text-xl font-semibold text-white">Favorite Locations</h2>
      </div>

      <div className="space-y-3">
        {favorites.length > 0 ? (
          favorites.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLocationClick(location)}
              className="group bg-white/10 hover:bg-white/20 rounded-lg p-4 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-white/60" />
                  <div>
                    <h3 className="text-white font-medium">{location.name}</h3>
                    <p className="text-white/60 text-sm">
                      {Math.round(Math.random() * 30 + 10)}° • {['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLocationClick(location)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-white/60 hover:text-white transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleRemoveFavorite(e, location.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              {/* Weather snippet */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-2xl">
                  {['☀️', '⛅', '🌧️'][Math.floor(Math.random() * 3)]}
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {Math.round(Math.random() * 30 + 10)}°
                  </div>
                  <div className="text-white/60 text-xs">
                    H:{Math.round(Math.random() * 35 + 15)}° L:{Math.round(Math.random() * 15 + 5)}°
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70">No favorite locations yet</p>
            <p className="text-white/50 text-sm mt-2">
              Search for locations to add them to favorites
            </p>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-lg font-medium transition-all"
      >
        Add New Location
      </motion.button>
    </motion.div>
  )
}

export default FavoriteLocations
