import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ auth }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = auth.login(user, pass)
    if (ok) navigate('/products')
    else setErr('Invalid credentials. Use user / password')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <label className="block mb-2">Username</label>
        <input value={user} onChange={e => setUser(e.target.value)} className="w-full p-2 border mb-3 rounded" />
        <label className="block mb-2">Password</label>
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-2 border mb-4 rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
        <div className="text-sm mt-3 text-gray-500">Use <strong>user</strong> / <strong>password</strong></div>
      </form>
    </div>
  )
}
