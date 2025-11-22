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

import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
 

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
export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(_credentials) {
    
        const user = await prisma.user.findUnique({
          where: { email: _credentials?.email },
        })
        if (!user) {
          return null
        }
        const isPasswordValid = await bcrypt.compare(
          _credentials?.password,
          user.password
        )
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
        }
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

 

