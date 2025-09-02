import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from './LocationContext'

const WeatherContext = createContext()

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}

export const WeatherProvider = ({ children }) => {
  const { currentLocation } = useLocation()
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mock API key - in production, use environment variable
  const API_KEY = 'your_openweather_api_key_here'

  const fetchWeatherData = useCallback(async (lat, lon, locationName) => {
    if (!lat || !lon) return

    setLoading(true)
    setError(null)

    try {
      // Mock weather data since we don't have a real API key
      const mockCurrentWeather = {
        location: locationName || 'Current Location',
        temperature: Math.round(Math.random() * 30 + 10), // 10-40°C
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Partly Cloudy'][Math.floor(Math.random() * 5)],
        humidity: Math.round(Math.random() * 40 + 30), // 30-70%
        windSpeed: Math.round(Math.random() * 20 + 5), // 5-25 km/h
        pressure: Math.round(Math.random() * 50 + 1000), // 1000-1050 hPa
        visibility: Math.round(Math.random() * 10 + 5), // 5-15 km
        uvIndex: Math.round(Math.random() * 10 + 1), // 1-11
        sunrise: '06:30',
        sunset: '18:45',
        feelsLike: Math.round(Math.random() * 30 + 10),
        icon: getWeatherIcon(['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Partly Cloudy'][Math.floor(Math.random() * 5)])
      }

      const mockForecast = Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        temperature: {
          min: Math.round(Math.random() * 15 + 5),
          max: Math.round(Math.random() * 20 + 15)
        },
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Partly Cloudy'][Math.floor(Math.random() * 5)],
        humidity: Math.round(Math.random() * 40 + 30),
        windSpeed: Math.round(Math.random() * 20 + 5),
        icon: getWeatherIcon(['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Partly Cloudy'][Math.floor(Math.random() * 5)])
      }))

      setCurrentWeather(mockCurrentWeather)
      setForecast(mockForecast)

      /* Real API implementation:
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      ])

      setCurrentWeather({
        location: locationName || currentResponse.data.name,
        temperature: Math.round(currentResponse.data.main.temp),
        condition: currentResponse.data.weather[0].main,
        humidity: currentResponse.data.main.humidity,
        windSpeed: Math.round(currentResponse.data.wind.speed * 3.6),
        pressure: currentResponse.data.main.pressure,
        visibility: Math.round(currentResponse.data.visibility / 1000),
        uvIndex: 5, // Would need separate UV API call
        sunrise: new Date(currentResponse.data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(currentResponse.data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        feelsLike: Math.round(currentResponse.data.main.feels_like),
        icon: currentResponse.data.weather[0].icon
      })

      const forecastData = forecastResponse.data.list.filter((_, index) => index % 8 === 0).slice(0, 5).map(item => ({
        date: new Date(item.dt * 1000),
        temperature: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max)
        },
        condition: item.weather[0].main,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6),
        icon: item.weather[0].icon
      }))

      setForecast(forecastData)
      */

    } catch (err) {
      console.error('Error fetching weather data:', err)
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }, [])

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Snow': '🌨️',
      'Thunderstorm': '⛈️',
      'Fog': '🌫️'
    }
    return iconMap[condition] || '☀️'
  }

  // Fetch weather data when location changes
  useEffect(() => {
    if (currentLocation) {
      fetchWeatherData(currentLocation.lat, currentLocation.lon, currentLocation.name)
    }
  }, [currentLocation, fetchWeatherData])

  const searchWeather = useCallback(async (lat, lon, locationName) => {
    await fetchWeatherData(lat, lon, locationName)
  }, [fetchWeatherData])

  const getHourlyForecast = useCallback(() => {
    // Mock hourly forecast data
    return Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() + i * 60 * 60 * 1000),
      temperature: Math.round(Math.random() * 25 + 10),
      condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
      precipitation: Math.round(Math.random() * 100),
      icon: getWeatherIcon(['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)])
    }))
  }, [])

  const value = {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherData,
    searchWeather,
    getHourlyForecast,
    getWeatherIcon
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}
