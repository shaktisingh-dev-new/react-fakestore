import React from 'react'
import { formatCurrency } from '../utils/format'

export default function ProductCard({ product, onOpen }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img src={product.image} alt={product.title} className="h-40 object-contain mb-3" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-1">{product.title}</h3>
        <div className="text-gray-500 text-sm mb-2">{product.category}</div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="font-bold">{formatCurrency(product.price)}</div>
        <button onClick={() => onOpen(product.id)} className="px-3 py-1 border rounded">View</button>
      </div>
    </div>
  )
}
