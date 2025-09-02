import React from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useLocation } from '../context/LocationContext'
import { useWeather } from '../context/WeatherContext'
import L from 'leaflet'

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const WeatherMap = () => {
  const { currentLocation, favorites } = useLocation()
  const { currentWeather } = useWeather()

  // Default to New York if no location
  const defaultLocation = { lat: 40.7128, lon: -74.0060 }
  const mapCenter = currentLocation || defaultLocation

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Weather Map</h2>
        <div className="flex items-center space-x-2 text-white/70 text-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Current Location</span>
          <div className="w-3 h-3 bg-red-500 rounded-full ml-4"></div>
          <span>Favorites</span>
        </div>
      </div>

      <div className="h-full min-h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[mapCenter.lat, mapCenter.lon]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Current Location Marker */}
          {currentLocation && (
            <Marker 
              position={[currentLocation.lat, currentLocation.lon]}
              icon={L.divIcon({
                className: 'custom-marker',
                html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">📍</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">{currentLocation.name || 'Current Location'}</h3>
                  {currentWeather && (
                    <div className="mt-2">
                      <div className="text-2xl">{currentWeather.icon}</div>
                      <div className="font-semibold">{currentWeather.temperature}°</div>
                      <div className="text-sm text-gray-600">{currentWeather.condition}</div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Favorite Locations Markers */}
          {favorites.map((location, index) => (
            <Marker 
              key={location.id} 
              position={[location.lat, location.lon]}
              icon={L.divIcon({
                className: 'custom-marker',
                html: `<div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">⭐</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">{location.name}</h3>
                  <div className="mt-2">
                    <div className="text-2xl">🌤️</div>
                    <div className="font-semibold">{Math.round(Math.random() * 30 + 10)}°</div>
                    <div className="text-sm text-gray-600">
                      {['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Map Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-white/70 text-sm">
          Click markers to see weather details
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            Satellite
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            Precipitation
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherMap
