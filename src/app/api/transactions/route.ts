/**
 * Transactions API Route Handler
 * 
 * This route handles transaction CRUD operations:
 * - GET /api/transactions - List all transactions with optional filters
 * - POST /api/transactions - Create a new transaction
 * 
 * Authentication: Required
 */

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
 

/**
 * GET /api/transactions
 * 
 * Retrieves all transactions for the authenticated user with optional filtering.
 * 
 * Query Parameters:
 * - startDate: Filter transactions from this date (ISO string)
 * - endDate: Filter transactions to this date (ISO string)
 * - categoryId: Filter by category ID
 * - type: Filter by transaction type (INCOME/EXPENSE)
 * - search: Search in note field
 * - page: Page number for pagination (default: 1)
 * - limit: Results per page (default: 50)
 * - sortBy: Sort field (date/amount/category)
 * - sortOrder: Sort direction (asc/desc)
 * 
 * @returns Array of transactions matching filters
 * 
 * @example
 * GET /api/transactions?type=EXPENSE&startDate=2024-01-01&page=1&limit=20
 */
export async function GET(request: NextRequest) {
  void request;
  try {

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { startDate, endDate, categoryId, type, search, page, limit, sortBy, sortOrder } =
      Object.fromEntries(request.nextUrl.searchParams)
    const whereClause = {
      userId: session.user.id,
      ...(startDate && { date: { gte: new Date(startDate) } }),
      ...(endDate && { date: { lte: new Date(endDate) } }),
      ...(categoryId && { categoryId }),
      ...(type && { type }),
      ...(search && { note: { contains: search } }),
    }
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc',
      },
    })
    const count = await prisma.transaction.count({ where: whereClause })
    const totalPages = Math.ceil(count / Number(limit))
    const totalAmount = await prisma.transaction.aggregate({
      where: whereClause,
      _sum: { amount: true },
    })
    const netWorth = totalAmount._sum.amount || 0
    const data = {
      transactions,
      totalPages,
      totalAmount,
      netWorth,
    } 

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/transactions
 * 
 * Creates a new transaction for the authenticated user.
 * 
 * Request Body:
 * {
 *   "amount": number (required),
 *   "type": "INCOME" | "EXPENSE" (required),
 *   "date": string (ISO date, required),
 *   "categoryId": string (optional),
 *   "note": string (optional)
 * }
 * 
 * @returns Created transaction object
 * 
 * @example
 * POST /api/transactions
 * {
 *   "amount": 100,
 *   "type": "EXPENSE",
 *   "date": "2024-01-15T00:00:00Z",
 *   "categoryId": "cat_123",
 *   "note": "Grocery shopping"
 * }
 */
export async function POST(request: NextRequest) {
  void request;
  try {
  
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { amount, type, date, categoryId, note } = await request.json()
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        date,
        categoryId,
        note,
        userId: session.user.id,
      },
    })
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}

