/**
 * Auth.js Configuration
 * 
 * This module configures NextAuth.js (Auth.js) for authentication.
 * It handles user authentication via email/password credentials.
 * 
 * Features:
 * - Email/password authentication
 * - Session management with JWT
 * - Secure password hashing with bcrypt
 * - User registration and login
 */

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

/**
 * NextAuth configuration options
 * 
 * This configuration uses:
 * - Prisma adapter for database integration
 * - Credentials provider for email/password login
 * - JWT strategy for sessions
 * - bcrypt for password verification
 * 
 * @returns NextAuthOptions configuration object
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // TODO: Implement user authentication logic
        // 1. Find user by email using prisma.user.findUnique
        // 2. If user doesn't exist, return null
        // 3. Verify password using bcrypt.compare
        // 4. If password is invalid, return null
        // 5. Return user object with id and email (omit password)
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // TODO: Implement JWT callback
      // Add user id and email to token when user logs in
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      // TODO: Implement session callback
      // Add user id from token to session.user
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
    }
  }
  
  interface User {
    id: string
    email: string
    name?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
  }
}

