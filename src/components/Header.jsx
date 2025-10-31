import React from 'react'

export default function Header({ onLogout, search, setSearch, categories, category, setCategory }) {
  return (
    <header className="bg-white shadow p-4 flex items-center gap-4">
      <div className="flex-1">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title..." className="p-2 border rounded w-full max-w-md" />
      </div>
      <div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border rounded mr-4">
          <option value="">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={onLogout} className="bg-red-500 text-white px-3 py-2 rounded">Logout</button>
      </div>
    </header>
  )
}
