# Transactions API

## Overview

This directory contains API route handlers for managing financial transactions (income and expenses). All endpoints require authentication and operate on the authenticated user's transactions.

## Routes

### `/api/transactions` (route.ts)

Main transactions endpoint for listing and creating transactions.

#### GET /api/transactions

Retrieves all transactions for the authenticated user with optional filtering and pagination.

**Query Parameters:**
- `startDate` (optional): Filter from date (ISO string)
- `endDate` (optional): Filter to date (ISO string)
- `categoryId` (optional): Filter by category ID
- `type` (optional): Filter by type (`INCOME` or `EXPENSE`)
- `search` (optional): Search in note field
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 50)
- `sortBy` (optional): Sort field (`date`, `amount`, `category`)
- `sortOrder` (optional): Sort direction (`asc`, `desc`)

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [...],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 150,
      "totalPages": 3
    }
  }
}
```

**Example:**
```
GET /api/transactions?type=EXPENSE&startDate=2024-01-01&page=1&limit=20
```

#### POST /api/transactions

Creates a new transaction for the authenticated user.

**Request Body:**
```json
{
  "amount": 100.00,
  "type": "EXPENSE",
  "date": "2024-01-15T00:00:00Z",
  "categoryId": "cat_123",
  "note": "Grocery shopping"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "txn_123",
    "amount": 100.00,
    "type": "EXPENSE",
    "date": "2024-01-15T00:00:00Z",
    "categoryId": "cat_123",
    "note": "Grocery shopping",
    "userId": "user_123",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

**Validation:**
- `amount`: Required, positive number
- `type`: Required, must be `INCOME` or `EXPENSE`
- `date`: Required, ISO date string, cannot be in the future
- `categoryId`: Optional, must exist in database
- `note`: Optional, string

### `/api/transactions/[id]` ([id]/route.ts)

Single transaction operations endpoint.

#### GET /api/transactions/[id]

Retrieves a single transaction by ID.

**Response:**
```json
{
  "success": true,
  "data": { transaction object }
}
```

#### PUT /api/transactions/[id]

Updates an existing transaction. All fields are optional.

**Request Body:**
```json
{
  "amount": 150.00,
  "note": "Updated grocery shopping"
}
```

**Response:**
```json
{
  "success": true,
  "data": { updated transaction object }
}
```

#### DELETE /api/transactions/[id]

Deletes a transaction.

**Response:**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

## Authentication

All endpoints require authentication:
- Unauthenticated requests return `401 Unauthorized`
- Only transactions belonging to the authenticated user are accessible
- User ID is automatically extracted from the session

## Error Handling

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Amount must be a positive number"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Authentication required"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Transaction not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Failed to fetch transactions"
}
```

## Implementation Details

### Data Flow
1. Authenticate request using `getServerSession`
2. Extract query parameters or body
3. Validate input using validation utilities
4. Query database with Prisma
5. Return typed JSON response

### Database Queries
- Uses Prisma for type-safe database access
- Includes related data (categories) when requested
- Applies user filtering on all queries
- Pagination via `skip` and `take`

### Security
- User isolation enforced at query level
- Input sanitization via validation functions
- SQL injection prevention via Prisma
- XSS prevention via JSON responses

## Usage Examples

### Client-Side Fetch

```typescript
// Get transactions
const response = await fetch('/api/transactions?type=EXPENSE&page=1')
const { data } = await response.json()

// Create transaction
const response = await fetch('/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 100,
    type: 'EXPENSE',
    date: new Date().toISOString(),
    categoryId: 'cat_123',
    note: 'Grocery shopping'
  })
})

// Update transaction
const response = await fetch('/api/transactions/txn_123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 150 })
})

// Delete transaction
const response = await fetch('/api/transactions/txn_123', {
  method: 'DELETE'
})
```

### Server Component Usage

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const session = await getServerSession(authOptions)
const response = await fetch(`http://localhost:3000/api/transactions`, {
  headers: {
    Cookie: request.headers.get('cookie') || ''
  }
})
```

