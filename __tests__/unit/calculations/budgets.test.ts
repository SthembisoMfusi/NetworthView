/**
 * Unit Tests for Budget Calculation Functions
 */

import {
  calculateBudgetProgress,
  calculateRemainingBudget,
  isOverBudget,
  calculateBudgetOverage,
  calculateSpentInCategory,
  calculateBudgetStats,
  getOverBudgets,
  getAtRiskBudgets
} from '@/lib/calculations/budgets'
import type { Budget, Transaction } from '@/types'

describe('Budget Calculations', () => {
  const mockBudget: Budget = {
    id: 'budget1',
    categoryId: 'cat1',
    limit: 500,
    period: 'MONTHLY',
    userId: 'user1',
    startDate: new Date('2024-01-01'),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 250,
      type: 'EXPENSE',
      date: new Date('2024-01-15'),
      userId: 'user1',
      categoryId: 'cat1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      amount: 350,
      type: 'EXPENSE',
      date: new Date('2024-01-20'),
      userId: 'user1',
      categoryId: 'cat1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  describe('calculateBudgetProgress', () => {
    it('should calculate correct progress percentage', () => {
      expect(calculateBudgetProgress(250, 500)).toBe(50)
      expect(calculateBudgetProgress(500, 500)).toBe(100)
      expect(calculateBudgetProgress(600, 500)).toBe(120)
    })

    it('should return 0 for zero limit', () => {
      expect(calculateBudgetProgress(100, 0)).toBe(0)
    })
  })

  describe('calculateRemainingBudget', () => {
    it('should calculate remaining budget', () => {
      expect(calculateRemainingBudget(250, 500)).toBe(250)
      expect(calculateRemainingBudget(500, 500)).toBe(0)
    })

    it('should return negative when over budget', () => {
      expect(calculateRemainingBudget(600, 500)).toBe(-100)
    })
  })

  describe('isOverBudget', () => {
    it('should detect when over budget', () => {
      expect(isOverBudget(600, 500)).toBe(true)
    })

    it('should detect when under budget', () => {
      expect(isOverBudget(400, 500)).toBe(false)
    })

    it('should return false when exactly at limit', () => {
      expect(isOverBudget(500, 500)).toBe(false)
    })
  })

  describe('calculateBudgetOverage', () => {
    it('should calculate overage amount', () => {
      expect(calculateBudgetOverage(600, 500)).toBe(100)
    })

    it('should return 0 when under budget', () => {
      expect(calculateBudgetOverage(400, 500)).toBe(0)
    })
  })

  describe('calculateSpentInCategory', () => {
    it('should sum expenses in category', () => {
      const spent = calculateSpentInCategory(mockTransactions, 'cat1')
      expect(spent).toBe(600)
    })

    it('should return 0 for no matching transactions', () => {
      expect(calculateSpentInCategory(mockTransactions, 'cat999')).toBe(0)
    })

    it('should ignore income transactions', () => {
      const transactions = [
        ...mockTransactions,
        {
          id: '3',
          amount: 1000,
          type: 'INCOME',
          date: new Date('2024-01-25'),
          userId: 'user1',
          categoryId: 'cat1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      expect(calculateSpentInCategory(transactions, 'cat1')).toBe(600)
    })
  })

  describe('calculateBudgetStats', () => {
    it('should calculate complete budget statistics', () => {
      const stats = calculateBudgetStats(mockBudget, mockTransactions)
      expect(stats.spent).toBe(600)
      expect(stats.remaining).toBe(-100)
      expect(stats.percentage).toBe(120)
      expect(stats.isOverBudget).toBe(true)
      expect(stats.overage).toBe(100)
    })
  })

  describe('getOverBudgets', () => {
    it('should find budgets that are exceeded', () => {
      const budgets: Budget[] = [
        { ...mockBudget, id: '1' },
        { ...mockBudget, id: '2', limit: 1000 },
        { ...mockBudget, id: '3', limit: 700 }
      ]
      const overBudgets = getOverBudgets(budgets, mockTransactions)
      expect(overBudgets).toHaveLength(2)
      expect(overBudgets.every(b => b.limit <= 600)).toBe(true)
    })
  })

  describe('getAtRiskBudgets', () => {
    it('should find budgets at risk', () => {
      const lowSpentTransactions: Transaction[] = [
        {
          id: '1',
          amount: 450,
          type: 'EXPENSE',
          date: new Date('2024-01-15'),
          userId: 'user1',
          categoryId: 'cat1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      const budgets: Budget[] = [{ ...mockBudget }]
      const atRisk = getAtRiskBudgets(budgets, lowSpentTransactions)
      expect(atRisk).toHaveLength(1)
      expect(atRisk[0].id).toBe('budget1')
    })

    it('should not return budgets outside risk range', () => {
      const safeTransactions: Transaction[] = [
        {
          id: '1',
          amount: 300,
          type: 'EXPENSE',
          date: new Date('2024-01-15'),
          userId: 'user1',
          categoryId: 'cat1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      const budgets: Budget[] = [{ ...mockBudget }]
      expect(getAtRiskBudgets(budgets, safeTransactions)).toHaveLength(0)
    })
  })
})

