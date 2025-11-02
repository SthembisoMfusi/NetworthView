# Authentication API

## Overview

This directory contains the Auth.js (NextAuth.js) configuration and route handlers for user authentication. It provides secure email/password authentication with session management.

## Files

### `route.ts`

Main Auth.js route handler that exports GET and POST handlers for all authentication endpoints.

**Endpoints Automatically Created by Auth.js:**
- `GET/POST /api/auth/signin` - Login page
- `GET/POST /api/auth/signout` - Logout endpoint
- `GET /api/auth/callback/:provider` - OAuth callbacks
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token
- `GET /api/auth/providers` - Get available providers

**Configuration:**
- Uses `authOptions` from `@/lib/auth` for configuration
- JWT-based sessions (30 day max age)
- Credentials provider for email/password
- Prisma adapter for database integration

## Authentication Flow

### Signup Flow
1. User submits signup form with email/password
2. POST request to `/api/auth/signup` (custom endpoint to be created)
3. Hash password with bcrypt
4. Create user in database
5. Redirect to login

### Login Flow
1. User submits credentials
2. POST to `/api/auth/callback/credentials`
3. Verify password
4. Create JWT session
5. Return session cookie
6. Redirect to dashboard

### Session Management
- Session stored as JWT in HTTP-only cookie
- Includes user ID and email
- Automatically refreshed on requests
- 30 day expiration

## Usage

### Client-Side

```typescript
import { useSession, signIn, signOut } from 'next-auth/react'

// Get current session
const { data: session, status } = useSession()

// Login
await signIn('credentials', { email, password, redirect: true })

// Logout
await signOut({ redirect: true })

// Check authentication in pages
if (status === 'unauthenticated') {
  redirect('/login')
}
```

### Server-Side

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Get session in API route
const session = await getServerSession(req, res, authOptions)
if (!session) {
  return new Response('Unauthorized', { status: 401 })
}

// Get session in server component
const session = await getServerSession(authOptions)
const userId = session?.user?.id
```

## Customization

Configuration is in `@/lib/auth.ts`:
- Session strategy (JWT or database)
- Provider configuration
- Callbacks (JWT, session)
- Custom pages (login, error, etc.)

## Security Features

- Password hashing with bcrypt
- HTTP-only cookies
- CSRF protection
- Secure token storage
- Session expiration
- OAuth 2.0 support (extensible)

## Error Handling

Auth.js handles standard errors:
- `CredentialsSignin` - Invalid credentials
- `CallbackRouteError` - OAuth callback errors
- `Configuration` - Missing configuration

Customize error pages in `authOptions.pages`.

