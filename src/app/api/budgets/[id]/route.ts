/**
 * Single Budget API Route Handler
 */

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
      if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const budget = await prisma.budget.findUnique({
      where: { id, userId: session.user.id },
    })
    if (!budget) {
      return NextResponse.json({ success: false, error: 'Budget not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: budget })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch budget' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const { name, amount, categoryId } = await request.json()
    const budget = await prisma.budget.update({
      where: { id, userId: session.user.id },
      data: { name, amount, categoryId },
    })
    return NextResponse.json({ success: true, data: budget })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update budget' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const budget = await prisma.budget.delete({
      where: { id, userId: session.user.id },
    })
    return NextResponse.json({ success: true, data: budget })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete budget' }, { status: 500 })
  }
}

function getServerSession(authOptions: NextAuthConfig) {
  throw new Error('Function not implemented.');
}

