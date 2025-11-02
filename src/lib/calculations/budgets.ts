/**
 * Budget Calculation Utilities
 * 
 * This module contains functions for calculating budget progress, overruns,
 * and remaining budget amounts. These functions support the budgeting features
 * and visual progress indicators.
 * 
 * All functions are pure (no side effects) and highly testable.
 */

import { Budget, Transaction } from '@/types'

/**
 * Calculates budget progress percentage
 * 
 * @param spent - Amount already spent
 * @param limit - Budget limit
 * @returns Progress percentage (can exceed 100% if over budget)
 * 
 * @example
 * const progress = calculateBudgetProgress(450, 500)
 * // Returns: 90
 */
export function calculateBudgetProgress(spent: number, limit: number): number {
  if (limit === 0) return 0
  return (spent / limit) * 100
}

/**
 * Calculates remaining budget amount
 * 
 * @param spent - Amount already spent
 * @param limit - Budget limit
 * @returns Remaining budget (negative if over budget)
 * 
 * @example
 * const remaining = calculateRemainingBudget(450, 500)
 * // Returns: 50
 */
export function calculateRemainingBudget(spent: number, limit: number): number {
  return limit - spent
}

/**
 * Checks if budget has been exceeded
 * 
 * @param spent - Amount already spent
 * @param limit - Budget limit
 * @returns True if spending exceeds the budget
 * 
 * @example
 * const isOver = isOverBudget(550, 500)
 * // Returns: true
 */
export function isOverBudget(spent: number, limit: number): boolean {
  return spent > limit
}

/**
 * Calculates how much over budget the spending is
 * 
 * @param spent - Amount already spent
 * @param limit - Budget limit
 * @returns Amount over budget (0 if under budget)
 * 
 * @example
 * const overage = calculateBudgetOverage(550, 500)
 * // Returns: 50
 */
export function calculateBudgetOverage(spent: number, limit: number): number {
  return Math.max(0, spent - limit)
}

/**
 * Calculates total spending for transactions matching a category
 * 
 * @param transactions - Array of transaction objects
 * @param categoryId - Category ID to filter by
 * @returns Total amount spent in that category
 * 
 * @example
 * const spent = calculateSpentInCategory(transactions, 'cat_food')
 * // Returns: 450
 */
export function calculateSpentInCategory(
  transactions: Transaction[],
  categoryId: string
): number {
  return transactions
    .filter(transaction => 
      transaction.categoryId === categoryId && 
      transaction.type === 'EXPENSE'
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0)
}

/**
 * Calculates budget statistics with spending data
 * 
 * @param budget - Budget object
 * @param transactions - Array of transaction objects
 * @returns Budget statistics including spent amount, remaining, and percentage
 * 
 * @example
 * const stats = calculateBudgetStats(budget, transactions)
 * // Returns: {
 * //   spent: 450,
 * //   remaining: 50,
 * //   percentage: 90,
 * //   isOverBudget: false,
 * //   overage: 0
 * // }
 */
export function calculateBudgetStats(
  budget: Budget,
  transactions: Transaction[]
): {
  spent: number
  remaining: number
  percentage: number
  isOverBudget: boolean
  overage: number
} {
  const spent = calculateSpentInCategory(transactions, budget.categoryId)
  const remaining = calculateRemainingBudget(spent, budget.limit)
  const percentage = calculateBudgetProgress(spent, budget.limit)
  const overBudget = isOverBudget(spent, budget.limit)
  const overage = calculateBudgetOverage(spent, budget.limit)
  
  return {
    spent,
    remaining,
    percentage,
    isOverBudget: overBudget,
    overage
  }
}

/**
 * Gets budgets that are over their limit
 * 
 * @param budgets - Array of budget objects
 * @param transactions - Array of transaction objects
 * @returns Array of budgets that have been exceeded
 * 
 * @example
 * const overBudgets = getOverBudgets(budgets, transactions)
 */
export function getOverBudgets(
  budgets: Budget[],
  transactions: Transaction[]
): Budget[] {
  return budgets.filter(budget => {
    const stats = calculateBudgetStats(budget, transactions)
    return stats.isOverBudget
  })
}

/**
 * Gets budgets that are at risk (80-100% of limit)
 * 
 * @param budgets - Array of budget objects
 * @param transactions - Array of transaction objects
 * @returns Array of budgets at risk
 * 
 * @example
 * const atRisk = getAtRiskBudgets(budgets, transactions)
 */
export function getAtRiskBudgets(
  budgets: Budget[],
  transactions: Transaction[]
): Budget[] {
  return budgets.filter(budget => {
    const stats = calculateBudgetStats(budget, transactions)
    return stats.percentage >= 80 && stats.percentage <= 100
  })
}

/**
 * Calculates the proportion of budget remaining
 * 
 * @param spent - Amount already spent
 * @param limit - Budget limit
 * @returns Proportion remaining (0 to 1)
 * 
 * @example
 * const proportion = calculateBudgetProportionRemaining(250, 500)
 * // Returns: 0.5
 */
export function calculateBudgetProportionRemaining(spent: number, limit: number): number {
  const remaining = calculateRemainingBudget(spent, limit)
  if (limit === 0) return 0
  return Math.max(0, remaining / limit)
}

