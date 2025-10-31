import { useState, useEffect } from 'react'

const KEY = 'fake_store_is_logged'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || false
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  const login = (u, p) => {
    if (u === 'user' && p === 'password') {
      setIsLoggedIn(true)
      return true
    }
    return false
  }
  const logout = () => setIsLoggedIn(false)

  return { isLoggedIn, login, logout }
}
