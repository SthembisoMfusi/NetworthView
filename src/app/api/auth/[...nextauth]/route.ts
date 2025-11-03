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

import { handlers } from '@/auth'

export const { GET, POST } = handlers

