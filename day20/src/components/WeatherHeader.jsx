import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Cloud, BarChart3, Menu, X } from 'lucide-react'
import { useLocation } from '../context/LocationContext'

const WeatherHeader = ({ currentView, setCurrentView }) => {
  const { searchLocation, addToSearchHistory, getCurrentLocation, setCurrentLocation } = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Cloud },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'charts', label: 'Charts', icon: BarChart3 }
  ]

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const results = await searchLocation(searchQuery)
    setSearchResults(results)
    setShowSearchResults(true)
  }

  const handleLocationSelect = (location) => {
    setCurrentLocation(location)
    addToSearchHistory(location)
    setSearchQuery('')
    setShowSearchResults(false)
  }

  const handleGetCurrentLocation = async () => {
    try {
      await getCurrentLocation()
    } catch (error) {
      console.error('Error getting current location:', error)
    }
  }

  return (
    <header className="glass-card mx-4 mt-4 mb-6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">WeatherApp</h1>
              <p className="text-xs text-white/70">Live weather updates</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:block relative">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search location..."
                  className="w-64 bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="absolute right-12 text-white/60 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="absolute right-3 text-white/60 hover:text-white transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{result.name}</span>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/20"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search location..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="grid grid-cols-3 gap-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setCurrentView(id)
                    setIsMenuOpen(false)
                  }}
                  className={`flex flex-col items-center space-y-1 p-3 rounded-lg font-medium transition-all ${
                    currentView === id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default WeatherHeader
