import React, { createContext, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children, value }) => {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
