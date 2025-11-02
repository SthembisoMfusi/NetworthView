# Calculation Utilities

## Overview

This directory contains pure, testable calculation functions for financial data processing. These functions handle all the mathematical operations and data transformations needed for the application's financial features.

## Files

### `transactions.ts`

Core transaction calculation functions for aggregating and analyzing financial transactions.

**Functions:**

#### Balance Calculations
- **calculateNetBalance(transactions)**: Computes total income minus total expenses
- **calculateTotalIncome(transactions)**: Sums all income transactions
- **calculateTotalExpenses(transactions)**: Sums all expense transactions

#### Filtering Functions
- **filterTransactionsByDateRange(transactions, startDate, endDate)**: Extracts transactions within a date range
- **filterTransactionsByType(transactions, type)**: Filters by INCOME or EXPENSE
- **filterTransactionsByCategory(transactions, categoryId)**: Filters by specific category

#### Grouping Functions
- **groupTransactionsByMonth(transactions)**: Groups transactions by month
- **getTransactionsForMonth(transactions, date)**: Gets transactions for a specific month
- **getTransactionsForLastMonths(transactions, months)**: Gets last N months of data

#### Analysis Functions
- **calculatePercentageChange(oldValue, newValue)**: Computes percentage change between values
- **countTransactionsByType(transactions)**: Counts INCOME vs EXPENSE transactions

**Usage Example:**
```typescript
import { calculateNetBalance, getTransactionsForMonth } from '@/lib/calculations/transactions'

const januaryTransactions = getTransactionsForMonth(allTransactions, new Date('2024-01-15'))
const netBalance = calculateNetBalance(januaryTransactions)
```

### `categories.ts`

Category aggregation and analysis functions.

**Functions:**

#### Aggregation
- **aggregateByCategory(transactions)**: Groups all transactions by category with totals
- **aggregateExpensesByCategory(transactions)**: Groups only expense transactions
- **aggregateIncomeByCategory(transactions)**: Groups only income transactions

#### Analysis
- **getTopCategories(transactions, limit)**: Returns top N spending categories
- **calculateCategoryDiversity(transactions)**: Counts unique categories used
- **getUncategorizedTransactions(transactions)**: Finds transactions without categories
- **calculateUncategorizedStats(transactions)**: Stats on uncategorized transactions

**Usage Example:**
```typescript
import { aggregateExpensesByCategory, getTopCategories } from '@/lib/calculations/categories'

const categoryBreakdown = aggregateExpensesByCategory(transactions)
const top5 = getTopCategories(transactions, 5)
```

### `budgets.ts`

Budget tracking and progress calculation functions.

**Functions:**

#### Core Calculations
- **calculateBudgetProgress(spent, limit)**: Computes percentage of budget used
- **calculateRemainingBudget(spent, limit)**: Calculates remaining budget amount
- **isOverBudget(spent, limit)**: Boolean check if over budget
- **calculateBudgetOverage(spent, limit)**: Amount exceeding budget

#### Transaction Integration
- **calculateSpentInCategory(transactions, categoryId)**: Total spending for a category
- **calculateBudgetStats(budget, transactions)**: Complete budget statistics

#### Budget Analysis
- **getOverBudgets(budgets, transactions)**: Finds budgets that are exceeded
- **getAtRiskBudgets(budgets, transactions)**: Finds budgets at 80-100% capacity
- **calculateBudgetProportionRemaining(spent, limit)**: Proportion remaining (0-1)

**Usage Example:**
```typescript
import { calculateBudgetStats, getOverBudgets } from '@/lib/calculations/budgets'

const stats = calculateBudgetStats(foodBudget, allTransactions)
// Returns: { spent, remaining, percentage, isOverBudget, overage }

const exceededBudgets = getOverBudgets(allBudgets, allTransactions)
```

## Design Principles

### Purity
All functions are pure - no side effects, no dependencies on external state, same input always produces same output.

### Testability
Functions are designed to be easily unit tested with simple input/output relationships.

### Performance
Functions use efficient algorithms and avoid unnecessary iterations where possible.

### Type Safety
All functions are fully typed with TypeScript for compile-time safety.

## Testing

Each calculation function should have comprehensive unit tests covering:
- Normal cases with valid inputs
- Edge cases (empty arrays, zero values, negative values)
- Boundary conditions (exact limits, over/under thresholds)
- Type validation

## Integration Points

These calculation functions are used by:
- **API Routes**: /api/dashboard/summary, /api/dashboard/charts
- **React Components**: DashboardSummary, Charts, BudgetProgress
- **Utilities**: Transaction filtering and aggregation pipelines
- **Tests**: Mock data generation and assertion helpers

## Adding New Calculations

When adding new calculation functions:
1. Keep them pure (no side effects)
2. Add comprehensive JSDoc documentation
3. Include usage examples in JSDoc
4. Update this README with function descriptions
5. Write comprehensive unit tests
6. Follow existing naming conventions

