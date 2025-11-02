/**
 * Central type definitions for the NetworthView application
 * 
 * This file exports all TypeScript types and interfaces used throughout
 * the application. Types are organized by feature area and provide strict
 * typing for props, API responses, and data models.
 */

import { TransactionType, BudgetPeriod, RecurringFrequency } from '@prisma/client'

// ============================================
// Re-exported Prisma Types
// ============================================

export { TransactionType, BudgetPeriod, RecurringFrequency }

// ============================================
// Transaction Types
// ============================================

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  date: Date
  note?: string | null
  userId: string
  categoryId?: string | null
  createdAt: Date
  updatedAt: Date
  category?: Category | null
}

export interface CreateTransactionInput {
  amount: number
  type: TransactionType
  date: Date
  note?: string
  categoryId?: string
}

export interface UpdateTransactionInput {
  amount?: number
  type?: TransactionType
  date?: Date
  note?: string
  categoryId?: string
}

export interface TransactionFilters {
  startDate?: Date
  endDate?: Date
  categoryId?: string
  type?: TransactionType
  search?: string
}

// ============================================
// Category Types
// ============================================

export interface Category {
  id: string
  name: string
  type: TransactionType
  icon?: string | null
  color?: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateCategoryInput {
  name: string
  type: TransactionType
  icon?: string
  color?: string
}

export interface UpdateCategoryInput {
  name?: string
  icon?: string
  color?: string
}

// ============================================
// Budget Types
// ============================================

export interface Budget {
  id: string
  categoryId: string
  limit: number
  period: BudgetPeriod
  userId: string
  createdAt: Date
  updatedAt: Date
  startDate: Date
  endDate?: Date | null
  category?: Category
}

export interface BudgetWithSpent extends Budget {
  spent: number
  remaining: number
  percentage: number
}

export interface CreateBudgetInput {
  categoryId: string
  limit: number
  period: BudgetPeriod
  startDate?: Date
  endDate?: Date
}

export interface UpdateBudgetInput {
  limit?: number
  period?: BudgetPeriod
  startDate?: Date
  endDate?: Date
}

// ============================================
// Recurring Transaction Types
// ============================================

export interface RecurringTransaction {
  id: string
  amount: number
  type: TransactionType
  categoryId?: string | null
  note?: string | null
  frequency: RecurringFrequency
  nextDate: Date
  lastRun?: Date | null
  userId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  category?: Category | null
}

export interface CreateRecurringTransactionInput {
  amount: number
  type: TransactionType
  categoryId?: string
  note?: string
  frequency: RecurringFrequency
  nextDate: Date
}

export interface UpdateRecurringTransactionInput {
  amount?: number
  categoryId?: string
  note?: string
  frequency?: RecurringFrequency
  nextDate?: Date
  isActive?: boolean
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardSummary {
  totalIncome: number
  totalExpenses: number
  netBalance: number
  transactionCount: number
  period: {
    startDate: Date
    endDate: Date
  }
}

export interface MonthlySummary {
  month: string
  year: number
  income: number
  expenses: number
  balance: number
}

export interface CategorySummary {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  transactionCount: number
}

// ============================================
// Chart Data Types
// ============================================

export interface TimeSeriesDataPoint {
  month: string
  income: number
  expenses: number
  balance: number
}

export interface PieChartDataPoint {
  name: string
  value: number
  percentage: number
  color: string
}

export interface BudgetProgressData {
  categoryName: string
  spent: number
  limit: number
  percentage: number
  isOverBudget: boolean
}

// ============================================
// Plaid Integration Types
// ============================================

export interface PlaidAccount {
  id: string
  userId: string
  itemId: string
  accessToken: string
  institutionId: string
  institutionName: string
  accountId: string
  accountName: string
  accountType: string
  accountSubtype?: string | null
  mask?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface PlaidTransaction {
  id: string
  plaidAccountId: string
  plaidTransactionId: string
  amount: number
  date: Date
  authorizedDate?: Date | null
  name: string
  merchantName?: string | null
  category: string[]
  primaryCategory?: string | null
  subcategory?: string | null
  paymentChannel: string
  personalFinanceCategory?: string | null
  notes?: string | null
  isPending: boolean
  isImported: boolean
  importedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface PlaidLinkTokenResponse {
  link_token: string
  expiration: string
  request_id: string
}

export interface PlaidPublicTokenExchangeResponse {
  access_token: string
  item_id: string
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ============================================
// User Types
// ============================================

export interface User {
  id: string
  name?: string | null
  email: string
  emailVerified?: Date | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

// ============================================
// Filter & Date Range Types
// ============================================

export type DateRange = 'today' | 'week' | 'month' | 'year' | 'all' | 'custom'

export interface DateRangeFilter {
  range: DateRange
  startDate?: Date
  endDate?: Date
}

export interface TransactionListFilters extends TransactionFilters {
  page?: number
  limit?: number
  sortBy?: 'date' | 'amount' | 'category'
  sortOrder?: 'asc' | 'desc'
}

// ============================================
// Form Types
// ============================================

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// ============================================
// Utility Types
// ============================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ErrorResponse {
  message: string
  statusCode: number
  timestamp: Date
}

