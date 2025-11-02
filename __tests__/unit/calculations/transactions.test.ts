/**
 * Unit Tests for Transaction Calculation Functions
 */

import {
  calculateNetBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  filterTransactionsByDateRange,
  filterTransactionsByType,
  filterTransactionsByCategory,
  groupTransactionsByMonth,
  getTransactionsForMonth,
  getTransactionsForLastMonths,
  calculatePercentageChange,
  countTransactionsByType
} from '@/lib/calculations/transactions'
import type { Transaction } from '@/types'

describe('Transaction Calculations', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 1000,
      type: 'INCOME',
      date: new Date('2024-01-15'),
      userId: 'user1',
      categoryId: 'cat1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      amount: 250,
      type: 'EXPENSE',
      date: new Date('2024-01-20'),
      userId: 'user1',
      categoryId: 'cat2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      amount: 5000,
      type: 'INCOME',
      date: new Date('2024-02-15'),
      userId: 'user1',
      categoryId: 'cat1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      amount: 450,
      type: 'EXPENSE',
      date: new Date('2024-02-20'),
      userId: 'user1',
      categoryId: 'cat2',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  describe('calculateNetBalance', () => {
    it('should calculate correct net balance', () => {
      const balance = calculateNetBalance(mockTransactions)
      expect(balance).toBe(5300) // 6000 income - 700 expenses
    })

    it('should return 0 for empty array', () => {
      expect(calculateNetBalance([])).toBe(0)
    })

    it('should handle negative balances', () => {
      const expenses = mockTransactions.filter(t => t.type === 'EXPENSE')
      expect(calculateNetBalance(expenses)).toBe(-700)
    })
  })

  describe('calculateTotalIncome', () => {
    it('should sum all income transactions', () => {
      const income = calculateTotalIncome(mockTransactions)
      expect(income).toBe(6000)
    })

    it('should return 0 if no income transactions', () => {
      const expenses = mockTransactions.filter(t => t.type === 'EXPENSE')
      expect(calculateTotalIncome(expenses)).toBe(0)
    })
  })

  describe('calculateTotalExpenses', () => {
    it('should sum all expense transactions', () => {
      const expenses = calculateTotalExpenses(mockTransactions)
      expect(expenses).toBe(700)
    })

    it('should return 0 if no expense transactions', () => {
      const income = mockTransactions.filter(t => t.type === 'INCOME')
      expect(calculateTotalExpenses(income)).toBe(0)
    })
  })

  describe('filterTransactionsByDateRange', () => {
    it('should filter transactions within date range', () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-01-31')
      const filtered = filterTransactionsByDateRange(mockTransactions, startDate, endDate)
      expect(filtered).toHaveLength(2)
      expect(filtered.every(t => t.id === '1' || t.id === '2')).toBe(true)
    })

    it('should return empty array if no transactions in range', () => {
      const startDate = new Date('2025-01-01')
      const endDate = new Date('2025-01-31')
      expect(filterTransactionsByDateRange(mockTransactions, startDate, endDate)).toEqual([])
    })
  })

  describe('filterTransactionsByType', () => {
    it('should filter income transactions', () => {
      const income = filterTransactionsByType(mockTransactions, 'INCOME')
      expect(income).toHaveLength(2)
      expect(income.every(t => t.type === 'INCOME')).toBe(true)
    })

    it('should filter expense transactions', () => {
      const expenses = filterTransactionsByType(mockTransactions, 'EXPENSE')
      expect(expenses).toHaveLength(2)
      expect(expenses.every(t => t.type === 'EXPENSE')).toBe(true)
    })
  })

  describe('filterTransactionsByCategory', () => {
    it('should filter by category ID', () => {
      const cat1Transactions = filterTransactionsByCategory(mockTransactions, 'cat1')
      expect(cat1Transactions).toHaveLength(2)
      expect(cat1Transactions.every(t => t.categoryId === 'cat1')).toBe(true)
    })

    it('should return empty array for non-existent category', () => {
      expect(filterTransactionsByCategory(mockTransactions, 'cat999')).toEqual([])
    })
  })

  describe('groupTransactionsByMonth', () => {
    it('should group transactions by month', () => {
      const grouped = groupTransactionsByMonth(mockTransactions)
      expect(Object.keys(grouped)).toHaveLength(2)
      expect(grouped['2024-01']).toHaveLength(2)
      expect(grouped['2024-02']).toHaveLength(2)
    })

    it('should handle empty array', () => {
      expect(groupTransactionsByMonth([])).toEqual({})
    })
  })

  describe('calculatePercentageChange', () => {
    it('should calculate positive percentage change', () => {
      expect(calculatePercentageChange(100, 150)).toBe(50)
    })

    it('should calculate negative percentage change', () => {
      expect(calculatePercentageChange(100, 75)).toBe(-25)
    })

    it('should handle zero as old value', () => {
      expect(calculatePercentageChange(0, 100)).toBe(100)
    })
  })

  describe('countTransactionsByType', () => {
    it('should count transactions by type', () => {
      const counts = countTransactionsByType(mockTransactions)
      expect(counts.INCOME).toBe(2)
      expect(counts.EXPENSE).toBe(2)
    })

    it('should return zeros for empty array', () => {
      const counts = countTransactionsByType([])
      expect(counts.INCOME).toBe(0)
      expect(counts.EXPENSE).toBe(0)
    })
  })
})

