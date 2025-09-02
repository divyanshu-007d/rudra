import React, { createContext, useContext, useState, useCallback } from 'react'

const LocationContext = createContext()

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'New York', lat: 40.7128, lon: -74.0060 },
    { id: 2, name: 'London', lat: 51.5074, lon: -0.1278 },
    { id: 3, name: 'Tokyo', lat: 35.6762, lon: 139.6503 }
  ])
  const [searchHistory, setSearchHistory] = useState([])

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Current Location'
          }
          setCurrentLocation(location)
          resolve(location)
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    })
  }, [])

  const searchLocation = useCallback(async (query) => {
    try {
      // Mock search results - in real app, use geocoding API
      const mockResults = [
        { name: 'San Francisco, CA', lat: 37.7749, lon: -122.4194 },
        { name: 'Los Angeles, CA', lat: 34.0522, lon: -118.2437 },
        { name: 'Chicago, IL', lat: 41.8781, lon: -87.6298 },
        { name: 'Miami, FL', lat: 25.7617, lon: -80.1918 }
      ].filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()))

      return mockResults
    } catch (error) {
      console.error('Error searching location:', error)
      return []
    }
  }, [])

  const addToFavorites = useCallback((location) => {
    const newFavorite = {
      id: Date.now(),
      name: location.name,
      lat: location.lat,
      lon: location.lon
    }
    setFavorites(prev => [...prev, newFavorite])
  }, [])

  const removeFromFavorites = useCallback((id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id))
  }, [])

  const addToSearchHistory = useCallback((location) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.name !== location.name)
      return [location, ...filtered].slice(0, 10) // Keep last 10 searches
    })
  }, [])

  const value = {
    currentLocation,
    favorites,
    searchHistory,
    getCurrentLocation,
    searchLocation,
    addToFavorites,
    removeFromFavorites,
    addToSearchHistory,
    setCurrentLocation
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
