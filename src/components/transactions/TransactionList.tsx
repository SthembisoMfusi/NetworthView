/**
 * Transaction List Component
 * 
 * Displays a list of transactions with filtering and sorting options.
 */

'use client'

import { formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction } from '@/types'

interface TransactionListProps {
  transactions: Transaction[]
  isLoading?: boolean
  onTransactionEdit?: (transaction: Transaction) => void
  onTransactionDelete?: (transaction: Transaction) => void
}

export default function TransactionList({ 
  transactions, 
  isLoading,
  onTransactionEdit,
  onTransactionDelete 
}: TransactionListProps) {
  if (isLoading) {
    return <div className="animate-pulse">Loading transactions...</div>
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions found. Add your first transaction to get started.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.category?.name || 'Uncategorized'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {transaction.note || '-'}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                <button onClick={() => onTransactionEdit?.(transaction)} className="text-blue-600 hover:text-blue-900 mr-3">
                  Edit
                </button>
                <button onClick={() => onTransactionDelete?.(transaction)} className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

