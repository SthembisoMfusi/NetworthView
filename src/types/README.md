# Type Definitions

## Overview

This directory contains all TypeScript type definitions for the NetworthView application. Centralizing types ensures consistency across the codebase and provides excellent autocomplete and type checking benefits.

## Files

### `index.ts`

Main type export file containing all type definitions for the application, organized by feature area.

**Exported Types:**

#### Transaction Types
- **Transaction**: Complete transaction model with relations
- **CreateTransactionInput**: Input type for creating new transactions
- **UpdateTransactionInput**: Partial input type for updating transactions
- **TransactionFilters**: Filter options for querying transactions

#### Category Types
- **Category**: Category model with user customization
- **CreateCategoryInput**: Input type for creating categories
- **UpdateCategoryInput**: Input type for updating categories

#### Budget Types
- **Budget**: Budget model with time period and limits
- **BudgetWithSpent**: Budget enhanced with spending data and percentage
- **CreateBudgetInput**: Input type for creating budgets
- **UpdateBudgetInput**: Input type for updating budgets

#### Recurring Transaction Types
- **RecurringTransaction**: Recurring transaction model
- **CreateRecurringTransactionInput**: Input type for creating recurring transactions
- **UpdateRecurringTransactionInput**: Input type for updating recurring transactions

#### Dashboard Types
- **DashboardSummary**: Aggregated financial overview data
- **MonthlySummary**: Monthly income/expense breakdown
- **CategorySummary**: Spending per category with percentages

#### Chart Data Types
- **TimeSeriesDataPoint**: Data point for income vs expenses over time
- **PieChartDataPoint**: Data point for expense distribution charts
- **BudgetProgressData**: Budget tracking visualization data

#### Plaid Integration Types
- **PlaidAccount**: Connected bank account information
- **PlaidTransaction**: Imported bank transaction data
- **PlaidLinkTokenResponse**: Response from Plaid Link initialization
- **PlaidPublicTokenExchangeResponse**: Response from token exchange

#### API Response Types
- **ApiResponse<T>**: Generic API response wrapper
- **PaginatedResponse<T>**: Paginated API response wrapper

#### User & Authentication Types
- **User**: Basic user model
- **AuthUser**: Authenticated user session data

#### Filter & Date Range Types
- **DateRange**: Predefined date range options
- **DateRangeFilter**: Flexible date range filtering
- **TransactionListFilters**: Complete transaction filtering options

#### Form Types
- **LoginFormData**: Login form input data
- **SignupFormData**: Signup form input data

#### Utility Types
- **LoadingState**: Component loading state machine
- **ErrorResponse**: Standardized error response format

## Usage Examples

### Importing Types

```typescript
import { Transaction, CreateTransactionInput, TransactionFilters } from '@/types'

// Use in function signatures
const createTransaction = async (input: CreateTransactionInput): Promise<Transaction> => {
  // implementation
}

// Use in component props
interface TransactionListProps {
  filters?: TransactionFilters
  transactions: Transaction[]
}
```

### Type Guards

Types can be used with TypeScript's type guards:

```typescript
const isExpense = (transaction: Transaction): boolean => {
  return transaction.type === 'EXPENSE'
}

const isOverBudget = (budget: BudgetWithSpent): boolean => {
  return budget.percentage > 100
}
```

### Generic API Responses

```typescript
const fetchTransactions = async (): Promise<ApiResponse<Transaction[]>> => {
  // API call returns typed response
  return {
    success: true,
    data: [...],
    message: 'Transactions fetched successfully'
  }
}
```

## Best Practices

1. **Always import from this file** - Don't define duplicate types elsewhere
2. **Use strict typing** - Avoid `any` types, leverage these definitions
3. **Extend when needed** - Use intersection types or extend interfaces for specific use cases
4. **Keep types updated** - Update types when schema or requirements change
5. **Document complex types** - Add JSDoc comments for non-obvious types

## Integration Points

- Prisma generates types from `schema.prisma` that are used here
- API routes use these types for request/response validation
- React components use these types for props and state
- Utility functions use these types for parameters and return values
- Tests import these types for mock data and assertions

