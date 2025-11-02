# Plaid Integration

## Overview

This directory contains utilities for integrating with the Plaid API to connect bank accounts and import transactions automatically. Plaid provides secure, read-only access to banking data.

## Files

### `client.ts`

Plaid API client configuration and initialization.

**Functions:**

#### Client Management
- **createPlaidClient()**: Creates and configures the Plaid API client based on environment variables
- **getPlaidEnvironment()**: Gets the current Plaid environment (sandbox, development, production)

**Configuration:**
- `PLAID_CLIENT_ID`: Your Plaid application client ID
- `PLAID_SECRET`: Your Plaid secret key
- `PLAID_ENV`: Environment selector (sandbox/development/production)
- `PLAID_PRODUCTS`: Required products (e.g., 'transactions')

**Usage:**
```typescript
import { createPlaidClient } from '@/lib/plaid/client'

const client = createPlaidClient()
const response = await client.linkTokenCreate({
  user: { client_user_id: userId },
  client_name: 'NetworthView',
  products: ['transactions'],
  country_codes: ['US'],
  language: 'en',
})
```

### `transactions.ts`

Functions for fetching and processing Plaid transactions.

**Functions:**

#### Transformation
- **transformPlaidTransaction(plaidTransaction, plaidAccountId)**: Converts Plaid transaction format to our internal schema

#### Sync Operations
- **syncPlaidTransactions(plaidTransactions, plaidAccountId)**: Syncs Plaid transactions with our database

#### Analysis
- **isExpenseTransaction(amount)**: Checks if transaction is an expense (negative amount)
- **isIncomeTransaction(amount)**: Checks if transaction is income (positive amount)
- **getPrimaryCategory(categories)**: Extracts primary category from Plaid categories
- **getSubcategory(categories)**: Extracts subcategory from Plaid categories

**Usage:**
```typescript
import { transformPlaidTransaction, syncPlaidTransactions } from '@/lib/plaid/transactions'

// Transform a single transaction
const transformed = transformPlaidTransaction(plaidData, plaidAccountId)

// Sync multiple transactions
const synced = await syncPlaidTransactions(plaidTransactionsArray, plaidAccountId)
```

## Setup

### 1. Install Plaid Package

```bash
npm install plaid
```

### 2. Get Plaid Credentials

1. Sign up at https://dashboard.plaid.com
2. Create a new application
3. Get your Client ID and Secret from the dashboard
4. Add credentials to `.env`:

```
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_secret_here
PLAID_ENV=sandbox
PLAID_PRODUCTS=transactions
```

### 3. Uncomment Implementation Code

In `client.ts` and `transactions.ts`, uncomment the TODO blocks and update imports.

## Plaid Flow

### 1. Create Link Token
User initiates account connection → Generate link token → Return to frontend

### 2. Link Account
User completes Plaid Link flow → Receives public token → Exchange for access token

### 3. Store Access Token
Save access token securely to database in PlaidAccount model

### 4. Sync Transactions
Periodically fetch new transactions using access token → Transform and save

## Webhooks

Plaid sends webhooks for:
- `TRANSACTIONS`: New transactions available
- `ITEM`: Account status changes (update, disconnect, etc.)

Handle webhooks in `/api/plaid/webhook` route.

## Environment Modes

### Sandbox
- Development testing environment
- Pre-populated test data
- No real bank connections
- All test institutions available

### Development
- Production-like testing
- Real institution connections
- Limited to test credentials
- Webhook testing supported

### Production
- Live production environment
- Real user bank connections
- Full Plaid compliance required

## Security

- Never expose access tokens to frontend
- Store tokens encrypted in database
- Use HTTPS for all API calls
- Implement proper error handling
- Log access but not sensitive data

## Error Handling

Common Plaid errors:
- `ITEM_LOGIN_REQUIRED`: User needs to re-authenticate
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INSTITUTION_DOWN`: Bank temporarily unavailable

Implement retry logic and user-friendly error messages.

## Testing

Use Plaid's sandbox mode for development:
- Test institution: user_good / pass_good
- Pre-populated transactions
- No real money involved
- All features available

## Documentation

- [Plaid Docs](https://plaid.com/docs/)
- [API Reference](https://plaid.com/docs/api/)
- [Link Documentation](https://plaid.com/docs/link/)

