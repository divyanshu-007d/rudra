import { useEffect, useState } from 'react'

export const useSocket = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Only initialize socket if running in browser and socket.io is available
    const initSocket = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { io } = await import('socket.io-client')
        const newSocket = io('http://localhost:3001')
        
        newSocket.on('connect', () => {
          console.log('Connected to server')
        })
        
        newSocket.on('disconnect', () => {
          console.log('Disconnected from server')
        })

        setSocket(newSocket)
        
        return () => {
          newSocket.close()
        }
      } catch (error) {
        console.log('Socket.io not available, running in offline mode')
        setSocket(null)
      }
    }

    initSocket()
  }, [])

  return socket
}
