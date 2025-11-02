/**
 * Prisma Client Singleton
 * 
 * This module exports a singleton instance of PrismaClient to prevent
 * multiple instances in development (Hot Module Reload).
 * 
 * In production, new PrismaClient() instances are created and reused.
 * In development, a cached global instance is used to prevent connection pool exhaustion.
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Exported Prisma Client instance
 * 
 * Usage:
 * ```typescript
 * import prisma from '@/lib/prisma'
 * 
 * const users = await prisma.user.findMany()
 * const transaction = await prisma.transaction.create({ data: {...} })
 * ```
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma

