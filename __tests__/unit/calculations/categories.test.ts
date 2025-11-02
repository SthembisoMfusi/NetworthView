/**
 * Unit Tests for Category Calculation Functions
 */

import {
  aggregateByCategory,
  aggregateExpensesByCategory,
  getTopCategories,
  calculateCategoryDiversity,
  getUncategorizedTransactions,
  calculateUncategorizedStats
} from '@/lib/calculations/categories'
import type { Transaction, Category } from '@/types'

describe('Category Calculations', () => {
  const mockCategories: Category[] = [
    { id: 'cat1', name: 'Food', type: 'EXPENSE', userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
    { id: 'cat2', name: 'Transport', type: 'EXPENSE', userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
    { id: 'cat3', name: 'Salary', type: 'INCOME', userId: 'user1', createdAt: new Date(), updatedAt: new Date() }
  ]

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 100,
      type: 'EXPENSE',
      date: new Date('2024-01-15'),
      userId: 'user1',
      categoryId: 'cat1',
      category: mockCategories[0],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      amount: 200,
      type: 'EXPENSE',
      date: new Date('2024-01-20'),
      userId: 'user1',
      categoryId: 'cat1',
      category: mockCategories[0],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      amount: 150,
      type: 'EXPENSE',
      date: new Date('2024-01-25'),
      userId: 'user1',
      categoryId: 'cat2',
      category: mockCategories[1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      amount: 1000,
      type: 'INCOME',
      date: new Date('2024-02-01'),
      userId: 'user1',
      categoryId: 'cat3',
      category: mockCategories[2],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  describe('aggregateByCategory', () => {
    it('should aggregate transactions by category', () => {
      const summaries = aggregateByCategory(mockTransactions)
      expect(summaries).toHaveLength(3)
      
      const foodSummary = summaries.find(s => s.categoryId === 'cat1')
      expect(foodSummary).toBeDefined()
      expect(foodSummary?.amount).toBe(300)
      expect(foodSummary?.transactionCount).toBe(2)
    })

    it('should calculate percentages correctly', () => {
      const summaries = aggregateByCategory(mockTransactions)
      const total = mockTransactions.reduce((sum, t) => sum + t.amount, 0)
      
      summaries.forEach(summary => {
        expect(summary.percentage).toBeGreaterThanOrEqual(0)
        expect(summary.percentage).toBeLessThanOrEqual(100)
      })
    })

    it('should return empty array for no transactions', () => {
      expect(aggregateByCategory([])).toEqual([])
    })
  })

  describe('aggregateExpensesByCategory', () => {
    it('should only aggregate expense transactions', () => {
      const summaries = aggregateExpensesByCategory(mockTransactions)
      expect(summaries.length).toBe(2)
      expect(summaries.every(s => s.categoryName === 'Food' || s.categoryName === 'Transport')).toBe(true)
      
      const totalExpenses = summaries.reduce((sum, s) => sum + s.amount, 0)
      expect(totalExpenses).toBe(450)
    })
  })

  describe('getTopCategories', () => {
    it('should return top N categories by amount', () => {
      const top2 = getTopCategories(mockTransactions, 2)
      expect(top2).toHaveLength(2)
      expect(top2[0].amount).toBeGreaterThanOrEqual(top2[1].amount)
    })

    it('should default to top 5 if limit not specified', () => {
      const top = getTopCategories(mockTransactions)
      expect(top.length).toBeLessThanOrEqual(5)
    })

    it('should return all categories if fewer than limit', () => {
      const all = getTopCategories(mockTransactions, 10)
      const total = aggregateExpensesByCategory(mockTransactions).length
      expect(all.length).toBe(total)
    })
  })

  describe('calculateCategoryDiversity', () => {
    it('should count unique categories', () => {
      expect(calculateCategoryDiversity(mockTransactions)).toBe(3)
    })

    it('should return 0 for no transactions', () => {
      expect(calculateCategoryDiversity([])).toBe(0)
    })
  })

  describe('getUncategorizedTransactions', () => {
    it('should find transactions without categories', () => {
      const uncategorized = [
        {
          id: '5',
          amount: 50,
          type: 'EXPENSE',
          date: new Date('2024-01-30'),
          userId: 'user1',
          categoryId: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      const allTransactions = [...mockTransactions, ...uncategorized]
      expect(getUncategorizedTransactions(allTransactions)).toHaveLength(1)
    })

    it('should return empty array if all transactions are categorized', () => {
      expect(getUncategorizedTransactions(mockTransactions)).toEqual([])
    })
  })

  describe('calculateUncategorizedStats', () => {
    it('should calculate uncategorized percentage', () => {
      const uncategorized = [
        {
          id: '5',
          amount: 50,
          type: 'EXPENSE',
          date: new Date('2024-01-30'),
          userId: 'user1',
          categoryId: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      const allTransactions = [...mockTransactions, ...uncategorized]
      const stats = calculateUncategorizedStats(allTransactions)
      
      expect(stats.count).toBe(1)
      expect(stats.percentage).toBe(20) // 1 of 5 transactions
    })

    it('should return zero for all categorized', () => {
      const stats = calculateUncategorizedStats(mockTransactions)
      expect(stats.count).toBe(0)
      expect(stats.percentage).toBe(0)
    })
  })
})

