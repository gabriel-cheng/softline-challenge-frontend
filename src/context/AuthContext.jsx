import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchCurrentUser, login as apiLogin, logout as apiLogout } from '../api/auth'
import { AUTH_EVENT } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('checking')

  const checkSession = useCallback(async () => {
    try {
      const data = await fetchCurrentUser()
      setUser(data)
      setStatus('authenticated')
    } catch {
      setUser(null)
      setStatus('unauthenticated')
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null)
      setStatus('unauthenticated')
    }
    window.addEventListener(AUTH_EVENT, handleUnauthorized)
    return () => window.removeEventListener(AUTH_EVENT, handleUnauthorized)
  }, [])

  async function login(username, password) {
    await apiLogin(username, password)
    await checkSession()
  }

  async function logout() {
    await apiLogout()
    setUser(null)
    setStatus('unauthenticated')
  }

  return (
    <AuthContext.Provider value={{ user, status, login, logout, refresh: checkSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}