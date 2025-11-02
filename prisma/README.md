# Prisma Database Configuration

## Overview

This directory contains the Prisma configuration and database schema for the NetworthView application. Prisma is used as the ORM to interact with the PostgreSQL database, providing type-safe database access and automatic migrations.

## Files

### `schema.prisma`

The main Prisma schema file defining all database models, relations, and enums used across all three phases of the application.

**Models Defined:**

#### Authentication Models (Auth.js)
- **User**: Core user account information including email, name, and authentication details
- **Account**: OAuth account information for external authentication providers
- **Session**: User session management for Auth.js
- **VerificationToken**: Email verification tokens

#### Core Finance Models
- **Category**: Transaction categories (Income/Expense) with icon and color customization
- **Transaction**: Core financial transactions with amount, date, type, category, and notes

#### Phase 2 Models
- **Budget**: Monthly/weekly/daily/yearly budget limits per category
- **RecurringTransaction**: Automatically recurring transactions (salary, subscriptions, etc.)

#### Phase 3 Models
- **PlaidAccount**: Bank accounts connected via Plaid API
- **PlaidTransaction**: Transactions imported from connected bank accounts

**Key Relationships:**
- User has many transactions, categories, budgets, recurring transactions, and Plaid accounts
- Transactions belong to a user and optionally a category
- Budgets are linked to categories and users
- Recurring transactions are linked to users and categories
- Plaid transactions are linked to Plaid accounts

**Indexes:**
- Optimized queries on userId + date combinations
- Unique constraints on category names per user
- Unique constraints on Plaid transaction IDs

### `seed.ts`

Database seeding script that populates the database with initial test data for development and testing.

**Seed Data Includes:**
- Test user with credentials (test@example.com / password123)
- Sample categories (Salary, Food & Dining, Transport)
- Historical transactions (multiple months)
- Sample budget for Food & Dining category
- Recurring monthly salary transaction

**Usage:**
```bash
npm run db:seed
```

## Database Configuration

The database connection is configured via the `DATABASE_URL` environment variable in `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/networthview?schema=public"
```

For production, use a Neon PostgreSQL database connection string.

## Available Commands

```bash
# Generate Prisma Client
npm run db:generate

# Create and apply migrations
npm run db:migrate

# Push schema changes directly to database (development)
npm run db:push

# Seed the database with test data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL` with your PostgreSQL connection string
3. Run `npm run db:generate` to generate Prisma Client
4. Run `npm run db:push` or `npm run db:migrate` to apply schema to database
5. (Optional) Run `npm run db:seed` to populate test data

## Migration Workflow

1. Make changes to `schema.prisma`
2. Run `npm run db:migrate -- --name descriptive_name` to create migration
3. Prisma will automatically generate migration files
4. Review generated SQL in `prisma/migrations/`
5. Migration is applied automatically during `npm run db:migrate`

## Type Generation

After modifying `schema.prisma`, always run:

```bash
npm run db:generate
```

This generates TypeScript types in `node_modules/.prisma/client/` that are automatically imported throughout the application using the `@prisma/client` package.

## Notes

- All timestamps use `@default(now())` for `createdAt` and `@updatedAt` for automatic tracking
- All user-related models cascade on delete to maintain data integrity
- Strict typing is enforced through Prisma's generated types
- Foreign key constraints ensure referential integrity

