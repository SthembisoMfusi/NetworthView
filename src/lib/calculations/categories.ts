/**
 * Category Aggregation Utilities
 * 
 * This module contains functions for aggregating and analyzing transactions
 * by category. These functions support the dashboard charts and category-specific
 * insights.
 * 
 * All functions are pure (no side effects) and highly testable.
 */

import { Transaction, CategorySummary } from '@/types'

/**
 * Aggregates transactions by category
 * 
 * @param transactions - Array of transaction objects
 * @returns Array of category summaries with totals and counts
 * 
 * @example
 * const summaries = aggregateByCategory(transactions)
 * // Returns: [
 * //   { categoryId: 'cat_1', categoryName: 'Food', amount: 500, percentage: 50, transactionCount: 10 },
 * //   { categoryId: 'cat_2', categoryName: 'Transport', amount: 300, percentage: 30, transactionCount: 5 }
 * // ]
 */
export function aggregateByCategory(transactions: Transaction[]): CategorySummary[] {
  const categoryMap = new Map<string, { name: string; amount: number; count: number }>()
  
  // Group transactions by category
  transactions.forEach(transaction => {
    if (transaction.categoryId && transaction.category) {
      const existing = categoryMap.get(transaction.categoryId) || {
        name: transaction.category.name,
        amount: 0,
        count: 0
      }
      
      existing.amount += transaction.amount
      existing.count += 1
      categoryMap.set(transaction.categoryId, existing)
    }
  })
  
  // Calculate total for percentage calculation
  const total = transactions.reduce((sum, t) => sum + t.amount, 0)
  
  // Convert to array and calculate percentages
  return Array.from(categoryMap.entries()).map(([categoryId, data]) => ({
    categoryId,
    categoryName: data.name,
    amount: data.amount,
    percentage: total > 0 ? (data.amount / total) * 100 : 0,
    transactionCount: data.count
  }))
  .sort((a, b) => b.amount - a.amount) // Sort by amount descending
}

/**
 * Calculates spending per category for expenses only
 * 
 * @param transactions - Array of transaction objects
 * @returns Array of category summaries for expense transactions
 * 
 * @example
 * const expenseByCategory = aggregateExpensesByCategory(transactions)
 */
export function aggregateExpensesByCategory(transactions: Transaction[]): CategorySummary[] {
  const expenses = transactions.filter(t => t.type === 'EXPENSE')
  return aggregateByCategory(expenses)
}

/**
 * Calculates income per category
 * 
 * @param transactions - Array of transaction objects
 * @returns Array of category summaries for income transactions
 * 
 * @example
 * const incomeByCategory = aggregateIncomeByCategory(transactions)
 */
export function aggregateIncomeByCategory(transactions: Transaction[]): CategorySummary[] {
  const income = transactions.filter(t => t.type === 'INCOME')
  return aggregateByCategory(income)
}

/**
 * Gets the top N categories by spending amount
 * 
 * @param transactions - Array of transaction objects
 * @param limit - Number of top categories to return
 * @returns Array of top N category summaries
 * 
 * @example
 * const topCategories = getTopCategories(transactions, 5)
 */
export function getTopCategories(transactions: Transaction[], limit: number = 5): CategorySummary[] {
  const summaries = aggregateExpensesByCategory(transactions)
  return summaries.slice(0, limit)
}

/**
 * Calculates category diversity (number of unique categories used)
 * 
 * @param transactions - Array of transaction objects
 * @returns Number of unique categories
 * 
 * @example
 * const diversity = calculateCategoryDiversity(transactions)
 * // Returns: 8 (8 different categories used)
 */
export function calculateCategoryDiversity(transactions: Transaction[]): number {
  const uniqueCategories = new Set<string>()
  transactions.forEach(transaction => {
    if (transaction.categoryId) {
      uniqueCategories.add(transaction.categoryId)
    }
  })
  return uniqueCategories.size
}

/**
 * Gets transactions without a category (uncategorized)
 * 
 * @param transactions - Array of transaction objects
 * @returns Array of uncategorized transactions
 * 
 * @example
 * const uncategorized = getUncategorizedTransactions(transactions)
 */
export function getUncategorizedTransactions(transactions: Transaction[]): Transaction[] {
  return transactions.filter(transaction => !transaction.categoryId)
}

/**
 * Calculates the share of uncategorized transactions
 * 
 * @param transactions - Array of transaction objects
 * @returns Object with count and percentage of uncategorized transactions
 * 
 * @example
 * const stats = calculateUncategorizedStats(transactions)
 * // Returns: { count: 5, percentage: 10 }
 */
export function calculateUncategorizedStats(transactions: Transaction[]) {
  const uncategorized = getUncategorizedTransactions(transactions)
  return {
    count: uncategorized.length,
    percentage: transactions.length > 0 
      ? (uncategorized.length / transactions.length) * 100 
      : 0
  }
}

