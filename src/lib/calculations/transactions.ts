/**
 * Transaction Calculation Utilities
 * 
 * This module contains pure functions for calculating various financial metrics
 * from transaction data. These functions are used throughout the application
 * for displaying summaries, filtering, and aggregating financial data.
 * 
 * All functions are pure (no side effects) and highly testable.
 */

import { Transaction, TransactionType } from '@/types'
import { startOfMonth, endOfMonth, subMonths, isWithinInterval } from 'date-fns'

/**
 * Calculates the net balance (income - expenses) from a list of transactions
 * 
 * @param transactions - Array of transaction objects
 * @returns The net balance (negative if expenses exceed income)
 * 
 * @example
 * const transactions = [
 *   { amount: 100, type: 'INCOME' },
 *   { amount: 50, type: 'EXPENSE' }
 * ]
 * const balance = calculateNetBalance(transactions)
 * // Returns: 50
 */
export function calculateNetBalance(transactions: Transaction[]): number {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === 'INCOME' 
      ? balance + transaction.amount 
      : balance - transaction.amount
  }, 0)
}

/**
 * Calculates total income from transactions
 * 
 * @param transactions - Array of transaction objects
 * @returns Total income amount
 * 
 * @example
 * const income = calculateTotalIncome(transactions)
 * // Returns: 5000
 */
export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(transaction => transaction.type === 'INCOME')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
}

/**
 * Calculates total expenses from transactions
 * 
 * @param transactions - Array of transaction objects
 * @returns Total expense amount
 * 
 * @example
 * const expenses = calculateTotalExpenses(transactions)
 * // Returns: 1500
 */
export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter(transaction => transaction.type === 'EXPENSE')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
}

/**
 * Filters transactions by a date range
 * 
 * @param transactions - Array of transaction objects
 * @param startDate - Start of the date range (inclusive)
 * @param endDate - End of the date range (inclusive)
 * @returns Filtered array of transactions within the date range
 * 
 * @example
 * const januaryTransactions = filterTransactionsByDateRange(
 *   transactions,
 *   new Date('2024-01-01'),
 *   new Date('2024-01-31')
 * )
 */
export function filterTransactionsByDateRange(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    return isWithinInterval(transactionDate, { start: startDate, end: endDate })
  })
}

/**
 * Filters transactions by transaction type
 * 
 * @param transactions - Array of transaction objects
 * @param type - The transaction type to filter by
 * @returns Filtered array of transactions matching the type
 * 
 * @example
 * const expenses = filterTransactionsByType(transactions, 'EXPENSE')
 */
export function filterTransactionsByType(
  transactions: Transaction[],
  type: TransactionType
): Transaction[] {
  return transactions.filter(transaction => transaction.type === type)
}

/**
 * Filters transactions by category ID
 * 
 * @param transactions - Array of transaction objects
 * @param categoryId - The category ID to filter by
 * @returns Filtered array of transactions in the specified category
 * 
 * @example
 * const foodTransactions = filterTransactionsByCategory(transactions, 'cat_123')
 */
export function filterTransactionsByCategory(
  transactions: Transaction[],
  categoryId: string
): Transaction[] {
  return transactions.filter(transaction => transaction.categoryId === categoryId)
}

/**
 * Groups transactions by month
 * 
 * @param transactions - Array of transaction objects
 * @returns Object mapping month keys to transaction arrays
 * 
 * @example
 * const grouped = groupTransactionsByMonth(transactions)
 * // Returns: { '2024-01': [Transaction, Transaction], '2024-02': [...] }
 */
export function groupTransactionsByMonth(
  transactions: Transaction[]
): Record<string, Transaction[]> {
  return transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(transaction)
    
    return groups
  }, {} as Record<string, Transaction[]>)
}

/**
 * Gets transactions for a specific month
 * 
 * @param transactions - Array of transaction objects
 * @param date - Date within the target month
 * @returns Array of transactions for that month
 * 
 * @example
 * const januaryTransactions = getTransactionsForMonth(transactions, new Date('2024-01-15'))
 */
export function getTransactionsForMonth(
  transactions: Transaction[],
  date: Date
): Transaction[] {
  const startOfTargetMonth = startOfMonth(date)
  const endOfTargetMonth = endOfMonth(date)
  
  return filterTransactionsByDateRange(transactions, startOfTargetMonth, endOfTargetMonth)
}

/**
 * Gets transactions for the last N months
 * 
 * @param transactions - Array of transaction objects
 * @param months - Number of months to look back
 * @returns Array of transactions from the last N months
 * 
 * @example
 * const lastYearTransactions = getTransactionsForLastMonths(transactions, 12)
 */
export function getTransactionsForLastMonths(
  transactions: Transaction[],
  months: number
): Transaction[] {
  const startDate = subMonths(new Date(), months)
  return filterTransactionsByDateRange(transactions, startDate, new Date())
}

/**
 * Calculates percentage change between two values
 * 
 * @param oldValue - The original value
 * @param newValue - The new value
 * @returns Percentage change (positive for increase, negative for decrease)
 * 
 * @example
 * const change = calculatePercentageChange(100, 150)
 * // Returns: 50 (50% increase)
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0
  return ((newValue - oldValue) / oldValue) * 100
}

/**
 * Counts transactions by type
 * 
 * @param transactions - Array of transaction objects
 * @returns Object with counts for INCOME and EXPENSE
 * 
 * @example
 * const counts = countTransactionsByType(transactions)
 * // Returns: { INCOME: 5, EXPENSE: 20 }
 */
export function countTransactionsByType(
  transactions: Transaction[]
): Record<TransactionType, number> {
  return transactions.reduce((counts, transaction) => {
    counts[transaction.type] = (counts[transaction.type] || 0) + 1
    return counts
  }, { INCOME: 0, EXPENSE: 0 } as Record<TransactionType, number>)
}

