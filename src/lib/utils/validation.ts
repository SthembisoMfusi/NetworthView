/**
 * Validation Utilities
 * 
 * This module provides validation functions for user inputs, API requests,
 * and data integrity checks. These functions ensure data quality throughout
 * the application.
 */

import { CreateTransactionInput, CreateCategoryInput, CreateBudgetInput } from '@/types'

/**
 * Validates if an amount is a positive number
 * 
 * @param amount - Amount to validate
 * @returns True if valid, false otherwise
 * 
 * @example
 * validateAmount(100) // true
 * validateAmount(-50) // false
 * validateAmount(0) // true
 */
export function validateAmount(amount: number): boolean {
  return typeof amount === 'number' && amount >= 0 && !isNaN(amount)
}

/**
 * Validates if a date is in the past or present (not future)
 * 
 * @param date - Date to validate
 * @returns True if valid, false otherwise
 * 
 * @example
 * validateDateNotFuture(new Date('2024-01-01')) // true
 * validateDateNotFuture(new Date('2025-01-01')) // false (if current year is 2024)
 */
export function validateDateNotFuture(date: Date): boolean {
  const now = new Date()
  return new Date(date) <= now
}

/**
 * Validates transaction input data
 * 
 * @param input - Transaction input object
 * @returns Validation result with success flag and error message
 * 
 * @example
 * const result = validateTransactionInput({ amount: 100, type: 'EXPENSE', date: new Date() })
 * // Returns: { valid: true }
 */
export function validateTransactionInput(input: CreateTransactionInput): {
  valid: boolean
  error?: string
} {
  if (!validateAmount(input.amount)) {
    return { valid: false, error: 'Amount must be a positive number' }
  }
  
  if (!validateDateNotFuture(input.date)) {
    return { valid: false, error: 'Transaction date cannot be in the future' }
  }
  
  if (!input.type || !['INCOME', 'EXPENSE'].includes(input.type)) {
    return { valid: false, error: 'Transaction type must be INCOME or EXPENSE' }
  }
  
  return { valid: true }
}

/**
 * Validates category input data
 * 
 * @param input - Category input object
 * @returns Validation result with success flag and error message
 */
export function validateCategoryInput(input: CreateCategoryInput): {
  valid: boolean
  error?: string
} {
  if (!input.name || input.name.trim().length === 0) {
    return { valid: false, error: 'Category name is required' }
  }
  
  if (input.name.length > 50) {
    return { valid: false, error: 'Category name must be 50 characters or less' }
  }
  
  if (!input.type || !['INCOME', 'EXPENSE'].includes(input.type)) {
    return { valid: false, error: 'Category type must be INCOME or EXPENSE' }
  }
  
  return { valid: true }
}

/**
 * Validates budget input data
 * 
 * @param input - Budget input object
 * @returns Validation result with success flag and error message
 */
export function validateBudgetInput(input: CreateBudgetInput): {
  valid: boolean
  error?: string
} {
  if (!validateAmount(input.limit)) {
    return { valid: false, error: 'Budget limit must be a positive number' }
  }
  
  if (!input.period || !['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].includes(input.period)) {
    return { valid: false, error: 'Invalid budget period' }
  }
  
  if (input.startDate && input.endDate && input.startDate > input.endDate) {
    return { valid: false, error: 'Start date must be before end date' }
  }
  
  return { valid: true }
}

/**
 * Validates email format
 * 
 * @param email - Email to validate
 * @returns True if valid email format, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates password strength
 * 
 * @param password - Password to validate
 * @returns Validation result with success flag and requirements not met
 */
export function validatePasswordStrength(password: string): {
  valid: boolean
  requirements?: string[]
} {
  const requirements: string[] = []
  
  if (password.length < 8) {
    requirements.push('Password must be at least 8 characters')
  }
  
  if (!/[A-Z]/.test(password)) {
    requirements.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    requirements.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    requirements.push('Password must contain at least one number')
  }
  
  return {
    valid: requirements.length === 0,
    requirements: requirements.length > 0 ? requirements : undefined
  }
}

/**
 * Validates that password and confirmPassword match
 * 
 * @param password - Password
 * @param confirmPassword - Confirmation password
 * @returns True if passwords match, false otherwise
 */
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

/**
 * Sanitizes string input by trimming whitespace
 * 
 * @param input - Input string
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input.trim()
}

/**
 * Validates that a string is not empty after sanitization
 * 
 * @param input - Input string
 * @returns True if non-empty, false otherwise
 */
export function validateNonEmpty(input: string): boolean {
  return sanitizeString(input).length > 0
}

/**
 * Validates date range
 * 
 * @param startDate - Start of date range
 * @param endDate - End of date range
 * @returns True if valid range, false otherwise
 */
export function validateDateRange(startDate: Date, endDate: Date): boolean {
  return new Date(startDate) <= new Date(endDate)
}

