/**
 * Single Transaction API Route Handler
 * 
 * This route handles operations on individual transactions:
 * - GET /api/transactions/[id] - Get a single transaction
 * - PUT /api/transactions/[id] - Update a transaction
 * - DELETE /api/transactions/[id] - Delete a transaction
 * 
 * Authentication: Required
 */

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
 

/**
 * GET /api/transactions/[id]
 * 
 * Retrieves a single transaction by ID.
 * Only returns the transaction if it belongs to the authenticated user.
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing id
 * @returns Single transaction object
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  void request; void context;
  try {

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const transaction = await prisma.transaction.findUnique({
      where: { id, userId: session.user.id },
    })
    if (!transaction) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 })
    }
    return NextResponse.json(transaction)  
    
    
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transaction' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/transactions/[id]
 * 
 * Updates an existing transaction by ID.
 * Only allows updating transactions that belong to the authenticated user.
 * 
 * Request Body:
 * {
 *   "amount": number (optional),
 *   "type": "INCOME" | "EXPENSE" (optional),
 *   "date": string (ISO date, optional),
 *   "categoryId": string (optional),
 *   "note": string (optional)
 * }
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing id
 * @returns Updated transaction object
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  void request; void context;
  try {


    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const transaction = await prisma.transaction.findUnique({
      where: { id, userId: session.user.id },
    })
    if (!transaction) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 })
    }
    const { amount, type, date, categoryId, note } = await request.json()
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        amount,
        type,
        date,
        categoryId,
        note,
      },
    })
    return NextResponse.json(updatedTransaction)
    
    
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update transaction' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/transactions/[id]
 * 
 * Deletes a transaction by ID.
 * Only allows deleting transactions that belong to the authenticated user.
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing id
 * @returns Success message
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const transaction = await prisma.transaction.findUnique({
      where: { id, userId: session.user.id },
    })
    if (!transaction) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 })
    }
    await prisma.transaction.delete({ where: { id } })
    return NextResponse.json({ success: true, message: 'Transaction deleted successfully' })
    
    
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete transaction' },
      { status: 500 }
    )
  }
}

  function getServerSession(authOptions: any) {
  throw new Error('Function not implemented.');
}

