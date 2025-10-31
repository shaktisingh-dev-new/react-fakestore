import React, { useState, useEffect } from 'react'
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from '../features/apiSlice'
import ConfirmModal from './ConfirmModal'
import { formatCurrency } from '../utils/format'

export default function ProductDetail({ id, onClose }) {
  const { data: product, isLoading, isError, error } = useGetProductQuery(id, { skip: !id })
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ title: '', price: 0, description: '', category: '' })
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (product) setForm({ title: product.title, price: product.price, description: product.description, category: product.category })
  }, [product])

  if (!id) return null

  if (isLoading) return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow">Loading...</div>
    </div>
  )

  if (isError) return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow">Error: {error?.toString()}</div>
    </div>
  )

  const handleSave = async () => {
    try {
      await updateProduct({ id, ...form }).unwrap()
      setEditMode(false)
    } catch (e) {
      alert('Update failed')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap()
      setConfirmOpen(false)
      onClose(true) // indicate deleted
    } catch (e) {
      alert('Delete failed')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow w-full max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <div className="flex gap-2">
            <button onClick={() => setEditMode(v => !v)} className="px-3 py-1 border rounded">{editMode ? 'Cancel' : 'Edit'}</button>
            <button onClick={() => setConfirmOpen(true)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            <button onClick={() => onClose(false)} className="px-3 py-1 border rounded">Close</button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src={product.image} alt={product.title} className="col-span-1 h-60 object-contain" />
          <div className="col-span-2">
            {!editMode ? (
              <>
                <p className="mb-2">{product.description}</p>
                <div className="mt-4">Rating: <strong>{product.rating?.rate}</strong> ({product.rating?.count})</div>
                <div className="mt-2 font-bold text-lg">{formatCurrency(product.price)}</div>
                <div className="mt-2 text-gray-500">Category: {product.category}</div>
              </>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block">Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block">Price</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full p-2 border rounded" />
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditMode(false)} className="px-3 py-1 border rounded">Cancel</button>
                  <button onClick={handleSave} disabled={isUpdating} className="px-3 py-1 bg-blue-600 text-white rounded">{isUpdating ? 'Saving...' : 'Save'}</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <ConfirmModal open={confirmOpen} title="Delete product" message={`Are you sure you want to delete \"${product.title}\"?`} onCancel={() => setConfirmOpen(false)} onConfirm={handleDelete} />
      </div>
    </div>
  )
}
