import React, { useState, useMemo } from 'react'
import { useGetProductsQuery } from '../features/apiSlice'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import ProductDetail from '../components/ProductDetail'

export default function Products({ auth }) {
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery()
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category))
    return Array.from(set)
  }, [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
      const matchesCat = category ? p.category === category : true
      return matchesSearch && matchesCat
    })
  }, [products, search, category])

  const handleCloseDetail = (deleted) => {
    setSelectedId(null)
    if (deleted) {
      // RTK Query will update list via invalidation
    }
  }

  return (
    <div className="min-h-screen">
      <Header onLogout={auth.logout} search={search} setSearch={setSearch} categories={categories} category={category} setCategory={setCategory} />

      <main className="p-6">
        {isLoading && <div className="flex items-center gap-2"><div className="loader"/> <span>Loading products...</span></div>}
        {isError && <div className="text-red-600">Error loading products: {error?.toString()}</div>}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} onOpen={(id) => setSelectedId(id)} />)}
          </div>
        )}

        <ProductDetail id={selectedId} onClose={handleCloseDetail} />

      </main>
    </div>
  )
}
