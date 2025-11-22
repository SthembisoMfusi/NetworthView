/**
 * Budgets API Route Handler
 * 
 * GET /api/budgets - List all user's budgets with spending stats
 * POST /api/budgets - Create a new budget
 */

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
  

export async function GET(request: NextRequest) {
  void request;
  try {
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const budgets = await prisma.budget.findMany({
      where: { userId: session.user.id },
    })
    return NextResponse.json({ success: true, data: budgets })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch budgets' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  void request;
  try {
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { name, amount, categoryId } = await request.json()
    const budget = await prisma.budget.create({
      data: {
        name,
        amount,
        categoryId,
        userId: session.user.id,
      },
    })
    return NextResponse.json({ success: true, data: budget })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create budget' }, { status: 500 })
  }
}

function getServerSession(authOptions: NextAuthConfig) {
  throw new Error('Function not implemented.');
}

