/**
 * Unit Tests for Validation Functions
 */

import {
  validateAmount,
  validateDateNotFuture,
  validateTransactionInput,
  validateCategoryInput,
  validateBudgetInput,
  validateEmail,
  validatePasswordStrength,
  validatePasswordMatch,
  sanitizeString,
  validateNonEmpty,
  validateDateRange
} from '@/lib/utils/validation'
import type { CreateTransactionInput, CreateCategoryInput, CreateBudgetInput } from '@/types'

describe('Validation Functions', () => {
  describe('validateAmount', () => {
    it('should accept valid positive amounts', () => {
      expect(validateAmount(100)).toBe(true)
      expect(validateAmount(0)).toBe(true)
      expect(validateAmount(1000.99)).toBe(true)
    })

    it('should reject negative amounts', () => {
      expect(validateAmount(-100)).toBe(false)
    })

    it('should reject NaN', () => {
      expect(validateAmount(NaN)).toBe(false)
    })

    it('should reject non-numbers', () => {
      expect(validateAmount('100' as any)).toBe(false)
    })
  })

  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid emails', () => {
      expect(validateEmail('notanemail')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
    })
  })

  describe('validatePasswordStrength', () => {
    it('should accept strong passwords', () => {
      const result = validatePasswordStrength('MyP@ssw0rd')
      expect(result.valid).toBe(true)
    })

    it('should reject weak passwords', () => {
      const result1 = validatePasswordStrength('short')
      expect(result1.valid).toBe(false)
      expect(result1.requirements).toContain('Password must be at least 8 characters')

      const result2 = validatePasswordStrength('nouppercase123')
      expect(result2.valid).toBe(false)
      expect(result2.requirements).toContain('Password must contain at least one uppercase letter')
    })

    it('should check all requirements', () => {
      const result = validatePasswordStrength('weak')
      expect(result.requirements?.length).toBeGreaterThan(1)
    })
  })

  describe('validatePasswordMatch', () => {
    it('should accept matching passwords', () => {
      expect(validatePasswordMatch('password123', 'password123')).toBe(true)
    })

    it('should reject mismatched passwords', () => {
      expect(validatePasswordMatch('password123', 'password456')).toBe(false)
    })
  })

  describe('validateTransactionInput', () => {
    it('should accept valid transaction', () => {
      const input: CreateTransactionInput = {
        amount: 100,
        type: 'EXPENSE',
        date: new Date('2024-01-01')
      }
      expect(validateTransactionInput(input).valid).toBe(true)
    })

    it('should reject future dates', () => {
      const input: CreateTransactionInput = {
        amount: 100,
        type: 'EXPENSE',
        date: new Date('2025-12-31')
      }
      const result = validateTransactionInput(input)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('future')
    })

    it('should reject invalid type', () => {
      const input: any = {
        amount: 100,
        type: 'INVALID',
        date: new Date('2024-01-01')
      }
      const result = validateTransactionInput(input)
      expect(result.valid).toBe(false)
    })
  })

  describe('validateCategoryInput', () => {
    it('should accept valid category', () => {
      const input: CreateCategoryInput = {
        name: 'Groceries',
        type: 'EXPENSE'
      }
      expect(validateCategoryInput(input).valid).toBe(true)
    })

    it('should reject empty name', () => {
      const input: CreateCategoryInput = {
        name: '',
        type: 'EXPENSE'
      }
      const result = validateCategoryInput(input)
      expect(result.valid).toBe(false)
    })

    it('should reject names over 50 characters', () => {
      const input: CreateCategoryInput = {
        name: 'a'.repeat(51),
        type: 'EXPENSE'
      }
      const result = validateCategoryInput(input)
      expect(result.valid).toBe(false)
    })
  })

  describe('validateBudgetInput', () => {
    it('should accept valid budget', () => {
      const input: CreateBudgetInput = {
        categoryId: 'cat1',
        limit: 500,
        period: 'MONTHLY'
      }
      expect(validateBudgetInput(input).valid).toBe(true)
    })

    it('should reject invalid period', () => {
      const input: any = {
        categoryId: 'cat1',
        limit: 500,
        period: 'INVALID'
      }
      const result = validateBudgetInput(input)
      expect(result.valid).toBe(false)
    })

    it('should reject invalid date range', () => {
      const input: CreateBudgetInput = {
        categoryId: 'cat1',
        limit: 500,
        period: 'MONTHLY',
        startDate: new Date('2024-12-31'),
        endDate: new Date('2024-01-01')
      }
      const result = validateBudgetInput(input)
      expect(result.valid).toBe(false)
    })
  })

  describe('sanitizeString', () => {
    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello')
    })

    it('should handle already trimmed strings', () => {
      expect(sanitizeString('hello')).toBe('hello')
    })
  })

  describe('validateNonEmpty', () => {
    it('should accept non-empty strings', () => {
      expect(validateNonEmpty('hello')).toBe(true)
    })

    it('should reject empty or whitespace-only strings', () => {
      expect(validateNonEmpty('')).toBe(false)
      expect(validateNonEmpty('   ')).toBe(false)
    })
  })

  describe('validateDateRange', () => {
    it('should accept valid date range', () => {
      expect(validateDateRange(new Date('2024-01-01'), new Date('2024-12-31'))).toBe(true)
    })

    it('should accept equal dates', () => {
      const date = new Date('2024-06-15')
      expect(validateDateRange(date, date)).toBe(true)
    })

    it('should reject invalid range', () => {
      expect(validateDateRange(new Date('2024-12-31'), new Date('2024-01-01'))).toBe(false)
    })
  })
})

