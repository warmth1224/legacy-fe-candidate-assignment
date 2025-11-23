import React, { createContext, useContext, ReactNode } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

interface AuthContextType {
  isAuthenticated: boolean
  user: any
  userEmail?: string
  primaryWallet: any
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, primaryWallet, handleLogOut } = useDynamicContext()

  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    userEmail: user?.email,
    primaryWallet,
    logout: handleLogOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
