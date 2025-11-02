/**
 * General Utility Functions
 * 
 * This module exports common utility functions used throughout the application.
 */

export * from './validation'

/**
 * Formats a number as currency
 * 
 * @param amount - Amount to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1000.5) // "$1,000.50"
 * formatCurrency(1000.5, 'EUR') // "€1,000.50"
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formats a percentage value
 * 
 * @param value - Percentage value (0-100)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercentage(75.5) // "75.5%"
 * formatPercentage(75.555, 2) // "75.56%"
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Formats a date as a readable string
 * 
 * @param date - Date to format
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date('2024-01-15')) // "Jan 15, 2024"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Formats a date range
 * 
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted date range string
 * 
 * @example
 * formatDateRange(new Date('2024-01-01'), new Date('2024-01-31'))
 * // "Jan 1 - 31, 2024"
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(startDate))
  
  const end = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(endDate))
  
  return `${start} - ${end}`
}

/**
 * Truncates a string to a maximum length
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated string
 * 
 * @example
 * truncate('This is a long text', 10) // "This is a..."
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Gets initials from a name
 * 
 * @param name - Full name
 * @returns Initials (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Sleep function for async operations
 * 
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 * 
 * @example
 * await sleep(1000) // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

