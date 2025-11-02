# Utility Functions

## Overview

This directory contains general-purpose utility functions used throughout the application. These functions provide common operations like formatting, validation, and data manipulation.

## Files

### `validation.ts`

Input validation functions for ensuring data integrity and security.

**Functions:**

#### Transaction Validation
- **validateAmount(amount)**: Checks if amount is a valid positive number
- **validateDateNotFuture(date)**: Ensures transaction dates are not in the future
- **validateTransactionInput(input)**: Complete transaction validation with error messages

#### Category Validation
- **validateCategoryInput(input)**: Validates category name, type, and constraints

#### Budget Validation
- **validateBudgetInput(input)**: Validates budget limits, periods, and date ranges

#### Authentication Validation
- **validateEmail(email)**: Email format validation
- **validatePasswordStrength(password)**: Password complexity validation
- **validatePasswordMatch(password, confirmPassword)**: Password confirmation validation

#### General Validation
- **sanitizeString(input)**: Trims whitespace from strings
- **validateNonEmpty(input)**: Checks for non-empty strings
- **validateDateRange(startDate, endDate)**: Validates date range logic

**Usage Example:**
```typescript
import { validateTransactionInput, validateEmail } from '@/lib/utils/validation'

const result = validateTransactionInput({ amount: 100, type: 'EXPENSE', date: new Date() })
if (!result.valid) {
  console.error(result.error)
}

const isEmailValid = validateEmail('user@example.com')
```

### `index.ts`

General utility functions for formatting and data manipulation.

**Functions:**

#### Formatting
- **formatCurrency(amount, currency)**: Formats numbers as currency (e.g., "$1,000.50")
- **formatPercentage(value, decimals)**: Formats percentage values (e.g., "75.5%")
- **formatDate(date)**: Formats dates (e.g., "Jan 15, 2024")
- **formatDateRange(startDate, endDate)**: Formats date ranges (e.g., "Jan 1 - 31, 2024")

#### Text Manipulation
- **truncate(text, maxLength, suffix)**: Truncates long strings with ellipsis
- **getInitials(name)**: Extracts initials from a full name

#### Utilities
- **sleep(ms)**: Async sleep/delay function

**Usage Example:**
```typescript
import { formatCurrency, formatDate, truncate } from '@/lib/utils'

const formattedAmount = formatCurrency(1234.56) // "$1,234.56"
const formattedDate = formatDate(new Date()) // "Jan 15, 2024"
const shortText = truncate('Long text here', 10) // "Long text..."
```

## Design Principles

### Purity
Validation functions are pure - no side effects, consistent results for same inputs.

### Clarity
Functions have clear, descriptive names that indicate their purpose.

### Type Safety
All functions are fully typed with TypeScript for compile-time safety.

### User-Friendly
Validation functions return descriptive error messages for users.

## Testing

All utility functions should have comprehensive unit tests covering:
- Normal cases with valid inputs
- Edge cases (empty strings, null, undefined)
- Invalid inputs and error cases
- Boundary conditions

## Integration Points

These utilities are used throughout the application:
- **API Routes**: Request validation and data sanitization
- **React Components**: Display formatting and input validation
- **Forms**: Field validation and error messaging
- **Calculations**: Data preprocessing and formatting
- **Database**: Data sanitization before storage

## Adding New Utilities

When adding new utility functions:
1. Keep them pure and simple
2. Add comprehensive JSDoc documentation
3. Include usage examples in JSDoc
4. Update this README
5. Write comprehensive unit tests
6. Follow existing naming conventions
7. Consider reusability across the application

