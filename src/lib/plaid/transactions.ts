/**
 * Plaid Transaction Utilities
 * 
 * This module contains functions for working with Plaid transactions:
 * - Fetching transactions from Plaid
 * - Transforming Plaid transactions to our format
 * - Syncing imported transactions with our database
 */

import { PlaidTransaction } from '@/types'
// TODO: import { TransactionsGetRequest } from 'plaid'

/**
 * Transforms a Plaid transaction to our internal PlaidTransaction format
 * 
 * @param plaidTransaction - Raw transaction from Plaid API
 * @param plaidAccountId - ID of the associated Plaid account
 * @returns Transformed PlaidTransaction object
 * 
 * @example
 * const transformed = transformPlaidTransaction(plaidData, 'acc_123')
 */
export function transformPlaidTransaction(
  plaidTransaction: any, // TODO: Use Plaid transaction type
  plaidAccountId: string
): Omit<PlaidTransaction, 'id' | 'createdAt' | 'updatedAt'> {
  void plaidTransaction;
  // TODO: Implement transformation logic
  // Extract relevant fields from Plaid transaction object
  // Map to our PlaidTransaction schema
  // Handle null/undefined values appropriately
  
  return {
    plaidAccountId,
    plaidTransactionId: '', // Extract transaction_id
    amount: 0, // Extract amount (may need to negate for debits)
    date: new Date(), // Extract date
    authorizedDate: null, // Extract authorized_date if present
    name: '', // Extract name
    merchantName: null, // Extract merchant_name if present
    category: [], // Extract category array
    primaryCategory: null, // Derive from category
    subcategory: null, // Derive from category
    paymentChannel: '', // Extract payment_channel
    personalFinanceCategory: null, // Extract personal_finance_category
    notes: null, // Extract unofficial_currency if needed
    isPending: false, // Extract pending flag
    isImported: false,
    importedAt: null,
  }
}

/**
 * Syncs Plaid transactions with our database
 * 
 * @param plaidTransactions - Array of Plaid transaction data
 * @param plaidAccountId - ID of the Plaid account
 * @returns Array of created database records
 * 
 * @example
 * const synced = await syncPlaidTransactions(plaidData, 'acc_123')
 */
export async function syncPlaidTransactions(
  plaidTransactions: any[], // TODO: Use Plaid transaction array type
  plaidAccountId: string
): Promise<PlaidTransaction[]> {
  void plaidTransactions; void plaidAccountId;
  // TODO: Implement sync logic
  // 1. Transform each Plaid transaction using transformPlaidTransaction
  // 2. Check if transaction already exists (by plaidTransactionId)
  // 3. Upsert transactions to database
  // 4. Return all synced transactions
  
  return []
}

/**
 * Determines if a Plaid transaction represents an expense (negative amount)
 * 
 * @param amount - Transaction amount
 * @returns True if the amount represents an expense
 */
export function isExpenseTransaction(amount: number): boolean {
  return amount < 0
}

/**
 * Determines if a Plaid transaction represents income (positive amount)
 * 
 * @param amount - Transaction amount
 * @returns True if the amount represents income
 */
export function isIncomeTransaction(amount: number): boolean {
  return amount > 0
}

/**
 * Gets the primary category from Plaid's category array
 * 
 * @param categories - Array of category strings
 * @returns Primary category string
 */
export function getPrimaryCategory(categories: string[]): string {
  return categories.length > 0 ? categories[0] : ''
}

/**
 * Gets the subcategory from Plaid's category array
 * 
 * @param categories - Array of category strings
 * @returns Subcategory string (or empty if none)
 */
export function getSubcategory(categories: string[]): string {
  return categories.length > 1 ? categories[1] : ''
}

