# Library Utilities

## Overview

This directory contains core utility modules and configurations used throughout the application.

## Files

### `prisma.ts`

Singleton Prisma Client instance to prevent multiple database connections in development.

**Usage:**
```typescript
import { prisma } from '@/lib/prisma'
const users = await prisma.user.findMany()
```

### `auth.ts`

Auth.js configuration for NextAuth.js authentication system.

**Features:**
- JWT-based session management
- Credentials provider for email/password
- Prisma adapter for database integration
- Session callbacks for user data

**Usage:**
```typescript
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const session = await getServerSession(authOptions)
const userId = session?.user?.id
```

## Subdirectories

### `/calculations`

Pure calculation functions for financial data processing. See [calculations README](./calculations/README.md).

### `/plaid`

Plaid API integration utilities. See [plaid README](./plaid/README.md).

### `/utils`

General utility functions. See [utils README](./utils/README.md).

