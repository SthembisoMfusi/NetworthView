/**
 * Dashboard Summary Component
 * 
 * Displays key financial metrics: total income, total expenses, and net balance.
 */

'use client'

import { formatCurrency } from '@/lib/utils'
import type { DashboardSummary as DashboardSummaryType } from '@/types'

interface DashboardSummaryProps {
  summary: DashboardSummaryType
  isLoading?: boolean
}

export default function DashboardSummary({ summary, isLoading }: DashboardSummaryProps) {
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
        <p className="text-2xl font-bold text-green-600 mt-2">
          {formatCurrency(summary.totalIncome)}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-600 mt-2">
          {formatCurrency(summary.totalExpenses)}
        </p>
      </div>
      
      <div className={`bg-white rounded-lg shadow p-6 ${summary.netBalance >= 0 ? 'border-green-500' : 'border-red-500'} border-2`}>
        <h3 className="text-sm font-medium text-gray-500">Net Balance</h3>
        <p className={`text-2xl font-bold mt-2 ${summary.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(summary.netBalance)}
        </p>
      </div>
    </div>
  )
}

