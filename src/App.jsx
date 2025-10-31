import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import { useAuth } from './hooks/useAuth'

function App() {
  const auth = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route
          path="/products/*"
          element={auth.isLoggedIn ? <Products auth={auth} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
