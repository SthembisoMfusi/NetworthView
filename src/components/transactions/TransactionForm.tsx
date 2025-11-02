/**
 * Transaction Form Component
 * 
 * Form for creating and editing transactions.
 */

'use client'

import { useState, useEffect } from 'react'
import type { Transaction, CreateTransactionInput, Category } from '@/types'

interface TransactionFormProps {
  categories: Category[]
  initialData?: Transaction
  onSubmit: (data: CreateTransactionInput) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export default function TransactionForm({ 
  categories, 
  initialData, 
  onSubmit, 
  onCancel,
  isLoading 
}: TransactionFormProps) {
  const [formData, setFormData] = useState<CreateTransactionInput>({
    amount: initialData?.amount || 0,
    type: initialData?.type || 'EXPENSE',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    categoryId: initialData?.categoryId || '',
    note: initialData?.note || ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTransactionInput, string>>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const data: CreateTransactionInput = {
      ...formData,
      amount: Number(formData.amount),
      date: new Date(formData.date as any)
    }

    await onSubmit(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const filteredCategories = categories.filter(cat => cat.type === formData.type)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input id="amount" name="amount" type="number" step="0.01" min="0" value={formData.amount} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input id="date" name="date" type="date" value={formData.date} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
        <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="">Select a category</option>
          {filteredCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
        <textarea id="note" name="note" value={formData.note} onChange={handleChange} rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
        )}
        <button type="submit" disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
          {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

