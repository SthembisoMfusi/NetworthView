/**
 * Auth.js API Route Handler
 * 
 * This route handles all authentication-related API requests:
 * - User login
 * - User signup  
 * - Session management
 * - Token refresh
 * 
 * Path: /api/auth/[...nextauth]
 */

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * NextAuth handler exports GET and POST handlers
 * These handle all Auth.js requests including login, signup, callbacks, etc.
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

